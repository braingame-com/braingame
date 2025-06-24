# Brain Game Marketing Website

> Enterprise-grade marketing website and landing page for Brain Game

![Next.js](https://img.shields.io/badge/framework-Next.js%2015-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?style=flat-square&logo=typescript)
![CSS Modules](https://img.shields.io/badge/styling-CSS%20Modules-CC6699?style=flat-square&logo=css3)
![Firebase](https://img.shields.io/badge/backend-Firebase-FFCA28?style=flat-square&logo=firebase)
![Enterprise](https://img.shields.io/badge/quality-enterprise%20grade-gold?style=flat-square&logo=vercel)

## 🚀 Getting Started

```bash
# From monorepo root
pnpm dev --filter website

# Or from this directory
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Create production build with static export
- `pnpm start` - Serve production build locally
- `pnpm lint` - Run Biome linter with auto-fix
- `pnpm typecheck` - Check TypeScript types
- `pnpm validate:env` - Validate environment variables

## 🎯 Features

### Email Collection System
- **Firebase Integration**: Secure email storage with Firestore
- **Duplicate Detection**: Prevents duplicate submissions
- **Validation**: Comprehensive email validation
- **Analytics**: Track submission sources and user agents
- **GDPR Compliant**: Privacy-first data collection

### Performance & SEO
- **Static Generation**: Next.js static export for blazing-fast performance
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Core Web Vitals**: Optimized for perfect Lighthouse scores
- **Image Optimization**: Automatic image optimization with Next.js Image
- **Font Optimization**: Lexend font with optimal loading strategy

### Monitoring & Analytics
- **Sentry Integration**: Real-time error tracking and performance monitoring
- **Analytics Ready**: Configured for Google Analytics or similar
- **Performance Metrics**: Track user interactions and page performance
- **Error Boundaries**: Graceful error handling with user feedback

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: CSS Modules with BGUI design system
- **UI Components**: @braingame/bgui component library
- **Database**: Firebase Firestore
- **Hosting**: Firebase Hosting with CDN
- **Error Tracking**: Sentry
- **Build Tool**: Turbo with monorepo optimization

### Key Technologies
- **React 19**: Latest React features and optimizations
- **Next.js Static Export**: Pre-rendered pages for optimal performance
- **Firebase SDK**: Authentication and Firestore integration
- **Environment Validation**: Runtime validation of required env vars

## 📁 Project Structure

```
apps/main-site/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles and CSS reset
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Homepage component
│   │   ├── page.module.css # Homepage styles
│   │   ├── not-found.tsx   # 404 page
│   │   └── favicon.ico     # Site favicon
│   └── lib/                 # Utilities and services
│       ├── firebase.ts      # Firebase configuration
│       ├── emailService.ts  # Email collection logic
│       └── __tests__/       # Unit tests
├── public/                  # Static assets
├── scripts/
│   └── validate-env.js      # Environment validation script
├── .env.example            # Environment template
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=Brain Game Web
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.braingame.com
NEXT_PUBLIC_API_TIMEOUT=30000

# Firebase Configuration (get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Analytics & Monitoring
NEXT_PUBLIC_ANALYTICS_KEY=your-analytics-key
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select existing
   - Enable Firestore Database
   - Enable Analytics (optional)

2. **Configure Firestore**
   - Create a collection named `email-signups`
   - Set up security rules for write-only access
   - Enable composite indexes if needed

3. **Get Configuration**
   - Project Settings > General > Your apps
   - Copy configuration values to `.env.local`

## 🚀 Deployment

### Firebase Hosting

The website is configured for deployment to Firebase Hosting:

```bash
# Build the website
pnpm build

# Deploy to Firebase
firebase deploy --only hosting:www

# Or deploy all sites
firebase deploy --only hosting
```

### Deployment Configuration

- **Target**: `www` in firebase.json
- **Public Directory**: `apps/main-site/out`
- **Static Export**: Configured in next.config.ts
- **Domain**: Served at www.braingame.dev

### Custom Domain Setup

1. Go to Firebase Console > Hosting
2. Select the "www" hosting target
3. Click "Add custom domain"
4. Add `www.braingame.dev`
5. Configure DNS records as instructed
6. Wait for SSL provisioning (24-48 hours)

### CI/CD Integration

Automatic deployments via GitHub Actions:
- **Preview**: Deploy on pull requests
- **Production**: Deploy on merge to main
- **Static Analysis**: Type checking and linting pre-deploy

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm typecheck

# Lint checking
pnpm lint
```

## 🎨 Design System

The website uses Brain Game's design system from `@braingame/bgui`:
- **Typography**: Lexend font family
- **Colors**: Theme-aware color system
- **Components**: Reusable UI components
- **Responsive**: Mobile-first design approach

## 📊 Performance Optimization

### Build Optimizations
- **Static Export**: Pre-rendered HTML for instant loading
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Minification**: Optimized production bundles

### Runtime Optimizations
- **Image Optimization**: Next.js Image component
- **Font Loading**: Optimized web fonts
- **Lazy Loading**: Components loaded on demand
- **Caching**: Aggressive caching strategies

## 🔒 Security

- **Environment Validation**: Required vars checked at build time
- **Content Security Policy**: Restrictive CSP headers
- **HTTPS Only**: Enforced via Firebase Hosting
- **Input Validation**: Email validation before storage
- **Rate Limiting**: Firebase security rules

## 🔗 Links

- **Main Project**: [../../README.md](../../README.md)
- **Architecture**: [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- **BGUI Components**: [../../packages/bgui/README.md](../../packages/bgui/README.md)
- **Development Guide**: [../../docs/DEVELOPMENT.md](../../docs/DEVELOPMENT.md)

---

Built with 💜 by Brain Game • Enterprise-grade software from day one
