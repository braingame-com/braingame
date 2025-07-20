# CI/CD and Deployment Setup

This document outlines the architecture and one-time setup process for our Continuous Integration, Continuous Deployment (CI/CD) pipeline, which automates the deployment of our services to Firebase.

## Guiding Principles

- **Security First:** We prioritize secure, keyless deployment mechanisms. Service account keys are forbidden.
- **Automation:** Deployments should be triggered automatically by merges to the `main` branch, not performed manually.
- **Quality Gates:** Code must pass automated checks (linting, type-checking, tests) before it can be deployed.
- **Consistency:** The deployment process should be identical every time, managed by code in the repository (`.github/workflows`).

## Technology Choices

- **GitHub Actions:** We use GitHub's native CI/CD platform to build, test, and deploy our code. The workflow configurations are stored in the `.github/workflows` directory.
- **Google Cloud Workload Identity Federation:** This is the modern, secure, and recommended way to authenticate to Google Cloud from external systems like GitHub. It allows our GitHub Actions workflows to impersonate a Google Cloud service account without needing to store and manage long-lived secret keys.

## One-Time Project Setup for Automated Deployments

The following steps are required once per Google Cloud project to enable automated deployments from a GitHub repository.

### Step 1: Enable Required APIs

For a new project, you must manually enable the APIs that Firebase and Cloud Functions depend on. Our CI/CD service account does not have permission to enable APIs for the first time.

Click the following links and ensure each API is **Enabled** for the `braingame-prod` project:

1.  **Cloud Functions API:** `https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com?project=braingame-prod`
2.  **Cloud Build API:** `https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=braingame-prod`
3.  **Artifact Registry API:** `https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=braingame-prod`
4.  **IAM Credentials API:** `https://console.cloud.google.com/apis/library/iamcredentials.googleapis.com?project=braingame-prod`

### Step 2: Configure Workload Identity Federation

These commands establish the trusted relationship between your GitHub repository and your Google Cloud project.

First, set these environment variables in your terminal:
```bash
export GCP_PROJECT_ID="braingame-prod"
export GITHUB_REPO="braingame-com/braingame"
```

Then, run the following commands in order:

1.  **Create the Workload Identity Pool:**
    ```bash
    gcloud iam workload-identity-pools create "github-pool" \
      --project="${GCP_PROJECT_ID}" \
      --location="global" \
      --display-name="GitHub Actions Pool"
    ```

2.  **Create the Workload Identity Provider:** This crucial step includes a security condition that restricts access to only your specified GitHub repository.
    ```bash
    gcloud iam workload-identity-pools providers create-oidc "github-provider" \
      --project="${GCP_PROJECT_ID}" \
      --location="global" \
      --workload-identity-pool="github-pool" \
      --display-name="GitHub Actions Provider" \
      --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
      --attribute-condition="attribute.repository == '${GITHUB_REPO}'" \
      --issuer-uri="https://token.actions.githubusercontent.com"
    ```

3.  **Create the Deployer Service Account:**
    ```bash
    gcloud iam service-accounts create "github-actions-deployer" \
        --project="${GCP_PROJECT_ID}" \
        --display-name="GitHub Actions Deployer"
    ```

4.  **Grant the Service Account Firebase Permissions:**
    ```bash
    gcloud projects add-iam-policy-binding "${GCP_PROJECT_ID}" \
        --member="serviceAccount:github-actions-deployer@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
        --role="roles/firebase.admin"
    ```

5.  **Link the Service Account to the GitHub Provider:** This is the final handshake that allows GitHub Actions to impersonate the service account.
    ```bash
    gcloud iam service-accounts add-iam-policy-binding "github-actions-deployer@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
      --project="${GCP_PROJECT_ID}" \
      --role="roles/iam.workloadIdentityUser" \
      --member="principalSet://iam.googleapis.com/projects/$(gcloud projects describe ${GCP_PROJECT_ID} --format='value(projectNumber)')/locations/global/workloadIdentityPools/github-pool/attribute.repository/${GITHUB_REPO}"
    ```

### Step 3: Add Secrets to GitHub

The final step is to provide the GitHub Actions workflow with the identifiers for the resources you just created.

1.  Navigate to your repository's secrets page: `https://github.com/braingame-com/braingame/settings/secrets/actions`
2.  Click **New repository secret** and add the following two secrets:

    -   **Name:** `GCP_WORKLOAD_IDENTITY_PROVIDER`
        -   **Value:** Run this command to get the value:
            ```bash
            gcloud iam workload-identity-pools providers describe "github-provider" \
              --project="${GCP_PROJECT_ID}" \
              --location="global" \
              --workload-identity-pool="github-pool" \
              --format="value(name)"
            ```

    -   **Name:** `GCP_SERVICE_ACCOUNT_EMAIL`
        -   **Value:** `github-actions-deployer@braingame-prod.iam.gserviceaccount.com`

## Workflow Architecture

Our primary deployment workflow for the API is located at `.github/workflows/deploy-api.yml`. It is structured with a dependency chain to ensure quality and safety:

```
[Lint API] -------> [Deploy to Production]
                    ^
[Type Check API] ---'
```

1.  **Lint & Type Check:** The `lint-api` and `typecheck-api` jobs run in parallel to validate the code in the `apps/api` directory.
2.  **Deploy:** The `deploy_production` job has a `needs: [lint-api, typecheck-api]` condition. It will **only** run if both of the previous jobs complete successfully. This prevents buggy or low-quality code from ever being deployed. 