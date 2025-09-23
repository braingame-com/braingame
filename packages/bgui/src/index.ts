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

export type {
	FooterLink,
	FooterProps,
	FooterSocialLink,
} from "./components/compositions/Footer";
export { Footer } from "./components/compositions/Footer";
export type {
	HeaderCta,
	HeaderLink,
	HeaderProps,
} from "./components/compositions/Header";
export { Header } from "./components/compositions/Header";
export type { BoxProps, BoxProps as ViewProps } from "./components/primitives/Box";
export { Box, Box as View } from "./components/primitives/Box";
export type { ButtonProps } from "./components/primitives/Button";
export { Button } from "./components/primitives/Button";
export type {
	ContainerProps,
	ContainerProps as PageWrapperProps,
} from "./components/primitives/Container";
export { Container, Container as PageWrapper } from "./components/primitives/Container";
export type { IconProps } from "./components/primitives/Icon";
export { Icon } from "./components/primitives/Icon";
export type { InputProps, InputProps as TextInputProps } from "./components/primitives/Input";
export { Input, Input as TextInput } from "./components/primitives/Input";
export type { LinkProps } from "./components/primitives/Link";
export { Link } from "./components/primitives/Link";
export type { StackProps } from "./components/primitives/Stack";
export { Stack } from "./components/primitives/Stack";
// Additional component aliases for common usage patterns
export type {
	TypographyProps,
	TypographyProps as TextProps,
} from "./components/primitives/Typography";
// Legacy alias exports for backward compatibility
export { Typography, Typography as Text } from "./components/primitives/Typography";
export type { AlertProps } from "./components/wip/Alert";
export { Alert } from "./components/wip/Alert";
// Effects components
export type { AnimatedGradientBackgroundProps } from "./components/wip/AnimatedGradientBackground";
export { AnimatedGradientBackground } from "./components/wip/AnimatedGradientBackground";
export type { AvatarProps } from "./components/wip/Avatar";
export { Avatar } from "./components/wip/Avatar";
export type { BadgeProps } from "./components/wip/Badge";
export { Badge } from "./components/wip/Badge";
export type { CardProps } from "./components/wip/Card";
export { Card } from "./components/wip/Card";
export type { CheckboxProps } from "./components/wip/Checkbox";
export { Checkbox } from "./components/wip/Checkbox";
export type { ChipProps } from "./components/wip/Chip";
export { Chip } from "./components/wip/Chip";
export type {
	CircularProgressProps,
	CircularProgressProps as SpinnerProps,
} from "./components/wip/CircularProgress";
export { CircularProgress, CircularProgress as Spinner } from "./components/wip/CircularProgress";
export type { DividerProps } from "./components/wip/Divider";
export { Divider } from "./components/wip/Divider";
export type { GlowingLogoProps } from "./components/wip/GlowingLogo";
export { GlowingLogo } from "./components/wip/GlowingLogo";
export type { GridProps } from "./components/wip/Grid";
export { Grid } from "./components/wip/Grid";
export type { IconButtonProps } from "./components/wip/IconButton";
export { IconButton } from "./components/wip/IconButton";
export type { LinearProgressProps } from "./components/wip/LinearProgress";
export { LinearProgress } from "./components/wip/LinearProgress";
export type { ListProps } from "./components/wip/List";
export { List } from "./components/wip/List";
export type { ListItemProps } from "./components/wip/ListItem";
export { ListItem } from "./components/wip/ListItem";
export type { ModalProps } from "./components/wip/Modal";
export { Modal } from "./components/wip/Modal";
export type { RadioProps } from "./components/wip/Radio";
export { Radio } from "./components/wip/Radio";
export type { RadioGroupProps } from "./components/wip/RadioGroup";
export { RadioGroup } from "./components/wip/RadioGroup";
export type { SelectProps } from "./components/wip/Select";
export { Option, Select } from "./components/wip/Select";
export type { SkeletonProps } from "./components/wip/Skeleton";
export { Skeleton } from "./components/wip/Skeleton";
export type { SwitchProps } from "./components/wip/Switch";
export { Switch } from "./components/wip/Switch";
export type { TabProps } from "./components/wip/Tab";
export { Tab } from "./components/wip/Tab";
export type { TabListProps } from "./components/wip/TabList";
export { TabList } from "./components/wip/TabList";
export type { TabPanelProps } from "./components/wip/TabPanel";
export { TabPanel } from "./components/wip/TabPanel";
export type { TabsProps } from "./components/wip/Tabs";
export { Tabs } from "./components/wip/Tabs";
export type { TextareaProps } from "./components/wip/Textarea";
export { Textarea } from "./components/wip/Textarea";
export type { TooltipProps } from "./components/wip/Tooltip";
export * from "./components/wip/Tooltip";

// TODO: Re-add web components after they are migrated from web-bgui quarry
// export { Accordion } from "./components/wip/Accordion";
// export { Slider } from "./components/wip/Slider";
// export { SvgIcon, SvgIcon as Icon } from "./components/wip/SvgIcon";

// TODO: Add ContextErrorBoundary component when needed
// For now, apps using ContextErrorBoundary should implement their own or use a different pattern

export type { ComponentPerfResult } from "./utils/performance";
// Performance utilities (for development/testing)
export { perfMeasurement } from "./utils/performance";
