# Brain Game Product App

> The universal Expo client for iOS, Android, and Web - Your operating system for personal development

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey?style=flat-square)
![Expo](https://img.shields.io/badge/framework-Expo%20SDK%2051-000020?style=flat-square&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript)
![Features](https://img.shields.io/badge/features-mindset%20training-brightgreen?style=flat-square)

## 🚀 Getting Started

```bash
# From monorepo root
pnpm dev --filter @braingame/product

# Or from this directory
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm web` - Run in web browser
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build

## 🧠 Mindset Training Features

### Vision & Goals System
- **5 Life Areas**: Define your vision across Health, Wealth, Relationships, Happiness, and Self
- **Goal Setting**: Structured approach to setting and tracking meaningful goals
- **Progress Tracking**: Monitor your journey toward your ideal life
- **Data Persistence**: Automatic saving with Google Sheets backend

### Affirmations System
- **Audio Affirmations**: Listen to powerful affirmations with background music
- **Text Display**: Read along as you listen for maximum impact
- **Curated Content**: Proven affirmations for success and personal development
- **Daily Practice**: Build a consistent mindset training routine

### Visual Inspiration
- **50+ Images**: Curated collection of motivational imagery
- **Categories**: Success symbols, entrepreneurs, luxury lifestyle, athletic achievement
- **Slideshow Mode**: Automatic progression through inspirational content
- **Full-Screen Viewing**: Immersive visual experience

### Performance Tracking
- **Habit Tracking**: Monitor daily habits and routines
- **Health Metrics**: Track key health indicators
- **Activity Scores**: Measure engagement and consistency
- **Progress Visualization**: See your growth over time

## 🏗️ Architecture

### Navigation Structure
```
/
├── (tabs)/
│   ├── index (Tasks)
│   ├── tasks (Task Management)
│   └── mindset (Mindset Training)
└── _layout (Root Layout)
```

### Key Technologies
- **Expo Router**: File-based navigation with deep linking
- **React Native**: Cross-platform native development
- **TypeScript**: Type-safe development experience
- **Async Storage**: Local data persistence
- **Google Sheets API**: Cloud data synchronization
- **Reanimated 3**: Smooth 60fps animations

### State Management
- **React Context**: Theme and global state management
- **Local State**: Component-level state for UI interactions
- **Async Storage**: Persistent storage for user data
- **Real-time Sync**: Background synchronization with cloud storage

## 🎨 Design System

The app uses the Brain Game design system from `@braingame/bgui`:
- **Typography**: Lexend font family for optimal readability
- **Color Themes**: Light and dark mode support
- **Design Tokens**: Consistent spacing and sizing
- **Animations**: Smooth transitions and micro-interactions

## 📱 Platform-Specific Features

### iOS
- Native haptic feedback
- Safe area handling
- iOS-specific gestures

### Android
- Material Design compliance
- Back button handling
- Android-specific animations

### Web
- Responsive design
- Keyboard navigation
- SEO optimization

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
```bash
# Google Sheets Integration
EXPO_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key
EXPO_PUBLIC_SPREADSHEET_ID=your_spreadsheet_id

# YouTube Integration
EXPO_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

### Build Configuration
- **EAS Build**: Configured for cloud builds
- **App Store**: Ready for iOS submission
- **Google Play**: Ready for Android submission

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 📱 Deployment

### Development Builds
```bash
# iOS development build
eas build --platform ios --profile development

# Android development build
eas build --platform android --profile development
```

### Production Builds
```bash
# iOS App Store build
eas build --platform ios --profile production

# Android Play Store build
eas build --platform android --profile production
```

## 🔗 Links

- **Main Project**: [../../README.md](../../README.md)
- **BGUI Components**: [../../packages/bgui/README.md](../../packages/bgui/README.md)
- **Utils Package**: [../../packages/utils/README.md](../../packages/utils/README.md)
- **Architecture**: [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)

## 📄 License

MIT © Brain Game
