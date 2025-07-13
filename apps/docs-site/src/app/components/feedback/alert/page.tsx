"use client";

import { Alert } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const alertProps = [
	{
		name: "type",
		type: '"info" | "success" | "warning" | "error"',
		required: false,
		default: '"info"',
		description: "The type of alert which determines its color and default icon.",
	},
	{
		name: "message",
		type: "string",
		required: true,
		description: "The main message to display in the alert.",
	},
	{
		name: "variant",
		type: '"banner" | "inline" | "floating"',
		required: false,
		default: '"inline"',
		description: "Visual style variant of the alert.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the alert container.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
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
					code={`<Alert 
  type="info" 
  message="Info Alert: This is additional information that might be helpful."
/>

<Alert 
  type="success" 
  message="Success Alert: Your changes have been saved successfully."
/>

<Alert 
  type="warning" 
  message="Warning Alert: Please review your input before proceeding."
/>

<Alert 
  type="error" 
  message="Error Alert: Something went wrong. Please try again."
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="info"
							message="Info Alert: This is additional information that might be helpful."
						/>

						<Alert
							type="success"
							message="Success Alert: Your changes have been saved successfully."
						/>

						<Alert
							type="warning"
							message="Warning Alert: Please review your input before proceeding."
						/>

						<Alert type="error" message="Error Alert: Something went wrong. Please try again." />
					</div>
				</LiveExample>

				<LiveExample
					title="Alert Variants"
					code={`<Alert 
  type="info" 
  message="Banner Alert"
  variant="banner"
/>

<Alert 
  type="info" 
  message="Inline Alert"
  variant="inline"
/>

<Alert 
  type="info" 
  message="Floating Alert"
  variant="floating"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert type="info" message="Banner Alert" variant="banner" />

						<Alert type="info" message="Inline Alert" variant="inline" />

						<Alert type="info" message="Floating Alert" variant="floating" />
					</div>
				</LiveExample>

				<LiveExample
					title="Different Alert Types"
					code={`<Alert 
  type="info" 
  message="System Update Available: Version 2.0 includes performance improvements."
/>

<Alert 
  type="success" 
  message="Payment Received"
/>

<Alert 
  type="warning" 
  message="Low Battery: Connect charger to continue."
/>

<Alert 
  type="error" 
  message="No Internet Connection"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="info"
							message="System Update Available: Version 2.0 includes performance improvements."
						/>

						<Alert type="success" message="Payment Received" />

						<Alert type="warning" message="Low Battery: Connect charger to continue." />

						<Alert type="error" message="No Internet Connection" />
					</div>
				</LiveExample>

				<LiveExample
					title="Alert Messages"
					code={`<Alert 
  type="info" 
  message="New Feature Available: Try our new dark mode in settings."
/>

<Alert 
  type="warning" 
  message="Your session will expire in 5 minutes."
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="info"
							message="New Feature Available: Try our new dark mode in settings."
						/>
						<Alert type="warning" message="Your session will expire in 5 minutes." />
					</div>
				</LiveExample>

				<LiveExample
					title="Simple Alerts"
					code={`<Alert 
  type="warning" 
  message="Unsaved Changes: You have unsaved changes that will be lost."
/>

<Alert 
  type="error" 
  message="Payment Failed: We couldn't process your payment."
/>

<Alert 
  type="success" 
  message="File Uploaded"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="warning"
							message="Unsaved Changes: You have unsaved changes that will be lost."
						/>

						<Alert type="error" message="Payment Failed: We couldn't process your payment." />

						<Alert type="success" message="File Uploaded" />
					</div>
				</LiveExample>

				<LiveExample
					title="Floating Variant"
					code={`<Alert 
  type="info" 
  message="Simple Message: This alert uses the floating variant for a cleaner look."
  variant="floating"
/>`}
				>
					<Alert
						type="info"
						message="Simple Message: This alert uses the floating variant for a cleaner look."
						variant="floating"
					/>
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
          type="error"
          message={\`Validation Error: \${error}\`}
          style={styles.alert}
        />
      )}
      
      {success && (
        <Alert
          type="success"
          message="Form Submitted: We'll get back to you within 24 hours."
          style={styles.alert}
        />
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
  <Alert
    type="warning"
    message="Offline Mode: Some features may be limited."
  />
)}

// Maintenance notice
<Alert
  type="info"
  message="Scheduled Maintenance: System will be unavailable from 2-4 AM EST."
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Form Feedback</h3>
				<CodeBlock
					code={`// Field-level validation
{errors.password && (
  <Alert
    type="error"
    message={errors.password}
    variant="inline"
  />
)}

// Success confirmation
{submitted && (
  <Alert
    type="success"
    message="Account Created! Check your email to verify your account."
  />
)}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">In-App Notifications</h3>
				<CodeBlock
					code={`// Update notification
<Alert
  type="info"
  message="New Version Available: Update to get the latest features and improvements."
/>

// Feature announcement
<Alert
  type="success"
  message="New Feature: Dark Mode - You can now switch to dark mode in settings."
/>`}
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
						<strong>Appropriate severity:</strong> Choose the right type (info, success, warning,
						error) to match the message importance.
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
