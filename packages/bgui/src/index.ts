// Export bgui theme config for backward compatibility
export { default as bguiThemeConfig } from "./bgui-theme.json";
// Constants and utilities
export * from "./constants";
export * from "./hooks";
// Theme exports
// Legacy alias exports for compatibility
export {
	BGUIThemeProvider,
	BGUIThemeProvider as ThemeProvider,
	darkTheme,
	m3Theme,
	type Theme,
	theme,
} from "./theme";
// Universal components - Platform Adapter Pattern complete for web implementations

export type { AlertProps } from "./components/Alert";
export { Alert } from "./components/Alert";
// Effects components
export type { AnimatedGradientBackgroundProps } from "./components/AnimatedGradientBackground";
export { AnimatedGradientBackground } from "./components/AnimatedGradientBackground";
export type { AvatarProps } from "./components/Avatar";
export { Avatar } from "./components/Avatar";
export type { BadgeProps } from "./components/Badge";
export { Badge } from "./components/Badge";
export type { BoxProps, BoxProps as ViewProps } from "./components/Box";
export { Box, Box as View } from "./components/Box";
export type { ButtonProps } from "./components/Button";
export { Button } from "./components/Button";
export type { CardProps } from "./components/Card";
export { Card } from "./components/Card";
export type { CheckboxProps } from "./components/Checkbox";
export { Checkbox } from "./components/Checkbox";
export type { ChipProps } from "./components/Chip";
export { Chip } from "./components/Chip";
export type {
	CircularProgressProps,
	CircularProgressProps as SpinnerProps,
} from "./components/CircularProgress";
export { CircularProgress, CircularProgress as Spinner } from "./components/CircularProgress";
export type { ContainerProps, ContainerProps as PageWrapperProps } from "./components/Container";
export { Container, Container as PageWrapper } from "./components/Container";
export type { DividerProps } from "./components/Divider";
export { Divider } from "./components/Divider";
export type { GlowingLogoProps } from "./components/GlowingLogo";
export { GlowingLogo } from "./components/GlowingLogo";
export type { GridProps } from "./components/Grid";
export { Grid } from "./components/Grid";
export type { IconButtonProps } from "./components/IconButton";
export { IconButton } from "./components/IconButton";
export type { InputProps, InputProps as TextInputProps } from "./components/Input";
export { Input, Input as TextInput } from "./components/Input";
export type { LinearProgressProps } from "./components/LinearProgress";
export { LinearProgress } from "./components/LinearProgress";
export type { LinkProps } from "./components/Link";
export { Link } from "./components/Link";
export type { ListProps } from "./components/List";
export { List } from "./components/List";
export type { ListItemProps } from "./components/ListItem";
export { ListItem } from "./components/ListItem";
export type { ModalProps } from "./components/Modal";
export { Modal } from "./components/Modal";
export type { RadioProps } from "./components/Radio";
export { Radio } from "./components/Radio";
export type { RadioGroupProps } from "./components/RadioGroup";
export { RadioGroup } from "./components/RadioGroup";
export type { SelectProps } from "./components/Select";
export { Option, Select } from "./components/Select";
export type { SkeletonProps } from "./components/Skeleton";
export { Skeleton } from "./components/Skeleton";
export type { StackProps } from "./components/Stack";
export { Stack } from "./components/Stack";
export type { SwitchProps } from "./components/Switch";
export { Switch } from "./components/Switch";
export type { TabProps } from "./components/Tab";
export { Tab } from "./components/Tab";
export type { TabListProps } from "./components/TabList";
export { TabList } from "./components/TabList";
export type { TabPanelProps } from "./components/TabPanel";
export { TabPanel } from "./components/TabPanel";
export type { TabsProps } from "./components/Tabs";
export { Tabs } from "./components/Tabs";
export type { TextareaProps } from "./components/Textarea";
export { Textarea } from "./components/Textarea";
export type { TooltipProps } from "./components/Tooltip";
export * from "./components/Tooltip";
// Additional component aliases for common usage patterns
export type { TypographyProps, TypographyProps as TextProps } from "./components/Typography";
// Legacy alias exports for backward compatibility
export { Typography, Typography as Text } from "./components/Typography";

// TODO: Re-add web components after they are migrated from web-bgui quarry
// export { Accordion } from "./components/Accordion";
// export { Slider } from "./components/Slider";
// export { SvgIcon, SvgIcon as Icon } from "./components/SvgIcon";

// TODO: Add ContextErrorBoundary component when needed
// For now, apps using ContextErrorBoundary should implement their own or use a different pattern

export type { ComponentPerfResult } from "./utils/performance";
// Performance utilities (for development/testing)
export { perfMeasurement } from "./utils/performance";
