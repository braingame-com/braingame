"use client";

import { useState } from "react";
import { Button, Modal, Switch, TextInput } from "../../../../components/BGUIDemo";
import { CodeBlock } from "../../../../components/CodeBlock";
import { LiveExample } from "../../../../components/LiveExample";
import { PropsTable } from "../../../../components/PropsTable";

const modalProps = [
	{
		name: "visible",
		type: "boolean",
		required: true,
		description: "Whether the modal is visible.",
	},
	{
		name: "onClose",
		type: "() => void",
		required: true,
		description: "Callback function called when the modal should close.",
	},
	{
		name: "children",
		type: "React.ReactNode",
		required: true,
		description: "Content to be displayed inside the modal.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg" | "fullscreen"',
		required: false,
		default: '"md"',
		description: "Size of the modal.",
	},
	{
		name: "closeOnBackdropPress",
		type: "boolean",
		required: false,
		default: "true",
		description: "Whether clicking the backdrop closes the modal.",
	},
	{
		name: "closeOnEscape",
		type: "boolean",
		required: false,
		default: "true",
		description: "Whether pressing Escape key closes the modal.",
	},
	{
		name: "showCloseButton",
		type: "boolean",
		required: false,
		default: "true",
		description: "Whether to show the close button in the header.",
	},
	{
		name: "animationType",
		type: '"fade" | "slide" | "zoom"',
		required: false,
		default: '"fade"',
		description: "Animation type for modal entrance/exit.",
	},
	{
		name: "backdrop",
		type: '"dark" | "light" | "blur"',
		required: false,
		default: '"dark"',
		description: "Backdrop style variant.",
	},
	{
		name: "testID",
		type: "string",
		required: false,
		description: "Test ID for automated testing.",
	},
];

export default function ModalDocs() {
	const [basicModal, setBasicModal] = useState(false);
	const [sizeModal, setSizeModal] = useState("");
	const [formModal, setFormModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [scrollModal, setScrollModal] = useState(false);
	const [formData, setFormData] = useState({ name: "", email: "", notifications: true });

	return (
		<div>
			<h1 className="text-display mb-4">Modal</h1>
			<p className="text-subtitle text-secondary mb-8">
				Modals are overlays that require user interaction. They're used for critical information,
				required actions, or to simplify complex workflows by focusing user attention.
			</p>

			<section className="mb-8">
				<h2 className="text-title mb-4">Examples</h2>

				<LiveExample
					title="Basic Modal"
					code={`const [visible, setVisible] = useState(false);

return (
  <>
    <Button onPress={() => setVisible(true)}>
      Open Modal
    </Button>

    <Modal
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Text variant="body">
        This is a basic modal with a title and some content. 
        Click the close button or outside the modal to dismiss it.
      </Text>
    </Modal>
  </>
);`}
				>
					<Button onPress={() => setBasicModal(true)}>Open Modal</Button>

					<Modal visible={basicModal} onClose={() => setBasicModal(false)}>
						<p className="text-body">
							This is a basic modal with a title and some content. Click the close button or outside
							the modal to dismiss it.
						</p>
					</Modal>
				</LiveExample>

				<LiveExample
					title="Modal Sizes"
					code={`<View style={{ flexDirection: 'row', gap: 8 }}>
  <Button onPress={() => openModal('sm')}>Small</Button>
  <Button onPress={() => openModal('md')}>Medium</Button>
  <Button onPress={() => openModal('lg')}>Large</Button>
  <Button onPress={() => openModal('fullscreen')}>Fullscreen</Button>
</View>

<Modal
  visible={visible}
  onClose={closeModal}
  size={size}
>
  <Text variant="body">
    This modal is using the {size} size variant.
  </Text>
</Modal>`}
				>
					<div className="flex flex--gap-2">
						<Button onPress={() => setSizeModal("sm")}>Small</Button>
						<Button onPress={() => setSizeModal("md")}>Medium</Button>
						<Button onPress={() => setSizeModal("lg")}>Large</Button>
						<Button onPress={() => setSizeModal("fullscreen")}>Fullscreen</Button>
					</div>

					{sizeModal && (
						<Modal
							visible={true}
							onClose={() => setSizeModal("")}
							size={sizeModal as "sm" | "md" | "lg" | "fullscreen"}
						>
							<p className="text-body">
								This modal is using the {sizeModal === "fullscreen" ? "fullscreen" : sizeModal} size
								variant.
							</p>
						</Modal>
					)}
				</LiveExample>

				<LiveExample
					title="Form Modal"
					code={`const [visible, setVisible] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  notifications: true,
});

const handleSubmit = () => {
  console.log('Form submitted:', formData);
  setVisible(false);
};

return (
  <>
    <Button onPress={() => setVisible(true)}>
      Edit Profile
    </Button>

    <Modal
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <View style={styles.form}>
        <TextInput
                  value={formData.name}
          onValueChange={(text: string) => 
            setFormData({ ...formData, name: text })
          }
          placeholder="Enter your name"
        />
        
        <TextInput
                  value={formData.email}
          onValueChange={(text: string) => 
            setFormData({ ...formData, email: text })
          }
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        
        <View style={styles.switchRow}>
          <Text variant="body">Email notifications</Text>
          <Switch
            value={formData.notifications}
            onValueChange={(value: boolean) => 
              setFormData({ ...formData, notifications: value })
            }
          />
        </View>
      </View>
      
      <ModalFooter>
        <Button 
          variant="ghost" 
          onPress={() => setVisible(false)}
        >
          Cancel
        </Button>
        <Button onPress={handleSubmit}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  </>
);`}
				>
					<Button onPress={() => setFormModal(true)}>Edit Profile</Button>

					<Modal visible={formModal} onClose={() => setFormModal(false)}>
						<h2 className="text-title mb-4">Edit Profile</h2>
						<div className="flex flex--column flex--gap-4">
							<TextInput
								value={formData.name}
								onValueChange={(text: string) => setFormData({ ...formData, name: text })}
								placeholder="Enter your name"
							/>

							<TextInput
								value={formData.email}
								onValueChange={(text: string) => setFormData({ ...formData, email: text })}
								placeholder="Enter your email"
								keyboardType="email-address"
							/>

							<div className="flex flex--justify-between flex--align-center">
								<span className="text-body">Email notifications</span>
								<Switch
									checked={formData.notifications}
									onValueChange={(value: boolean) => setFormData({ ...formData, notifications: value })}
								/>
							</div>
						</div>

						<div className="modal__footer">
							<Button variant="ghost" onPress={() => setFormModal(false)}>
								Cancel
							</Button>
							<Button
								onPress={() => {
									console.log("Form submitted:", formData);
									setFormModal(false);
								}}
							>
								Save Changes
							</Button>
						</div>
					</Modal>
				</LiveExample>

				<LiveExample
					title="Confirmation Modal"
					code={`const [visible, setVisible] = useState(false);

return (
  <>
    <Button variant="danger" onPress={() => setVisible(true)}>
      Delete Account
    </Button>

    <Modal
      visible={visible}
      onClose={() => setVisible(false)}
      size="sm"
    >
      <Icon 
        name="warning" 
        size={48} 
        color="var(--color-error)"
        style={{ alignSelf: 'center', marginBottom: 16 }}
      />
      
      <Text variant="body" style={{ textAlign: 'center', marginBottom: 8 }}>
        This action cannot be undone. All your data will be permanently deleted.
      </Text>
      
      <Text variant="caption" color="secondary" style={{ textAlign: 'center' }}>
        Type "DELETE" to confirm
      </Text>
      
      <TextInput
        placeholder="Type DELETE"
        value={confirmText}
        onValueChange={setConfirmText}
        style={{ marginTop: 16 }}
      />
      
      <ModalFooter>
        <Button 
          variant="ghost" 
          onPress={() => setVisible(false)}
        >
          Cancel
        </Button>
        <Button 
          variant="danger"
          disabled={confirmText !== 'DELETE'}
          onPress={handleDelete}
        >
          Delete Account
        </Button>
      </ModalFooter>
    </Modal>
  </>
);`}
				>
					<Button variant="danger" onPress={() => setDeleteModal(true)}>
						Delete Account
					</Button>

					<Modal visible={deleteModal} onClose={() => setDeleteModal(false)} size="sm">
						<h2 className="text-title mb-4 text-center">Delete Account?</h2>
						<div style={{ textAlign: "center" }}>
							<div style={{ marginBottom: "var(--space-4)" }}>
								<span
									className="material-icons-round"
									style={{ fontSize: 48, color: "var(--color-error)" }}
								>
									warning
								</span>
							</div>

							<p className="text-body mb-2">
								This action cannot be undone. All your data will be permanently deleted.
							</p>

							<p className="text-caption text-secondary mb-4">Type "DELETE" to confirm</p>
						</div>

						<TextInput placeholder="Type DELETE" value="" onValueChange={() => {}} />

						<div className="modal__footer">
							<Button variant="ghost" onPress={() => setDeleteModal(false)}>
								Cancel
							</Button>
							<Button variant="danger" disabled={true} onPress={() => {}}>
								Delete Account
							</Button>
						</div>
					</Modal>
				</LiveExample>

				<LiveExample
					title="Scrollable Content"
					code={`<Modal
  visible={visible}
  onClose={() => setVisible(false)}
>
  <Text variant="body" style={{ marginBottom: 16 }}>
    Please read and accept our terms of service to continue.
  </Text>
  
  <View style={styles.termsContent}>
    {/* Long content that scrolls */}
    <Text variant="heading">1. Introduction</Text>
    <Text variant="body">Lorem ipsum dolor sit amet...</Text>
    {/* More content... */}
  </View>
  
  <ModalFooter>
    <Button variant="ghost" onPress={() => setVisible(false)}>
      Decline
    </Button>
    <Button onPress={handleAccept}>
      Accept Terms
    </Button>
  </ModalFooter>
</Modal>`}
				>
					<Button onPress={() => setScrollModal(true)}>View Terms</Button>

					<Modal visible={scrollModal} onClose={() => setScrollModal(false)}>
						<h2 className="text-title mb-4">Terms of Service</h2>
						<p className="text-body mb-4">
							Please read and accept our terms of service to continue.
						</p>

						<div style={{ maxHeight: 300, overflow: "auto", marginBottom: "var(--space-4)" }}>
							<h3 className="text-heading mb-2">1. Introduction</h3>
							<p className="text-body mb-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>

							<h3 className="text-heading mb-2">2. Terms of Use</h3>
							<p className="text-body mb-4">
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat.
							</p>

							<h3 className="text-heading mb-2">3. Privacy Policy</h3>
							<p className="text-body mb-4">
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
								fugiat nulla pariatur.
							</p>

							<h3 className="text-heading mb-2">4. Disclaimers</h3>
							<p className="text-body">
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
						</div>

						<div className="modal__footer">
							<Button variant="ghost" onPress={() => setScrollModal(false)}>
								Decline
							</Button>
							<Button onPress={() => setScrollModal(false)}>Accept Terms</Button>
						</div>
					</Modal>
				</LiveExample>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Usage</h2>
				<CodeBlock
					code={`import { Modal, ModalHeader, ModalFooter } from '@braingame/bgui';
import { useState } from 'react';

function EditItemModal({ item, visible, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    priority: item?.priority || 'medium',
  });

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      size="md"
    >
      <ModalHeader
        title={item ? 'Edit Item' : 'New Item'}
        onClose={onClose}
      />
      
      <View style={styles.modalContent}>
        <TextInput
          value={formData.title}
          onValueChange={(text: string) => 
            setFormData({ ...formData, title: text })
          }
          placeholder="Enter item title"
          error={!formData.title.trim()}
          errorText="Title is required"
        />
        
        <TextInput
          value={formData.description}
          onValueChange={(text: string) => 
            setFormData({ ...formData, description: text })
          }
          placeholder="Enter description (optional)"
          multiline
          numberOfLines={3}
        />
        
        <Select
          value={formData.priority}
          onValueChange={(value: any) => 
            setFormData({ ...formData, priority: value })
          }
          options={[
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
        />
      </View>
      
      <ModalFooter>
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button 
          onPress={handleSave}
          disabled={!formData.title.trim()}
        >
          {item ? 'Save Changes' : 'Create Item'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}`}
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Best Practices</h2>
				<ul>
					<li className="mb-2">
						<strong>Clear purpose:</strong> Each modal should have a single, clear purpose. Don't
						overload modals with too many actions.
					</li>
					<li className="mb-2">
						<strong>Escape hatch:</strong> Always provide a clear way to dismiss the modal (close
						button, cancel action, or backdrop click).
					</li>
					<li className="mb-2">
						<strong>Appropriate sizing:</strong> Choose modal size based on content. Don't use large
						modals for simple confirmations.
					</li>
					<li className="mb-2">
						<strong>Focus management:</strong> Automatically focus the first interactive element
						when the modal opens.
					</li>
					<li className="mb-2">
						<strong>Destructive actions:</strong> Require confirmation for destructive actions, and
						make the consequences clear.
					</li>
					<li className="mb-2">
						<strong>Loading states:</strong> Show loading indicators for async operations within
						modals.
					</li>
					<li className="mb-2">
						<strong>Mobile considerations:</strong> Ensure modals work well on small screens, with
						proper keyboard avoidance.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Common Patterns</h2>

				<h3 className="text-heading mb-3">Image Gallery Modal</h3>
				<CodeBlock
					code={`<Modal
  visible={galleryVisible}
  onClose={() => setGalleryVisible(false)}
  size="fullscreen"
  animationType="zoom"
  backdrop="blur"
>
  <View style={styles.gallery}>
    <Image
      source={{ uri: currentImage }}
      style={styles.fullImage}
      resizeMode="contain"
    />
    <View style={styles.galleryControls}>
      <IconButton
        icon="chevron_left"
        onPress={previousImage}
        disabled={currentIndex === 0}
      />
      <Text variant="caption" color="white">
        {currentIndex + 1} / {images.length}
      </Text>
      <IconButton
        icon="chevron_right"
        onPress={nextImage}
        disabled={currentIndex === images.length - 1}
      />
    </View>
  </View>
</Modal>`}
					language="tsx"
				/>

				<h3 className="text-heading mb-3 mt-6">Multi-Step Modal</h3>
				<CodeBlock
					code={`<Modal
  visible={visible}
  onClose={handleClose}
  title={\`Step \${currentStep} of 3\`}
  closeOnBackdropPress={false}
>
  <ProgressBar
    value={currentStep / 3}
    style={{ marginBottom: 24 }}
  />
  
  {currentStep === 1 && <StepOne {...formData} onChange={updateFormData} />}
  {currentStep === 2 && <StepTwo {...formData} onChange={updateFormData} />}
  {currentStep === 3 && <StepThree {...formData} onChange={updateFormData} />}
  
  <ModalFooter>
    <Button
      variant="ghost"
      onPress={currentStep === 1 ? handleClose : previousStep}
    >
      {currentStep === 1 ? 'Cancel' : 'Back'}
    </Button>
    <Button
      onPress={currentStep === 3 ? handleSubmit : nextStep}
      disabled={!isStepValid(currentStep)}
    >
      {currentStep === 3 ? 'Submit' : 'Next'}
    </Button>
  </ModalFooter>
</Modal>`}
					language="tsx"
				/>
			</section>

			<section className="mb-8">
				<h2 className="text-title mb-4">Accessibility</h2>
				<p className="text-body mb-4">Modals must be accessible to all users:</p>
				<ul>
					<li>Focus is trapped within the modal while open</li>
					<li>Focus returns to the trigger element when closed</li>
					<li>Escape key closes the modal (when enabled)</li>
					<li>Background content is marked as aria-hidden</li>
					<li>Modal has appropriate ARIA attributes (role="dialog", aria-modal="true")</li>
					<li>Title is announced when modal opens</li>
					<li>Screen readers can navigate all interactive elements</li>
					<li>Color contrast meets WCAG standards</li>
				</ul>
			</section>

			<PropsTable props={modalProps} />
		</div>
	);
}
