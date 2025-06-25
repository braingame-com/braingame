# I18n

Internationalization package for Brain Game using i18next.

## Features

- **Multi-language support**: English, Spanish
- **TypeScript integration**: Type-safe translation keys
- **Lazy loading**: Load translations on demand
- **React Native + Web**: Cross-platform compatibility

## Quick Start

```typescript
import { useTranslation } from '@braingame/i18n';

const Component = () => {
  const { t } = useTranslation();
  
  return <Text>{t('welcome.title')}</Text>;
};
```

## Current Languages

- **English (en)**: Default language
- **Spanish (es)**: Complete translation

## Usage Patterns

### Basic Translation
```typescript
const { t } = useTranslation();

// Simple key
const title = t('app.title');

// Nested key
const welcome = t('welcome.message');
```

### Translation with Variables
```typescript
const greeting = t('welcome.user', { name: 'John' });
// "Welcome back, John!"
```

### Pluralization
```typescript
const itemCount = t('items.count', { count: 5 });
// "5 items" or "1 item"
```

## Adding New Keys

### 1. Add to English
```json
// packages/i18n/src/locales/en/common.json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

### 2. Add Translation
```json
// packages/i18n/src/locales/es/common.json
{
  "buttons": {
    "save": "Guardar", 
    "cancel": "Cancelar"
  }
}
```

### 3. Update Types
TypeScript automatically picks up new keys for type safety.

## Adding New Languages

### 1. Create Locale Directory
```bash
mkdir packages/i18n/src/locales/fr
```

### 2. Add Translation Files
```json
// packages/i18n/src/locales/fr/common.json
{
  "welcome": {
    "title": "Bienvenue"
  }
}
```

### 3. Register Language
```typescript
// packages/i18n/src/config.ts
const resources = {
  en: { common: require('./locales/en/common.json') },
  es: { common: require('./locales/es/common.json') },
  fr: { common: require('./locales/fr/common.json') }
};
```

## Best Practices

### Do
- Use meaningful key names (`auth.login.title` not `title1`)
- Avoid hardcoded text in components
- Test all languages regularly
- Provide context for translators

### Don't
- Concatenate translated strings
- Use translation keys as default values
- Forget to update all language files
- Mix languages in single file

## Project Structure

```
packages/i18n/
├── src/
│   ├── locales/
│   │   ├── en/           English translations
│   │   └── es/           Spanish translations
│   ├── config.ts         i18next configuration
│   └── index.ts          Package exports
```