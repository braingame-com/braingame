"use client";

import { Button, Icon } from "@braingame/bgui";
import { useId } from "react";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const tooltipProps = [
	{
		name: "content",
		type: "string | React.ReactNode",
		required: true,
		description: "Content to display in the tooltip.",
	},
	{
		name: "children",
		type: "React.ReactElement",
		required: true,
		description: "The element that triggers the tooltip.",
	},
	{
		name: "placement",
		type: '"top" | "bottom" | "left" | "right" | "auto"',
		required: false,
		default: '"top"',
		description: "Preferred placement of the tooltip.",
	},
	{
		name: "trigger",
		type: '"hover" | "press" | "longPress" | "focus"',
		required: false,
		default: '"hover"',
		description: "How the tooltip is triggered.",
	},
	{
		name: "delay",
		type: "number",
		required: false,
		default: "500",
		description: "Delay in milliseconds before showing tooltip.",
	},
	{
		name: "offset",
		type: "number",
		required: false,
		default: "8",
		description: "Distance between tooltip and trigger element.",
	},
	{
		name: "arrow",
		type: "boolean",
		required: false,
		default: "true",
		description: "Whether to show an arrow pointing to the trigger.",
	},
	{
		name: "maxWidth",
		type: "number",
		required: false,
		default: "250",
		description: "Maximum width of the tooltip in pixels.",
	},
	{
		name: "backgroundColor",
		type: "string",
		required: false,
		default: "rgba(0, 0, 0, 0.9)",
		description: "Background color of the tooltip.",
	},
	{
		name: "textColor",
		type: "string",
		required: false,
		default: "white",
		description: "Text color of the tooltip.",
	},
	{
		name: "disabled",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the tooltip is disabled.",
	},
	{
		name: "onOpen",
		type: "() => void",
		required: false,
		description: "Callback when tooltip opens.",
	},
	{
		name: "onClose",
		type: "() => void",
		required: false,
		description: "Callback when tooltip closes.",
	},
];

export default function TooltipDocs() {
	const passwordFieldId = useId();
	const apiKeyFieldId = useId();

	return (
		<div>
			<h1 className="text-display mb-4">Tooltip</h1>
			<p className="text-subtitle text-secondary mb-8">
				Tooltips display informative text when users hover over, focus on, or tap an element. They
				provide additional context without cluttering the interface.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Tooltips"
					code={`<Tooltip content="Delete this item">
  <IconButton icon="delete" />
</Tooltip>

<Tooltip content="Save your changes">
  <Button onClick={() => {}}>Save</Button>
</Tooltip>

<Tooltip content="This field is required">
  <TextInput placeholder="Email" />
</Tooltip>`}
				>
					<div className="flex flex--row flex--gap-4 flex--align-center">
						<div className="tooltip-container">
							<button type="button" className="icon-button" aria-label="Delete">
								<Icon name="delete" />
							</button>
							<div className="tooltip tooltip--top">
								Delete this item
								<div className="tooltip__arrow" />
							</div>
						</div>

						<div className="tooltip-container">
							<Button onClick={() => {}}>Save</Button>
							<div className="tooltip tooltip--top">
								Save your changes
								<div className="tooltip__arrow" />
							</div>
						</div>

						<div className="tooltip-container">
							<input
								type="text"
								placeholder="Email"
								className="textinput__input"
								style={{ width: 150 }}
							/>
							<div className="tooltip tooltip--top">
								This field is required
								<div className="tooltip__arrow" />
							</div>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Placement Options"
					code={`<Tooltip content="Top tooltip" placement="top">
  <Button onClick={() => {}}>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button onClick={() => {}}>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <Button onClick={() => {}}>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button onClick={() => {}}>Right</Button>
</Tooltip>`}
				>
					<div className="grid grid--cols-3 gap-4" style={{ maxWidth: 300 }}>
						<div />
						<div className="tooltip-container">
							<Button size="sm" onClick={() => {}}>
								Top
							</Button>
							<div className="tooltip tooltip--top">
								Top tooltip
								<div className="tooltip__arrow" />
							</div>
						</div>
						<div />

						<div className="tooltip-container">
							<Button size="sm" onClick={() => {}}>
								Left
							</Button>
							<div className="tooltip tooltip--left">
								Left tooltip
								<div className="tooltip__arrow" />
							</div>
						</div>
						<div />
						<div className="tooltip-container">
							<Button size="sm" onClick={() => {}}>
								Right
							</Button>
							<div className="tooltip tooltip--right">
								Right tooltip
								<div className="tooltip__arrow" />
							</div>
						</div>

						<div />
						<div className="tooltip-container">
							<Button size="sm" onClick={() => {}}>
								Bottom
							</Button>
							<div className="tooltip tooltip--bottom">
								Bottom tooltip
								<div className="tooltip__arrow" />
							</div>
						</div>
						<div />
					</div>
				</LiveExample>

				<LiveExample
					title="Rich Content"
					code={`<Tooltip 
  content={
    <View>
      <Text variant="caption" style={{ fontWeight: 'bold' }}>
        Keyboard Shortcut
      </Text>
      <Text variant="caption">
        Press Cmd+S to save
      </Text>
    </View>
  }
>
  <IconButton icon="keyboard" />
</Tooltip>

<Tooltip 
  content={
    <View style={styles.tooltipContent}>
      <Icon name="info" size="sm" color="white" />
      <Text variant="caption" color="white">
        Click to learn more about this feature
      </Text>
    </View>
  }
  maxWidth={300}
>
  <Button variant="plain" onClick={() => {}}>Help</Button>
</Tooltip>`}
				>
					<div className="flex flex--row flex--gap-4 flex--align-center">
						<div className="tooltip-container">
							<button type="button" className="icon-button" aria-label="Keyboard shortcuts">
								<Icon name="keyboard" />
							</button>
							<div className="tooltip tooltip--top" style={{ width: 150 }}>
								<div style={{ fontWeight: "bold", marginBottom: 4 }}>Keyboard Shortcut</div>
								<div>Press Cmd+S to save</div>
								<div className="tooltip__arrow" />
							</div>
						</div>

						<div className="tooltip-container">
							<Button variant="plain" onClick={() => {}}>
								Help
							</Button>
							<div className="tooltip tooltip--top" style={{ maxWidth: 300 }}>
								<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
									<Icon name="info" size="sm" color="white" />
									<span>Click to learn more about this feature</span>
								</div>
								<div className="tooltip__arrow" />
							</div>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Trigger Methods"
					code={`// Hover (default)
<Tooltip content="Hover to see" trigger="hover">
  <Button onClick={() => {}}>Hover me</Button>
</Tooltip>

// Press/Click
<Tooltip content="Click to see" trigger="press">
  <Button onClick={() => {}}>Click me</Button>
</Tooltip>

// Long press (mobile)
<Tooltip content="Long press to see" trigger="longPress">
  <Button onClick={() => {}}>Hold me</Button>
</Tooltip>

// Focus (keyboard navigation)
<Tooltip content="Tab to focus" trigger="focus">
  <TextInput placeholder="Focus me" />
</Tooltip>`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<Button size="sm" onClick={() => {}}>
							Hover me
						</Button>
						<Button size="sm" onClick={() => {}}>
							Click me
						</Button>
						<Button size="sm" onClick={() => {}}>
							Hold me
						</Button>
						<input
							type="text"
							placeholder="Focus me"
							className="textinput__input"
							style={{ width: 120, height: 32 }}
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Custom Styling"
					code={`<Tooltip 
  content="Custom dark tooltip"
  backgroundColor="var(--color-surface-inverse)"
  textColor="var(--color-on-surface-inverse)"
>
  <Button variant="outlined" onClick={() => {}}>Dark</Button>
</Tooltip>

<Tooltip 
  content="Primary color tooltip"
  backgroundColor="var(--color-primary)"
  textColor="var(--color-on-primary)"
  arrow={false}
>
  <Button variant="outlined" onClick={() => {}}>Primary</Button>
</Tooltip>

<Tooltip 
  content="Large tooltip with more content and custom styling"
  backgroundColor="var(--color-tertiary-container)"
  textColor="var(--color-on-tertiary-container)"
  maxWidth={350}
>
  <Button variant="outlined" onClick={() => {}}>Large</Button>
</Tooltip>`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<div className="tooltip-container">
							<Button variant="outlined" size="sm" onClick={() => {}}>
								Dark
							</Button>
							<div
								className="tooltip tooltip--top"
								style={{
									backgroundColor: "var(--color-surface-inverse)",
									color: "var(--color-on-surface-inverse)",
								}}
							>
								Custom dark tooltip
								<div
									className="tooltip__arrow"
									style={{ backgroundColor: "var(--color-surface-inverse)" }}
								/>
							</div>
						</div>

						<div className="tooltip-container">
							<Button variant="outlined" size="sm" onClick={() => {}}>
								Primary
							</Button>
							<div
								className="tooltip tooltip--top"
								style={{
									backgroundColor: "var(--color-primary)",
									color: "var(--color-on-primary)",
								}}
							>
								Primary color tooltip
							</div>
						</div>

						<div className="tooltip-container">
							<Button variant="outlined" size="sm" onClick={() => {}}>
								Large
							</Button>
							<div
								className="tooltip tooltip--top"
								style={{
									backgroundColor: "var(--color-tertiary-container)",
									color: "var(--color-on-tertiary-container)",
									maxWidth: 350,
								}}
							>
								Large tooltip with more content and custom styling
								<div
									className="tooltip__arrow"
									style={{ backgroundColor: "var(--color-tertiary-container)" }}
								/>
							</div>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Form Field Help"
					code={`<View style={styles.formField}>
  <Label>
    Password
    <Tooltip 
      content="Must be at least 8 characters with uppercase, lowercase, and numbers"
      placement="right"
    >
      <Icon name="help" size="sm" />
    </Tooltip>
  </Label>
  <TextInput 
    secureTextEntry
    placeholder="Enter password"
  />
</View>

<View style={styles.formField}>
  <Label>
    API Key
    <Tooltip 
      content="Find your API key in Settings > Developer"
      placement="right"
    >
      <Icon name="info" size="sm" />
    </Tooltip>
  </Label>
  <TextInput 
    placeholder="sk_live_..."
  />
</View>`}
				>
					<div className="flex flex--column flex--gap-4">
						<div>
							<label
								htmlFor={passwordFieldId}
								className="flex flex--row flex--align-center flex--gap-2 mb-2"
							>
								<span className="text-body">Password</span>
								<div className="tooltip-container">
									<Icon name="help" size="sm" color="var(--color-on-surface-variant)" />
									<div className="tooltip tooltip--right">
										Must be at least 8 characters with uppercase, lowercase, and numbers
										<div className="tooltip__arrow" />
									</div>
								</div>
							</label>
							<input
								id={passwordFieldId}
								type="password"
								placeholder="Enter password"
								className="textinput__input"
							/>
						</div>

						<div>
							<label
								htmlFor={apiKeyFieldId}
								className="flex flex--row flex--align-center flex--gap-2 mb-2"
							>
								<span className="text-body">API Key</span>
								<div className="tooltip-container">
									<Icon name="info" size="sm" color="var(--color-on-surface-variant)" />
									<div className="tooltip tooltip--right">
										Find your API key in Settings {">"} Developer
										<div className="tooltip__arrow" />
									</div>
								</div>
							</label>
							<input
								id={apiKeyFieldId}
								type="text"
								placeholder="sk_live_..."
								className="textinput__input"
							/>
						</div>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Tooltip } from '@braingame/bgui';

// Basic usage
function IconBar() {
  return (
    <View style={styles.iconBar}>
      <Tooltip content="Home">
        <IconButton icon="home" onClick={goHome} />
      </Tooltip>
      
      <Tooltip content="Search">
        <IconButton icon="search" onClick={openSearch} />
      </Tooltip>
      
      <Tooltip content="Notifications">
        <IconButton icon="notifications" onClick={openNotifications} />
      </Tooltip>
      
      <Tooltip content="Profile">
        <IconButton icon="person" onClick={openProfile} />
      </Tooltip>
    </View>
  );
}

// Form validation help
function FormField({ label, error, help, ...inputProps }) {
  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text>{label}</Text>
        {help && (
          <Tooltip content={help} placement="top">
            <Icon name="help_outline" size="sm" />
          </Tooltip>
        )}
      </View>
      
      <TextInput {...inputProps} error={!!error} />
      
      {error && (
        <Text color="error" variant="caption">
          {error}
        </Text>
      )}
    </View>
  );
}

// Status indicators
function StatusBadge({ status }) {
  const statusConfig = {
    active: { color: 'success', tooltip: 'Service is running' },
    inactive: { color: 'error', tooltip: 'Service is stopped' },
    pending: { color: 'warning', tooltip: 'Service is starting...' }
  };
  
  const config = statusConfig[status];
  
  return (
    <Tooltip content={config.tooltip}>
      <Badge 
        dot 
        variant={config.color}
      />
    </Tooltip>
  );
}

// Truncated text
function TruncatedText({ text, maxLength = 50 }) {
  const truncated = text.length > maxLength;
  const displayText = truncated 
    ? text.slice(0, maxLength) + '...' 
    : text;
  
  if (!truncated) {
    return <Text>{displayText}</Text>;
  }
  
  return (
    <Tooltip content={text} maxWidth={400}>
      <Text>{displayText}</Text>
    </Tooltip>
  );
}

// Action descriptions
function ActionMenu() {
  return (
    <Menu>
      <Tooltip content="Create a copy of this item" placement="left">
        <MenuItem icon="content_copy" onClick={duplicate}>
          Duplicate
        </MenuItem>
      </Tooltip>
      
      <Tooltip content="Share with team members" placement="left">
        <MenuItem icon="share" onClick={share}>
          Share
        </MenuItem>
      </Tooltip>
      
      <Tooltip 
        content="This action cannot be undone" 
        placement="left"
        backgroundColor="var(--color-error)"
      >
        <MenuItem icon="delete" onClick={confirmDelete}>
          Delete
        </MenuItem>
      </Tooltip>
    </Menu>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Icon-Only Buttons</h3>
				<CodeBlock
					code={`// Always provide tooltips for icon-only buttons
<View style={styles.toolbar}>
  <Tooltip content="Bold (Cmd+B)">
    <IconButton icon="format_bold" onClick={toggleBold} />
  </Tooltip>
  
  <Tooltip content="Italic (Cmd+I)">
    <IconButton icon="format_italic" onClick={toggleItalic} />
  </Tooltip>
  
  <Tooltip content="Underline (Cmd+U)">
    <IconButton icon="format_underlined" onClick={toggleUnderline} />
  </Tooltip>
</View>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Disabled State Explanation</h3>
				<CodeBlock
					code={`function SmartButton({ disabled, disabledReason, ...props }) {
  const button = (
    <Button disabled={disabled} {...props} />
  );
  
  if (disabled && disabledReason) {
    return (
      <Tooltip content={disabledReason}>
        {button}
      </Tooltip>
    );
  }
  
  return button;
}

// Usage
<SmartButton
  disabled={!hasPermission}
  disabledReason="You need admin access to perform this action"
>
  Delete All
</SmartButton>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Data Tables</h3>
				<CodeBlock
					code={`function DataCell({ value, fullValue }) {
  const needsTooltip = value !== fullValue;
  
  const cell = (
    <TableCell>
      <Text numberOfLines={1}>{value}</Text>
    </TableCell>
  );
  
  if (needsTooltip) {
    return (
      <Tooltip content={fullValue} placement="top">
        {cell}
      </Tooltip>
    );
  }
  
  return cell;
}`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Essential information only:</strong> Tooltips should enhance understanding, not
						provide critical information that should be visible.
					</li>
					<li className="mb-2">
						<strong>Keep it brief:</strong> Tooltip content should be concise - aim for less than 80
						characters.
					</li>
					<li className="mb-2">
						<strong>Icon clarity:</strong> Always use tooltips for icon-only buttons to ensure
						accessibility.
					</li>
					<li className="mb-2">
						<strong>Appropriate delay:</strong> Use 500-700ms delay to prevent tooltips from
						appearing accidentally.
					</li>
					<li className="mb-2">
						<strong>Mobile consideration:</strong> Tooltips don't work well on touch devices -
						consider alternatives like long-press or explicit help text.
					</li>
					<li className="mb-2">
						<strong>Keyboard support:</strong> Ensure tooltips appear on keyboard focus for
						accessibility.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Tooltips must be accessible to all users:</p>
				<ul>
					<li>Use aria-describedby to associate tooltip content with trigger element</li>
					<li>Ensure tooltips are keyboard accessible (show on focus)</li>
					<li>Don't put essential information only in tooltips</li>
					<li>Provide sufficient color contrast (4.5:1 minimum)</li>
					<li>Allow tooltips to be dismissed with Escape key</li>
					<li>Consider touch-friendly alternatives for mobile devices</li>
					<li>Avoid tooltips on disabled elements as they may not be focusable</li>
				</ul>
			</section>

			<PropsTable props={tooltipProps} />

			<style jsx>{`
				.tooltip-container {
					position: relative;
					display: inline-flex;
				}

				.tooltip {
					position: absolute;
					background-color: rgba(0, 0, 0, 0.9);
					color: white;
					padding: var(--space-2) var(--space-3);
					border-radius: var(--radius-sm);
					font-size: var(--text-xs);
					line-height: 1.4;
					white-space: nowrap;
					z-index: var(--z-index-tooltip);
					pointer-events: none;
					opacity: 0;
					transition: opacity var(--duration-micro) var(--easing-linear);
				}

				.tooltip-container:hover .tooltip {
					opacity: 1;
					transition-delay: 500ms;
				}

				.tooltip--top {
					bottom: 100%;
					left: 50%;
					transform: translateX(-50%);
					margin-bottom: 8px;
				}

				.tooltip--bottom {
					top: 100%;
					left: 50%;
					transform: translateX(-50%);
					margin-top: 8px;
				}

				.tooltip--left {
					right: 100%;
					top: 50%;
					transform: translateY(-50%);
					margin-right: 8px;
				}

				.tooltip--right {
					left: 100%;
					top: 50%;
					transform: translateY(-50%);
					margin-left: 8px;
				}

				.tooltip__arrow {
					position: absolute;
					width: 8px;
					height: 8px;
					background-color: rgba(0, 0, 0, 0.9);
					transform: rotate(45deg);
				}

				.tooltip--top .tooltip__arrow {
					bottom: -4px;
					left: 50%;
					transform: translateX(-50%) rotate(45deg);
				}

				.tooltip--bottom .tooltip__arrow {
					top: -4px;
					left: 50%;
					transform: translateX(-50%) rotate(45deg);
				}

				.tooltip--left .tooltip__arrow {
					right: -4px;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
				}

				.tooltip--right .tooltip__arrow {
					left: -4px;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
				}

				.icon-button {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					height: 40px;
					border: none;
					background: none;
					color: var(--color-on-surface-variant);
					border-radius: var(--radius-full);
					cursor: pointer;
					transition: all var(--duration-micro) var(--easing-linear);
				}

				.icon-button:hover {
					background-color: var(--color-surface-container);
					color: var(--color-on-surface);
				}

				.grid {
					display: grid;
				}

				.grid--cols-3 {
					grid-template-columns: repeat(3, 1fr);
				}

				.gap-4 {
					gap: var(--space-4);
				}
			`}</style>
		</div>
	);
}
