# Documentation Style Guide

This guide establishes standards for writing and maintaining documentation in the Brain Game project.

## 🎯 Documentation Principles

1. **Clear and Concise** - Write for clarity, not cleverness
2. **Action-Oriented** - Focus on what users need to do
3. **Consistent** - Use the same terminology and structure throughout
4. **Accessible** - Write for developers of all experience levels
5. **Maintainable** - Keep documentation close to code and update together

## 📝 Writing Style

### Voice and Tone

- **Active Voice**: "Configure the environment" not "The environment should be configured"
- **Direct**: "Run `pnpm install`" not "You might want to run `pnpm install`"
- **Professional but Friendly**: Avoid overly formal language
- **Inclusive**: Use "we" when referring to the team, "you" when addressing the reader

### Language Guidelines

- **Present Tense**: "This guide explains" not "This guide will explain"
- **Second Person**: Address the reader as "you"
- **Simple Words**: Use "use" instead of "utilize", "help" instead of "facilitate"
- **No Jargon**: Define technical terms on first use

## 🏗️ Document Structure

### Standard Sections

Every documentation file should include:

```markdown
# Document Title

Brief description of what this document covers (1-2 sentences).

## Table of Contents (for long docs)

- [Section 1](#section-1)
- [Section 2](#section-2)

## Overview

High-level introduction to the topic.

## [Main Content Sections]

Detailed information organized logically.

## Examples

Practical examples demonstrating concepts.

## Troubleshooting (if applicable)

Common issues and solutions.

## Related Documentation

Links to related guides and references.
```

### Headings

- **H1 (#)**: Document title only (one per file)
- **H2 (##)**: Major sections
- **H3 (###)**: Subsections
- **H4 (####)**: Sub-subsections (use sparingly)

### File Naming

- **UPPERCASE.md**: Top-level guides (README.md, CONTRIBUTING.md)
- **PascalCase.md**: Feature-specific docs (ErrorBoundary.md)
- **kebab-case.md**: Multi-word filenames (theme-colors.md)
- **ADR-XXXX-title.md**: Architecture Decision Records

## 🎨 Formatting Standards

### Code Examples

#### Inline Code
Use backticks for:
- Commands: `pnpm install`
- File names: `package.json`
- Function names: `getUserData()`
- Short code snippets: `const name = "Brain Game"`

#### Code Blocks
Always specify the language:

````markdown
```typescript
interface User {
  id: string;
  name: string;
}
```

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```
````

### Lists

#### Unordered Lists
Use for non-sequential items:
- First item
- Second item
  - Nested item
  - Another nested item

#### Ordered Lists
Use for sequential steps:
1. Install dependencies
2. Configure environment
3. Run the application

### Tables

Use tables for structured data:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Emphasis

- **Bold** for important terms: **Critical**, **Required**
- *Italic* for emphasis: *optional*, *recommended*
- `Code` for technical terms: `useState`, `async/await`

## 🔗 Linking

### Internal Links

```markdown
# Relative paths for docs in same directory
See [Testing Guide](./TESTING.md)

# Full paths from root for cross-directory
See [Development Guide](/docs/development/DEVELOPMENT.md)

# Section links
See [Code Style](#code-style)
```

### External Links

```markdown
# Always use descriptive text
Learn more about [TypeScript](https://www.typescriptlang.org/)

# Never use "click here" or raw URLs
❌ Click [here](https://example.com) for more info
❌ Visit https://example.com
✅ Visit the [project website](https://example.com)
```

## 📦 Component Documentation

When documenting components:

```markdown
# ComponentName

Brief description of the component's purpose.

## Usage

\```tsx
import { ComponentName } from '@braingame/bgui';

<ComponentName
  prop1="value"
  prop2={42}
/>
\```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Required. Description of prop1 |
| prop2 | number | 0 | Optional. Description of prop2 |

## Examples

### Basic Example
[Code example]

### Advanced Example
[Code example]

## Accessibility

- Keyboard navigation details
- Screen reader considerations
- ARIA attributes used
```

## 🚨 Common Pitfalls

### Avoid

- ❌ Walls of text without breaks
- ❌ Assuming prior knowledge
- ❌ Outdated information
- ❌ Missing code examples
- ❌ Broken links
- ❌ Inconsistent terminology

### Instead

- ✅ Use short paragraphs and sections
- ✅ Define terms and provide context
- ✅ Update docs with code changes
- ✅ Include practical examples
- ✅ Test all links regularly
- ✅ Use consistent terms throughout

## 📋 Documentation Checklist

Before submitting documentation:

- [ ] **Clear Title**: Describes the content accurately
- [ ] **Introduction**: Explains what and why
- [ ] **Complete**: Covers all necessary information
- [ ] **Examples**: Includes practical code examples
- [ ] **Links Work**: All internal and external links tested
- [ ] **Formatting**: Consistent with this style guide
- [ ] **Reviewed**: Proofread for clarity and errors
- [ ] **Updated**: Reflects current code state

## 🔄 Maintenance

### When to Update Documentation

- **Code Changes**: Update immediately when changing documented features
- **User Feedback**: Address confusion or gaps reported by users
- **Regular Reviews**: Quarterly documentation audits
- **New Features**: Document before marking feature as complete

### Version Information

When documenting version-specific information:

```markdown
> **Note**: Available in v2.0.0 and later

> **Breaking Change in v3.0.0**: The `oldProp` has been renamed to `newProp`

> **Deprecated**: This feature will be removed in v4.0.0. Use [alternative] instead.
```

## 📚 Resources

### Documentation Tools

- [CommonMark Spec](https://commonmark.org/) - Markdown specification
- [Markdownlint](https://github.com/DavidAnson/markdownlint) - Markdown linter
- [Mermaid](https://mermaid-js.github.io/) - Diagram generation

### Examples of Good Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Related Documentation

- [Development Guide](../development/DEVELOPMENT.md) - How to contribute to the project
- [Coding Style Guide](./development/CODING_STYLE.md) - Code standards
- [PR Review Process](./processes/PR_REVIEW_PROCESS.md) - Review guidelines
