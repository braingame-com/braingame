# Architecture Decision Records

We document significant architectural decisions using ADRs.

## What is an ADR?

A lightweight document capturing important architectural choices, their context, and consequences.

## Creating an ADR

1. Copy `adr-template.md`
2. Number sequentially (ADR-001, ADR-002, etc.)
3. Fill out all sections
4. Submit for review via PR

## When to Write an ADR

Write ADRs for:
- Technology stack changes
- Major architectural patterns
- Security approach changes
- Build/deployment strategy shifts
- Breaking changes to APIs

Skip ADRs for:
- Minor version updates
- Bug fixes
- Documentation changes
- Routine refactoring

## ADR Index

### Infrastructure & Architecture
- ADR-001: Turborepo for Monorepo Management
- ADR-002: Firebase Platform Selection
- ADR-003: Offline-First Architecture

### Technology Choices
- ADR-004: TypeScript Adoption
- ADR-005: React Native for Mobile
- ADR-006: TanStack Query for Server State

### Development Practices
- ADR-007: Conventional Commits
- ADR-008: Zero-Tolerance Quality Standards
- ADR-009: AI-Assisted Development Guidelines

## ADR Lifecycle

1. **Proposed** - Under discussion
2. **Accepted** - Approved and implemented
3. **Deprecated** - No longer relevant
4. **Superseded** - Replaced by newer ADR

## Review Process

1. Author creates ADR with status "Proposed"
2. Team reviews in PR
3. Technical lead approves
4. Merge with status "Accepted"

## Tips

- Focus on the "why" not just the "what"
- Include rejected alternatives
- Be specific about trade-offs
- Link to relevant documentation
- Keep it concise but complete