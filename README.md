# React Form Builder

A powerful, responsive form builder built with React, TypeScript, HeroUI, and TailwindCSS. Create dynamic forms with drag-and-drop functionality, export to JSON, and render forms anywhere.

## 📦 Installation

### As a Package (Recommended)

```bash
npm install @flowcsolutions/react-form-builder
```

#### Peer Dependencies
```bash
npm install react react-dom @heroui/react @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities framer-motion lucide-react uuid
```

#### Basic Usage
```tsx
import { FormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/styles';

function App() {
  return <FormBuilderSuite />;
}
```

### Local Development

```bash
git clone https://github.com/yourusername/react-form-builder.git
cd react-form-builder
npm install
npm run dev
```

## ✨ Features

- 🎨 **Visual Form Builder**: Drag and drop interface for building forms
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔧 **Rich Field Types**: Text, email, select, radio, checkbox, file upload, and more
- 🎯 **Grid Layout**: Multi-column layouts with customizable spans
- 🎨 **Custom Styling**: Support for custom CSS classes and Tailwind utilities
- 📤 **JSON Export/Import**: Portable form configurations
- 🔄 **Form Renderer**: Standalone form rendering component
- ⚡ **Live Preview**: Real-time form preview with multiple device views
- 🔧 **Validation**: Built-in validation rules and custom validation support
- 🎪 **Modern UI**: Clean, accessible interface built with HeroUI

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-form-builder.git
cd react-form-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

#### Form Builder

```tsx
import { FormBuilderProvider } from './context/FormBuilderContext';
import { FormCanvas } from './components/FormCanvas';
import { FieldSidebar } from './components/FieldSidebar';
import { PropertiesPanel } from './components/PropertiesPanel';

function App() {
  return (
    <FormBuilderProvider>
      <div className="flex h-screen">
        <FieldSidebar />
        <FormCanvas />
        <PropertiesPanel />
      </div>
    </FormBuilderProvider>
  );
}
```

#### Form Renderer (Standalone)

```tsx
import { FormRenderer } from './components/FormRenderer';
import type { FormConfig } from './types/form';

const formConfig: FormConfig = {
  // Your exported form JSON
};

function MyForm() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer 
      form={formConfig} 
      onSubmit={handleSubmit}
    />
  );
}
```

## 📦 Dependencies

### Core Dependencies
- React 18+
- TypeScript
- @heroui/react
- @dnd-kit/core
- TailwindCSS
- Lucide React (icons)
- UUID

### Development Dependencies
- Vite
- ESLint
- TypeScript compiler

## 📖 Documentation

- [Field Types](./docs/FIELD_TYPES.md) - Available form field types and properties
- [JSON Export Format](./docs/JSON_EXPORT.md) - Structure of exported form configurations
- [Custom Styling](./docs/STYLING.md) - How to customize form appearance
- [API Reference](./docs/API.md) - Component props and methods

## 🎯 Use Cases

- **Customer Feedback Forms**: Surveys, reviews, contact forms
- **Application Forms**: Job applications, registrations, onboarding
- **Data Collection**: Research forms, lead generation, event registration
- **Dynamic Forms**: Multi-step wizards, conditional logic forms
- **Embedded Forms**: Integrate forms into existing applications

## 🔧 Customization

### Adding Custom Field Types

```tsx
// Add to src/data/formFields.ts
export const CUSTOM_FIELDS = {
  signature: {
    type: 'signature',
    label: 'Signature',
    icon: 'PenTool',
    category: 'advanced'
  }
};
```

### Custom Styling

```tsx
// Forms support custom CSS classes
const fieldWithCustomStyle = {
  type: 'text',
  label: 'Styled Input',
  properties: {
    customClasses: 'border-blue-500 bg-blue-50 text-blue-900'
  }
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [HeroUI](https://heroui.com/) for the component library
- [dnd-kit](https://dndkit.com/) for drag and drop functionality
- [Lucide](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling utilities

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [GitHub Issues](https://github.com/yourusername/react-form-builder/issues)
- [Discussions](https://github.com/yourusername/react-form-builder/discussions)
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
