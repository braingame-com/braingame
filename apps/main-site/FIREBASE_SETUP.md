# Firebase Setup for Brain Game Website

This guide explains how to set up Firebase for the Brain Game website's email collection feature.

## Prerequisites

1. Google account with access to Firebase Console
2. Node.js and pnpm installed
3. Firebase CLI installed globally: `npm install -g firebase-tools`

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "braingame-website" (or similar)
4. Enable Google Analytics if desired
5. Wait for project creation to complete

### 2. Enable Firestore

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll update rules later)
4. Select a location close to your users

### 3. Get Configuration Values

1. Go to Project Settings (gear icon)
2. In the "General" tab, scroll down to "Your apps"
3. Click "Add app" and choose "Web"
4. Register the app with name "Brain Game Website"
5. Copy the configuration object values

### 4. Configure Environment Variables

1. In the website directory, copy `.env.example` to `.env.local`
2. Fill in the Firebase configuration values:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Deploy Security Rules

1. Initialize Firebase in the website directory:
   ```bash
   firebase init firestore
   ```

2. Select your project
3. Use the existing `firestore.rules` file
4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 6. Test the Setup

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000
3. Test the email signup form
4. Check the Firestore Console to see if emails are being stored

## Database Structure

### Collection: `email_signups`

Each document contains:
- `email` (string): The user's email address (sanitized)
- `timestamp` (timestamp): When the signup occurred
- `source` (string): Always "website_homepage"
- `userAgent` (string, optional): Browser user agent for analytics

### Security Rules

The `firestore.rules` file ensures:
- Anyone can create email signups (for the form)
- No one can read emails (privacy protection)
- No updates or deletes from client side
- Email format validation at the database level

## Development with Emulator (Optional)

For local development, you can use the Firestore emulator:

1. Install and start the emulator:
   ```bash
   firebase emulators:start --only firestore
   ```

2. The website will automatically connect to the emulator in development mode

## Production Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Analytics**: Track signup conversion rates
3. **Backup**: Set up automated backups for the email list
4. **GDPR Compliance**: Ensure proper privacy policy and data handling
5. **Email Validation**: Consider email verification before adding to marketing lists

## Troubleshooting

### Common Issues

1. **"Firebase not configured"**: Check that all environment variables are set
2. **Permission denied**: Verify security rules are deployed correctly
3. **CORS errors**: Ensure your domain is added to Firebase authorized domains

### Getting Help

- Check Firebase Console logs
- Review browser developer tools for errors
- Ensure all dependencies are installed: `pnpm install`