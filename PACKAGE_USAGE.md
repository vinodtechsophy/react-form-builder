# React Form Builder Package Usage

This is a comprehensive guide on how to use the React Form Builder as an npm package in your projects.

## Installation

```bash
npm install @your-org/react-form-builder
```

## Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @heroui/react @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities framer-motion lucide-react uuid
```

## Basic Usage

### 1. Complete Form Builder Suite

The easiest way to get started is to use the complete Form Builder Suite:

```tsx
import { FormBuilderSuite } from '@your-org/react-form-builder';
import '@your-org/react-form-builder/styles';

function App() {
  return (
    <div className="App">
      <FormBuilderSuite />
    </div>
  );
}
```

### 2. Individual Components

For more control, you can use individual components:

#### Form Builder Components

```tsx
import {
  FormBuilderProvider,
  FormCanvas,
  FieldSidebar,
  PropertiesPanel,
  FormBuilderToolbar
} from '@your-org/react-form-builder';
import { DndContext } from '@dnd-kit/core';

function MyFormBuilder() {
  return (
    <FormBuilderProvider>
      <DndContext>
        <div className="form-builder-layout">
          <FormBuilderToolbar />
          <div className="main-content">
            <FieldSidebar />
            <FormCanvas />
            <PropertiesPanel />
          </div>
        </div>
      </DndContext>
    </FormBuilderProvider>
  );
}
```

#### Form Renderer Only

```tsx
import { FormRenderer } from '@your-org/react-form-builder';
import type { FormExportData } from '@your-org/react-form-builder';

function MyFormRenderer({ formConfig }: { formConfig: FormExportData }) {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <FormRenderer 
      formConfig={formConfig} 
      onSubmit={handleSubmit} 
    />
  );
}
```

#### JSON Form Renderer (Standalone)

```tsx
import { JsonFormRenderer } from '@your-org/react-form-builder';

function App() {
  return (
    <div>
      <JsonFormRenderer />
    </div>
  );
}
```

### 3. Working with Form Data

#### Creating Forms Programmatically

```tsx
import { 
  createFormField, 
  generateFormExportData,
  type FormConfig,
  type FormField 
} from '@your-org/react-form-builder';

// Create individual fields
const nameField = createFormField('text');
nameField.label = 'Full Name';
nameField.required = true;

const emailField = createFormField('email');
emailField.label = 'Email Address';
emailField.required = true;

// Create a form configuration
const formConfig: FormConfig = {
  id: 'my-form',
  title: 'Contact Form',
  description: 'Please fill out this form',
  fields: [nameField, emailField],
  settings: {
    submitButtonText: 'Submit',
    allowMultipleSubmissions: true,
    requireAuth: false,
    captchaEnabled: false,
    theme: 'auto'
  }
};

// Generate export data for rendering
const exportData = generateFormExportData(formConfig);
```

#### Custom Field Types

```tsx
import { FormFieldRenderer } from '@your-org/react-form-builder';
import type { FormField } from '@your-org/react-form-builder';

function CustomFieldRenderer({ field, value, onChange }: {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}) {
  if (field.type === 'custom') {
    return (
      <div className="custom-field">
        <label>{field.label}</label>
        <input 
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      </div>
    );
  }
  
  // Fallback to default renderer
  return <FormFieldRenderer field={field} value={value} onChange={onChange} />;
}
```

## Styling

The package includes TailwindCSS classes. Make sure to include the styles:

```tsx
import '@your-org/react-form-builder/styles';
```

If you're using a custom TailwindCSS setup, you may need to include the package in your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your content
    './node_modules/@your-org/react-form-builder/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

## TypeScript Support

The package is built with TypeScript and includes full type definitions:

```tsx
import type {
  FormField,
  FormFieldType,
  FormExportData,
  FormConfig,
  ValidationRule,
  FieldProperties
} from '@your-org/react-form-builder';

const field: FormField = {
  id: 'unique-id',
  type: 'text',
  label: 'My Field',
  required: false,
  // ... other properties
};
```

## Form Export/Import

```tsx
import { generateFormExportData } from '@your-org/react-form-builder';

// Export form to JSON
const exportData = generateFormExportData(formConfig);
const jsonString = JSON.stringify(exportData, null, 2);

// Save to file or send to server
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'form-config.json';
a.click();
```

## Advanced Usage

### Custom Validation

```tsx
const field = createFormField('email');
field.validation = [
  {
    type: 'email',
    message: 'Please enter a valid email address'
  },
  {
    type: 'required',
    message: 'Email is required'
  }
];
```

### Conditional Logic

```tsx
const field = createFormField('text');
field.conditionalLogic = {
  show: true,
  conditions: [
    {
      field: 'other-field-id',
      operator: 'equals',
      value: 'specific-value'
    }
  ],
  logic: 'and'
};
```

### Grid Layout

```tsx
import { getGridClassName } from '@your-org/react-form-builder';

const field = createFormField('text');
field.layout = {
  columnSpan: 6, // Takes half width
  gridClass: getGridClassName(6)
};
```

## Examples

Check out the `/examples` directory in the package for complete working examples:

- Basic form builder
- Form renderer only
- JSON form importer
- Custom field types
- Advanced layouts

## API Reference

For detailed API documentation, see the [API.md](./API.md) file in the package.

## Support

- GitHub Issues: [Report bugs and feature requests](https://github.com/yourusername/react-form-builder/issues)
- Documentation: [Full documentation](https://github.com/yourusername/react-form-builder/docs)
- Examples: [Live examples](https://yourusername.github.io/react-form-builder)
