/**
 * Renders a schema.org object as a JSON-LD script block. Server component —
 * no client JS. The payload is serialized once at render time; `<` is escaped
 * so user-editable config strings can never break out of the script element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
