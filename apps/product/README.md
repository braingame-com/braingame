# Brain Game Product App

Cross-platform mobile app for mindset training.

## Features

- **Mindset Exercises**: CBT-based daily training
- **Token System**: Gamified progress tracking
- **Offline Mode**: Full functionality without connection
- **Cross-Platform**: iOS & Android from single codebase

## Quick Start

```bash
cd apps/product
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android
```

## Architecture

### Tech Stack
- React Native 0.72
- TypeScript
- Zustand (state)
- React Query (data)
- React Navigation

### Project Structure
```
apps/product/
├── src/
│   ├── screens/        Screen components
│   ├── components/     Shared UI
│   ├── services/       API & business logic
│   ├── stores/         Zustand stores
│   ├── hooks/          Custom hooks
│   └── utils/          Helpers
├── ios/                iOS native code
└── android/            Android native code
```

## State Management

```typescript
// User store example
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// Usage
const { user, setUser } = useUserStore();
```

## Platform Features

### iOS
- Face ID authentication
- HealthKit integration
- Haptic feedback
- iOS-specific animations

### Android
- Fingerprint authentication
- Material You theming
- Adaptive icons
- Edge-to-edge display

## Development

### Debug Menu
Shake device or Cmd+D (iOS) / Cmd+M (Android)

### Hot Reload
Fast Refresh enabled by default

### Debugging
```bash
# React DevTools
npx react-devtools

# Flipper
open /Applications/Flipper.app
```

## Testing

```bash
npm test              # Jest unit tests
npm run test:e2e      # Detox E2E tests
```

## Build & Deploy

### iOS
```bash
# Debug
npm run ios

# Release
npm run ios:release

# Archive
npm run ios:archive
```

### Android
```bash
# Debug
npm run android

# Release APK
npm run android:release

# Bundle (AAB)
npm run android:bundle
```

## Performance

- Bundle size: <20MB
- Cold start: <2s
- Memory usage: <150MB
- Battery efficient

## Troubleshooting

### iOS Issues
```bash
# Clean build
cd ios && xcodebuild clean && cd ..

# Reset pods
cd ios && pod deintegrate && pod install
```

### Android Issues
```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Reset cache
npx react-native start --reset-cache
```