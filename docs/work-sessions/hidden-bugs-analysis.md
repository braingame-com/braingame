# Hidden Bugs Analysis - 20 January 2025

This document contains the results of a comprehensive bug scan across the Brain Game codebase.

## Critical Issues

### 1. Memory Leaks from Timers Not Being Cleared
**Priority: HIGH**

**Location**: `apps/product/src/components/Analytics/TrackableComponent.tsx`
- **Issue**: The `scrollTimer` ref is cleared but never properly cleaned up if component unmounts while timer is active
- **Lines**: 146-152
- **Impact**: Memory leak that accumulates over time, especially with frequent navigation

**Location**: `packages/bgui/src/components/Tooltip/Tooltip.tsx`
- **Issue**: Using `window.setTimeout` but only clearing on hide, not on unmount
- **Line**: 20
- **Impact**: Timer continues running if component unmounts before tooltip shows

**Location**: `packages/bgui/src/components/Toast/Toast.tsx`
- **Issue**: No cleanup function in useEffect that sets timeout
- **Line**: 22
- **Impact**: Timer continues if component unmounts before duration expires

### 2. Missing Cleanup in Event Listeners
**Priority: HIGH**

**Location**: `packages/bgui/src/components/Modal/Modal.tsx` 
- **Issue**: `addEventListener` for keyboard events but missing cleanup
- **Line**: 99
- **Impact**: Event listener persists after modal closes, causing memory leak

**Location**: `packages/bgui/src/components/Menu/Menu.tsx`
- **Issue**: Document event listener added without removal
- **Line**: 131
- **Impact**: Memory leak and potential duplicate event handling

**Location**: `apps/product/src/components/ErrorBoundary/NetworkErrorBoundary.tsx`
- **Issue**: NetInfo event listeners added but cleanup implementation not verified
- **Lines**: 33, 197
- **Impact**: Potential memory leak if listeners aren't properly removed

**Note**: `apps/product/tasks.tsx` (line 57) correctly implements cleanup with `removeEventListener` - this is a good pattern to follow.

### 3. Console Statements in Production Code
**Priority: MEDIUM**

Multiple files contain console.log/error statements that should be removed:
- `apps/product/src/screens/Dashboard/DashboardScreen.tsx` (line 120)
- `apps/product/src/navigation/linking.ts` (line 62)
- `apps/product/src/screens/Mindset/components/VisionGoals.tsx` (line 93)
- `apps/product/src/screens/Mindset/components/Affirmations.tsx` (lines 67, 89)
- Plus 20+ other instances found across the codebase

### 4. Hardcoded Values That Should Be Dynamic
**Priority: MEDIUM**

**Location**: `apps/product/src/services/ErrorService.ts`
- **Issue**: Hardcoded app version "1.0.0" with TODO comment
- **Line**: 119
- **Impact**: Incorrect version tracking in error logs

### 5. Async Functions Without Error Handling

**Location**: `apps/product/src/services/ErrorService.ts`
- **Issue**: Multiple async functions without try-catch blocks
- **Lines**: 59, 164, 197, 216
- **Impact**: Unhandled promise rejections

**Location**: `apps/product/src/services/AnalyticsService.ts`
- **Issue**: Multiple async functions with missing error boundaries
- **Lines**: 101, 105, 111, 117, 121, 125, 130, 177
- **Impact**: Silent failures in analytics tracking

### 6. Race Conditions and State Management Issues

**Location**: `apps/product/src/screens/Dashboard/DashboardScreenAccessible.tsx`
- **Issue**: setTimeout for accessibility focus without checking if component is still mounted
- **Lines**: 127-131
- **Impact**: Attempting to focus on unmounted component

### 7. Optional Chaining Overuse Hiding Potential Bugs

Multiple instances of optional chaining that might hide undefined values:
- `apps/product/src/navigation/DrawerNavigator.tsx` (lines 42, 46, 48)
- `apps/product/src/services/ErrorService.ts` (lines 122, 227, 228)
- These could mask missing required data

### 8. Missing Error Boundaries

Several high-level components lack error boundaries:
- Main navigation components
- Screen wrappers
- Context providers

### 9. Incomplete TODO Items in Code

Found several TODO/FIXME comments indicating incomplete implementations:
- `apps/product/src/services/ErrorService.ts` (line 119)
- `apps/product/src/components/Analytics/TrackableComponent.tsx` (line 66)

### 10. Potential Security Issues

**Secret Scanning**: While secretlint is configured, need to verify:
- All API keys are properly environment-variabled
- No hardcoded credentials in source
- Proper .env file handling

## Priority Summary

### Critical (Fix Immediately)
1. **Memory Leaks** - Timer and event listener cleanup issues
2. **Race Conditions** - Component lifecycle issues with async operations

### High Priority
1. **Missing Error Boundaries** - Especially in navigation and context providers
2. **Async Functions Without Error Handling** - Silent failures in critical services

### Medium Priority
1. **Console Statements** - Should use proper logging service
2. **Hardcoded Values** - App version and other configuration
3. **Optional Chaining Overuse** - Can mask required data issues

### Low Priority
1. **TODO/FIXME Comments** - Track and complete unfinished work
2. **Code Organization** - Some files are too large and should be split

## Quick Wins

These can be fixed quickly with high impact:
1. Add `return () => clearTimeout(timer)` to all setTimeout useEffects
2. Add `return () => document.removeEventListener(...)` to all addEventListener useEffects
3. Replace `console.log` with proper logging service calls
4. Add `.catch()` blocks to all async operations

## Recommendations

### Immediate Actions
1. Add cleanup functions to all useEffect hooks with timers
2. Remove or replace console statements with proper logging service
3. Add error boundaries to all major components
4. Fix the hardcoded app version

### Code Quality Improvements
1. Add ESLint rule for useEffect cleanup
2. Implement proper error handling for all async operations
3. Create a centralized timer management utility
4. Add tests for component cleanup

### Example Fix for Timer Cleanup

```typescript
// Before (buggy)
useEffect(() => {
  const timer = setTimeout(() => {
    if (headerRef.current) {
      AccessibilityInfo.setAccessibilityFocus(headerRef.current);
    }
  }, 100);
}, []);

// After (fixed)
useEffect(() => {
  const timer = setTimeout(() => {
    if (headerRef.current) {
      AccessibilityInfo.setAccessibilityFocus(headerRef.current);
    }
  }, 100);
  
  return () => clearTimeout(timer); // Added cleanup
}, []);
```

### Testing Requirements
1. Add tests for component unmounting scenarios
2. Test timer cleanup
3. Test error boundary behavior
4. Memory leak detection tests

## Summary

Found **10 categories of bugs** with multiple instances each:
- Memory leaks from uncleaned timers and event listeners
- Missing error handling in async operations  
- Console statements that shouldn't be in production
- Hardcoded values that should be dynamic
- Race conditions with component lifecycle
- Over-reliance on optional chaining hiding bugs

These issues could cause performance degradation, crashes, and poor user experience if left unaddressed.