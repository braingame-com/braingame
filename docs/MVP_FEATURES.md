# Brain Game MVP Feature Set

> **Last Updated**: 03-07-2025
> **Status**: Initial Definition
> **Purpose**: Define the minimum viable product features for Brain Game's first release

## 🎯 MVP Philosophy

The MVP will focus on delivering **core value** with the **simplest implementation** that provides a complete user experience. We'll prioritize features that:
1. Deliver immediate value to users
2. Can be implemented with existing components
3. Don't require complex integrations
4. Provide a foundation for future features

## 🚀 Core MVP Features

### 1. Authentication & Onboarding (Week 1)
**Goal**: Get users into the app quickly with minimal friction

- [ ] **Email/Password Authentication**
  - Simple registration with email + password
  - Login/logout functionality
  - Password reset via email
  - Session persistence
- [ ] **Welcome Flow**
  - 3-screen onboarding explaining app benefits
  - Skip option for quick start
  - Store onboarding completion status

### 2. Vision & Goals Module (Week 1-2)
**Goal**: Help users define their vision across 5 life areas

- [ ] **Life Areas Dashboard**
  - Display 5 areas: Health, Wealth, Relationships, Happiness, Self
  - Visual progress indicators for each area
  - Quick access to set/edit vision
- [ ] **Vision Input**
  - Simple text input for each life area
  - Character limit: 500 chars per vision
  - Save locally with timestamp
  - View/edit existing visions

### 3. Daily Affirmations (Week 2)
**Goal**: Provide daily motivation and mindset reinforcement

- [ ] **Affirmation Display**
  - Show one affirmation per day
  - Beautiful typography and design
  - Swipe to see previous affirmations (last 7 days)
- [ ] **Basic Affirmation Library**
  - 30 pre-written affirmations to start
  - Rotate daily at midnight local time
  - Mark favorites (local storage)

### 4. Visual Inspiration Gallery (Week 2-3)
**Goal**: Motivational imagery to reinforce positive mindset

- [ ] **Image Gallery**
  - 20 high-quality motivational images
  - Full-screen viewing mode
  - Swipe navigation between images
  - Save favorites locally

### 5. Basic Progress Tracking (Week 3)
**Goal**: Simple way to track daily engagement

- [ ] **Daily Check-in**
  - "Did you review your vision today?" Yes/No
  - "Did you read your affirmation?" Yes/No
  - Simple streak counter
  - Calendar view of check-in history

### 6. Settings & Profile (Week 3)
**Goal**: Essential app customization

- [ ] **User Profile**
  - Display name
  - Email (from auth)
  - Join date
- [ ] **App Settings**
  - Notification preferences (on/off)
  - Theme selection (light/dark)
  - Clear local data option

## 🚫 NOT in MVP (Future Releases)

To maintain focus, these features are explicitly excluded from MVP:

- ❌ Social features (sharing, community)
- ❌ Advanced analytics and insights
- ❌ Custom affirmations
- ❌ Audio affirmations
- ❌ Google Sheets integration
- ❌ Payment/Premium features
- ❌ Complex goal tracking with metrics
- ❌ Habit tracking
- ❌ Journal functionality
- ❌ Video content
- ❌ Multi-language support

## 📱 Technical Implementation Strategy

### Data Storage (MVP)
- **Local Storage Only**: AsyncStorage for all user data
- **No Backend Required**: Reduces complexity for MVP
- **Data Structure**: Simple JSON objects

### Component Usage
- **Maximize Existing Components**: Use the 30+ components in `packages/bgui`
- **Minimal New Components**: Only create what's absolutely necessary
- **Consistent Design**: Follow existing design system

### Navigation Structure
```
- Welcome (first launch only)
  - Onboarding screens
- Auth (unauthenticated)
  - Login
  - Register
  - Forgot Password
- Main (authenticated)
  - Dashboard
    - Vision & Goals
    - Daily Affirmation
    - Inspiration Gallery
    - Progress
  - Settings
    - Profile
    - Preferences
```

## 📊 Success Metrics for MVP

1. **User can complete full flow**: Register → Set Vision → View Daily Content → Track Progress
2. **Data persists**: User data saved locally and available on app restart
3. **Performance**: App loads in <3 seconds, smooth navigation
4. **Stability**: No crashes in critical user flows
5. **Design**: Consistent, polished UI using existing components

## 🏃‍♂️ Implementation Order

1. **Week 1**: Authentication + Vision & Goals
2. **Week 2**: Daily Affirmations + Visual Gallery
3. **Week 3**: Progress Tracking + Settings + Polish

## ✅ MVP Completion Checklist

- [ ] All 6 core features implemented
- [ ] Manual testing on iOS and Android
- [ ] Data persistence verified
- [ ] No placeholder content
- [ ] Error handling for edge cases
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Accessibility basics (font scaling, screen readers)

## 🎉 MVP Done = Ready for Beta Users

When all items above are complete, Brain Game will be ready for initial beta testing with real users. This focused scope ensures we can deliver value quickly while learning what users actually need before building more complex features.