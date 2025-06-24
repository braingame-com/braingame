# Internationalization Workflow

> Updated: 20-06-2025

Brain Game uses **i18next** to manage translations for all packages and apps. The shared configuration lives in the `@braingame/i18n` package.

---

## Adding a New Language

1. **Create a locale folder** inside `packages/i18n/src/locales/` with the language code.
   ```
   packages/i18n/src/locales/fr/common.json
   ```
2. **Add translation strings** in the new JSON file using the existing keys.
3. **Register the language** in `packages/i18n/src/index.ts` by importing the file and adding it to the `resources` object.
4. Run `pnpm lint` and `pnpm typecheck` to ensure the repository remains error free.

### ARIA Labels

All ARIA labels and user facing text should be defined in translation files. Components must reference these keys so screen readers announce the correct localized strings.

---

For further guidance on component accessibility requirements see `docs/BGUI_COMPONENT_PLAN.md`.
