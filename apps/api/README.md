# Brain Game API

The centralized REST API for the Brain Game ecosystem, built with Express.js and deployed as a **Firebase Cloud Function**. It provides backend functionality for all clients, including the Next.js website and the React Native application.

## Architecture

This API is a serverless application. It uses **Express.js** to define routes and middleware, which is then wrapped and served by a single **Firebase Cloud Function**. This provides automatic scaling, high availability, and zero server management.

- **Framework**: Express.js
- **Deployment**: Firebase Cloud Functions
- **Database**: Cloud Firestore
- **Language**: TypeScript
- **Validation**: Zod

For a detailed explanation of why this architecture was chosen, see [ADR-0001: Centralized API on Firebase Cloud Functions](../../docs/archive/adr/0001-centralized-api-on-firebase.md).

## Getting Started

### Prerequisites

- Node.js 20 (we recommend using `nvm` and our `.nvmrc` file)
- pnpm 9+
- Firebase CLI
- Java Runtime Environment (for Firestore Emulator)
  - You can install this on macOS with `brew install openjdk`.

### Installation & Local Development

The API is designed to be run locally using the **Firebase Emulators**.

1.  **Install Dependencies:**
    From the monorepo root:
    ```bash
    pnpm install
    ```

2.  **Set Up Environment:**
    Copy `apps/api/.env.example` to `apps/api/.env` and configure it. For local development, the default values are usually sufficient.

3.  **Run the Emulators:**
    From the monorepo root, start the Firebase emulator suite. This will automatically transpile the TypeScript code and serve the API.
    ```bash
    firebase emulators:start
    ```
    By default, the API will be available at `http://127.0.0.1:5001/braingame-prod/us-central1/api`.

### Testing the API Locally

Once the emulators are running, you can test the endpoints using a tool like `curl`.

**Example: Testing the `/subscribe` endpoint**
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"email": "test@example.com"}' \
http://127.0.0.1:5001/braingame-prod/us-central1/api/v1/subscribe
```

A successful request will return:
```json
{"message":"Successfully subscribed"}
```

**Note on Security:** In a production environment, this endpoint is protected by Firebase App Check. Requests must include a valid `X-Firebase-AppCheck` header. This check is bypassed in local development for easier testing.

### Viewing Local Data

The emulator suite includes a UI for viewing and managing your local database.

1.  **Open the UI:** Navigate to `http://127.0.0.1:4000/`
2.  **Select Firestore:** Click on the "Firestore" tab.
3.  **View Data:** You will see a `subscribers` collection containing any email addresses you've added via the API. This data is local to your machine and does not affect the production database.

### Environment Variables

The `.env` file in `apps/api` should contain:
```bash
# Node environment
NODE_ENV=development

# The Firebase project ID for the emulators to mimic
GCLOUD_PROJECT=braingame-prod
```

## API Endpoints

The API is versioned and prefixed. The base URL for the local emulator is: `http://127.0.0.1:5001/braingame-prod/us-central1/api`

### Health Check

- `GET /v1/health`
- Returns the operational status of the API.

### Subscriptions

- `POST /v1/subscribe`
- Subscribes a new email address.
- **Body:** `{ "email": "user@example.com" }`

## Client Integration Guide

All client applications (web, mobile) should connect to this API for backend services.

-   **Production API Base URL:** `https://us-central1-braingame-prod.cloudfunctions.net/api`
-   **Local Emulator API Base URL:** `http://127.0.0.1:5001/braingame-prod/us-central1/api`

**Note for React Native:** When running on a mobile emulator or physical device, you may need to use your computer's local network IP address instead of `127.0.0.1` to connect to the emulators.

All API routes are prefixed under `/v1`. For example, the health check is at `[Base URL]/v1/health`.

## Project Structure

The project follows a standard Express.js structure, adapted for a serverless environment.

```
apps/api/
├── src/
│   ├── config/          # Environment and Firebase config
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes, organized by domain
│   ├── types/           # TypeScript definitions
│   └── index.ts         # Application entry point (exports the Cloud Function)
├── .env.example         # Environment variables template
├── package.json
└── tsconfig.json
```

## Deployment

The API is deployed automatically via CI/CD when changes are merged into the `main` branch.

### Manual Deployment

To deploy only the API function manually:
```bash
firebase deploy --only functions:api
```

To deploy the Firestore rules:
```bash
firebase deploy --only firestore:rules
```

---
