"use client";

import { Alert } from "@braingame/bgui";
import { CodeBlock } from "../../../../src/components/CodeBlock";
import { LiveExample } from "../../../../src/components/LiveExample";
import { PropsTable } from "../../../../src/components/PropsTable";

const alertProps = [
	{
		name: "children",
		type: "ReactNode",
		required: false,
		description: "The content of the component.",
	},
	{
		name: "color",
		type: '"primary" | "neutral" | "danger" | "success" | "warning"',
		required: false,
		default: '"neutral"',
		description: "The color of the component.",
	},
	{
		name: "variant",
		type: '"plain" | "outlined" | "soft" | "solid"',
		required: false,
		default: '"soft"',
		description: "The variant to use.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		required: false,
		default: '"md"',
		description: "The size of the component.",
	},
	{
		name: "startDecorator",
		type: "ReactNode",
		required: false,
		description: "Element placed before the children.",
	},
	{
		name: "endDecorator",
		type: "ReactNode",
		required: false,
		description: "Element placed after the children.",
	},
	{
		name: "invertedColors",
		type: "boolean",
		required: false,
		default: "false",
		description: "If true, the children with an implicit color prop invert their colors to match the component's variant and color.",
	},
	{
		name: "role",
		type: "string",
		required: false,
		default: '"alert"',
		description: "The ARIA role attribute of the element.",
	},
	{
		name: "style",
		type: "CSSProperties | any",
		required: false,
		description: "Additional styles.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for testing.",
	},
	{
		name: "aria-label",
		type: "string",
		required: false,
		description: "Accessibility label.",
	},
];

export default function AlertDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Alert</h1>
			<p className="text-subtitle text-secondary mb-8">
				Alerts display important messages that require user attention. They communicate information,
				warnings, errors, or success states in a prominent way.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Alert Types"
					code={`<Alert color="neutral">
  Info Alert: This is additional information that might be helpful.
</Alert>

<Alert color="success">
  Success Alert: Your changes have been saved successfully.
</Alert>

<Alert color="warning">
  Warning Alert: Please review your input before proceeding.
</Alert>

<Alert color="danger">
  Error Alert: Something went wrong. Please try again.
</Alert>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert color="neutral">
							Info Alert: This is additional information that might be helpful.
						</Alert>

						<Alert color="success">
							Success Alert: Your changes have been saved successfully.
						</Alert>

						<Alert color="warning">
							Warning Alert: Please review your input before proceeding.
						</Alert>

						<Alert color="danger">Error Alert: Something went wrong. Please try again.</Alert>
					</div>
				</LiveExample>

				<LiveExample
					title="Alert Variants"
					code={`<Alert color="neutral" variant="solid">
  Solid Alert
</Alert>

<Alert color="neutral" variant="outlined">
  Outlined Alert
</Alert>

<Alert color="neutral" variant="soft">
  Soft Alert
</Alert>

<Alert color="neutral" variant="plain">
  Plain Alert
</Alert>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert color="neutral" variant="solid">Solid Alert</Alert>

						<Alert color="neutral" variant="outlined">Outlined Alert</Alert>

						<Alert color="neutral" variant="soft">Soft Alert</Alert>

						<Alert color="neutral" variant="plain">Plain Alert</Alert>
					</div>
				</LiveExample>

				<LiveExample
					title="Different Alert Types"
					code={`<Alert color="neutral">
  System Update Available: Version 2.0 includes performance improvements.
</Alert>

<Alert color="success">
  Payment Received
</Alert>

<Alert color="warning">
  Low Battery: Connect charger to continue.
</Alert>

<Alert color="danger">
  No Internet Connection
</Alert>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert color="neutral">
							System Update Available: Version 2.0 includes performance improvements.
						</Alert>

						<Alert color="success">Payment Received</Alert>

						<Alert color="warning">Low Battery: Connect charger to continue.</Alert>

						<Alert color="danger">No Internet Connection</Alert>
					</div>
				</LiveExample>

				<LiveExample
					title="Alert Messages"
					code={`<Alert color="neutral">
  New Feature Available: Try our new dark mode in settings.
</Alert>

<Alert color="warning">
  Your session will expire in 5 minutes.
</Alert>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert color="neutral">
							New Feature Available: Try our new dark mode in settings.
						</Alert>
						<Alert color="warning">Your session will expire in 5 minutes.</Alert>
					</div>
				</LiveExample>

				<LiveExample
					title="Simple Alerts"
					code={`<Alert color="warning">
  Unsaved Changes: You have unsaved changes that will be lost.
</Alert>

<Alert color="danger">
  Payment Failed: We couldn't process your payment.
</Alert>

<Alert color="success">
  File Uploaded
</Alert>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert color="warning">
							Unsaved Changes: You have unsaved changes that will be lost.
						</Alert>

						<Alert color="danger">Payment Failed: We couldn't process your payment.</Alert>

						<Alert color="success">File Uploaded</Alert>
					</div>
				</LiveExample>

				<LiveExample
					title="Soft Variant"
					code={`<Alert color="neutral" variant="soft">
  Simple Message: This alert uses the soft variant for a cleaner look.
</Alert>`}
				>
					<Alert color="neutral" variant="soft">
						Simple Message: This alert uses the soft variant for a cleaner look.
					</Alert>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Alert } from '@braingame/bgui';
import { useState } from 'react';

function FormWithValidation() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccess(false);
      
      // Validate form
      if (!formData.email) {
        throw new Error('Email is required');
      }
      
      // Submit form
      await api.submitForm(formData);
      setSuccess(true);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <Alert
          color="danger"
          style={styles.alert}
        >
          Validation Error: {error}
        </Alert>
      )}
      
      {success && (
        <Alert
          color="success"
          style={styles.alert}
        >
          Form Submitted: We'll get back to you within 24 hours.
        </Alert>
      )}
      
      {/* Form fields */}
      
      <Button onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">System Status</h3>
				<CodeBlock
					code={`// Connection status
{!isOnline && (
  <Alert color="warning">
    Offline Mode: Some features may be limited.
  </Alert>
)}

// Maintenance notice
<Alert color="neutral">
  Scheduled Maintenance: System will be unavailable from 2-4 AM EST.
</Alert>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Form Feedback</h3>
				<CodeBlock
					code={`// Field-level validation
{errors.password && (
  <Alert
    color="danger"
    variant="outlined"
  >
    {errors.password}
  </Alert>
)}

// Success confirmation
{submitted && (
  <Alert color="success">
    Account Created! Check your email to verify your account.
  </Alert>
)}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">In-App Notifications</h3>
				<CodeBlock
					code={`// Update notification
<Alert color="neutral">
  New Version Available: Update to get the latest features and improvements.
</Alert>

// Feature announcement
<Alert color="success">
  New Feature: Dark Mode - You can now switch to dark mode in settings.
</Alert>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear messaging:</strong> Use concise, actionable language that tells users what
						happened and what to do next.
					</li>
					<li className="mb-2">
						<strong>Appropriate severity:</strong> Choose the right color (neutral, success, warning,
						danger) to match the message importance.
					</li>
					<li className="mb-2">
						<strong>Actionable alerts:</strong> When possible, provide actions users can take to
						resolve issues or learn more.
					</li>
					<li className="mb-2">
						<strong>Placement:</strong> Position alerts where they'll be noticed but won't disrupt
						the user's workflow.
					</li>
					<li className="mb-2">
						<strong>Persistence:</strong> Error and warning alerts should remain visible until
						explicitly dismissed or the issue is resolved.
					</li>
					<li className="mb-2">
						<strong>Animation:</strong> Use subtle entrance animations to draw attention without
						being jarring.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Alerts must be accessible to all users:</p>
				<ul>
					<li>Use appropriate ARIA roles (alert, status) based on urgency</li>
					<li>Ensure alerts are announced by screen readers when they appear</li>
					<li>Provide sufficient color contrast for all alert types</li>
					<li>Don't rely solely on color to convey meaning (use icons and text)</li>
					<li>Make dismiss buttons keyboard accessible</li>
					<li>Include descriptive text for icons used in alerts</li>
				</ul>
			</section>

			<PropsTable props={alertProps} />
		</div>
	);
}