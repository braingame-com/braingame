"use client";

import { Alert, Button } from "../../../../components/BGUIDemo";
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
		name: "title",
		type: "string",
		required: true,
		description: "The main message or title of the alert.",
	},
	{
		name: "description",
		type: "string",
		required: false,
		description: "Additional descriptive text for the alert.",
	},
	{
		name: "icon",
		type: "string | boolean",
		required: false,
		default: "true",
		description: "Material icon name to display, or boolean to show/hide default icon.",
	},
	{
		name: "variant",
		type: '"filled" | "outlined" | "standard"',
		required: false,
		default: '"standard"',
		description: "Visual style variant of the alert.",
	},
	{
		name: "closable",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether the alert can be dismissed.",
	},
	{
		name: "onClose",
		type: "() => void",
		required: false,
		description: "Callback when the alert is closed. Required if closable is true.",
	},
	{
		name: "action",
		type: "React.ReactNode",
		required: false,
		description: "Optional action button or custom component.",
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
  title="Info Alert"
  description="This is additional information that might be helpful." 
/>

<Alert 
  type="success" 
  title="Success Alert"
  description="Your changes have been saved successfully." 
/>

<Alert 
  type="warning" 
  title="Warning Alert"
  description="Please review your input before proceeding." 
/>

<Alert 
  type="error" 
  title="Error Alert"
  description="Something went wrong. Please try again." 
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="info"
							title="Info Alert"
							description="This is additional information that might be helpful."
						/>

						<Alert
							type="success"
							title="Success Alert"
							description="Your changes have been saved successfully."
						/>

						<Alert
							type="warning"
							title="Warning Alert"
							description="Please review your input before proceeding."
						/>

						<Alert
							type="error"
							title="Error Alert"
							description="Something went wrong. Please try again."
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="Alert Variants"
					code={`<Alert 
  type="info" 
  title="Standard Alert"
  variant="standard"
/>

<Alert 
  type="info" 
  title="Filled Alert"
  variant="filled"
/>

<Alert 
  type="info" 
  title="Outlined Alert"
  variant="outlined"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert type="info" title="Standard Alert" variant="standard" />

						<Alert type="info" title="Filled Alert" variant="filled" />

						<Alert type="info" title="Outlined Alert" variant="outlined" />
					</div>
				</LiveExample>

				<LiveExample
					title="Custom Icons"
					code={`<Alert 
  type="info" 
  title="System Update Available"
  description="Version 2.0 includes performance improvements."
  icon="system_update"
/>

<Alert 
  type="success" 
  title="Payment Received"
  icon="payments"
/>

<Alert 
  type="warning" 
  title="Low Battery"
  description="Connect charger to continue."
  icon="battery_alert"
/>

<Alert 
  type="error" 
  title="No Internet Connection"
  icon="wifi_off"
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="info"
							title="System Update Available"
							description="Version 2.0 includes performance improvements."
							icon="system_update"
						/>

						<Alert type="success" title="Payment Received" icon="payments" />

						<Alert
							type="warning"
							title="Low Battery"
							description="Connect charger to continue."
							icon="battery_alert"
						/>

						<Alert type="error" title="No Internet Connection" icon="wifi_off" />
					</div>
				</LiveExample>

				<LiveExample
					title="Closable Alerts"
					code={`const [visible, setVisible] = useState(true);

return visible ? (
  <Alert 
    type="info" 
    title="New Feature Available"
    description="Try our new dark mode in settings."
    closable
    onClose={() => setVisible(false)}
  />
) : (
  <Button onPress={() => setVisible(true)}>
    Show Alert
  </Button>
);`}
				>
					<Alert
						type="info"
						title="New Feature Available"
						description="Try our new dark mode in settings."
						closable
						onClose={() => {}}
					/>
				</LiveExample>

				<LiveExample
					title="Alerts with Actions"
					code={`<Alert 
  type="warning" 
  title="Unsaved Changes"
  description="You have unsaved changes that will be lost."
  action={
    <Button size="medium" onPress={() => {}}>
      Save Now
    </Button>
  }
/>

<Alert 
  type="error" 
  title="Payment Failed"
  description="We couldn't process your payment."
  action={
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button size="medium" variant="ghost" onPress={() => {}}>
        Cancel
      </Button>
      <Button size="medium" onPress={() => {}}>
        Retry
      </Button>
    </View>
  }
/>

<Alert 
  type="success" 
  title="File Uploaded"
  action={
    <Button size="medium" variant="ghost" onPress={() => {}}>
      View File
    </Button>
  }
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<Alert
							type="warning"
							title="Unsaved Changes"
							description="You have unsaved changes that will be lost."
							action={
								<Button size="medium" onPress={() => {}}>
									Save Now
								</Button>
							}
						/>

						<Alert
							type="error"
							title="Payment Failed"
							description="We couldn't process your payment."
							action={
								<div style={{ display: "flex", gap: 8 }}>
									<Button size="medium" variant="ghost" onPress={() => {}}>
										Cancel
									</Button>
									<Button size="medium" onPress={() => {}}>
										Retry
									</Button>
								</div>
							}
						/>

						<Alert
							type="success"
							title="File Uploaded"
							action={
								<Button size="medium" variant="ghost" onPress={() => {}}>
									View File
								</Button>
							}
						/>
					</div>
				</LiveExample>

				<LiveExample
					title="No Icon"
					code={`<Alert 
  type="info" 
  title="Simple Message"
  description="This alert has no icon for a cleaner look."
  icon={false}
/>`}
				>
					<Alert
						type="info"
						title="Simple Message"
						description="This alert has no icon for a cleaner look."
						icon={false}
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
          title="Validation Error"
          description={error}
          closable
          onClose={() => setError(null)}
          style={styles.alert}
        />
      )}
      
      {success && (
        <Alert
          type="success"
          title="Form Submitted"
          description="We'll get back to you within 24 hours."
          closable
          onClose={() => setSuccess(false)}
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
    title="Offline Mode"
    description="Some features may be limited."
    icon="cloud_off"
  />
)}

// Maintenance notice
<Alert
  type="info"
  title="Scheduled Maintenance"
  description="System will be unavailable from 2-4 AM EST."
  icon="engineering"
  action={
    <Button size="medium" variant="ghost" onPress={viewDetails}>
      Learn More
    </Button>
  }
/>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Form Feedback</h3>
				<CodeBlock
					code={`// Field-level validation
{errors.password && (
  <Alert
    type="error"
    title={errors.password}
    variant="outlined"
    icon="lock"
  />
)}

// Success confirmation
{submitted && (
  <Alert
    type="success"
    title="Account Created!"
    description="Check your email to verify your account."
    action={
      <Button size="medium" onPress={navigateToLogin}>
        Go to Login
      </Button>
    }
  />
)}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">In-App Notifications</h3>
				<CodeBlock
					code={`// Update notification
<Alert
  type="info"
  title="New Version Available"
  description="Update to get the latest features and improvements."
  closable
  onClose={dismissUpdate}
  action={
    <Button size="medium" variant="primary" onPress={updateApp}>
      Update Now
    </Button>
  }
/>

// Feature announcement
<Alert
  type="success"
  title="New Feature: Dark Mode"
  description="You can now switch to dark mode in settings."
  icon="dark_mode"
  closable
  onClose={dismissAnnouncement}
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
