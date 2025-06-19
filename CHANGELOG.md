# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete BGUI component library with 25 enterprise-grade components
- Comprehensive TypeScript types for all components
- Full accessibility support with ARIA attributes
- Design token system integration
- Custom hooks: useControlledState, useFocusManagement, useInteractiveState
- Pre-commit hooks with linting and type checking
- CI/CD pipeline with GitHub Actions
- Monorepo structure with Turborepo

### Changed
- Migrated all components to standardized folder structure
- Updated all components to use theme tokens instead of hardcoded values
- Standardized prop naming conventions across components
- Improved error handling with ErrorBoundary component

### Fixed
- TypeScript errors across all components
- Accessibility issues in form components
- Styling inconsistencies with theme integration

### Removed
- Duplicate component implementations
- Unused TextInput component (using React Native's built-in)
- Hardcoded style values

## [1.0.0] - 2025-06-19

### Added
- Initial project setup with Expo and Next.js
- Basic monorepo structure
- Core utilities package
- Initial BGUI component implementations

[Unreleased]: https://github.com/braingame-com/braingame/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/braingame-com/braingame/releases/tag/v1.0.0