# Agent Process Guidelines for BGUI Migration

## Critical Oversight Requirements

When working on the BGUI migration project, all agents MUST follow these oversight requirements for proper human oversight and project continuity:

### 1. Documentation Updates
**REQUIRED:** After completing any implementation work, agents must update ALL relevant documentation:

- **BGUI_TODO.md**: Mark completed tasks with `[x]` and date completed
- **BGUI_MIGRATION_HISTORY.md**: Add detailed entry with:
  - Date and time
  - Engineer name (Claude/AI Agent)
  - Steps taken
  - Files modified
  - Challenges encountered
  - Solutions implemented
  - Next tasks

### 2. Commit Process
**REQUIRED:** All changes must be committed with proper git workflow:

```bash
# Stage changes
git add .

# Check status
git status

# Commit with descriptive message
git commit -m "feat: implement native components for Input, Checkbox, Radio, Switch, CircularProgress

- Add native Input component with TextInput, decorators, and validation
- Add native Checkbox component with custom icons and indeterminate state
- Add native Radio component with proper group management
- Add native Switch component with animated thumb transitions
- Add native CircularProgress with SVG animations and determinate/indeterminate modes
- Update BGUI_TODO.md with completed tasks
- Update BGUI_MIGRATION_HISTORY.md with Phase 5 progress

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Get commit hash
git log --oneline -1
```

### 3. History Documentation
**REQUIRED:** Record commit hash in migration history:

```markdown
**Commit:** `abc123def456` (example hash)
```

### 4. Status Reporting
**REQUIRED:** At the end of each work session, agents must provide:

1. **Documentation Status**: 
   - ✅ BGUI_TODO.md updated
   - ✅ BGUI_MIGRATION_HISTORY.md updated

2. **Git Status**:
   - ✅ Changes committed
   - ✅ Commit hash recorded: `abc123def456`

3. **Progress Summary**:
   - Components implemented: X/33
   - Percentage complete: X%
   - Next priorities

### 5. Failure to Follow Process
If an agent fails to follow this process:

1. **STOP** current work
2. **COMPLETE** all missing documentation
3. **COMMIT** all changes
4. **REPORT** the oversight to the human
5. **UPDATE** documentation to reflect the corrected process

## Example Status Report Format

```
## Work Session Summary

### Documentation Updates
- ✅ BGUI_TODO.md: Updated with 5 completed components
- ✅ BGUI_MIGRATION_HISTORY.md: Added Phase 5 progress entry

### Git Status  
- ✅ Changes committed: feat: implement native components for Input, Checkbox, Radio, Switch, CircularProgress
- ✅ Commit hash recorded: `abc123def456`

### Progress Summary
- **Components Implemented**: 14/33 (42% complete)
- **Tier 1**: ✅ Complete (5/5)
- **Tier 2**: ✅ Complete (5/5) 
- **Form Components**: ✅ 4/7 complete
- **Next Priority**: RadioGroup, Select, Textarea

### Issues Encountered
- None

### Next Steps
- Implement remaining form components
- Continue with progress and navigation components
```

## Human Oversight Checkpoints

Agents must report to humans at these checkpoints:

1. **After each major component batch** (5+ components)
2. **When encountering any blocker**
3. **Before changing architecture or approach**
4. **When completing any major phase**
5. **When documentation becomes inconsistent**

## Recovery Process

If an agent realizes they missed the oversight requirements:

1. **Acknowledge the oversight**
2. **Complete all missing documentation immediately**
3. **Commit the missing work**
4. **Report the corrected status**
5. **Update this document if needed**

---

**This process ensures proper human oversight, project continuity, and prevents work from being lost or duplicated.**