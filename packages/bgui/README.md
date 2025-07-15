# BGUI - Brain Game UI Component Library

![Status](https://img.shields.io/badge/status-migration%20in%20progress-yellow?style=for-the-badge)
![Architecture](https://img.shields.io/badge/architecture-Platform%20Adapter-indigo?style=for-the-badge)

BGUI is a universal React component library for the Brain Game monorepo, providing a consistent design system across web and native platforms.

## 🚧 Migration in Progress

This package is currently undergoing a major migration to implement the Platform Adapter Pattern. Components will work seamlessly across:
- React Native (iOS & Android)
- React Native Web
- Next.js

For migration details, see:
- [BGUI Master Roadmap](../../docs/migrations/BGUI_MASTER_ROADMAP.md)
- [BGUI Migration TODO](../../docs/todo/BGUI_TODO.md)

## Architecture

BGUI follows the Platform Adapter Pattern:
- Single universal API
- Platform-specific implementations
- Joy UI visual design language
- Shopify Restyle for native styling
- Material Design 3 theme system

## Development

This package is not yet ready for use. Track progress in the migration documents linked above.

## License

MIT