# 📊 Code Review Reports

This directory contains structured, AI-generated review reports that evaluate and improve the Brain Game codebase across multiple dimensions.

## 🎯 Purpose

Central hub for storing output from automated audits and technical reviews triggered by prompts in the `/prompts` directory.

## 📋 Review Lifecycle

1. **Generate** – Use prompts from `/prompts` to trigger reviews on:
   - Architecture
   - Components or features
   - Security
   - Performance
   - Code quality
   - Documentation

2. **Extract Insights** – Review and act on findings:
   - Add actionable items to `TODO.md`
   - Create GitHub issues for significant findings
   - Update project documentation as needed
   - Prioritize improvements based on impact

3. **Archive & Cycle** – Once changes are applied:
   - Move valuable insights to `/docs/LESSONS.md`
   - Delete processed review files to maintain a clean workspace
   - Keep this directory ready for the next review cycle

## 📁 Naming Convention

Review files should follow this pattern:
- `TECHNICAL_AUDIT_YYYY-MM-DD.md`
- `SECURITY_REVIEW_YYYY-MM-DD.md`
- `PERFORMANCE_ANALYSIS_YYYY-MM-DD.md`
- `[COMPONENT]_REVIEW_YYYY-MM-DD.md`

This ensures chronological ordering and easy identification of review types.

Include a UUID suffix to prevent filename collisions during concurrent reviews.

## ✅ Best Practices

- Keep reviews scoped and focused.
- Prefer markdown files over plaintext for formatting.
- Avoid unnecessary duplication with `TODO.md` or `/docs/LESSONS.md`.
- Use UUID suffixes to ensure consistent naming across CI runs.