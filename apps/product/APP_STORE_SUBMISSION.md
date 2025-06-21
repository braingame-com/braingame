# App Store Submission Guide

This guide outlines the steps to submit Brain Game to the Apple App Store and Google Play Store.

## Prerequisites

1. **Apple Developer Account** ($99/year)
2. **Google Play Developer Account** ($25 one-time)
3. **EAS CLI** installed: `npm install -g eas-cli`
4. **App icons and screenshots** prepared

## Build Configuration

### 1. Update app.json
- ✅ Bundle identifiers configured
- ✅ App permissions set
- ✅ Metadata added
- ✅ Icons and splash screens referenced

### 2. EAS Configuration
- ✅ eas.json created with build profiles
- ⚠️ Update with your actual credentials:
  - Apple ID
  - App Store Connect App ID
  - Apple Team ID
  - Google Service Account Key

## Assets Checklist

### Required Icons
- [ ] App Icon (1024x1024) - `./assets/images/icon.png`
- [ ] Adaptive Icon Foreground - `./assets/images/adaptive-icon.png`
- [ ] Splash Screen - `./assets/images/splash-icon.png`
- [ ] Notification Icon - `./assets/images/notification-icon.png`
- [ ] Favicon - `./assets/images/favicon.png`

### Screenshots
Create screenshots for each category listed in `store-info.json`:
- [ ] iPhone (5 screenshots)
- [ ] iPad (2 screenshots)
- [ ] Android Phone (5 screenshots)
- [ ] Android Tablet (2 screenshots)

## Building for Stores

### iOS Build
```bash
# Login to EAS
eas login

# Configure the project
eas build:configure

# Build for iOS
eas build --platform ios --profile production
```

### Android Build
```bash
# Build for Android
eas build --platform android --profile production
```

## Submission Process

### iOS App Store

1. **Build and Download**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit to App Store Connect**
   ```bash
   eas submit -p ios
   ```

3. **In App Store Connect:**
   - Add app information from `store-info.json`
   - Upload screenshots
   - Set pricing (Free/Paid)
   - Submit for review

### Google Play Store

1. **Build and Download**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Google Play**
   ```bash
   eas submit -p android
   ```

3. **In Google Play Console:**
   - Create app listing
   - Add store listing details from `store-info.json`
   - Upload screenshots
   - Set content rating
   - Configure pricing and distribution

## Pre-submission Checklist

### Technical
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Performance optimized
- [ ] Accessibility features working
- [ ] Error boundaries in place
- [ ] Analytics configured properly

### Legal
- [ ] Privacy policy published
- [ ] Terms of service ready
- [ ] GDPR compliance
- [ ] COPPA compliance (if applicable)
- [ ] Export compliance

### Content
- [ ] App descriptions finalized
- [ ] Keywords optimized
- [ ] Screenshots captured
- [ ] App preview video (optional)
- [ ] Release notes written

## Testing

### Local Testing
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android
```

### Beta Testing
1. **iOS TestFlight**
   - Build with `preview` profile
   - Upload to TestFlight
   - Invite beta testers

2. **Android Internal Testing**
   - Build APK with `preview` profile
   - Upload to Play Console
   - Create internal test track

## Post-Launch

1. **Monitor Reviews**
   - Respond to user feedback
   - Track crash reports
   - Monitor analytics

2. **Regular Updates**
   - Bug fixes
   - Performance improvements
   - New features

3. **Marketing**
   - App Store Optimization (ASO)
   - Social media presence
   - User engagement

## Troubleshooting

### Common Issues

1. **Missing Provisioning Profile**
   - Ensure you're logged into EAS
   - Check Apple Developer account status

2. **Build Failures**
   - Check `eas build --platform ios --profile production --clear-cache`
   - Verify all dependencies installed

3. **Submission Rejected**
   - Review rejection reasons
   - Fix issues and resubmit
   - Respond to review team if needed

## Support

- EAS Documentation: https://docs.expo.dev/eas/
- Apple Developer: https://developer.apple.com/
- Google Play Console: https://play.google.com/console/
