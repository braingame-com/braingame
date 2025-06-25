# Documentation Style Guide

Writing standards for Brain Game documentation.

## Principles

- **Clear**: One concept per paragraph
- **Actionable**: Every doc should enable action
- **Consistent**: Follow established patterns
- **Maintainable**: Update with code changes

## Writing Style

### Voice & Tone
- **Active voice**: "We deploy via Vercel" not "Deployment is done via Vercel"
- **Direct language**: "Install dependencies" not "You might want to install dependencies"
- **Professional but friendly**: Authoritative without being cold

### Senior CTO Voice
- **Brevity with precision**: Every sentence earns its bytes
- **High-signal examples**: Code over prose
- **Assume competent readers**: Skip 101 explanations
- **First-person plural**: "We deploy" not "This project deploys"
- **No marketing fluff**: Facts, decisions, rationale

### Common Patterns
```markdown
# DO: Clear action
Run the development server:
```bash
npm run dev
```

# DON'T: Vague instruction
You can start the development server by running the command
```

## Document Structure

Standard template:
```markdown
# Title

Brief description (1-2 sentences)

## Quick Start
[Immediate action steps]

## Configuration
[Setup details]

## Common Issues
[Troubleshooting]

## References
[Related docs]
```

## Formatting Standards

### Code Examples
Always specify language:
```typescript
// Good
const user: User = { id: 1, name: 'John' };

// Bad (no language specified)
const user = { id: 1, name: 'John' };
```

### Lists
Sequential actions (use numbered):
1. Install dependencies
2. Configure environment
3. Start development server

Non-sequential items (use bullets):
- React Native for mobile
- Next.js for web
- Express for API

### Tables
Use for structured data:
| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000 | Local dev |
| Staging | staging.app | Testing |
| Production | braingame.app | Live app |

### Emphasis
- **Bold**: Important concepts, actions
- *Italic*: Emphasis, technical terms
- `Code`: Functions, variables, commands
- > Quote: Warnings, important notes

## Linking

### Internal Links
Use relative paths:
```markdown
See [Architecture](../architecture/ARCHITECTURE.md) for details.
```

### External Links
Use descriptive text:
```markdown
Follow [Conventional Commits](https://conventionalcommits.org/) format.
```

## Component Documentation

Template for UI components:
```markdown
## ComponentName

Brief description.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | Button text |
| variant | 'primary' \| 'secondary' | No | 'primary' | Visual style |

### Example

```typescript
<Button title="Click me" variant="secondary" />
```
```

## Common Pitfalls

### Avoid
- **Wall of text**: Break into sections
- **Assumptions**: Define technical terms
- **Outdated info**: Update with code changes
- **Implementation details**: Focus on usage
- **AI-style verbosity**: "Welcome to our amazing..." → Just start with facts
- **Badge clutter**: Only functional badges (CI status, not "awesome" badges)
- **Redundant context**: Don't repeat what's obvious from file location

### Instead
- Use clear headings
- Provide context
- Regular maintenance
- User-focused content

## Maintenance

### When to Update
- New features added
- Breaking changes
- Deployment process changes
- Common issues discovered

### Version Information
Format versions as:
```markdown
Updated: 2024-01-15 (v2.1.0)
```

## Tools

- **Linting**: markdownlint
- **Formatting**: Prettier
- **Validation**: markdown-link-check

## Quick Checklist

- [ ] Clear title and description
- [ ] Working code examples
- [ ] Valid internal links
- [ ] Proper formatting
- [ ] Actionable content
- [ ] Up-to-date information