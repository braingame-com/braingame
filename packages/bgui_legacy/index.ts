// ENTERPRISE-GRADE UI KIT EXPORTS
// Brain Game UI components built for scale and maintainability

export type { ButtonProps, ButtonSize, M3ButtonVariant } from "./src/components/Button";
// GOLD STANDARD COMPONENTS (Material 3 Compliant)
// These components meet all quality standards defined in docs/GOLD_STANDARD.md
export { Button } from "./src/components/Button";
export { Icon } from "./src/components/Icon";
export type { IconName } from "./src/components/Icon/iconRegistry";
export { availableIcons } from "./src/components/Icon/iconRegistry";
export type { SurfaceProps } from "./src/components/Surface";
export { Surface } from "./src/components/Surface";
export type { TextProps } from "./src/components/Text";
export { Text } from "./src/components/Text";
// WIP COMPONENTS (Not yet M3 compliant - use with caution)
export type { AccordionProps } from "./src/components/wip/Accordion";
export { Accordion } from "./src/components/wip/Accordion";
export { ActionList, ActionListDivider, ActionListItem } from "./src/components/wip/ActionList";
export type { ActionListItemProps, ActionListProps } from "./src/components/wip/ActionList/types";
export type { AlertProps, AlertType, AlertVariant } from "./src/components/wip/Alert";
export { Alert } from "./src/components/wip/Alert";
export { AnimatedGradientBackground } from "./src/components/wip/AnimatedGradientBackground";
export type { AnimatedGradientBackgroundProps } from "./src/components/wip/AnimatedGradientBackground/types";
export { Avatar } from "./src/components/wip/Avatar";
export type { AvatarProps } from "./src/components/wip/Avatar/types";
export { Badge } from "./src/components/wip/Badge";
export type { BadgeProps } from "./src/components/wip/Badge/types";
export type { BreadcrumbItemProps, BreadcrumbProps } from "./src/components/wip/Breadcrumb";
export { Breadcrumb, BreadcrumbItem } from "./src/components/wip/Breadcrumb";
export { Card } from "./src/components/wip/Card";
export type { CardProps } from "./src/components/wip/Card/types";
export { Checkbox } from "./src/components/wip/Checkbox";
export type { CheckboxProps } from "./src/components/wip/Checkbox/types";
export { Chip } from "./src/components/wip/Chip";
export type { ChipColor, ChipProps, ChipSize, ChipVariant } from "./src/components/wip/Chip/types";
export { Divider } from "./src/components/wip/Divider";
export type { DividerProps } from "./src/components/wip/Divider/types";
export { EmptyState } from "./src/components/wip/EmptyState";
export type { EmptyStateProps } from "./src/components/wip/EmptyState/types";
export {
	ContextErrorBoundary,
	ContextErrorBoundary as ErrorBoundary,
} from "./src/components/wip/ErrorBoundary";
export { GlowingLogo } from "./src/components/wip/GlowingLogo";
export type { GlowingLogoProps } from "./src/components/wip/GlowingLogo/types";
export { Image } from "./src/components/wip/Image";
export type { ImageProps } from "./src/components/wip/Image/types";
export type { KeyboardAvoidingContainerProps } from "./src/components/wip/KeyboardAvoidingContainer";
export { KeyboardAvoidingContainer } from "./src/components/wip/KeyboardAvoidingContainer";
export { Label } from "./src/components/wip/Label";
export type { LabelProps } from "./src/components/wip/Label/types";
export { Link } from "./src/components/wip/Link";
export type { LinkProps } from "./src/components/wip/Link/types";
export type { LoadingButtonProps } from "./src/components/wip/LoadingButton";
export { LoadingButton } from "./src/components/wip/LoadingButton";
export { Menu, MenuItem } from "./src/components/wip/Menu";
export type { MenuItemProps, MenuProps } from "./src/components/wip/Menu/types";
export { Modal, ModalFooter, ModalHeader } from "./src/components/wip/Modal";
export type { ModalProps } from "./src/components/wip/Modal/types";
export { OnboardingSlide } from "./src/components/wip/OnboardingSlide";
export type { OnboardingSlideProps } from "./src/components/wip/OnboardingSlide/types";
export { PageWrapper } from "./src/components/wip/PageWrapper";
export type { PageWrapperProps } from "./src/components/wip/PageWrapper/types";
export { ProgressBar } from "./src/components/wip/ProgressBar";
export type { ProgressBarProps } from "./src/components/wip/ProgressBar/types";
export { RadioGroup } from "./src/components/wip/RadioGroup";
export type { RadioGroupItemProps, RadioGroupProps } from "./src/components/wip/RadioGroup/types";
export { Select, SelectItem } from "./src/components/wip/Select";
export type { SelectItemProps, SelectProps } from "./src/components/wip/Select/types";
export { Slider } from "./src/components/wip/Slider";
export type { SliderProps } from "./src/components/wip/Slider/types";
export { Spinner } from "./src/components/wip/Spinner";
export type { SpinnerProps } from "./src/components/wip/Spinner/types";
export { Switch } from "./src/components/wip/Switch";
export type { SwitchProps } from "./src/components/wip/Switch/types";
export { Tabs } from "./src/components/wip/Tabs";
export type { TabProps, TabsPanelProps, TabsProps } from "./src/components/wip/Tabs/types";
export { TextInput } from "./src/components/wip/TextInput";
export type { TextInputProps } from "./src/components/wip/TextInput/types";
export { Toast } from "./src/components/wip/Toast";
export type { ToastProps } from "./src/components/wip/Toast/types";
export { Tooltip } from "./src/components/wip/Tooltip";
export type { TooltipProps } from "./src/components/wip/Tooltip/types";
export { View } from "./src/components/wip/View";
export type { ViewProps } from "./src/components/wip/View/types";
export { VisionCard } from "./src/components/wip/VisionCard";
export { LIFE_AREA_CONFIGS } from "./src/components/wip/VisionCard/constants";
export type {
	LifeArea,
	LifeAreaConfig,
	VisionCardProps,
} from "./src/components/wip/VisionCard/types";
export { default as bguiThemeConfig } from "./src/constants/bgui-theme.json";
// CONSTANTS
export { Fonts } from "./src/constants/Fonts";
// HOOKS
export {
	useAbortController,
	useControlledState,
	useFocusManagement,
	useInteractiveState,
	useMountedState,
} from "./src/hooks";
export type { ColorMode, ContrastMode, M3ColorScheme } from "./src/theme";
// THEME SYSTEM (Material 3)
export { ThemeProvider, useTheme } from "./src/theme";
export type { ElevationLevel } from "./src/theme/elevation";
export { componentElevation, getElevation } from "./src/theme/elevation";
export type { DurationToken } from "./src/theme/motion";
export {
	animations,
	createFadeIn,
	createFadeOut,
	createScale,
	createSlide,
	createSpring,
	createStagger,
	durations,
	easing,
} from "./src/theme/motion";

// UTILS
export { withErrorBoundary } from "./src/utils/withErrorBoundary";
