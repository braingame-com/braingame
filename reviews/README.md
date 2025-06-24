# 📊 Code Review Reports

This directory stores AI-generated review reports for the Brain Game project.

## 🎯 Purpose

A dedicated space for comprehensive code reviews, audits, and improvement recommendations generated using prompts from the `/prompts` directory.

## 📋 Workflow

1. **Generate Review**: Use prompts from `/prompts` to request reviews on:
   - Overall project architecture
   - Specific features or components
   - Security vulnerabilities
   - Performance bottlenecks
   - Code quality and technical debt
   - Documentation completeness

2. **Extract Value**: Review the generated reports and:
   - Add actionable items to `TODO.md`
   - Create GitHub issues for significant findings
   - Update project documentation as needed
   - Prioritize improvements based on impact

3. **Archive & Clean**: Once improvements are implemented:
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