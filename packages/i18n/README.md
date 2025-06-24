# @braingame/i18n

Internationalization (i18n) package for the Brain Game application.

## Overview

This package provides internationalization support using [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/). It enables the Brain Game application to support multiple languages with a centralized translation management system.

## Features

- 🌍 Multi-language support (currently English and Spanish)
- ⚛️ React and React Native integration
- 📦 TypeScript support with full type definitions
- 🔄 Lazy loading ready
- 🎯 Namespace-based translation organization

## Installation

This package is included in the monorepo and installed automatically. For standalone usage:

```bash
npm install @braingame/i18n
```

## Usage

### Basic Setup

Import and use the pre-configured i18n instance in your app:

```typescript
import i18n from '@braingame/i18n';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      {/* Your app components */}
    </I18nextProvider>
  );
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('hello')}</Text>
    </View>
  );
}
```

## Supported Languages

- **English** (en) - Default language
- **Spanish** (es)

## Adding Translations

### Adding a New Translation Key

1. Add the key to all language files in `src/locales/[lang]/common.json`
2. Rebuild the package: `npm run build`

Example:
```json
{
  "welcome": "Welcome",
  "hello": "Hello",
  "newKey": "New translation"
}
```

### Adding a New Language

1. Create a new directory: `src/locales/[language-code]/`
2. Add `common.json` with all translation keys
3. Update the i18n configuration in `src/index.ts` to include the new language
4. Rebuild the package

## Project Structure

```
packages/i18n/
├── src/
│   ├── index.ts           # i18n configuration and exports
│   └── locales/
│       ├── en/
│       │   └── common.json # English translations
│       └── es/
│           └── common.json # Spanish translations
├── dist/                  # Built output
├── package.json
└── tsconfig.json
```

## Development

### Scripts

- `npm run build` - Build the package
- `npm run dev` - Watch mode for development
- `npm run typecheck` - Type check the code
- `npm run clean` - Clean build artifacts

### Configuration

The i18n instance is configured with:

- **Fallback Language**: English (en)
- **Debug Mode**: Enabled in development
- **Interpolation**: Escaping disabled (handled by React)
- **React Suspense**: Ready for use with React Suspense

## Best Practices

1. **Keep translations organized**: Use meaningful key names that describe the content
2. **Avoid hardcoded text**: Always use translation keys instead of hardcoded strings
3. **Test all languages**: Ensure all supported languages have complete translations
4. **Use namespaces**: As the app grows, consider organizing translations into namespaces

## Contributing

When adding new features or text to the application:

1. Add translation keys to all language files
2. Use descriptive key names (e.g., `auth.login.button` instead of `btn1`)
3. Test the translations in all supported languages
4. Document any context-specific translations