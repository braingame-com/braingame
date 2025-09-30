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
	AccordionItemProps,
	AccordionProps,
	AccordionValue,
} from "./components/compositions/Accordion";
export { Accordion } from "./components/compositions/Accordion";
export type { AlertProps } from "./components/compositions/Alert";
export { Alert } from "./components/compositions/Alert";
// Effects components
export type { AnimatedGradientBackgroundProps } from "./components/compositions/AnimatedGradientBackground";
export { AnimatedGradientBackground } from "./components/compositions/AnimatedGradientBackground";
export type { CardProps } from "./components/compositions/Card";
export { Card } from "./components/compositions/Card";
export type {
	ContextErrorBoundaryFallback,
	ContextErrorBoundaryFallbackArgs,
	ContextErrorBoundaryProps,
} from "./components/compositions/ContextErrorBoundary";
export { ContextErrorBoundary } from "./components/compositions/ContextErrorBoundary";
export type {
	FooterLink,
	FooterProps,
	FooterSocialLink,
} from "./components/compositions/Footer";
export { Footer } from "./components/compositions/Footer";
export type { GlowingLogoProps } from "./components/compositions/GlowingLogo";
export { GlowingLogo } from "./components/compositions/GlowingLogo";
export type { GridProps } from "./components/compositions/Grid";
export { Grid } from "./components/compositions/Grid";
export type {
	HeaderCta,
	HeaderLink,
	HeaderProps,
} from "./components/compositions/Header";
export { Header } from "./components/compositions/Header";
export type { IconButtonProps } from "./components/compositions/IconButton";
export { IconButton } from "./components/compositions/IconButton";
export type { ListProps } from "./components/compositions/List";
export { List } from "./components/compositions/List";
export type { ListItemProps } from "./components/compositions/ListItem";
export { ListItem } from "./components/compositions/ListItem";
export type { ModalProps } from "./components/compositions/Modal";
export { Modal } from "./components/compositions/Modal";
export type { RadioGroupChangeEvent, RadioGroupProps } from "./components/compositions/RadioGroup";
export { RadioGroup } from "./components/compositions/RadioGroup";
export type { SelectProps } from "./components/compositions/Select";
export { Option, Select } from "./components/compositions/Select";
export type {
	TabListProps,
	TabPanelProps,
	TabProps,
	TabsProps,
} from "./components/compositions/Tabs";
export { Tab, TabList, TabPanel, Tabs } from "./components/compositions/Tabs";
export type { TooltipProps } from "./components/compositions/Tooltip";
export * from "./components/compositions/Tooltip";
export type { AvatarProps } from "./components/primitives/Avatar";
export { Avatar } from "./components/primitives/Avatar";
export type { BadgeProps } from "./components/primitives/Badge";
export { Badge } from "./components/primitives/Badge";
export type { BoxProps, BoxProps as ViewProps } from "./components/primitives/Box";
export { Box, Box as View } from "./components/primitives/Box";
export type { ButtonProps } from "./components/primitives/Button";
export { Button } from "./components/primitives/Button";
export type { CheckboxProps } from "./components/primitives/Checkbox";
export { Checkbox } from "./components/primitives/Checkbox";
export type { ChipProps } from "./components/primitives/Chip";
export { Chip } from "./components/primitives/Chip";
export type {
	CircularProgressProps,
	CircularProgressProps as SpinnerProps,
} from "./components/primitives/CircularProgress";
export {
	CircularProgress,
	CircularProgress as Spinner,
} from "./components/primitives/CircularProgress";
export type {
	ContainerProps,
	ContainerProps as PageWrapperProps,
} from "./components/primitives/Container";
export { Container, Container as PageWrapper } from "./components/primitives/Container";
export type { DividerProps } from "./components/primitives/Divider";
export { Divider } from "./components/primitives/Divider";
export type { IconProps } from "./components/primitives/Icon";
export { Icon } from "./components/primitives/Icon";
export type { InputProps, InputProps as TextInputProps } from "./components/primitives/Input";
export { Input, Input as TextInput } from "./components/primitives/Input";
export type { LinearProgressProps } from "./components/primitives/LinearProgress";
export { LinearProgress } from "./components/primitives/LinearProgress";
export type { LinkProps } from "./components/primitives/Link";
export { Link } from "./components/primitives/Link";
export type {
	RadioChangeEvent,
	RadioFocusEvent,
	RadioProps,
} from "./components/primitives/Radio";
export { Radio } from "./components/primitives/Radio";
export type { SkeletonProps } from "./components/primitives/Skeleton";
export { Skeleton } from "./components/primitives/Skeleton";
export type { SliderProps } from "./components/primitives/Slider";
export { Slider } from "./components/primitives/Slider";
export type { StackProps } from "./components/primitives/Stack";
export { Stack } from "./components/primitives/Stack";
export type { SwitchProps } from "./components/primitives/Switch";
export { Switch } from "./components/primitives/Switch";
export type { TextareaProps } from "./components/primitives/Textarea";
export { Textarea } from "./components/primitives/Textarea";
// Additional component aliases for common usage patterns
export type {
	TypographyProps,
	TypographyProps as TextProps,
} from "./components/primitives/Typography";
// Legacy alias exports for backward compatibility
export { Typography, Typography as Text } from "./components/primitives/Typography";

// export { SvgIcon, SvgIcon as Icon } from "./components/primitives/SvgIcon";

export type { ComponentPerfResult } from "./utils/performance";
// Performance utilities (for development/testing)
export { perfMeasurement } from "./utils/performance";
