"use client";

import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const progressBarProps = [
	{
		name: "value",
		type: "number",
		required: true,
		description: "Current progress value between 0 and max.",
	},
	{
		name: "max",
		type: "number",
		required: false,
		default: "100",
		description: "Maximum value for the progress bar.",
	},
	{
		name: "variant",
		type: '"determinate" | "indeterminate"',
		required: false,
		default: '"determinate"',
		description: "Whether progress shows a specific value or continuous animation.",
	},
	{
		name: "size",
		type: '"small" | "medium" | "large"',
		required: false,
		default: '"medium"',
		description: "Height of the progress bar.",
	},
	{
		name: "color",
		type: "string",
		required: false,
		default: "var(--color-primary)",
		description: "Color of the progress indicator.",
	},
	{
		name: "backgroundColor",
		type: "string",
		required: false,
		default: "var(--color-surface-container)",
		description: "Background color of the progress track.",
	},
	{
		name: "showLabel",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether to show the percentage label.",
	},
	{
		name: "labelPosition",
		type: '"inside" | "outside"',
		required: false,
		default: '"outside"',
		description: "Position of the percentage label.",
	},
	{
		name: "animated",
		type: "boolean",
		required: false,
		default: "true",
		description: "Whether to animate progress changes.",
	},
	{
		name: "striped",
		type: "boolean",
		required: false,
		default: "false",
		description: "Whether to show striped pattern on the progress bar.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		required: false,
		description: "Custom styles to apply to the progress bar container.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
];

export default function ProgressBarDocs() {
	return (
		<div>
			<h1 className="text-display mb-4">ProgressBar</h1>
			<p className="text-subtitle text-secondary mb-8">
				Progress bars show the progression of a system operation such as downloading, uploading,
				processing, or loading data. They inform users about the current status and help reduce
				uncertainty.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Progress"
					code={`<ProgressBar value={0} />
<ProgressBar value={25} />
<ProgressBar value={50} />
<ProgressBar value={75} />
<ProgressBar value={100} />`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="progress">
							<div className="progress__fill" style={{ width: "0%" }} />
						</div>
						<div className="progress">
							<div className="progress__fill" style={{ width: "25%" }} />
						</div>
						<div className="progress">
							<div className="progress__fill" style={{ width: "50%" }} />
						</div>
						<div className="progress">
							<div className="progress__fill" style={{ width: "75%" }} />
						</div>
						<div className="progress">
							<div className="progress__fill" style={{ width: "100%" }} />
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="With Labels"
					code={`<ProgressBar 
  value={45} 
  showLabel 
  labelPosition="outside" 
/>

<ProgressBar 
  value={72} 
  showLabel 
  labelPosition="inside" 
  size="lg"
/>`}
				>
					<div className="flex flex--column flex--gap-4">
						<div>
							<div className="progress">
								<div className="progress__fill" style={{ width: "45%" }} />
							</div>
							<div className="text-caption text-secondary mt-1">45%</div>
						</div>
						<div className="progress progress--large">
							<div className="progress__fill" style={{ width: "72%" }}>
								<span className="progress__label">72%</span>
							</div>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Sizes"
					code={`<ProgressBar value={60} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={60} size="lg" />`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="progress progress--small">
							<div className="progress__fill" style={{ width: "60%" }} />
						</div>
						<div className="progress progress--medium">
							<div className="progress__fill" style={{ width: "60%" }} />
						</div>
						<div className="progress progress--large">
							<div className="progress__fill" style={{ width: "60%" }} />
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Colors"
					code={`<ProgressBar value={40} color="var(--color-primary)" />
<ProgressBar value={60} color="var(--color-success)" />
<ProgressBar value={30} color="var(--color-warning)" />
<ProgressBar value={80} color="var(--color-error)" />`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="progress">
							<div
								className="progress__fill"
								style={{ width: "40%", backgroundColor: "var(--color-primary)" }}
							/>
						</div>
						<div className="progress">
							<div
								className="progress__fill"
								style={{ width: "60%", backgroundColor: "var(--color-success)" }}
							/>
						</div>
						<div className="progress">
							<div
								className="progress__fill"
								style={{ width: "30%", backgroundColor: "var(--color-warning)" }}
							/>
						</div>
						<div className="progress">
							<div
								className="progress__fill"
								style={{ width: "80%", backgroundColor: "var(--color-error)" }}
							/>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Indeterminate Progress"
					code={`<ProgressBar variant="indeterminate" />

<ProgressBar 
  variant="indeterminate" 
  color="var(--color-secondary)" 
/>

<ProgressBar 
  variant="indeterminate" 
  size="sm" 
  striped 
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="progress">
							<div className="progress__fill progress__fill--indeterminate" />
						</div>
						<div className="progress">
							<div
								className="progress__fill progress__fill--indeterminate"
								style={{ backgroundColor: "var(--color-secondary)" }}
							/>
						</div>
						<div className="progress progress--small">
							<div className="progress__fill progress__fill--indeterminate progress__fill--striped" />
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Striped & Animated"
					code={`<ProgressBar 
  value={75} 
  striped 
  animated 
/>

<ProgressBar 
  value={50} 
  striped 
  animated={false}
  color="var(--color-success)" 
/>`}
				>
					<div className="flex flex--column flex--gap-3">
						<div className="progress">
							<div
								className="progress__fill progress__fill--striped progress__fill--animated"
								style={{ width: "75%" }}
							/>
						</div>
						<div className="progress">
							<div
								className="progress__fill progress__fill--striped"
								style={{ width: "50%", backgroundColor: "var(--color-success)" }}
							/>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="File Upload Example"
					code={`function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  
  return (
    <Card padding="lg">
      <View style={styles.uploadHeader}>
        <Icon name="insert_drive_file" />
        <View style={styles.fileInfo}>
          <Text variant="body">document.pdf</Text>
          <Text variant="caption" color="secondary">
            {progress}% • 2.4 MB of 5.2 MB
          </Text>
        </View>
      </View>
      
      <ProgressBar 
        value={progress} 
        showLabel={false}
        animated
        color={
          status === 'error' ? 'var(--color-error)' : 
          status === 'complete' ? 'var(--color-success)' : 
          'var(--color-primary)'
        }
      />
      
      <View style={styles.actions}>
        <Button variant="ghost" size="sm">
          {status === 'uploading' ? 'Pause' : 'Cancel'}
        </Button>
      </View>
    </Card>
  );
}`}
				>
					<div className="card card--outlined" style={{ padding: "var(--space-6)" }}>
						<div className="flex flex--row flex--gap-3 mb-4">
							<span
								className="material-icons-round"
								style={{ color: "var(--color-on-surface-variant)" }}
							>
								insert_drive_file
							</span>
							<div className="flex--1">
								<div className="text-body">document.pdf</div>
								<div className="text-caption text-secondary">45% • 2.4 MB of 5.2 MB</div>
							</div>
						</div>
						<div className="progress">
							<div className="progress__fill progress__fill--animated" style={{ width: "45%" }} />
						</div>
						<div className="flex flex--row flex--justify-end mt-3">
							<button className="button button--ghost button--small">Cancel</button>
						</div>
					</div>
				</LiveExample>

				<LiveExample
					title="Multi-Step Process"
					code={`function MultiStepProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <View>
      <View style={styles.stepHeader}>
        <Text variant="caption" color="secondary">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text variant="caption" color="secondary">
          {Math.round(progress)}%
        </Text>
      </View>
      
      <ProgressBar 
        value={progress} 
        animated
        showLabel={false}
      />
      
      <View style={styles.steps}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepDot,
              index < currentStep && styles.stepComplete,
              index === currentStep - 1 && styles.stepActive
            ]}
          />
        ))}
      </View>
    </View>
  );
}`}
				>
					<div>
						<div className="flex flex--row flex--justify-between mb-2">
							<span className="text-caption text-secondary">Step 3 of 5</span>
							<span className="text-caption text-secondary">60%</span>
						</div>
						<div className="progress">
							<div className="progress__fill" style={{ width: "60%" }} />
						</div>
						<div className="flex flex--row flex--gap-2 flex--justify-center mt-3">
							<div className="step-dot step-dot--complete" />
							<div className="step-dot step-dot--complete" />
							<div className="step-dot step-dot--active" />
							<div className="step-dot" />
							<div className="step-dot" />
						</div>
					</div>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { ProgressBar } from '@braingame/bgui';
import { useState, useEffect } from 'react';

// Basic progress tracking
function DownloadProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text variant="heading">Downloading...</Text>
      <ProgressBar 
        value={progress}
        showLabel
        animated
      />
      {progress === 100 && (
        <Text color="success">Download complete!</Text>
      )}
    </View>
  );
}

// File upload with progress
function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.open('POST', '/api/upload');
    xhr.send(file);
  });
}

// Indeterminate loading
function DataLoader({ loading, children }) {
  if (loading) {
    return (
      <View style={styles.loader}>
        <ProgressBar variant="indeterminate" />
        <Text style={styles.loadingText}>
          Loading data...
        </Text>
      </View>
    );
  }
  
  return children;
}

// Multi-phase operation
function BatchProcessor({ items }) {
  const [processed, setProcessed] = useState(0);
  const [currentItem, setCurrentItem] = useState('');
  
  const processItems = async () => {
    for (let i = 0; i < items.length; i++) {
      setCurrentItem(items[i].name);
      await processItem(items[i]);
      setProcessed(i + 1);
    }
  };
  
  const progress = (processed / items.length) * 100;
  
  return (
    <Card>
      <Text variant="heading">Processing Items</Text>
      <Text variant="caption" color="secondary">
        {currentItem}
      </Text>
      <ProgressBar 
        value={progress}
        showLabel
        color={progress === 100 ? 'var(--color-success)' : undefined}
      />
      <Text variant="caption">
        {processed} of {items.length} items processed
      </Text>
    </Card>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Loading States</h3>
				<CodeBlock
					code={`// Page loading
function PageLoader() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate resource loading
    setProgress(30); // Scripts loaded
    setTimeout(() => setProgress(60), 500); // Styles loaded
    setTimeout(() => setProgress(90), 1000); // Images loaded
    setTimeout(() => setProgress(100), 1500); // Complete
  }, []);
  
  return (
    <View style={styles.pageLoader}>
      <ProgressBar 
        value={progress}
        size="sm"
        style={styles.topBar}
      />
    </View>
  );
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Form Progress</h3>
				<CodeBlock
					code={`function FormWizard({ steps, currentStep }) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <View>
      <ProgressBar 
        value={progress}
        size="sm"
        style={styles.formProgress}
      />
      <View style={styles.stepIndicators}>
        {steps.map((step, index) => (
          <View
            key={step.id}
            style={[
              styles.step,
              index <= currentStep - 1 && styles.stepActive
            ]}
          >
            <Text variant="caption">
              {step.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Skill Levels</h3>
				<CodeBlock
					code={`function SkillBar({ skill, level, maxLevel = 5 }) {
  const percentage = (level / maxLevel) * 100;
  
  return (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text>{skill}</Text>
        <Text variant="caption" color="secondary">
          {level}/{maxLevel}
        </Text>
      </View>
      <ProgressBar 
        value={percentage}
        size="sm"
        color={
          percentage >= 80 ? 'var(--color-success)' :
          percentage >= 60 ? 'var(--color-primary)' :
          percentage >= 40 ? 'var(--color-warning)' :
          'var(--color-error)'
        }
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
						<strong>Provide context:</strong> Always show what's being loaded and current status
						(percentage, time remaining, items processed).
					</li>
					<li className="mb-2">
						<strong>Use determinate when possible:</strong> Show specific progress rather than
						indeterminate when you can calculate it.
					</li>
					<li className="mb-2">
						<strong>Smooth animations:</strong> Animate progress changes to avoid jarring jumps.
					</li>
					<li className="mb-2">
						<strong>Error handling:</strong> Change color or show error state if operation fails.
					</li>
					<li className="mb-2">
						<strong>Completion feedback:</strong> Clearly indicate when progress is complete with
						color change or message.
					</li>
					<li className="mb-2">
						<strong>Avoid resets:</strong> Don't reset progress to 0 immediately after completion -
						let users see 100% briefly.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Progress bars must be accessible to all users:</p>
				<ul>
					<li>Use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax</li>
					<li>Provide aria-label describing what's loading</li>
					<li>Update aria-live regions with significant progress changes</li>
					<li>Ensure sufficient color contrast for progress indicators</li>
					<li>Provide text alternatives for progress (percentage, status)</li>
					<li>Consider announcing completion to screen readers</li>
				</ul>
			</section>

			<PropsTable props={progressBarProps} />

			<style jsx>{`
				.progress {
					width: 100%;
					height: 8px;
					background-color: var(--color-surface-container);
					border-radius: var(--radius-full);
					overflow: hidden;
					position: relative;
				}

				.progress--small {
					height: 4px;
				}

				.progress--medium {
					height: 8px;
				}

				.progress--large {
					height: 16px;
				}

				.progress__fill {
					height: 100%;
					background-color: var(--color-primary);
					border-radius: var(--radius-full);
					transition: width var(--duration-medium) var(--easing-standard);
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.progress__fill--indeterminate {
					width: 30%;
					position: absolute;
					animation: indeterminate 1.5s ease-in-out infinite;
				}

				.progress__fill--striped {
					background-image: linear-gradient(
						45deg,
						rgba(255, 255, 255, 0.15) 25%,
						transparent 25%,
						transparent 50%,
						rgba(255, 255, 255, 0.15) 50%,
						rgba(255, 255, 255, 0.15) 75%,
						transparent 75%,
						transparent
					);
					background-size: 1rem 1rem;
				}

				.progress__fill--animated {
					animation: stripes 1s linear infinite;
				}

				.progress__label {
					color: white;
					font-size: var(--text-xs);
					font-weight: var(--font-medium);
					padding: 0 var(--space-2);
				}

				.step-dot {
					width: 12px;
					height: 12px;
					border-radius: 50%;
					background-color: var(--color-surface-container);
					border: 2px solid var(--color-outline);
					transition: all var(--duration-small) var(--easing-standard);
				}

				.step-dot--complete {
					background-color: var(--color-primary);
					border-color: var(--color-primary);
				}

				.step-dot--active {
					background-color: var(--color-primary-container);
					border-color: var(--color-primary);
					transform: scale(1.2);
				}

				@keyframes indeterminate {
					0% {
						left: -30%;
					}
					100% {
						left: 100%;
					}
				}

				@keyframes stripes {
					0% {
						background-position: 0 0;
					}
					100% {
						background-position: 1rem 0;
					}
				}
			`}</style>
		</div>
	);
}
