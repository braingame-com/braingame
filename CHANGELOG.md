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
- Biome v2 configuration with .biomeignore file
- Fixed all Biome lint errors and TypeScript type errors across monorepo

### Changed
- Migrated all components to standardized folder structure
- Updated all components to use theme tokens instead of hardcoded values
- Standardized prop naming conventions across components
- Improved error handling with ErrorBoundary component
- Enhanced pre-commit messaging with clear, actionable feedback
- Updated website lint script to exclude .next directory
- Fixed React peer dependency to support both v18 and v19

### Fixed
- All TypeScript errors across entire monorepo
- All Biome lint errors in all packages
- RefObject type mismatches in Accordion, Modal, and RadioGroup components
- React.ReactNode type compatibility issues between React versions
- Component prop type errors in product app (Text, Link, Icon, Button)
- React Native version conflicts with type assertions
- Generated file linting issues (.expo and .next directories)

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
