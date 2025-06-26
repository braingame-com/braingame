# Security Policy

The Brain Game team takes security seriously. We appreciate the help of the security community in keeping our applications and users safe.

---

## 🛡️ Supported Versions
We provide security updates for the **latest released version** of our applications and packages. We encourage all users to stay on the most recent version.

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes |
| < Latest| ❌ No |

---

## 🔐 Reporting a Vulnerability
If you discover a security vulnerability, please report it to us privately. **Do NOT create a public GitHub issue.**

### 1. Contact Us Directly
- **Email:** `hello@braingame.dev`
- **Subject:** `[SECURITY] Vulnerability Report: <Brief Description>`

### 2. Provide Detailed Information
Your report should include:
- **Clear description** of the vulnerability
- **Component or URL** where the vulnerability exists
- **Step-by-step instructions** to reproduce the issue
- **Potential impact** and severity assessment
- **Suggested mitigations** (if applicable)
- **Your contact information** (optional, but helpful for follow-up)

### 3. What to Expect
- **Acknowledgment:** We will acknowledge your report within 48 hours
- **Investigation:** We will work with you to understand and verify the issue
- **Resolution:** We aim to patch critical vulnerabilities within 7 days
- **Credit:** We will give you credit for your discovery after the vulnerability has been patched (unless you prefer to remain anonymous)

---

## 🏃 Response Process
1. **Triage:** Assess the severity and impact of the vulnerability
2. **Fix:** Develop and test a patch
3. **Release:** Deploy the fix to all affected versions
4. **Disclose:** Publish a security advisory after the fix is deployed
5. **Credit:** Thank the reporter (with permission)

---

## 🚨 Security Best Practices for Contributors
When contributing to Brain Game:
- **Never commit secrets** (API keys, tokens, passwords)
- **Use environment variables** for sensitive configuration
- **Run security checks** before submitting PRs
- **Follow OWASP guidelines** for web security
- **Validate all inputs** in your code
- **Use secure dependencies** and keep them updated

---

## 🔍 Security Tools
We use the following tools to maintain security:
- **secretlint:** Pre-commit hook to prevent secrets in code
- **Dependabot:** Automated dependency updates
- **CodeQL:** GitHub's semantic code analysis
- **npm audit:** Regular dependency vulnerability scans

---

## 📚 Additional Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Native Security Guide](https://reactnative.dev/docs/security)

---

Thank you for helping keep Brain Game secure! 🔒
