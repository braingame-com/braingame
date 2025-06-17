# Security Policy

The Brain Game team takes security seriously. We appreciate the help of the security community in keeping our applications and users safe.

---

## 1. Supported Versions
We provide security updates for the **latest released version** of our applications and packages. We encourage all users to stay on the most recent version.

| Version | Supported |
|---|---|
| Latest | ✅ Yes |
| Previous Versions | ❌ No |

---

## 2. Reporting a Vulnerability
If you discover a security vulnerability, please report it to us privately. **Do not create a public GitHub issue.**

1.  **Email us directly** at `hello@braingame.dev`.
2.  Use the subject line: `[SECURITY] Vulnerability Report: <Brief Description>`
3.  **Provide detailed information**, including:
    -   A clear description of the vulnerability.
    -   The component or URL where the vulnerability exists.
    -   Step-by-step instructions to reproduce the issue.
    -   The potential impact of the vulnerability.
    -   Any suggested mitigations, if you have them.

We will acknowledge your report within 48 hours and will work with you to understand and resolve the issue. We will give you credit for your discovery after the vulnerability has been patched.

---

## 3. Our Security Measures
- **Secret Scanning:** We use `TruffleHog` and other tools in our pre-commit hooks and CI pipeline to prevent secrets from being committed to the repository.
- **Dependency Management:** We use Dependabot to automatically monitor and update our dependencies.
- **Secure Coding:** We adhere to secure coding practices and follow the principle of least privilege.
- **Environment Variables:** All sensitive information, API keys, and secrets are managed via environment variables and are never stored in the codebase.

---

## 4. Scope
This security policy applies to the following assets:
- The `braingame` monorepo on GitHub.
- The deployed applications at `app.braingame.dev` and `www.braingame.dev`.
- Packages published under the `@brain-game` scope on npm.

Any other assets or third-party services are considered out of scope.

## Security Updates

Security updates will be:
- Released as soon as possible after verification
- Announced through our official channels
- Documented in our changelog with appropriate severity levels

## Questions?

If you have questions about this security policy, please contact us at hello@braingame.dev.

Thank you for helping keep Brain Game secure! 