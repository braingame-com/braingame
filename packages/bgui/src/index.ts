// Export bgui theme config for backward compatibility
export { default as bguiThemeConfig } from './bgui-theme.json';

// Re-export all Joy UI components from web-bgui
export * from './web-bgui/index';

// Theme exports
export { BGUIThemeProvider, theme, darkTheme, type Theme, m3Theme } from './theme';

// Constants and utilities
export * from './constants';
export * from './hooks';

// Future: Universal components will be exported from ./components


// Components
export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Text } from './components/Text';
export type { TextProps } from './components/Text';

export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

// Performance utilities (for development/testing)
export { perfMeasurement } from './utils/performance';
export type { ComponentPerfResult } from './utils/performance';

