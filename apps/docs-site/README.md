# BrainGame Documentation

This is the documentation site for BrainGame, hosted at docs.braingame.dev.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev:docs

# Build for production
pnpm build:docs
```

## Deployment

This app is deployed to Firebase Hosting as a static site. The deployment is configured to serve at the `docs.braingame.dev` subdomain.

### Firebase Setup

1. The app is configured as a hosting target named "docs" in firebase.json
2. The Next.js app is configured for static export with `output: "export"`
3. Built files are output to the `out` directory

### Initial Firebase Setup

1. **Update .firebaserc** with your actual Firebase project ID:
   ```json
   {
     "projects": {
       "default": "your-actual-project-id"
     },
     "targets": {
       "your-actual-project-id": {
         "hosting": {
           "www": ["braingame-website"],
           "app": ["braingame-app"],
           "docs": ["braingame-docs"]
         }
       }
     }
   }
   ```

2. **Create hosting sites in Firebase Console**:
   ```bash
   # Login to Firebase
   firebase login
   
   # Create the hosting sites
   firebase hosting:sites:create braingame-website
   firebase hosting:sites:create braingame-app
   firebase hosting:sites:create braingame-docs
   
   # Apply targets
   firebase target:apply hosting www braingame-website
   firebase target:apply hosting app braingame-app
   firebase target:apply hosting docs braingame-docs
   ```

3. **Deploy the docs site**:
   ```bash
   # Build all apps
   pnpm build
   
   # Deploy only docs
   firebase deploy --only hosting:docs
   
   # Or deploy all hosting sites
   firebase deploy --only hosting
   ```

### Adding the Subdomain

To connect the docs.braingame.dev subdomain:

1. Go to Firebase Console > Hosting
2. Find the "braingame-docs" site
3. Click "View" then "Add custom domain"
4. Enter "docs.braingame.dev"
5. Add the provided DNS records to your domain provider:
   - Usually an A record pointing to Firebase's IP
   - And a TXT record for verification
6. Wait for SSL certificate provisioning (usually takes 24-48 hours)

## Structure

- `/components` - Documentation for BGUI components
- Component-specific pages show usage examples and API documentation