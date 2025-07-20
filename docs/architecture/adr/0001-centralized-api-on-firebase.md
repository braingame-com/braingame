# [ADR-0001] Centralized API on Firebase Cloud Functions

Date: 2024-07-20

## Status

Accepted

## Context

The Brain Game ecosystem consists of multiple client applications, including a Next.js main website (`main-site`) and a React Native product application (`product`). A decision was required on how to structure the backend API layer to serve these clients in a scalable, maintainable, and enterprise-grade manner.

The key problem is avoiding logic duplication and ensuring a single source of truth for core business operations (e.g., user management, subscriptions, data processing) across all clients.

Two primary patterns were considered:
1.  **Backend-for-Frontend (BFF):** Each client application implements its own API layer. For the Next.js app, this would mean using the built-in API Routes.
2.  **Centralized Standalone API:** A single, client-agnostic API service that contains all shared business logic, which all clients consume.

## Decision

We will implement a centralized, standalone API layer within the `apps/api` package. This API will be built with Express.js and deployed as a serverless **Firebase Cloud Function**.

This function will serve as the single backend for all Brain Game clients. It will handle all core business logic and interactions with backend services like Firestore.

Client applications will not contain their own backend business logic. The Next.js API routes, for example, will be used only for concerns specific to the web app itself (e.g., rendering-related logic) and not for core, shared functionality.

## Consequences

### Positive Consequences
- **Single Source of Truth:** Business logic is defined once and shared across all clients, eliminating redundancy and ensuring consistency.
- **Scalability:** Leveraging Firebase Cloud Functions provides automatic, managed scaling to handle any load without manual intervention.
- **Maintainability:** Code is centralized, making it easier to manage, update, and debug.
- **Data Ownership:** The architecture is built around owning our core data models in Firestore, with the API as the gatekeeper.
- **Cost-Effective:** The serverless model means we pay per use, which is highly efficient compared to an always-on server.
- **Enhanced Security:** Integration with Firebase IAM and the Admin SDK provides a more secure environment than managing credentials on an external server.

### Negative Consequences
- **Slightly Increased Complexity:** Requires management of a dedicated API package and deployment configuration within `firebase.json`.
- **Potential for a Monolith:** As the API grows, it could become a large monolith if not properly structured. This will be mitigated by organizing the API into logical modules by domain.

### Neutral Consequences
- All client development that requires a backend change will now be dependent on the `apps/api` service.

## Alternatives Considered

### Option 1: Backend-for-Frontend (BFF) using Next.js API Routes

- **Description:** Each client would have its own backend. The `main-site` would use Next.js API Routes for its logic, and the `product` app would need its own separate solution.
- **Pros:** Fast to develop for a single client, co-located with the frontend code. Can be deployed to the Edge for very low latency for web users.
- **Cons:** Leads to significant code duplication between web and mobile. No single source of truth. Makes cross-client consistency difficult to enforce.
- **Why not chosen:** This approach is not scalable for a multi-client architecture and goes against the principle of having a single, enterprise-grade backend. It is more suited for projects with only a single web client.

## References

- This decision informs the setup and deployment configuration in `apps/api/README.md`. 