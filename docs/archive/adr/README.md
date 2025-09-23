# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) - documents that capture important architectural decisions made during the development of Brain Game.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## ADR Format

We use a lightweight ADR template:

```markdown
# [ADR-XXXX] Title

Date: YYYY-MM-DD

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXXX]

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?
```

## How to Create an ADR

1. Copy the template from `adr-template.md`
2. Name it `ADR-XXXX-short-title.md` (e.g., `ADR-0001-use-expo-router.md`)
3. Fill out all sections
4. Submit a PR for review
5. Once accepted, update the status and merge

## ADR Index

### Infrastructure & Architecture
- [ADR-0001: Use Expo Router for Navigation](./ADR-0001-use-expo-router.md) *(Example - to be created)*
- [ADR-0002: Monorepo Structure with pnpm Workspaces](./ADR-0002-monorepo-structure.md) *(Example - to be created)*

### Technology Choices
- [ADR-0003: TypeScript for Type Safety](./ADR-0003-typescript-adoption.md) *(Example - to be created)*
- [ADR-0004: React Query for Server State](./ADR-0004-react-query.md) *(Example - to be created)*

### Development Practices
- [ADR-0005: Component-Driven Development](./ADR-0005-component-driven-development.md) *(Example - to be created)*
- [ADR-0006: Git Worktrees for Feature Development](./ADR-0006-git-worktrees.md) *(Example - to be created)*

## When to Write an ADR

Write an ADR when:
- Selecting a significant technology or framework
- Changing architectural patterns
- Making decisions that affect multiple teams or components
- Choosing between multiple viable options
- Making irreversible or expensive-to-change decisions

## ADR Lifecycle

1. **Proposed**: Initial state when ADR is created
2. **Accepted**: ADR has been reviewed and accepted
3. **Deprecated**: ADR is no longer relevant but kept for history
4. **Superseded**: ADR has been replaced by another ADR

## Tips for Writing Good ADRs

- Keep it concise but complete
- Focus on the "why" not just the "what"
- Include alternatives considered
- Be honest about trade-offs
- Link to relevant documentation
- Use diagrams when helpful

## Review Process

1. Author creates ADR and opens PR
2. Technical leads and affected teams review
3. Discussion in PR comments
4. Once consensus is reached, merge
5. Update status to "Accepted"

## Resources

- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) by Michael Nygard
- [ADR Tools](https://github.com/npryce/adr-tools) - Command-line tools for working with ADRs
- [ADR Examples](https://github.com/joelparkerhenderson/architecture_decision_record) - Collection of ADR examples