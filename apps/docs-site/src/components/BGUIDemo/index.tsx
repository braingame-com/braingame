"use client";

// Re-export types
export type {
	AlertProps,
	AvatarProps,
	BadgeProps,
	BoxProps,
	ButtonProps,
	CardProps,
	CheckboxProps,
	ChipProps,
	CircularProgressProps,
	ContainerProps,
	DividerProps,
	GridProps,
	IconButtonProps,
	InputProps,
	LinearProgressProps,
	LinkProps,
	ListProps,
	ListItemProps,
	ModalProps,
	RadioProps,
	RadioGroupProps,
	SelectProps,
	SkeletonProps,
	StackProps,
	SwitchProps,
	TabProps,
	TabListProps,
	TabPanelProps,
	TabsProps,
	TextareaProps,
	TooltipProps,
	TypographyProps,
} from "@braingame/bgui";

// Re-export all components from @braingame/bgui for use in documentation
export {
	Alert,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	Input,
	LinearProgress,
	Link,
	List,
	ListItem,
	Modal,
	Option,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Stack,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Textarea,
	Tooltip,
	Typography,
} from "@braingame/bgui";

// Compatibility exports for old component names
export { Input as TextInput } from "@braingame/bgui";
export { Typography as Text } from "@braingame/bgui";
export { Box as View } from "@braingame/bgui";

// Legacy type exports for backward compatibility
export type { InputProps as TextInputProps } from "@braingame/bgui";
export type { TypographyProps as TextProps } from "@braingame/bgui";
export type { BoxProps as ViewProps } from "@braingame/bgui";

// Import for Icon component
import { Typography as BGUITypography } from "@braingame/bgui";
import { Option as BGUIOption } from "@braingame/bgui";
import React from "react";

// Icon component for backward compatibility - uses Typography with material icon font
export const Icon = ({ name, size = "md", color, style, ...props }: { 
  name: string; 
  size?: "sm" | "md" | "lg"; 
  color?: string; 
  style?: any;
  [key: string]: any;
}) => {
  const sizeMap = { sm: 16, md: 24, lg: 32 };
  return (
    <BGUITypography 
      component="span"
      style={{
        fontFamily: 'Material Icons',
        fontSize: sizeMap[size],
        color,
        ...style
      }}
      {...props}
    >
      {name}
    </BGUITypography>
  );
};

// SelectItem for backward compatibility
export const SelectItem = BGUIOption;