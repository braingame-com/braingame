# VSCode Setup & Configuration

This guide covers VSCode-specific setup for the Brain Game monorepo.

## 🚀 Quick Start

1. Install recommended extensions when prompted
2. Reload VSCode to activate all settings
3. Start using BGUI snippets by typing `bgui-` and pressing Tab

## 📦 Recommended Extensions

These extensions are automatically recommended when you open the project:

- **Biome** (`biomejs.biome`) - Linting and formatting
- **Expo Tools** (`expo.vscode-expo-tools`) - React Native development
- **Jest Runner** (`firsttris.vscode-jest-runner`) - Run tests from VSCode
- **GitHub Pull Requests** (`github.vscode-pull-request-github`) - PR management

## ✂️ BGUI Component Snippets

The project includes comprehensive snippets for all BGUI components. Access them by typing the prefix and pressing Tab.

### Basic Components

| Prefix | Component | Example |
|--------|-----------|---------|
| `bgui-button` | Button | `<Button variant="primary">Click me</Button>` |
| `bgui-text` | Text | `<Text variant="body">Hello</Text>` |
| `bgui-view` | View | `<View style={styles.container}>...</View>` |
| `bgui-textinput` | TextInput | `<TextInput value={value} onChangeText={setValue} />` |

### Form Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-checkbox` | Checkbox | Checkbox with label |
| `bgui-switch` | Switch | Toggle switch |
| `bgui-select` | Select | Dropdown selector |
| `bgui-slider` | Slider | Value slider |
| `bgui-radiogroup` | RadioGroup | Radio button group |

### Layout Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-card` | Card | Card with header, body, footer |
| `bgui-modal` | Modal | Modal dialog |
| `bgui-accordion` | Accordion | Collapsible sections |
| `bgui-tabs` | Tabs | Tab navigation |
| `bgui-divider` | Divider | Visual separator |

### Feedback Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-alert` | Alert | Alert message |
| `bgui-toast` | Toast | Toast notification |
| `bgui-badge` | Badge | Status badge |
| `bgui-progressbar` | ProgressBar | Progress indicator |
| `bgui-spinner` | Spinner | Loading spinner |

### Media Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-image` | Image | Image component |
| `bgui-avatar` | Avatar | User avatar |
| `bgui-icon` | Icon | Icon component |

### Interactive Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-menu` | Menu | Dropdown menu |
| `bgui-tooltip` | Tooltip | Hover tooltip |
| `bgui-actionlist` | ActionList | List of actions |

### Special Components

| Prefix | Component | Description |
|--------|-----------|-------------|
| `bgui-loadingbutton` | LoadingButton | Button with loading state |
| `bgui-keyboardavoiding` | KeyboardAvoidingContainer | Keyboard-aware container |
| `bgui-errorboundary` | ErrorBoundary | Error boundary wrapper |
| `bgui-glowinglogo` | GlowingLogo | Animated logo |

### Import Snippets

| Prefix | Description |
|--------|-------------|
| `bgui-import` | Import specific BGUI components |
| `bgui-import-all` | Import all common BGUI components |

## 💡 Usage Tips

### Using Snippets

1. Type the snippet prefix (e.g., `bgui-button`)
2. Press Tab to expand
3. Use Tab to navigate between placeholders
4. Press Escape to exit snippet mode

### Snippet Placeholders

Snippets include intelligent placeholders:
- **Dropdown choices**: Use arrow keys to select (e.g., variant selection)
- **Variable names**: Type to replace placeholder text
- **Nested content**: Tab through to add child components

### Example Workflow

```tsx
// Type: bgui-card [Tab]
// Expands to:
<Card elevated>
  <Card.Header>
    <Text variant="heading">Card Title</Text>
  </Card.Header>
  <Card.Body>
    Card content
  </Card.Body>
  <Card.Footer>
    Footer content
  </Card.Footer>
</Card>

// Tab through placeholders to customize
```

## 🔧 VSCode Settings

The project includes workspace settings in `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## 🎨 Customization

### Adding Custom Snippets

To add your own snippets:

1. Open `.vscode/bgui.code-snippets`
2. Add your snippet following the pattern:

```json
"My Custom Snippet": {
  "prefix": "bgui-custom",
  "body": [
    "<CustomComponent>",
    "  $1",
    "</CustomComponent>"
  ],
  "description": "My custom component"
}
```

### Snippet Variables

Available variables in snippets:
- `$1`, `$2`, etc. - Tab stops
- `${1:default}` - Tab stop with default text
- `${1|one,two,three|}` - Tab stop with choices
- `$0` - Final cursor position

## 🐛 Troubleshooting

### Snippets Not Working

1. Ensure you're in a `.tsx` or `.jsx` file
2. Check that snippets are enabled: `Ctrl+Shift+P` → "Preferences: Configure User Snippets"
3. Reload VSCode: `Ctrl+Shift+P` → "Developer: Reload Window"

### Extension Issues

1. Check installed extensions: `Ctrl+Shift+X`
2. Install missing recommendations
3. Update extensions to latest versions

## 📚 Additional Resources

- [VSCode Snippets Guide](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
- [BGUI Component Documentation](../packages/bgui/README.md)
- [Development Guide](./DEVELOPMENT.md)