import type { CSSInterpolation } from "@mui/system";
import type { GlobalStateSlot } from "@mui/utils/generateUtilityClass";
import type {
	AccordionOwnerState,
	AccordionProps,
	AccordionSlot,
} from "../Accordion/AccordionProps";
import type {
	AccordionDetailsOwnerState,
	AccordionDetailsProps,
	AccordionDetailsSlot,
} from "../AccordionDetails/AccordionDetailsProps";
import type {
	AccordionGroupOwnerState,
	AccordionGroupProps,
	AccordionGroupSlot,
} from "../AccordionGroup/AccordionGroupProps";
import type {
	AccordionSummaryOwnerState,
	AccordionSummaryProps,
	AccordionSummarySlot,
} from "../AccordionSummary/AccordionSummaryProps";
import type { AlertOwnerState, AlertProps, AlertSlot } from "../Alert/AlertProps";
import type {
	AspectRatioOwnerState,
	AspectRatioProps,
	AspectRatioSlot,
} from "../AspectRatio/AspectRatioProps";
import type {
	AutocompleteOwnerState,
	AutocompleteProps,
	AutocompleteSlot,
} from "../Autocomplete/AutocompleteProps";
import type {
	AutocompleteListboxOwnerState,
	AutocompleteListboxProps,
	AutocompleteListboxSlot,
} from "../AutocompleteListbox/AutocompleteListboxProps";
import type {
	AutocompleteOptionOwnerState,
	AutocompleteOptionProps,
	AutocompleteOptionSlot,
} from "../AutocompleteOption/AutocompleteOptionProps";
import type { AvatarOwnerState, AvatarProps, AvatarSlot } from "../Avatar/AvatarProps";
import type {
	AvatarGroupOwnerState,
	AvatarGroupProps,
	AvatarGroupSlot,
} from "../AvatarGroup/AvatarGroupProps";
import type { BadgeOwnerState, BadgeProps, BadgeSlot } from "../Badge/BadgeProps";
import type { BoxProps, BoxSlot } from "../Box/BoxProps";
import type {
	BreadcrumbsOwnerState,
	BreadcrumbsProps,
	BreadcrumbsSlot,
} from "../Breadcrumbs/BreadcrumbsProps";
import type { ButtonOwnerState, ButtonProps, ButtonSlot } from "../Button/ButtonProps";
import type {
	ButtonGroupOwnerState,
	ButtonGroupProps,
	ButtonGroupSlot,
} from "../ButtonGroup/ButtonGroupProps";
import type { CardOwnerState, CardProps, CardSlot } from "../Card/CardProps";
import type {
	CardActionsOwnerState,
	CardActionsProps,
	CardActionsSlot,
} from "../CardActions/CardActionsProps";
import type {
	CardContentOwnerState,
	CardContentProps,
	CardContentSlot,
} from "../CardContent/CardContentProps";
import type {
	CardCoverOwnerState,
	CardCoverProps,
	CardCoverSlot,
} from "../CardCover/CardCoverProps";
import type {
	CardOverflowOwnerState,
	CardOverflowProps,
	CardOverflowSlot,
} from "../CardOverflow/CardOverflowProps";
import type { CheckboxOwnerState, CheckboxProps, CheckboxSlot } from "../Checkbox/CheckboxProps";
import type { ChipOwnerState, ChipProps, ChipSlot } from "../Chip/ChipProps";
import type {
	ChipDeleteOwnerState,
	ChipDeleteProps,
	ChipDeleteSlot,
} from "../ChipDelete/ChipDeleteProps";
import type {
	CircularProgressOwnerState,
	CircularProgressProps,
	CircularProgressSlot,
} from "../CircularProgress/CircularProgressProps";
import type { ContainerProps, ContainerSlot } from "../Container/ContainerProps";
import type {
	DialogActionsOwnerState,
	DialogActionsProps,
	DialogActionsSlot,
} from "../DialogActions/DialogActionsProps";
import type {
	DialogContentOwnerState,
	DialogContentProps,
	DialogContentSlot,
} from "../DialogContent/DialogContentProps";
import type {
	DialogTitleOwnerState,
	DialogTitleProps,
	DialogTitleSlot,
} from "../DialogTitle/DialogTitleProps";
import type { DividerOwnerState, DividerProps, DividerSlot } from "../Divider/DividerProps";
import type { DrawerOwnerState, DrawerProps, DrawerSlot } from "../Drawer/DrawerProps";
import type {
	FormControlOwnerState,
	FormControlProps,
	FormControlSlot,
} from "../FormControl/FormControlProps";
import type {
	FormHelperTextOwnerState,
	FormHelperTextProps,
	FormHelperTextSlot,
} from "../FormHelperText/FormHelperTextProps";
import type {
	FormLabelOwnerState,
	FormLabelProps,
	FormLabelSlot,
} from "../FormLabel/FormLabelProps";
import type { GridProps, GridSlot } from "../Grid/GridProps";
import type {
	IconButtonOwnerState,
	IconButtonProps,
	IconButtonSlot,
} from "../IconButton/IconButtonProps";
import type { InputOwnerState, InputProps, InputSlot } from "../Input/InputProps";
import type {
	LinearProgressOwnerState,
	LinearProgressProps,
	LinearProgressSlot,
} from "../LinearProgress/LinearProgressProps";
import type { LinkOwnerState, LinkProps, LinkSlot } from "../Link/LinkProps";
import type { ListOwnerState, ListProps, ListSlot } from "../List/ListProps";
import type {
	ListDividerOwnerState,
	ListDividerProps,
	ListDividerSlot,
} from "../ListDivider/ListDividerProps";
import type { ListItemOwnerState, ListItemProps, ListItemSlot } from "../ListItem/ListItemProps";
import type {
	ListItemButtonOwnerState,
	ListItemButtonProps,
	ListItemButtonSlot,
} from "../ListItemButton/ListItemButtonProps";
import type {
	ListItemContentOwnerState,
	ListItemContentProps,
	ListItemContentSlot,
} from "../ListItemContent/ListItemContentProps";
import type {
	ListItemDecoratorOwnerState,
	ListItemDecoratorProps,
	ListItemDecoratorSlot,
} from "../ListItemDecorator/ListItemDecoratorProps";
import type {
	ListSubheaderOwnerState,
	ListSubheaderProps,
	ListSubheaderSlot,
} from "../ListSubheader/ListSubheaderProps";
import type { MenuOwnerState, MenuProps, MenuSlot } from "../Menu/MenuProps";
import type {
	MenuButtonOwnerState,
	MenuButtonProps,
	MenuButtonSlot,
} from "../MenuButton/MenuButtonProps";
import type { MenuItemOwnerState, MenuItemProps, MenuItemSlot } from "../MenuItem/MenuItemProps";
import type { MenuListOwnerState, MenuListProps, MenuListSlot } from "../MenuList/MenuListProps";
import type { ModalOwnerState, ModalProps, ModalSlot } from "../Modal/ModalProps";
import type {
	ModalCloseOwnerState,
	ModalCloseProps,
	ModalCloseSlot,
} from "../ModalClose/ModalCloseProps";
import type {
	ModalDialogOwnerState,
	ModalDialogProps,
	ModalDialogSlot,
} from "../ModalDialog/ModalDialogProps";
import type {
	ModalOverflowOwnerState,
	ModalOverflowProps,
	ModalOverflowSlot,
} from "../ModalOverflow/ModalOverflowProps";
import type { OptionOwnerState, OptionProps, OptionSlot } from "../Option/OptionProps";
import type { RadioOwnerState, RadioProps, RadioSlot } from "../Radio/RadioProps";
import type {
	RadioGroupOwnerState,
	RadioGroupProps,
	RadioGroupSlot,
} from "../RadioGroup/RadioGroupProps";
import type {
	ScopedCssBaselineOwnerState,
	ScopedCssBaselineProps,
	ScopedCssBaselineSlot,
} from "../ScopedCssBaseline/ScopedCssBaselineProps";
import type { SelectOwnerState, SelectProps, SelectSlot } from "../Select/SelectProps";
import type { SheetOwnerState, SheetProps, SheetSlot } from "../Sheet/SheetProps";
import type { SkeletonOwnerState, SkeletonProps, SkeletonSlot } from "../Skeleton/SkeletonProps";
import type { SliderOwnerState, SliderProps, SliderSlot } from "../Slider/SliderProps";
import type { SnackbarOwnerState, SnackbarProps, SnackbarSlot } from "../Snackbar/SnackbarProps";
import type { StackProps, StackSlot } from "../Stack/StackProps";
import type { StepOwnerState, StepProps, StepSlot } from "../Step/StepProps";
import type {
	StepButtonOwnerState,
	StepButtonProps,
	StepButtonSlot,
} from "../StepButton/StepButtonProps";
import type {
	StepIndicatorOwnerState,
	StepIndicatorProps,
	StepIndicatorSlot,
} from "../StepIndicator/StepIndicatorProps";
import type { StepperOwnerState, StepperProps, StepperSlot } from "../Stepper/StepperProps";
import type { SvgIconOwnerState, SvgIconProps, SvgIconSlot } from "../SvgIcon/SvgIconProps";
import type { SwitchOwnerState, SwitchProps, SwitchSlot } from "../Switch/SwitchProps";
import type { TabOwnerState, TabProps, TabSlot } from "../Tab/TabProps";
import type { TabListOwnerState, TabListProps, TabListSlot } from "../TabList/TabListProps";
import type { TableOwnerState, TableProps, TableSlot } from "../Table/TableProps";
import type { TabPanelOwnerState, TabPanelProps, TabPanelSlot } from "../TabPanel/TabPanelProps";
import type { TabsOwnerState, TabsProps, TabsSlot } from "../Tabs/TabsProps";
import type { TextareaOwnerState, TextareaProps, TextareaSlot } from "../Textarea/TextareaProps";
import type {
	ToggleButtonGroupOwnerState,
	ToggleButtonGroupProps,
	ToggleButtonGroupSlot,
} from "../ToggleButtonGroup/ToggleButtonGroupProps";
import type { TooltipOwnerState, TooltipProps, TooltipSlot } from "../Tooltip/TooltipProps";
import type {
	TypographyOwnerState,
	TypographyProps,
	TypographySlot,
} from "../Typography/TypographyProps";

export type StyleOverrides<
	SlotName extends string = string,
	ComponentOwnerState = Record<string, unknown>,
	Theme = unknown,
> = Partial<
	Record<
		Exclude<SlotName, GlobalStateSlot>,
		| CSSInterpolation
		| ((
				// Record<string, unknown> is for other props that the slot receive internally
				// Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
				props: {
					ownerState: ComponentOwnerState & Record<string, unknown>;
					theme: Theme;
				} & Record<string, unknown>,
		  ) => CSSInterpolation)
	>
>;
export interface Components<Theme = unknown> {
	// alphabetical order
	JoyAccordion?: {
		defaultProps?: Partial<AccordionProps>;
		styleOverrides?: StyleOverrides<AccordionSlot, AccordionOwnerState, Theme>;
	};
	JoyAccordionGroup?: {
		defaultProps?: Partial<AccordionGroupProps>;
		styleOverrides?: StyleOverrides<AccordionGroupSlot, AccordionGroupOwnerState, Theme>;
	};
	JoyAccordionSummary?: {
		defaultProps?: Partial<AccordionSummaryProps>;
		styleOverrides?: StyleOverrides<AccordionSummarySlot, AccordionSummaryOwnerState, Theme>;
	};
	JoyAccordionDetails?: {
		defaultProps?: Partial<AccordionDetailsProps>;
		styleOverrides?: StyleOverrides<AccordionDetailsSlot, AccordionDetailsOwnerState, Theme>;
	};
	JoyAlert?: {
		defaultProps?: Partial<AlertProps>;
		styleOverrides?: StyleOverrides<AlertSlot, AlertOwnerState, Theme>;
	};
	JoyAspectRatio?: {
		defaultProps?: Partial<AspectRatioProps>;
		styleOverrides?: StyleOverrides<AspectRatioSlot, AspectRatioOwnerState, Theme>;
	};
	JoyAutocomplete?: {
		defaultProps?: Partial<AutocompleteProps<any, any, any, any>>;
		styleOverrides?: StyleOverrides<
			AutocompleteSlot,
			AutocompleteOwnerState<any, any, any, any>,
			Theme
		>;
	};
	JoyAutocompleteListbox?: {
		defaultProps?: Partial<AutocompleteListboxProps>;
		styleOverrides?: StyleOverrides<AutocompleteListboxSlot, AutocompleteListboxOwnerState, Theme>;
	};
	JoyAutocompleteOption?: {
		defaultProps?: Partial<AutocompleteOptionProps>;
		styleOverrides?: StyleOverrides<AutocompleteOptionSlot, AutocompleteOptionOwnerState, Theme>;
	};
	JoyAvatar?: {
		defaultProps?: Partial<AvatarProps>;
		styleOverrides?: StyleOverrides<AvatarSlot, AvatarOwnerState, Theme>;
	};
	JoyAvatarGroup?: {
		defaultProps?: Partial<AvatarGroupProps>;
		styleOverrides?: StyleOverrides<AvatarGroupSlot, AvatarGroupOwnerState, Theme>;
	};
	JoyBadge?: {
		defaultProps?: Partial<BadgeProps>;
		styleOverrides?: StyleOverrides<BadgeSlot, BadgeOwnerState, Theme>;
	};
	JoyBox?: {
		defaultProps?: Partial<BoxProps>;
		styleOverrides?: StyleOverrides<BoxSlot, BoxProps, Theme>;
	};
	JoyButton?: {
		defaultProps?: Partial<ButtonProps>;
		styleOverrides?: StyleOverrides<ButtonSlot, ButtonOwnerState, Theme>;
	};
	JoyButtonGroup?: {
		defaultProps?: Partial<ButtonGroupProps>;
		styleOverrides?: StyleOverrides<ButtonGroupSlot, ButtonGroupOwnerState, Theme>;
	};
	JoyBreadcrumbs?: {
		defaultProps?: Partial<BreadcrumbsProps>;
		styleOverrides?: StyleOverrides<BreadcrumbsSlot, BreadcrumbsOwnerState, Theme>;
	};
	JoyCircularProgress?: {
		defaultProps?: Partial<CircularProgressProps>;
		styleOverrides?: StyleOverrides<CircularProgressSlot, CircularProgressOwnerState, Theme>;
	};
	JoyCard?: {
		defaultProps?: Partial<CardProps>;
		styleOverrides?: StyleOverrides<CardSlot, CardOwnerState, Theme>;
	};
	JoyCardActions?: {
		defaultProps?: Partial<CardActionsProps>;
		styleOverrides?: StyleOverrides<CardActionsSlot, CardActionsOwnerState, Theme>;
	};
	JoyCardContent?: {
		defaultProps?: Partial<CardContentProps>;
		styleOverrides?: StyleOverrides<CardContentSlot, CardContentOwnerState, Theme>;
	};
	JoyCardCover?: {
		defaultProps?: Partial<CardCoverProps>;
		styleOverrides?: StyleOverrides<CardCoverSlot, CardCoverOwnerState, Theme>;
	};
	JoyCardOverflow?: {
		defaultProps?: Partial<CardOverflowProps>;
		styleOverrides?: StyleOverrides<CardOverflowSlot, CardOverflowOwnerState, Theme>;
	};
	JoyCheckbox?: {
		defaultProps?: Partial<CheckboxProps>;
		styleOverrides?: StyleOverrides<CheckboxSlot, CheckboxOwnerState, Theme>;
	};
	JoyChip?: {
		defaultProps?: Partial<ChipProps>;
		styleOverrides?: StyleOverrides<ChipSlot, ChipOwnerState, Theme>;
	};
	JoyChipDelete?: {
		defaultProps?: Partial<ChipDeleteProps>;
		styleOverrides?: StyleOverrides<ChipDeleteSlot, ChipDeleteOwnerState, Theme>;
	};
	JoyContainer?: {
		defaultProps?: Partial<ContainerProps>;
		styleOverrides?: StyleOverrides<ContainerSlot, ContainerProps, Theme>;
	};
	JoyDialogActions?: {
		defaultProps?: Partial<DialogActionsProps>;
		styleOverrides?: StyleOverrides<DialogActionsSlot, DialogActionsOwnerState, Theme>;
	};
	JoyDialogContent?: {
		defaultProps?: Partial<DialogContentProps>;
		styleOverrides?: StyleOverrides<DialogContentSlot, DialogContentOwnerState, Theme>;
	};
	JoyDialogTitle?: {
		defaultProps?: Partial<DialogTitleProps>;
		styleOverrides?: StyleOverrides<DialogTitleSlot, DialogTitleOwnerState, Theme>;
	};
	JoyDrawer?: {
		defaultProps?: Partial<DrawerProps>;
		styleOverrides?: StyleOverrides<DrawerSlot, DrawerOwnerState, Theme>;
	};
	JoyScopedCssBaseline?: {
		defaultProps?: Partial<ScopedCssBaselineProps>;
		styleOverrides?: StyleOverrides<ScopedCssBaselineSlot, ScopedCssBaselineOwnerState, Theme>;
	};
	JoyDivider?: {
		defaultProps?: Partial<DividerProps>;
		styleOverrides?: StyleOverrides<DividerSlot, DividerOwnerState, Theme>;
	};
	JoyFormControl?: {
		defaultProps?: Partial<FormControlProps>;
		styleOverrides?: StyleOverrides<FormControlSlot, FormControlOwnerState, Theme>;
	};
	JoyFormHelperText?: {
		defaultProps?: Partial<FormHelperTextProps>;
		styleOverrides?: StyleOverrides<FormHelperTextSlot, FormHelperTextOwnerState, Theme>;
	};
	JoyFormLabel?: {
		defaultProps?: Partial<FormLabelProps>;
		styleOverrides?: StyleOverrides<FormLabelSlot, FormLabelOwnerState, Theme>;
	};
	JoyGrid?: {
		defaultProps?: Partial<GridProps>;
		styleOverrides?: StyleOverrides<GridSlot, GridProps, Theme>;
	};
	JoyIconButton?: {
		defaultProps?: Partial<IconButtonProps>;
		styleOverrides?: StyleOverrides<IconButtonSlot, IconButtonOwnerState, Theme>;
	};
	JoyInput?: {
		defaultProps?: Partial<InputProps>;
		styleOverrides?: StyleOverrides<InputSlot, InputOwnerState, Theme>;
	};
	JoyLinearProgress?: {
		defaultProps?: Partial<LinearProgressProps>;
		styleOverrides?: StyleOverrides<LinearProgressSlot, LinearProgressOwnerState, Theme>;
	};
	JoyLink?: {
		defaultProps?: Partial<LinkProps>;
		styleOverrides?: StyleOverrides<LinkSlot, LinkOwnerState, Theme>;
	};
	JoyList?: {
		defaultProps?: Partial<ListProps>;
		styleOverrides?: StyleOverrides<ListSlot, ListOwnerState, Theme>;
	};
	JoyListDivider?: {
		defaultProps?: Partial<ListDividerProps>;
		styleOverrides?: StyleOverrides<ListDividerSlot, ListDividerOwnerState, Theme>;
	};
	JoyListSubheader?: {
		defaultProps?: Partial<ListSubheaderProps>;
		styleOverrides?: StyleOverrides<ListSubheaderSlot, ListSubheaderOwnerState, Theme>;
	};
	JoyListItem?: {
		defaultProps?: Partial<ListItemProps>;
		styleOverrides?: StyleOverrides<ListItemSlot, ListItemOwnerState, Theme>;
	};
	JoyListItemButton?: {
		defaultProps?: Partial<ListItemButtonProps>;
		styleOverrides?: StyleOverrides<ListItemButtonSlot, ListItemButtonOwnerState, Theme>;
	};
	JoyListItemContent?: {
		defaultProps?: Partial<ListItemContentProps>;
		styleOverrides?: StyleOverrides<ListItemContentSlot, ListItemContentOwnerState, Theme>;
	};
	JoyListItemDecorator?: {
		defaultProps?: Partial<ListItemDecoratorProps>;
		styleOverrides?: StyleOverrides<ListItemDecoratorSlot, ListItemDecoratorOwnerState, Theme>;
	};
	JoyRadio?: {
		defaultProps?: Partial<RadioProps>;
		styleOverrides?: StyleOverrides<RadioSlot, RadioOwnerState, Theme>;
	};
	JoyRadioGroup?: {
		defaultProps?: Partial<RadioGroupProps>;
		styleOverrides?: StyleOverrides<RadioGroupSlot, RadioGroupOwnerState, Theme>;
	};
	JoySelect?: {
		defaultProps?: Partial<SelectProps<any, any>>;
		styleOverrides?: StyleOverrides<SelectSlot, SelectOwnerState<any, any>, Theme>;
	};
	JoyOption?: {
		defaultProps?: Partial<OptionProps>;
		styleOverrides?: StyleOverrides<OptionSlot, OptionOwnerState, Theme>;
	};
	JoySheet?: {
		defaultProps?: Partial<SheetProps>;
		styleOverrides?: StyleOverrides<SheetSlot, SheetOwnerState, Theme>;
	};
	JoySkeleton?: {
		defaultProps?: Partial<SkeletonProps>;
		styleOverrides?: StyleOverrides<SkeletonSlot, SkeletonOwnerState, Theme>;
	};
	JoyStack?: {
		defaultProps?: Partial<StackProps>;
		styleOverrides?: StyleOverrides<StackSlot, StackProps, Theme>;
	};
	JoyStepper?: {
		defaultProps?: Partial<StepperProps>;
		styleOverrides?: StyleOverrides<StepperSlot, StepperOwnerState, Theme>;
	};
	JoyStep?: {
		defaultProps?: Partial<StepProps>;
		styleOverrides?: StyleOverrides<StepSlot, StepOwnerState, Theme>;
	};
	JoyStepButton?: {
		defaultProps?: Partial<StepButtonProps>;
		styleOverrides?: StyleOverrides<StepButtonSlot, StepButtonOwnerState, Theme>;
	};
	JoyStepIndicator?: {
		defaultProps?: Partial<StepIndicatorProps>;
		styleOverrides?: StyleOverrides<StepIndicatorSlot, StepIndicatorOwnerState, Theme>;
	};
	JoySwitch?: {
		defaultProps?: Partial<SwitchProps>;
		styleOverrides?: StyleOverrides<SwitchSlot, SwitchOwnerState, Theme>;
	};
	// Temporary for Material UI icons usage
	MuiSvgIcon?: {
		defaultProps?: Partial<SvgIconProps>;
		styleOverrides?: StyleOverrides<SvgIconSlot, SvgIconOwnerState, Theme>;
	};
	JoySvgIcon?: {
		defaultProps?: Partial<SvgIconProps>;
		styleOverrides?: StyleOverrides<SvgIconSlot, SvgIconOwnerState, Theme>;
	};
	JoySlider?: {
		defaultProps?: Partial<SliderProps>;
		styleOverrides?: StyleOverrides<SliderSlot, SliderOwnerState, Theme>;
	};
	JoySnackbar?: {
		defaultProps?: Partial<SnackbarProps>;
		styleOverrides?: StyleOverrides<SnackbarSlot, SnackbarOwnerState, Theme>;
	};
	JoyTabs?: {
		defaultProps?: Partial<TabsProps>;
		styleOverrides?: StyleOverrides<TabsSlot, TabsOwnerState, Theme>;
	};
	JoyTable?: {
		defaultProps?: Partial<TableProps>;
		styleOverrides?: StyleOverrides<TableSlot, TableOwnerState, Theme>;
	};
	JoyTabList?: {
		defaultProps?: Partial<TabListProps>;
		styleOverrides?: StyleOverrides<TabListSlot, TabListOwnerState, Theme>;
	};
	JoyTab?: {
		defaultProps?: Partial<TabProps>;
		styleOverrides?: StyleOverrides<TabSlot, TabOwnerState, Theme>;
	};
	JoyTabPanel?: {
		defaultProps?: Partial<TabPanelProps>;
		styleOverrides?: StyleOverrides<TabPanelSlot, TabPanelOwnerState, Theme>;
	};
	JoyTextarea?: {
		defaultProps?: Partial<TextareaProps>;
		styleOverrides?: StyleOverrides<TextareaSlot, TextareaOwnerState, Theme>;
	};
	JoyToggleButtonGroup?: {
		defaultProps?: Partial<ToggleButtonGroupProps>;
		styleOverrides?: StyleOverrides<ToggleButtonGroupSlot, ToggleButtonGroupOwnerState, Theme>;
	};
	JoyTooltip?: {
		defaultProps?: Partial<TooltipProps>;
		styleOverrides?: StyleOverrides<TooltipSlot, TooltipOwnerState, Theme>;
	};
	JoyTypography?: {
		defaultProps?: Partial<TypographyProps>;
		styleOverrides?: StyleOverrides<TypographySlot, TypographyOwnerState, Theme>;
	};
	JoyMenu?: {
		defaultProps?: Partial<MenuProps>;
		styleOverrides?: StyleOverrides<MenuSlot, MenuOwnerState, Theme>;
	};
	JoyMenuButton?: {
		defaultProps?: Partial<MenuButtonProps>;
		styleOverrides?: StyleOverrides<MenuButtonSlot, MenuButtonOwnerState, Theme>;
	};
	JoyMenuList?: {
		defaultProps?: Partial<MenuListProps>;
		styleOverrides?: StyleOverrides<MenuListSlot, MenuListOwnerState, Theme>;
	};
	JoyMenuItem?: {
		defaultProps?: Partial<MenuItemProps>;
		styleOverrides?: StyleOverrides<MenuItemSlot, MenuItemOwnerState, Theme>;
	};
	JoyModal?: {
		defaultProps?: Partial<ModalProps>;
		styleOverrides?: StyleOverrides<ModalSlot, ModalOwnerState, Theme>;
	};
	JoyModalClose?: {
		defaultProps?: Partial<ModalCloseProps>;
		styleOverrides?: StyleOverrides<ModalCloseSlot, ModalCloseOwnerState, Theme>;
	};
	JoyModalDialog?: {
		defaultProps?: Partial<ModalDialogProps>;
		styleOverrides?: StyleOverrides<ModalDialogSlot, ModalDialogOwnerState, Theme>;
	};
	JoyModalOverflow?: {
		defaultProps?: Partial<ModalOverflowProps>;
		styleOverrides?: StyleOverrides<ModalOverflowSlot, ModalOverflowOwnerState, Theme>;
	};
}
