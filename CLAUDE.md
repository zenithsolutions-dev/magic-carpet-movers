@AGENTS.md
# Claude Code Guidelines: Next.js + Tailwind CSS

## Overview

This document defines best practices and coding standards for building scalable, maintainable, and performant applications using **Next.js** and **Tailwind CSS**.

---

## 1. Project Structure

* Use a clear and consistent folder structure:

  ```
  /app or /pages
  /components
  /lib
  /hooks
  /styles
  /types
  ```
* Keep components small and focused (single responsibility).
* Co-locate related files when appropriate (component + styles + tests).

---

## 2. Component Design

* Prefer **functional components** with hooks.
* Use **TypeScript** for all components.
* Define explicit prop types:

  ```ts
  type ButtonProps = {
    label: string;
    onClick?: () => void;
  };
  ```
* Keep components:

  * Reusable
  * Stateless when possible
  * Easy to test

---

## 3. Styling with Tailwind CSS

* Use utility classes directly in JSX.
* Avoid excessive class duplication → extract reusable patterns into components.
* Use `clsx` or `classnames` for conditional styles:

  ```ts
  className={clsx("px-4 py-2", isActive && "bg-blue-500")}
  ```
* Maintain consistency in spacing, colors, and typography.
* Prefer Tailwind config customization over inline hacks.

---

## 4. Layout and Responsiveness

* Design **mobile-first**.
* Use responsive utilities:

  ```html
  <div className="text-sm md:text-lg lg:text-xl" />
  ```
* Avoid fixed widths unless necessary.
* Use flexbox/grid utilities effectively.

---

## 5. Data Fetching

* Use Next.js data fetching methods appropriately:

  * `fetch` with Server Components (preferred)
* Handle loading and error states gracefully.
* Avoid unnecessary client-side fetching when server-side is sufficient.

---

## 6. Performance

* Use **Image optimization** (`next/image`).
* Lazy load components when needed.
* Avoid large client-side bundles:

  * Prefer server components
  * Split code dynamically
* Minimize re-renders:

  * Memoize components when necessary (`React.memo`)

---

## 7. Accessibility (a11y)

* Always use semantic HTML.
* Include:

  * `alt` text for images
  * Proper button roles
  * Keyboard navigation support
* Avoid divs for interactive elements.

---

## 8. State Management

* Use local state (`useState`) for simple cases.
* Use `useReducer` or external libraries (e.g., Zustand) for complex state.
* Avoid deeply nested prop drilling → use context when necessary.

---

## 9. Code Quality

* Follow consistent formatting:

  * Use Prettier
  * Use ESLint with Next.js rules
* Naming conventions:

  * Components: `PascalCase`
  * Variables/functions: `camelCase`
* Avoid:

  * Magic numbers
  * Hardcoded strings (use constants)

---

## 10. API & Backend Integration

* Use `/app/api` or `/pages/api` for backend routes.
* Validate all incoming data.
* Handle errors consistently.
* Keep API logic separate from UI logic.

---

## 11. Environment Variables

* Store secrets in `.env.local`.
* Prefix public variables with:

  ```
  NEXT_PUBLIC_
  ```
* Never expose sensitive data to the client.

---


## 12. General Principles

* Keep code **simple and readable**.
* Prefer clarity over cleverness.
* Refactor when duplication appears.
* Write code for humans first, machines second.

---

## 13. Example Component

```jsx


export function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

---

14. Design Tokens & Tailwind Config (STRICT)

Do NOT hardcode values (colors, spacing, font sizes) directly in classes.

// ❌ Bad
<div className="bg-[#1a1a1a] p-[13px] text-[15px]" />

Use Tailwind theme tokens defined in tailwind.config.js

// ✅ Good
<div className="bg-primary p-md text-base" />
All design values must come from:
theme.colors
theme.spacing
theme.fontSize
theme.borderRadius

---

## 15. Package Versions (STRICT)

* **Always use the latest stable release** for any package being added or installed.
* Before installing a package, check its latest version on npm (e.g., `npm view <package> version`) instead of relying on prior knowledge.
* When adding a dependency to `package.json`, pin to the latest stable version.
* When upgrading, prefer the latest stable release unless there is a documented breaking change blocking it.
* Never install outdated or deprecated versions of packages.

---

## Final Notes

* Consistency is more important than personal preference.
* Follow these guidelines unless there is a strong reason not to.
* Always optimize for maintainability and scalability.

---
