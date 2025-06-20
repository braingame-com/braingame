// ENTERPRISE-GRADE UI KIT EXPORTS
// Brain Game UI components built for scale and maintainability

export { PageWrapper } from "./PageWrapper";
// All Components from src/components (Enterprise folder-per-component structure)
export { Accordion } from "./src/components/Accordion";
export { ActionList, ActionListDivider, ActionListItem } from "./src/components/ActionList";
export { Avatar } from "./src/components/Avatar";
export { Badge } from "./src/components/Badge";
export { Button } from "./src/components/Button";
export { Card } from "./src/components/Card";
export { Checkbox } from "./src/components/Checkbox";
export { Divider } from "./src/components/Divider";
export { ErrorBoundary } from "./src/components/ErrorBoundary";
export { Icon } from "./src/components/Icon";
export { Image } from "./src/components/Image";
export { Label } from "./src/components/Label";
export { Link } from "./src/components/Link";
export { Menu, MenuItem } from "./src/components/Menu";
export { Modal, ModalFooter, ModalHeader } from "./src/components/Modal";
export { ProgressBar } from "./src/components/ProgressBar";
export { RadioGroup } from "./src/components/RadioGroup";
export { Select, SelectItem } from "./src/components/Select";
export { Slider } from "./src/components/Slider";
export { Spinner } from "./src/components/Spinner";
export { Switch } from "./src/components/Switch";
export { Tabs } from "./src/components/Tabs";
export { Text } from "./src/components/Text";
export { Toast } from "./src/components/Toast";
export { Tooltip } from "./src/components/Tooltip";
// Core Layout Components
export { View } from "./View";

// Note: TextInput removed - apps use React Native's built-in TextInput

export type { PageWrapperProps } from "./PageWrapper/types";
export type { AccordionProps } from "./src/components/Accordion";
export type { ActionListItemProps, ActionListProps } from "./src/components/ActionList/types";
export type { AvatarProps } from "./src/components/Avatar/types";
export type { BadgeProps } from "./src/components/Badge/types";
export type { ButtonProps } from "./src/components/Button/types";
export type { CardProps } from "./src/components/Card/types";
export type { CheckboxProps } from "./src/components/Checkbox/types";
export type { DividerProps } from "./src/components/Divider/types";
// ErrorBoundaryProps is defined in the component file, not exported separately
export type { IconProps } from "./src/components/Icon/types";
export type { ImageProps } from "./src/components/Image/types";
export type { LabelProps } from "./src/components/Label/types";
export type { LinkProps } from "./src/components/Link/types";
export type { MenuItemProps, MenuProps } from "./src/components/Menu/types";
export type { ModalProps } from "./src/components/Modal/types";
export type { ProgressBarProps } from "./src/components/ProgressBar/types";
export type { RadioGroupItemProps, RadioGroupProps } from "./src/components/RadioGroup/types";
export type { SelectItemProps, SelectProps } from "./src/components/Select/types";
export type { SliderProps } from "./src/components/Slider/types";
export type { SpinnerProps } from "./src/components/Spinner/types";
export type { SwitchProps } from "./src/components/Switch/types";
export type { TabProps, TabsPanelProps, TabsProps } from "./src/components/Tabs/types";
export type { TextProps } from "./src/components/Text/types";
export type { ToastProps } from "./src/components/Toast/types";
export type { TooltipProps } from "./src/components/Tooltip/types";
// Constants
export { Fonts } from "./src/constants/Fonts";
// Hooks
export { useControlledState, useFocusManagement, useInteractiveState } from "./src/hooks";
// Utils
export { withErrorBoundary } from "./src/utils/withErrorBoundary";
// Type Exports (Enterprise TypeScript interfaces)
export type { ViewProps } from "./View/types";
