# AGENTS.md

## Purpose

This document describes the roles, usage, and guidelines for any AI agents, bots, or automation integrated into the **braingame** project.

## Agent Roles

- **Development Assistant:** Helps automate repetitive development tasks, code generation, or refactoring.
- **Testing Agent:** Assists in running, generating, or maintaining tests for the application.
- **CI/CD Bots:** Automate build, test, and deployment processes (if applicable).
- **In-App Agents:** Any AI or bot logic that is part of the app's user experience (e.g., game logic, hints, or adaptive difficulty).

## Integration Points

- **Source Code:** Agents may interact with the codebase for code generation, linting, or formatting.
- **Testing:** Agents can help generate or run tests, and report results.
- **Documentation:** Agents may assist in generating or maintaining documentation.
- **App Features:** If the app includes AI-driven features, describe their integration here.

## Best Practices

- Ensure all agent-generated code is reviewed by a human before merging.
- Document any agent or bot added to the project, including its purpose and configuration.
- Keep agent dependencies up-to-date and secure.
- Use environment variables or configuration files to manage agent credentials or API keys securely.
- Monitor agent activity and logs for unexpected behavior.

## Adding a New Agent

1. Document the agent's purpose and integration steps here.
2. Add configuration and credentials to the appropriate location (never commit secrets).
3. Ensure the agent follows project coding and security standards.

## Contact

For questions about agents or automation in this project, contact the project maintainer or lead developer.
