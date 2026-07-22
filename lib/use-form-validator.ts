"use client";

import * as React from "react";
import type { Validator } from "@/lib/validators";

type FieldDef<V> = {
  validator: Validator<V>;
  initialValue: V;
};

// Use `any` here so that user schemas with concrete value types (string,
// number, etc.) are assignable. The `ValuesOf` helper still extracts the
// real value type per field via `infer`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySchema = Record<string, FieldDef<any>>;

type ValuesOf<S extends AnySchema> = {
  [K in keyof S]: S[K] extends FieldDef<infer V> ? V : never;
};

type Errors<S extends AnySchema> = Partial<Record<keyof S, string | null>>;
type Touched<S extends AnySchema> = Partial<Record<keyof S, boolean>>;

type FieldProps<V> = {
  name: string;
  value: V;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onBlur: () => void;
  error: string | undefined;
  "aria-invalid": true | undefined;
};

/**
 * Custom form validation. Tracks per-field value, error, and touched state.
 * - Live-validates a field once it has been blurred at least once
 * - `validateAll()` validates every field and marks them all as touched;
 *   call this from your form's onSubmit before invoking the server action
 * - `fieldProps(name)` returns props you can spread onto an Input/Select/textarea
 */
export function useFormValidator<S extends AnySchema>(schema: S) {
  type V = ValuesOf<S>;

  // schema is treated as stable; if the caller passes a new object each render
  // we still only honor the first one for initialValue / validators identity.
  const schemaRef = React.useRef(schema);

  const [values, setValues] = React.useState<V>(() => {
    const init = {} as V;
    for (const k in schemaRef.current) {
      (init as Record<string, unknown>)[k] = schemaRef.current[k].initialValue;
    }
    return init;
  });
  const [errors, setErrors] = React.useState<Errors<S>>({});
  const [touched, setTouched] = React.useState<Touched<S>>({});
  // Hold a ref to current values so callbacks see the latest snapshot
  // without us having to recreate them on every render.
  const valuesRef = React.useRef(values);
  valuesRef.current = values;
  const touchedRef = React.useRef(touched);
  touchedRef.current = touched;

  const runValidator = React.useCallback(
    <K extends keyof S>(name: K, value: unknown, all: V): string | null => {
      const fn = schemaRef.current[name].validator as Validator<unknown>;
      return fn(value, all as Record<string, unknown>);
    },
    [],
  );

  const setValue = React.useCallback(
    <K extends keyof S>(name: K, value: V[K]) => {
      const next = { ...valuesRef.current, [name]: value } as V;
      valuesRef.current = next;
      setValues(next);
      if (touchedRef.current[name]) {
        const err = runValidator(name, value, next);
        setErrors((prev) => ({ ...prev, [name]: err }));
      }
    },
    [runValidator],
  );

  const setBlur = React.useCallback(
    <K extends keyof S>(name: K) => {
      const wasTouched = touchedRef.current[name];
      if (!wasTouched) {
        const nextTouched = { ...touchedRef.current, [name]: true };
        touchedRef.current = nextTouched;
        setTouched(nextTouched);
      }
      const err = runValidator(
        name,
        valuesRef.current[name],
        valuesRef.current,
      );
      setErrors((prev) => ({ ...prev, [name]: err }));
    },
    [runValidator],
  );

  const validateAll = React.useCallback((): {
    valid: boolean;
    errors: Errors<S>;
  } => {
    const newErrors: Errors<S> = {};
    let valid = true;
    const allTouched: Touched<S> = {};
    for (const k in schemaRef.current) {
      const key = k as keyof S;
      allTouched[key] = true;
      const err = runValidator(key, valuesRef.current[key], valuesRef.current);
      newErrors[key] = err;
      if (err) valid = false;
    }
    setErrors(newErrors);
    setTouched(allTouched);
    touchedRef.current = allTouched;
    return { valid, errors: newErrors };
  }, [runValidator]);

  const validateFields = React.useCallback(
    (names: (keyof S)[]): boolean => {
      let valid = true;
      const updates: Errors<S> = {};
      const touchedUpdates: Touched<S> = {};
      for (const name of names) {
        touchedUpdates[name] = true;
        const err = runValidator(
          name,
          valuesRef.current[name],
          valuesRef.current,
        );
        updates[name] = err;
        if (err) valid = false;
      }
      setErrors((prev) => ({ ...prev, ...updates }));
      setTouched((prev) => {
        const next = { ...prev, ...touchedUpdates };
        touchedRef.current = next;
        return next;
      });
      return valid;
    },
    [runValidator],
  );

  const reset = React.useCallback(() => {
    const init = {} as V;
    for (const k in schemaRef.current) {
      (init as Record<string, unknown>)[k] = schemaRef.current[k].initialValue;
    }
    valuesRef.current = init;
    touchedRef.current = {};
    setValues(init);
    setErrors({});
    setTouched({});
  }, []);

  const fieldProps = React.useCallback(
    <K extends keyof S & string>(name: K): FieldProps<V[K]> => ({
      name,
      value: values[name],
      onChange: (e) => setValue(name, e.target.value as V[K]),
      onBlur: () => setBlur(name),
      error: touched[name] ? errors[name] ?? undefined : undefined,
      "aria-invalid":
        touched[name] && errors[name] ? (true as const) : undefined,
    }),
    [values, errors, touched, setValue, setBlur],
  );

  // Apply server-side field errors. They override client errors and mark the
  // matching fields as touched so the messages stay visible.
  const setServerErrors = React.useCallback(
    (serverErrors: Record<string, string[] | undefined>) => {
      const updates: Errors<S> = {};
      const touchedUpdates: Touched<S> = {};
      for (const k in serverErrors) {
        const key = k as keyof S;
        const messages = serverErrors[k];
        if (messages && messages.length > 0) {
          updates[key] = messages[0];
          touchedUpdates[key] = true;
        }
      }
      setErrors((prev) => ({ ...prev, ...updates }));
      setTouched((prev) => {
        const next = { ...prev, ...touchedUpdates };
        touchedRef.current = next;
        return next;
      });
    },
    [],
  );

  return {
    values,
    errors,
    touched,
    setValue,
    setBlur,
    validateAll,
    validateFields,
    fieldProps,
    reset,
    setServerErrors,
  };
}
