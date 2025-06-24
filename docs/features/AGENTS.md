# AI Agent Guidelines

Standards for all AI agents working with Brain Game.

## Mandatory Reading

All agents must read these docs before any development work:
- [CLAUDE.md](./CLAUDE.md) - Tactical workflow guide
- [WORKTREES.md](../development/WORKTREES.md) - Workspace isolation
- [CODING_STYLE.md](../development/CODING_STYLE.md) - Code standards

## Agent Roles

### Development Assistant
- Code generation and refactoring
- Bug fixes and feature implementation
- Documentation updates
- Follows zero-tolerance quality standards

### Testing Agent
- Test writing and maintenance
- Quality assurance validation
- Performance testing
- Coverage analysis

### CI/CD Bot
- Automated deployments
- Build process optimization
- Quality gate enforcement
- Release management

### In-App Agents
- User assistance features
- Content generation
- Conversational interfaces
- Personalized experiences

## Zero-Tolerance Quality Standards

All agents must:
- **Pass all quality checks**: lint, typecheck, tests must pass 100%
- **Use Git worktrees**: Never work directly in main workspace
- **Follow coding standards**: Adhere to established patterns
- **Document changes**: Update relevant documentation

## Banned Practices

| Practice | Reason | Consequence |
|----------|--------|-------------|
| Direct main workspace work | Contamination risk | Immediate workspace reset |
| Skipping quality checks | Technical debt | PR rejection |
| Hardcoded values | Maintainability | Code review failure |
| Undocumented changes | Knowledge loss | Rollback required |

## Operational Guardrails

### Workspace Isolation
```bash
# Always verify workspace before any action
pwd && git branch --show-current

# Use sandbox for experimental work
cd ../braingame-claude-sandbox
```

### Quality Verification
```bash
# Run before any commit
pnpm lint && pnpm typecheck && pnpm test
```

### Documentation Updates
- Update README files for new features
- Add/update JSDoc comments
- Create ADRs for architectural decisions
- Document breaking changes

## Session Documentation

Each session must:
1. **Document approach** in session notes
2. **Record decisions** in relevant docs
3. **Update lessons** learned
4. **Preserve context** for future agents

## Workflow Process

1. **Setup Phase**: Read docs, verify workspace
2. **Development Phase**: Implement with quality checks
3. **Review Phase**: Self-review and documentation
4. **Completion Phase**: Verify all standards met

## Escalation Process

If blocked:
1. Document the blocker
2. Attempt alternative approaches
3. Escalate to human developer
4. Document resolution for future reference

## Agent Coordination

When multiple agents work:
- Use separate worktrees
- Coordinate via GitHub issues
- Share context through documentation
- Respect queue priorities