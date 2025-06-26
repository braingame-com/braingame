# Firebase Setup

Email collection configuration for the marketing site.

## Prerequisites

1. Firebase project with Firestore enabled
2. Service account key for deployment

## Firestore Configuration

### Database Structure

```
early_access_emails/
├── {email_hash}/
│   ├── email: string
│   ├── createdAt: timestamp
│   └── source: string
```

### Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /early_access_emails/{email} {
      allow write: if request.auth == null 
        && request.resource.data.keys().hasAll(['email', 'createdAt', 'source'])
        && request.resource.data.email is string
        && request.resource.data.email.matches('^[^@]+@[^@]+\\.[^@]+$');
      
      allow read: if false;
    }
  }
}
```

## Client Configuration

### Initialize Firebase

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Email Submission

```typescript
import { doc, setDoc } from 'firebase/firestore';
import { sha256 } from '@/utils/crypto';

async function submitEmail(email: string) {
  const emailHash = await sha256(email.toLowerCase());
  
  await setDoc(doc(db, 'early_access_emails', emailHash), {
    email: email.toLowerCase(),
    createdAt: new Date(),
    source: 'marketing_site'
  });
}
```

## Environment Variables

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Security Considerations

1. **Email hashing**: We hash emails for document IDs to prevent enumeration
2. **Write-only access**: Public users can only write, never read
3. **Validation**: Email format validated in security rules
4. **Rate limiting**: Implement client-side throttling

## Deployment

Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

## Testing

Test security rules locally:
```bash
firebase emulators:start --only firestore
```