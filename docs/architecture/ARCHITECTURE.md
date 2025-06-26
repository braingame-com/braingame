# Architecture

Technical blueprint for Brain Game.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Brain Game Platform                   │
├─────────────────┬──────────────────┬───────────────────┤
│  Universal App  │  Marketing Site  │  Documentation    │
│  (React Native) │  (Next.js)       │  (Docusaurus)     │
├─────────────────┴──────────────────┴───────────────────┤
│                    Shared Packages                       │
│  bgui • config • i18n • utils • types                  │
├─────────────────────────────────────────────────────────┤
│                    Infrastructure                        │
│  Firebase • Vercel • GitHub Actions                     │
└─────────────────────────────────────────────────────────┘
```

## Key Decisions

1. **Turborepo** - Monorepo orchestration with caching
2. **Firebase** - BaaS for auth, database, hosting
3. **TypeScript** - Type safety across entire codebase
4. **Conventional Commits** - Automated versioning
5. **Zero-Tolerance Quality** - No lint/type errors

## State Management

### Client State (Redux Toolkit)
```typescript
// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, tokens: 0 },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  }
});
```

### Server State (TanStack Query)
```typescript
// API query
const { data, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000 // 5 minutes
});
```

## Offline Architecture

### Storage Strategy
```typescript
// AsyncStorage for React Native
await AsyncStorage.setItem('@user', JSON.stringify(user));

// Redux persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'exercises']
};
```

### Network Detection
```typescript
NetInfo.addEventListener(state => {
  if (!state.isConnected) {
    dispatch(setOfflineMode(true));
  }
});
```

### Sync Queue
```typescript
// Queue actions when offline
if (!isOnline) {
  dispatch(queueAction(action));
  return;
}
// Process queue when back online
```

## Project Structure

```
braingame/
├── apps/
│   ├── api/              REST API service
│   ├── product/          Mobile app
│   ├── main-site/        Marketing website
│   └── docs-site/        Documentation
├── packages/
│   ├── bgui/            UI components
│   ├── config/          Shared config
│   ├── i18n/            Translations
│   └── utils/           Utilities
├── docs/                Technical docs
└── scripts/             Build tools
```

## Development Workflow

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run specific app
npm run dev --filter=product

# Build everything
npm run build

# Type check
npm run typecheck

# Lint & format
npm run lint
```

## CI/CD Pipeline

### GitHub Actions
1. **Lint & Type Check** - Biome + TypeScript
2. **Unit Tests** - Jest + React Testing Library
3. **E2E Tests** - Playwright (web) / Detox (mobile)
4. **Build** - Production builds for all apps
5. **Deploy** - Automated deployment on merge

### Quality Gates
- 100% lint pass
- 100% type check pass
- 80% test coverage
- No console.logs
- Bundle size limits

## Security

- Firebase Auth for authentication
- Row-level security in Firestore
- API rate limiting
- Environment variable validation
- Dependency scanning with Dependabot
- Secret scanning with secretlint

## Monitoring

```typescript
// Sentry integration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});
```

## Extension Points

1. **New Features** - Add to packages/bgui
2. **New Apps** - Create in apps/ directory
3. **New Services** - Extend API or create new
4. **New Platforms** - Share core packages