"use client";

import { Button } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const toastProps = [
	{
		name: "message",
		type: "string",
		required: true,
		description: "The message to display in the toast.",
	},
	{
		name: "type",
		type: '"info" | "success" | "warning" | "error"',
		required: false,
		default: '"info"',
		description: "The type of toast which determines its color and icon.",
	},
	{
		name: "duration",
		type: "number",
		required: false,
		default: "3000",
		description: "Duration in milliseconds before the toast auto-dismisses. Set to 0 to disable.",
	},
	{
		name: "position",
		type: '"top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
		required: false,
		default: '"bottom"',
		description: "Position where the toast appears on screen.",
	},
	{
		name: "icon",
		type: "string | boolean",
		required: false,
		default: "true",
		description: "Material icon name to display, or boolean to show/hide default icon.",
	},
	{
		name: "action",
		type: "{ label: string; onPress: () => void }",
		required: false,
		description: "Optional action button configuration.",
	},
	{
		name: "onClose",
		type: "() => void",
		required: false,
		description: "Callback when the toast is dismissed.",
	},
];

export default function ToastDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Toast</h1>
			<p className="text-subtitle text-secondary mb-8">
				Toasts provide brief, non-intrusive notifications that appear temporarily and don't require
				user interaction. They're ideal for system feedback and status updates.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Usage"
					code={`// Import toast utility
import { toast } from '@braingame/bgui';

// Show different toast types
<Button onPress={() => toast.info("This is an info message")}>
  Info Toast
</Button>

<Button onPress={() => toast.success("Operation completed!")}>
  Success Toast
</Button>

<Button onPress={() => toast.warning("Please review your input")}>
  Warning Toast
</Button>

<Button onPress={() => toast.error("Something went wrong")}>
  Error Toast
</Button>`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<Button onPress={() => console.log("Info toast")}>Info Toast</Button>
						<Button onPress={() => console.log("Success toast")}>Success Toast</Button>
						<Button onPress={() => console.log("Warning toast")}>Warning Toast</Button>
						<Button onPress={() => console.log("Error toast")}>Error Toast</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Custom Icons"
					code={`toast.info("File saved", {
  icon: "save"
});

toast.success("Email sent", {
  icon: "send"
});

toast.info("Syncing...", {
  icon: "sync",
  duration: 0 // Persistent toast
});

toast.error("No internet connection", {
  icon: "wifi_off"
});`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<Button onPress={() => console.log("File saved")}>Save Toast</Button>
						<Button onPress={() => console.log("Email sent")}>Send Toast</Button>
						<Button onPress={() => console.log("Syncing")}>Sync Toast</Button>
						<Button onPress={() => console.log("No internet")}>Offline Toast</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Toast with Actions"
					code={`// Undo action
toast.success("Item deleted", {
  action: {
    label: "Undo",
    onPress: () => {
      // Restore item
      undoDelete();
    }
  }
});

// Retry action
toast.error("Upload failed", {
  action: {
    label: "Retry",
    onPress: () => {
      retryUpload();
    }
  }
});

// View details action
toast.info("New message received", {
  action: {
    label: "View",
    onPress: () => {
      navigation.navigate("Messages");
    }
  }
});`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<Button onPress={() => console.log("Undo toast")}>Undo Toast</Button>
						<Button onPress={() => console.log("Retry toast")}>Retry Toast</Button>
						<Button onPress={() => console.log("View toast")}>View Toast</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Positioning"
					code={`// Top positions
toast.info("Top toast", { position: "top" });
toast.info("Top left", { position: "top-left" });
toast.info("Top right", { position: "top-right" });

// Bottom positions
toast.info("Bottom toast", { position: "bottom" });
toast.info("Bottom left", { position: "bottom-left" });
toast.info("Bottom right", { position: "bottom-right" });`}
				>
					<div className="grid grid--cols-3 gap-3">
						<Button size="sm" onPress={() => console.log("Top left")}>
							Top Left
						</Button>
						<Button size="sm" onPress={() => console.log("Top")}>
							Top
						</Button>
						<Button size="sm" onPress={() => console.log("Top right")}>
							Top Right
						</Button>
						<Button size="sm" onPress={() => console.log("Bottom left")}>
							Bottom Left
						</Button>
						<Button size="sm" onPress={() => console.log("Bottom")}>
							Bottom
						</Button>
						<Button size="sm" onPress={() => console.log("Bottom right")}>
							Bottom Right
						</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Duration Control"
					code={`// Quick toast (1 second)
toast.info("Quick message", { duration: 1000 });

// Long toast (10 seconds)
toast.info("Important message", { duration: 10000 });

// Persistent toast (manual dismiss)
toast.warning("Action required", { 
  duration: 0,
  action: {
    label: "Dismiss",
    onPress: () => toast.dismiss()
  }
});`}
				>
					<div className="flex flex--row flex--gap-3 flex--wrap">
						<Button onPress={() => console.log("Quick toast")}>Quick (1s)</Button>
						<Button onPress={() => console.log("Long toast")}>Long (10s)</Button>
						<Button onPress={() => console.log("Persistent toast")}>Persistent</Button>
					</div>
				</LiveExample>

				<LiveExample
					title="Loading States"
					code={`// Show loading toast
const toastId = toast.loading("Uploading file...");

// Update to success
toast.update(toastId, {
  type: "success",
  message: "File uploaded successfully!",
  icon: "cloud_done"
});

// Or update to error
toast.update(toastId, {
  type: "error",
  message: "Upload failed",
  action: {
    label: "Retry",
    onPress: retryUpload
  }
});`}
				>
					<Button onPress={() => console.log("Loading toast flow")}>Upload with Feedback</Button>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { toast } from '@braingame/bgui';

// Basic notifications
function handleSave() {
  try {
    await saveDocument();
    toast.success("Document saved");
  } catch (error) {
    toast.error("Failed to save document");
  }
}

// With configuration
function handleDelete() {
  const deleted = await deleteItem();
  
  toast.success("Item deleted", {
    duration: 5000,
    action: {
      label: "Undo",
      onPress: async () => {
        await restoreItem(deleted.id);
        toast.info("Item restored");
      }
    }
  });
}

// Loading states
async function uploadFile(file) {
  const toastId = toast.loading("Uploading file...");
  
  try {
    const result = await api.upload(file);
    
    toast.update(toastId, {
      type: "success",
      message: "File uploaded successfully!",
      action: {
        label: "View",
        onPress: () => openFile(result.id)
      }
    });
  } catch (error) {
    toast.update(toastId, {
      type: "error",
      message: error.message,
      duration: 0, // Keep visible for errors
      action: {
        label: "Retry",
        onPress: () => uploadFile(file)
      }
    });
  }
}

// Dismiss toasts programmatically
function clearAllNotifications() {
  toast.dismiss(); // Dismiss all toasts
  // or
  toast.dismiss(specificToastId); // Dismiss specific toast
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Toast Provider Setup</h2>
				<CodeBlock
					code={`// App.tsx
import { ToastProvider } from '@braingame/bgui';

export default function App() {
  return (
    <ToastProvider
      position="bottom"
      offset={20}
      maxToasts={3}
    >
      <NavigationContainer>
        {/* Your app content */}
      </NavigationContainer>
    </ToastProvider>
  );
}

// ToastProvider props
interface ToastProviderProps {
  position?: ToastPosition;
  offset?: number; // Distance from screen edge
  maxToasts?: number; // Max visible toasts
  swipeToDismiss?: boolean;
  theme?: {
    info?: ColorValue;
    success?: ColorValue;
    warning?: ColorValue;
    error?: ColorValue;
  };
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Form Validation</h3>
				<CodeBlock
					code={`function validateForm(data) {
  const errors = [];
  
  if (!data.email) {
    errors.push("Email is required");
  }
  
  if (!data.password) {
    errors.push("Password is required");
  }
  
  if (errors.length > 0) {
    // Show first error as toast
    toast.error(errors[0]);
    return false;
  }
  
  return true;
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Network Status</h3>
				<CodeBlock
					code={`useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      toast.warning("No internet connection", {
        icon: "wifi_off",
        duration: 0,
        position: "top"
      });
    } else {
      toast.dismiss(); // Clear offline toast
      toast.success("Back online", {
        icon: "wifi",
        duration: 2000
      });
    }
  });
  
  return unsubscribe;
}, []);`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Background Tasks</h3>
				<CodeBlock
					code={`async function syncData() {
  const toastId = toast.info("Syncing data...", {
    icon: "sync",
    duration: 0
  });
  
  try {
    const result = await api.sync();
    
    toast.update(toastId, {
      type: "success",
      message: \`Synced \${result.count} items\`,
      duration: 3000
    });
  } catch (error) {
    toast.update(toastId, {
      type: "error",
      message: "Sync failed",
      action: {
        label: "Retry",
        onPress: syncData
      }
    });
  }
}`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Keep messages brief:</strong> Toast messages should be concise and scannable at
						a glance.
					</li>
					<li className="mb-2">
						<strong>Appropriate duration:</strong> Info/success toasts should dismiss quickly
						(3-5s), while errors may need longer or manual dismissal.
					</li>
					<li className="mb-2">
						<strong>Actionable feedback:</strong> Provide actions for errors or operations that can
						be undone.
					</li>
					<li className="mb-2">
						<strong>Avoid overuse:</strong> Too many toasts can overwhelm users. Consider grouping
						or throttling notifications.
					</li>
					<li className="mb-2">
						<strong>Position consistently:</strong> Keep toasts in the same position throughout your
						app for predictability.
					</li>
					<li className="mb-2">
						<strong>Loading states:</strong> Use loading toasts for operations longer than 2
						seconds, then update with results.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Toasts must be accessible to all users:</p>
				<ul>
					<li>Toasts are announced by screen readers using ARIA live regions</li>
					<li>Important messages should also be available elsewhere in the UI</li>
					<li>Ensure sufficient color contrast for all toast types</li>
					<li>Actions in toasts should be keyboard accessible</li>
					<li>Consider providing a notification center for toast history</li>
					<li>Allow users to configure toast duration in accessibility settings</li>
				</ul>
			</section>

			<PropsTable props={toastProps} />
		</div>
	);
}
