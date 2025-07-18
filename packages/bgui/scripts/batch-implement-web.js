#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

// Components to implement with their specific details
const componentsConfig = {
	Input: {
		element: "input",
		description: "Text input fields allow users to enter and edit text.",
		hasWrapper: true,
		defaultProps: {
			size: "md",
			variant: "outlined",
			color: "neutral",
		},
	},
	Textarea: {
		element: "textarea",
		description: "Textarea allows users to enter and edit multi-line text.",
		hasWrapper: true,
		defaultProps: {
			size: "md",
			variant: "outlined",
			color: "neutral",
			rows: 2,
		},
	},
	LinearProgress: {
		element: "div",
		description:
			"Linear progress indicators express an unspecified wait time or display the length of a process.",
		hasWrapper: true,
		defaultProps: {
			size: "md",
			variant: "soft",
			color: "primary",
			value: 0,
			determinate: false,
		},
	},
	Skeleton: {
		element: "span",
		description: "Skeleton displays a placeholder preview of content before the data gets loaded.",
		hasWrapper: false,
		defaultProps: {
			variant: "text",
			animation: "pulse",
			level: "body-md",
		},
	},
	Switch: {
		element: "input",
		inputType: "checkbox",
		description: "Switches toggle the state of a single setting on or off.",
		hasWrapper: true,
		defaultProps: {
			size: "md",
			color: "neutral",
			variant: "solid",
		},
	},
	Radio: {
		element: "input",
		inputType: "radio",
		description: "Radio buttons allow users to select a single option from a list.",
		hasWrapper: true,
		defaultProps: {
			size: "md",
			color: "neutral",
			variant: "outlined",
		},
	},
	Typography: {
		element: "p",
		description: "Typography component for consistent text rendering.",
		hasWrapper: false,
		defaultProps: {
			level: "body-md",
			color: "neutral",
			variant: "plain",
		},
	},
	List: {
		element: "ul",
		description: "Lists are continuous, vertical indexes of text or images.",
		hasWrapper: false,
		defaultProps: {
			size: "md",
			variant: "plain",
		},
	},
	ListItem: {
		element: "li",
		description: "List items are used to represent items in a list.",
		hasWrapper: false,
		defaultProps: {
			variant: "plain",
		},
	},
};

// Generate basic implementation template
const generateImplementation = (componentName, config) => {
	const { element, inputType, description, hasWrapper, defaultProps } = config;
	const defaultPropsStr = Object.entries(defaultProps)
		.map(([key, value]) => `${key} = ${typeof value === "string" ? `"${value}"` : value}`)
		.join(",\n    ");

	return `"use client";
import React from "react";
import type { ${componentName}Props } from "./${componentName}Props";
import { theme as restyleTheme } from "../../theme";

/**
 * Web implementation of ${componentName} component
 * 
 * ${description}
 * Based on Joy UI's ${componentName} implementation.
 */

export const ${componentName} = React.forwardRef<${element === "input" ? "HTMLInputElement" : element === "textarea" ? "HTMLTextAreaElement" : "HTMLDivElement"}, ${componentName}Props>(
  ({
    children,
    ${defaultPropsStr},
    className,
    style,
    testID,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
    // Get variant styles
    const variantKey = \`\${variant}-\${color}\`;
    const variantStyles = restyleTheme.components.${componentName}?.variants?.[variantKey] || {};

    // Build styles
    const ${componentName.toLowerCase()}Styles: React.CSSProperties = {
      // Base styles
      fontFamily: restyleTheme.textVariants.body1.fontFamily,
      fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
      
      // Variant styles
      backgroundColor: variantStyles.backgroundColor || 'transparent',
      color: variantStyles.color || restyleTheme.colors.onSurface,
      border: variantStyles.borderColor ? \`1px solid \${variantStyles.borderColor}\` : undefined,
      
      // Additional styles
      ...style,
    };

    ${
			hasWrapper
				? `
    return (
      <div
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          position: 'relative',
        }}
        data-testid={testID}
      >
        <${element}
          ref={ref}
          ${inputType ? `type="${inputType}"` : ""}
          style={${componentName.toLowerCase()}Styles}
          aria-label={ariaLabel}
          {...props}
        ${
					element === "input"
						? "/>"
						: `>
          {children}
        </${element}>`
				}
      </div>
    );`
				: `
    return (
      <${element}
        ref={ref}
        className={className}
        style={${componentName.toLowerCase()}Styles}
        data-testid={testID}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </${element}>
    );`
		}
  }
);

${componentName}.displayName = "${componentName}";
`;
};

// Process each component
Object.entries(componentsConfig).forEach(([componentName, config]) => {
	const filePath = path.join(
		__dirname,
		"..",
		"src",
		"components",
		componentName,
		`${componentName}.web.tsx`,
	);

	if (fs.existsSync(filePath)) {
		const content = fs.readFileSync(filePath, "utf8");
		if (content.includes("TODO: Copy implementation from web-bgui")) {
			const implementation = generateImplementation(componentName, config);
			fs.writeFileSync(filePath, implementation);
			console.log(`✅ Generated ${componentName}.web.tsx`);
		} else {
			console.log(`⏭️  ${componentName} already has implementation`);
		}
	}
});

console.log("\n📝 Note: These are basic implementations. You should:");
console.log("1. Add proper event handlers (onChange, onFocus, etc.)");
console.log("2. Implement proper state management where needed");
console.log("3. Add size-specific styling");
console.log("4. Test with actual usage");
