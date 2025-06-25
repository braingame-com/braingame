# Internationalization Workflow

Adding multi-language support to Brain Game.

## Tech Stack
- **i18next**: Translation framework
- **react-i18next**: React bindings
- **ICU format**: Pluralization and formatting

## Adding New Languages

### 1. Create Locale Files
```bash
mkdir -p src/locales/[language-code]
touch src/locales/[language-code]/common.json
```

### 2. Add Translations
```json
// src/locales/en/common.json
{
  "welcome": "Welcome to Brain Game",
  "buttons": {
    "continue": "Continue",
    "skip": "Skip"
  }
}
```

### 3. Register Language
```typescript
// src/i18n/config.ts
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: require('../locales/en/common.json') },
    es: { common: require('../locales/es/common.json') }
  }
});
```

## Usage

### Components
```typescript
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation('common');
  
  return <Text>{t('welcome')}</Text>;
};
```

### Accessibility
```typescript
// Add ARIA labels
<Button
  title={t('buttons.continue')}
  accessibilityLabel={t('buttons.continue')}
/>
```

## Supported Languages

Currently supported:
- English (en) - Default
- Spanish (es)
- French (fr)

## Best Practices

- Use nested keys for organization
- Provide context for translators
- Test RTL languages
- Handle pluralization with ICU format