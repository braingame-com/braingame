import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface StepIndicatorClasses {
	/** Class name applied to the root element. */
	root: string;
	/** Class name applied to the root element if `color="primary"`. */
	colorPrimary: string;
	/** Class name applied to the root element if `color="neutral"`. */
	colorNeutral: string;
	/** Class name applied to the root element if `color="danger"`. */
	colorDanger: string;
	/** Class name applied to the root element if `color="success"`. */
	colorSuccess: string;
	/** Class name applied to the root element if `color="warning"`. */
	colorWarning: string;
	/** Class name applied to the root element when color inversion is triggered. */
	colorContext: string;
	/** Class name applied to the root element if `variant="plain"`. */
	variantPlain: string;
	/** Class name applied to the root element if `variant="outlined"`. */
	variantOutlined: string;
	/** Class name applied to the root element if `variant="soft"`. */
	variantSoft: string;
	/** Class name applied to the root element if `variant="solid"`. */
	variantSolid: string;
	/** Class name applied to the root element if `orientation="horizontal"`. */
	horizontal: string;
	/** Class name applied to the root element if `orientation="vertical"`. */
	vertical: string;
}

export type StepIndicatorClassKey = keyof StepIndicatorClasses;

export function getStepIndicatorUtilityClass(slot: string): string {
	return generateUtilityClass("MuiStepIndicator", slot);
}

const stepIndicatorClasses: StepIndicatorClasses = generateUtilityClasses("MuiStepIndicator", [
	"root",
	"colorPrimary",
	"colorNeutral",
	"colorDanger",
	"colorSuccess",
	"colorWarning",
	"colorContext",
	"variantPlain",
	"variantOutlined",
	"variantSoft",
	"variantSolid",
	"horizontal",
	"vertical",
]);

export default stepIndicatorClasses;
