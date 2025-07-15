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
export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Text } from './components/Text';
export type { TextProps } from './components/Text';

export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

