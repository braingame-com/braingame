# VSCode BGUI Snippets

This directory contains VSCode snippets for the Brain Game UI (BGUI) component library.

## Installation

### Option 1: Automatic (Project-wide)
The snippets are automatically available when you open this project in VSCode since they are in the `.vscode` directory.

### Option 2: Install Globally
To use these snippets in other projects:

1. Open VSCode
2. Go to **Code** > **Preferences** > **User Snippets** (on macOS) or **File** > **Preferences** > **User Snippets** (on Windows/Linux)
3. Select **New Global Snippets file**
4. Name it `bgui`
5. Copy the contents of `bgui.code-snippets` into the new file
6. Save the file

### Option 3: Install for TypeScript/JavaScript only
1. Open VSCode
2. Go to **Code** > **Preferences** > **User Snippets**
3. Select `typescript` or `javascript` (or `typescriptreact`/`javascriptreact` for React files)
4. Copy the contents of `bgui.code-snippets` into the language-specific snippets file
5. Save the file

## Usage

To use a snippet:
1. Type the snippet prefix (e.g., `bgui-button`)
2. Press `Tab` to expand the snippet
3. Use `Tab` to navigate between placeholders

## Available Snippets

### Basic Components
- `bgui-button` - Button component
- `bgui-text` - Text component
- `bgui-view` - View component
- `bgui-textinput` - TextInput component

### Navigation Components
- `bgui-link` - Link component
- `bgui-breadcrumb` - Breadcrumb component

### Form Components
- `bgui-checkbox` - Checkbox component
- `bgui-switch` - Switch component
- `bgui-select` - Select dropdown
- `bgui-slider` - Slider component
- `bgui-radiogroup` - RadioGroup component

### Layout Components
- `bgui-card` - Card component
- `bgui-modal` - Modal dialog
- `bgui-accordion` - Accordion component
- `bgui-tabs` - Tabs component
- `bgui-divider` - Divider component

### Feedback Components
- `bgui-alert` - Alert component
- `bgui-toast` - Toast notification
- `bgui-badge` - Badge component
- `bgui-progressbar` - ProgressBar component
- `bgui-spinner` - Loading spinner

### Media Components
- `bgui-image` - Image component
- `bgui-avatar` - Avatar component
- `bgui-icon` - Icon component

### Interactive Components
- `bgui-menu` - Menu component
- `bgui-tooltip` - Tooltip component
- `bgui-actionlist` - ActionList component

### Special Components
- `bgui-loadingbutton` - LoadingButton component
- `bgui-keyboardavoiding` - KeyboardAvoidingContainer
- `bgui-errorboundary` - ErrorBoundary component
- `bgui-glowinglogo` - GlowingLogo component

### Import Snippets
- `bgui-import` - Import specific BGUI components
- `bgui-import-all` - Import all common BGUI components

## Contributing

To add new snippets:
1. Edit the `bgui.code-snippets` file
2. Follow the existing format
3. Test the snippet in VSCode
4. Submit a PR with your changes

## Tips

- Use descriptive prefixes that start with `bgui-` for consistency
- Include placeholders with sensible defaults
- Use choice placeholders (e.g., `${1|option1,option2|}`) for enum-like props
- Add helpful descriptions for each snippet