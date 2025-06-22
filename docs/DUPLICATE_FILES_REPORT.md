# Duplicate Files Report - 20 01 2025

## Overview
This report documents duplicate and redundant files found in the braingame monorepo.

## Critical Issues

### 1. Unresolved Merge Conflicts
The following files contain merge conflict markers that need immediate resolution:
- `/packages/bgui/src/components/Text/Text.tsx`
- `/packages/bgui/src/components/Text/Text.test.tsx`
- `/packages/bgui/src/components/Text/types.ts`
- `/packages/bgui/src/components/Text/styles.ts`
- `/pnpm-lock.yaml`

### 2. Duplicate Component Implementations

#### Icon Component
- **Old location**: `/packages/bgui/Icon/`
- **New location**: `/packages/bgui/src/components/Icon/`
- **Status**: Both implementations exist, but index.ts exports from new location

#### Text Component
- **Old location**: `/packages/bgui/Text/`
- **New location**: `/packages/bgui/src/components/Text/`
- **Status**: Both exist, new location has merge conflicts

#### View Component
- **Current location**: `/packages/bgui/View/`
- **Expected location**: `/packages/bgui/src/components/View/`
- **Status**: Not migrated to new structure

#### PageWrapper Component
- **Current location**: `/packages/bgui/PageWrapper/`
- **Expected location**: `/packages/bgui/src/components/PageWrapper/`
- **Status**: Not migrated to new structure

## Recommended Actions

1. **Resolve Merge Conflicts**: Fix all merge conflicts in Text component files
2. **Remove Old Components**: Delete `/packages/bgui/Icon/` and `/packages/bgui/Text/` directories
3. **Migrate Remaining Components**: Move View and PageWrapper to `src/components/`
4. **Update Exports**: Ensure index.ts imports are correct after cleanup
5. **Run Tests**: Verify nothing breaks after cleanup

## File Structure Inconsistency

Current mixed structure in `/packages/bgui/`:
```
packages/bgui/
├── Icon/           # OLD - Should be removed
├── Text/           # OLD - Should be removed  
├── View/           # Should move to src/components/
├── PageWrapper/    # Should move to src/components/
├── src/
│   └── components/
│       ├── Icon/   # NEW - Keep this
│       ├── Text/   # NEW - Fix merge conflicts
│       └── ...     # Other properly organized components
```

## Impact
- Build failures due to merge conflicts
- Confusion about which component to import
- Increased bundle size from duplicate code
- Maintenance overhead

## Additional Findings

### 3. Import Path Inconsistencies
The old Icon component at `/packages/bgui/Icon/Icon.tsx` imports:
```typescript
import { getIconSize } from "../../utils/helpers/getIconSize";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
```

While the new Icon component at `/packages/bgui/src/components/Icon/Icon.tsx` imports:
```typescript
import { useThemeColor } from "@braingame/utils";
```

This shows:
- Old components use relative imports to utils
- New components use package imports from @braingame/utils
- Inconsistent import patterns can cause confusion

### 4. Font Files
- Only one font file found: `/apps/product/assets/fonts/Lexend-VariableFont_wght.ttf`
- This is good - no duplicate fonts detected

### 5. Testing
- Test files appear properly organized
- No duplicate test files found
- But the Text component tests have merge conflicts

## Priority Actions

1. **URGENT**: Resolve all merge conflicts in Text component
2. **HIGH**: Remove duplicate Icon and Text directories at root level  
3. **MEDIUM**: Migrate View and PageWrapper to proper structure
4. **LOW**: Standardize import patterns across all components

## Configuration Files Analysis

### 6. Build/Test Configurations
- **babel.config.js**: Found at both root and `/packages/bgui/babel.config.js`
- **jest.config.js**: Found at root level (references project-level configs)
- **vitest.config.ts**: Found at `/packages/bgui/vitest.config.ts`
- Mixed testing setup - both Jest and Vitest configurations exist

### 7. Documentation
- Multiple README.md files across packages (this is expected and good)
- Component documentation exists in `/docs/components/` (Button.md, Icon.md, Text.md, etc.)
- No duplicate documentation files found

### 8. TypeScript Configurations
- Multiple tsconfig.json files (expected in monorepo)
- `/packages/config/tsconfig.base.json` - Base configuration
- Each package has its own tsconfig.json extending the base

## Summary

**Critical Issues to Fix:**
1. Merge conflicts in Text component (5 files)
2. Duplicate Icon and Text components at root of bgui package
3. Inconsistent component organization (View, PageWrapper not migrated)

**Good Practices Found:**
- No duplicate font files
- No duplicate documentation
- Proper TypeScript configuration inheritance
- Well-organized test files (except for merge conflicts)

**Recommendation:** Focus on resolving merge conflicts first, then clean up the duplicate component directories to establish a consistent structure.

---

## 9. Additional Duplicate Assets (22-06-2025)

Recent scans uncovered a few remaining duplicates:

1. **Logo/Favicon**
   - `docs/assets/logo.png`
   - `apps/product/assets/images/favicon.png`
   - *Both files have the same checksum and dimensions.*
   - **Fix**: Keep a single source (e.g. in `docs/assets/`) and reference it everywhere.

2. **Expo Icons**
   - `apps/product/assets/images/icon.png`
   - `apps/product/assets/images/adaptive-icon.png`
   - `apps/product/assets/images/splash-icon.png`
   - *All three images are byte-for-byte identical.*
   - **Fix**: Store one image (e.g. `icon.png`) and update `app.json` to point to it for all icon fields.

3. **Husky Hook Templates**
   - `.husky/_/*` contains 14 tiny hook files that are identical.
   - **Fix**: Remove the unused templates and keep only `husky.sh`, `h` and any actual hooks (e.g. `pre-commit`).

Removing these files will reduce repository noise without affecting functionality.
