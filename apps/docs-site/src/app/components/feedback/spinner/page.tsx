"use client";

import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const spinnerProps = [
	{
		name: "size",
		type: '"small" | "medium" | "large" | number',
		required: false,
		default: '"medium"',
		description: "Size of the spinner. Can be preset or custom pixel value.",
	},
	{
		name: "color",
		type: "string",
		required: false,
		default: "var(--color-primary)",
		description: "Color of the spinner. Accepts any valid CSS color.",
	},
	{
		name: "thickness",
		type: "number",
		required: false,
		default: "3",
		description: "Thickness of the spinner stroke in pixels.",
	},
	{
		name: "speed",
		type: '"slow" | "normal" | "fast"',
		required: false,
		default: '"normal"',
		description: "Animation speed of the spinner.",
	},
	{
		name: "label",
		type: "string",
		required: false,
		description: "Optional text label to display below the spinner.",
	},
	{
		name: "labelPosition",
		type: '"bottom" | "right"',
		required: false,
		default: '"bottom"',
		description: "Position of the label relative to the spinner.",
	},
	{
		name: "overlay",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether to show spinner with a backdrop overlay.",
	},
	{
		name: "overlayColor",
		type: "string",
		required: false,
		default: "rgba(0, 0, 0, 0.5)",
		description: "Background color of the overlay.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
];

export default function SpinnerDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">Spinner</h1>
			<p className="text-subtitle text-secondary mb-8">
				Spinners indicate loading states and ongoing processes. They provide visual feedback that
				the system is working on a task.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Sizes"
					code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size={60} /> // Custom size`}
				>
					<div className="flex flex--row flex--gap-6 flex--align-center">
						<div className="spinner spinner--small" />
						<div className="spinner spinner--medium" />
						<div className="spinner spinner--large" />
						<div className="spinner" style={{ width: 60, height: 60 }} />
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<Spinner color="var(--color-primary)" />
<Spinner color="var(--color-secondary)" />
<Spinner color="var(--color-success)" />
<Spinner color="var(--color-error)" />`}
				>
					<div className="flex flex--row flex--gap-6 flex--align-center">
						<div className="spinner" style={{ borderTopColor: "var(--color-primary)" }} />
						<div className="spinner" style={{ borderTopColor: "var(--color-secondary)" }} />
						<div className="spinner" style={{ borderTopColor: "var(--color-success)" }} />
						<div className="spinner" style={{ borderTopColor: "var(--color-error)" }} />
					</div>
				</LiveExample>

				<LiveExample
					title="Animation Speeds"
					code={`<Spinner speed="slow" />
<Spinner speed="normal" />
<Spinner speed="fast" />`}
				>
					<div className="flex flex--row flex--gap-6 flex--align-center">
						<div className="spinner spinner--slow" />
						<div className="spinner spinner--normal" />
						<div className="spinner spinner--fast" />
					</div>
				</LiveExample>

				<LiveExample
					title="With Labels"
					code={`<Spinner label="Loading..." />

<Spinner 
  label="Processing" 
  labelPosition="bottom" 
/>

<Spinner 
  label="Please wait" 
  labelPosition="right" 
  size="sm"
/>`}
				>
					<div className="flex flex--row flex--gap-8 flex--align-center">
						<div className="spinner-container">
							<div className="spinner" />
							<span className="spinner__label">Loading...</span>
						</div>
						<div className="spinner-container">
							<div className="spinner" />
							<span className="spinner__label">Processing</span>
						</div>
						<div className="spinner-container spinner-container--horizontal">
							<div className="spinner spinner--small" />
							<span className="spinner__label">Please wait</span>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Loading States"
					code={`// Loading button
<Button disabled>
  <Spinner size="sm" color="white" />
  <Text>Saving...</Text>
</Button>

// Loading card
<Card>
  <View style={styles.loadingContainer}>
    <Spinner />
    <Text style={styles.loadingText}>
      Fetching data...
    </Text>
  </View>
</Card>

// Loading list item
<ListItem
  title="Document.pdf"
  subtitle="Uploading..."
  right={<Spinner size="sm" />}
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<button
							type="button"
							className="button button--primary"
							disabled
							style={{ gap: "var(--space-2)" }}
						>
							<div className="spinner spinner--small" style={{ borderTopColor: "white" }} />
							Saving...
						</button>

						<div className="card card--outlined" style={{ padding: "var(--space-6)" }}>
							<div className="flex flex--column flex--align-center flex--gap-3">
								<div className="spinner" />
								<span className="text-body text-secondary">Fetching data...</span>
							</div>
						</div>

						<div
							className="flex flex--row flex--align-center flex--justify-between"
							style={{
								padding: "var(--space-3)",
								backgroundColor: "var(--color-surface-container)",
								borderRadius: "var(--radius-md)",
							}}
						>
							<div>
								<div className="text-body font-medium">Document.pdf</div>
								<div className="text-caption text-secondary">Uploading...</div>
							</div>
							<div className="spinner spinner--small" />
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Full Screen Overlay"
					code={`// Full screen loading
<Spinner 
  overlay 
  label="Loading application..." 
/>

// Custom overlay
<Spinner 
  overlay
  overlayColor="rgba(255, 255, 255, 0.9)"
  color="var(--color-primary)"
  label="Please wait"
/>`}
				>
					<div
						style={{
							position: "relative",
							height: 200,
							backgroundColor: "var(--color-surface-container)",
							borderRadius: "var(--radius-lg)",
							overflow: "hidden",
						}}
					>
						<div style={{ padding: "var(--space-4)" }}>
							<h3 className="text-heading mb-2">Content Area</h3>
							<p className="text-body">This content is covered by the loading overlay.</p>
						</div>
						<div className="spinner-overlay">
							<div className="spinner-container">
								<div className="spinner" />
								<span className="spinner__label">Loading...</span>
							</div>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Skeleton Loading"
					code={`// Alternative to spinners - skeleton screens
<View style={styles.card}>
  <Skeleton width={200} height={20} />
  <Skeleton width={150} height={16} style={{ marginTop: 8 }} />
  <Skeleton width="100%" height={100} style={{ marginTop: 16 }} />
</View>`}
				>
					<div className="card card--outlined">
						<div className="skeleton" style={{ width: 200, height: 20 }} />
						<div className="skeleton" style={{ width: 150, height: 16, marginTop: 8 }} />
						<div className="skeleton" style={{ width: "100%", height: 100, marginTop: 16 }} />
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Spinner } from '@braingame/bgui';

// Basic loading state
function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Spinner size="lg" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

// Conditional loading
function DataList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner label="Loading items..." />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListItem {...item} />}
    />
  );
}

// Loading overlay
function UploadScreen() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    try {
      await uploadFile();
      navigation.goBack();
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen content */}
      
      {uploading && (
        <Spinner
          overlay
          label="Uploading file..."
          overlayColor="rgba(0, 0, 0, 0.7)"
        />
      )}
    </View>
  );
}

// Custom loading component
function LoadingButton({ loading, onPress, children }) {
  return (
    <Button
      onPress={onPress}
      disabled={loading}
      style={styles.button}
    >
      {loading ? (
        <>
          <Spinner size="sm" color="white" />
          <Text>Processing...</Text>
        </>
      ) : (
        children
      )}
    </Button>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">List Loading</h3>
				<CodeBlock
					code={`// Initial load
if (loading && !data.length) {
  return <Spinner label="Loading items..." />;
}

// Refresh
<FlatList
  data={data}
  refreshing={refreshing}
  onRefresh={handleRefresh}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      tintColor="var(--color-primary)"
    />
  }
/>

// Load more
ListFooterComponent={() => 
  loadingMore ? <Spinner size="sm" /> : null
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Form Submission</h3>
				<CodeBlock
					code={`function SubmitButton({ onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  
  const handlePress = async () => {
    setSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Button
      onPress={handlePress}
      disabled={submitting}
      style={styles.submitButton}
    >
      {submitting ? (
        <Spinner size="sm" color="white" />
      ) : (
        <Text>Submit</Text>
      )}
    </Button>
  );
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Image Loading</h3>
				<CodeBlock
					code={`function LazyImage({ source, ...props }) {
  const [loading, setLoading] = useState(true);
  
  return (
    <View style={styles.imageContainer}>
      {loading && (
        <View style={[styles.imagePlaceholder, props.style]}>
          <Spinner size="sm" />
        </View>
      )}
      <Image
        source={source}
        onLoadEnd={() => setLoading(false)}
        style={[props.style, loading && styles.hidden]}
        {...props}
      />
    </View>
  );
}`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Provide context:</strong> Always include descriptive text to explain what's
						loading.
					</li>
					<li className="mb-2">
						<strong>Size appropriately:</strong> Match spinner size to its context - small for
						buttons, large for full-screen loads.
					</li>
					<li className="mb-2">
						<strong>Avoid spinner fatigue:</strong> For quick operations ({"<"}300ms), consider not
						showing a spinner.
					</li>
					<li className="mb-2">
						<strong>Progressive loading:</strong> Show content as it loads rather than waiting for
						everything.
					</li>
					<li className="mb-2">
						<strong>Skeleton screens:</strong> Consider skeleton screens for content-heavy loads to
						maintain layout.
					</li>
					<li className="mb-2">
						<strong>Error states:</strong> Always handle loading failures with appropriate error
						messages.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Spinners must be accessible to all users:</p>
				<ul>
					<li>Use aria-busy="true" on loading containers</li>
					<li>Provide aria-label or visible text describing what's loading</li>
					<li>Announce loading completion to screen readers</li>
					<li>Ensure sufficient color contrast against backgrounds</li>
					<li>Consider reduced motion preferences for animations</li>
					<li>Provide alternative loading indicators for users who can't see spinners</li>
				</ul>
			</section>

			<PropsTable props={spinnerProps} />

			<style jsx>{`
				.spinner {
					width: 32px;
					height: 32px;
					border: 3px solid var(--color-outline-variant);
					border-top-color: var(--color-primary);
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}

				.spinner--small {
					width: 20px;
					height: 20px;
					border-width: 2px;
				}

				.spinner--medium {
					width: 32px;
					height: 32px;
					border-width: 3px;
				}

				.spinner--large {
					width: 48px;
					height: 48px;
					border-width: 4px;
				}

				.spinner--slow {
					animation-duration: 1.5s;
				}

				.spinner--normal {
					animation-duration: 1s;
				}

				.spinner--fast {
					animation-duration: 0.75s;
				}

				.spinner-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: var(--space-2);
				}

				.spinner-container--horizontal {
					flex-direction: row;
				}

				.spinner__label {
					color: var(--color-on-surface-variant);
					font-size: var(--text-sm);
				}

				.spinner-overlay {
					position: absolute;
					inset: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: rgba(0, 0, 0, 0.5);
				}

				.skeleton {
					background: linear-gradient(
						90deg,
						var(--color-surface-container) 25%,
						var(--color-surface-container-high) 50%,
						var(--color-surface-container) 75%
					);
					background-size: 200% 100%;
					animation: skeleton-loading 1.5s ease-in-out infinite;
					border-radius: var(--radius-sm);
				}

				@keyframes spin {
					to {
						transform: rotate(360deg);
					}
				}

				@keyframes skeleton-loading {
					0% {
						background-position: 200% 0;
					}
					100% {
						background-position: -200% 0;
					}
				}
			`}</style>
		</div>
	);
}
