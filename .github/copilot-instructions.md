# Shift Scan - Marketing Website

## Project Overview

Next.js 16 marketing and landing pages for Shift Scan workforce management app. Static site generation with internationalization (next-intl).

## Architecture

**Tech Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Radix UI

**Key Features**:

-   Static site generation (`npm run static`)
-   Internationalization (i18n) with next-intl
-   Responsive component library in `app/_components/`
-   Contact forms with Resend email integration

## Development Workflow

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run static   # Static export for hosting
```

## Code Standards

Follow patterns defined in `.github/instructions/`:

-   **General**: [ShiftScan.instructions.md](instructions/ShiftScan.instructions.md) - Core TypeScript/React conventions
-   **React**: [best-react-practices.instructions.md](instructions/best-react-practices.instructions.md) - Component architecture
-   **TypeScript**: [best-typescript-Practices.instructions.md](instructions/best-typescript-Practices.instructions.md) - Type safety
-   **Next.js**: [best-nextjs-api-fetching.instructions.md](instructions/best-nextjs-api-fetching.instructions.md) - API patterns
-   **Styling**: [ui-styling.instructions.md](instructions/ui-styling.instructions.md) - Tailwind + Radix conventions

## Project Structure

```
app/
  ├── [locale]/              # i18n routes (en, es, etc.)
  ├── contact/               # Contact page
  ├── demo-request/          # Demo request forms
  ├── privacy-policy/        # Legal pages
  └── lib/                   # Utilities and types
```

## Key Patterns

-   **Components**: Use Radix UI primitives, compose with CVA (class-variance-authority)
-   **Internationalization**: Use `useTranslations()` from next-intl, never hardcode strings
-   **Forms**: Server actions for submissions, Resend for emails
-   **Styling**: Tailwind with mobile-first approach, responsive utilities

## Important Files

-   `i18n.ts` - i18n configuration
-   `next.config.ts` - Next.js config with i18n and static export settings
-   `app/layout.tsx` - Root layout with font optimization

## Notes

-   This is the **marketing site only** - no backend/API logic
-   Sister projects: `shift-scan-dashboard` (Capacitor mobile app) and `shift-scan-server` (Express API)
-   Never create documentation files unless explicitly requested
