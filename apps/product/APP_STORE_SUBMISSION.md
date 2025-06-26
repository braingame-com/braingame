# App Store Submission

## Prerequisites

### Apple Developer
- [ ] Apple Developer account ($99/year)
- [ ] App ID configured
- [ ] Provisioning profiles created
- [ ] App Store Connect access

### Google Play
- [ ] Google Play Console account ($25 one-time)
- [ ] App created in console
- [ ] Signing key generated

## Build Configuration

### iOS Build

```bash
# Install dependencies
cd apps/product/ios
pod install

# Production build
npx react-native run-ios --configuration Release

# Archive for App Store
xcodebuild -workspace BrainGame.xcworkspace \
  -scheme BrainGame \
  -configuration Release \
  -archivePath ./build/BrainGame.xcarchive \
  archive
```

### Android Build

```bash
# Generate release APK
cd apps/product/android
./gradlew assembleRelease

# Generate AAB for Play Store
./gradlew bundleRelease
```

## App Store Connect Setup

### 1. App Information
- **Name**: Brain Game - Mindset Training
- **Subtitle**: Transform Your Mindset Daily
- **Category**: Health & Fitness
- **Age Rating**: 4+

### 2. Version Information
- **What's New**: Follow semantic versioning
- **Keywords**: mindset, training, mental health, wellness
- **Support URL**: https://braingame.app/support
- **Privacy Policy**: https://braingame.app/privacy

### 3. Screenshots (Required Sizes)
- 6.7" (1290 × 2796)
- 6.5" (1242 × 2688)
- 5.5" (1242 × 2208)
- iPad Pro 12.9" (2048 × 2732)

### 4. App Preview Video
- 15-30 seconds
- Show core features
- No external hardware

## Google Play Console Setup

### 1. Store Listing
- **Title**: Brain Game - Mindset Training
- **Short Description**: Transform your mindset with daily training
- **Category**: Health & Fitness
- **Content Rating**: Everyone

### 2. Graphics Assets
- **Icon**: 512 × 512 PNG
- **Feature Graphic**: 1024 × 500
- **Screenshots**: Min 2, max 8 per device type

### 3. Release Management
- **Testing Track**: Internal → Closed → Open beta
- **Production**: Staged rollout (10% → 50% → 100%)

## Submission Checklist

### Pre-submission
- [ ] Version numbers match (iOS/Android)
- [ ] Remove all console.logs
- [ ] Test on physical devices
- [ ] Test offline functionality
- [ ] Verify deep links work
- [ ] Check push notifications
- [ ] Review crash reports

### Compliance
- [ ] Privacy policy updated
- [ ] Terms of service current
- [ ] GDPR compliance
- [ ] COPPA compliance
- [ ] Export compliance (encryption)

### Final Steps
1. Submit for review
2. Monitor review status
3. Respond to feedback within 24h
4. Plan phased rollout

## Common Rejection Reasons

1. **Crashes on launch** - Test on all iOS versions
2. **Placeholder content** - Remove all test data
3. **Broken links** - Verify all URLs work
4. **Missing features** - Ensure advertised features work
5. **Privacy issues** - Clear data collection disclosure

## Post-Launch

1. Monitor crash reports
2. Respond to reviews
3. Track installation metrics
4. Plan update schedule
5. A/B test store listing