# API Reference

## Components

### FormBuilder

The main form builder component that provides the complete form building interface.

```tsx
import { FormBuilder } from './components/FormBuilder';

<FormBuilder 
  initialForm={formConfig}
  onFormChange={(form) => console.log(form)}
  onSave={(form) => console.log('Saving:', form)}
/>
```

**Props:**
- `initialForm?: FormConfig` - Initial form configuration
- `onFormChange?: (form: FormConfig) => void` - Called when form changes
- `onSave?: (form: FormConfig) => void` - Called when user saves form

### FormRenderer

Standalone component for rendering forms from JSON configuration.

```tsx
import { FormRenderer } from './components/FormRenderer';

<FormRenderer 
  form={formConfig}
  onSubmit={(data) => handleSubmit(data)}
  onFieldChange={(fieldName, value) => handleFieldChange(fieldName, value)}
/>
```

**Props:**
- `form: FormConfig` - Form configuration object
- `onSubmit: (data: Record<string, any>) => void` - Form submission handler
- `onFieldChange?: (fieldName: string, value: any) => void` - Field change handler
- `className?: string` - Additional CSS classes

### FieldSidebar

Sidebar component showing available form fields for dragging.

```tsx
import { FieldSidebar } from './components/FieldSidebar';

<FieldSidebar />
```

### PropertiesPanel

Properties panel for editing selected form field properties.

```tsx
import { PropertiesPanel } from './components/PropertiesPanel';

<PropertiesPanel />
```

### FormCanvas

Main canvas area where form fields are dropped and arranged.

```tsx
import { FormCanvas } from './components/FormCanvas';

<FormCanvas />
```

## Context

### FormBuilderProvider

Context provider that manages form builder state.

```tsx
import { FormBuilderProvider, useFormBuilder } from './context/FormBuilderContext';

function App() {
  return (
    <FormBuilderProvider>
      <YourFormBuilderComponents />
    </FormBuilderProvider>
  );
}

function YourComponent() {
  const { state, actions } = useFormBuilder();
  // Use state and actions
}
```

**State:**
- `currentForm: FormConfig` - Current form configuration
- `selectedFieldId: string | null` - ID of currently selected field
- `previewMode: boolean` - Whether in preview mode
- `deviceView: 'desktop' | 'tablet' | 'mobile'` - Current device preview

**Actions:**
- `addField(field: FormField)` - Add field to form
- `updateField(id: string, updates: Partial<FormField>)` - Update field
- `deleteField(id: string)` - Remove field from form
- `selectField(id: string | null)` - Select/deselect field
- `reorderFields(oldIndex: number, newIndex: number)` - Reorder fields
- `setPreviewMode(preview: boolean)` - Toggle preview mode
- `setDeviceView(view: 'desktop' | 'tablet' | 'mobile')` - Set device view
- `updateFormMeta(meta: { title?: string; description?: string })` - Update form metadata

## Types

### FormConfig

Main form configuration object.

```tsx
interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
}
```

### FormField

Individual form field configuration.

```tsx
interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  validation?: ValidationRule[];
  properties?: Record<string, any>;
}
```

### FormFieldType

Available field types.

```tsx
type FormFieldType = 
  | 'text' | 'email' | 'password' | 'number' | 'phone'
  | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox'
  | 'file' | 'date' | 'time' | 'datetime'
  | 'rating' | 'switch' | 'autocomplete'
  | 'section' | 'paragraph';
```

### FormSettings

Form-level settings and configuration.

```tsx
interface FormSettings {
  submitButtonText: string;
  allowMultipleSubmissions: boolean;
  requireAuth: boolean;
  captchaEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  redirectUrl?: string;
  emailNotifications?: string[];
}
```

### ValidationRule

Field validation configuration.

```tsx
interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}
```

## Utilities

### formExport

Utilities for exporting and importing forms.

```tsx
import { downloadFormAsJson, generateFormExportData } from './utils/formExport';

// Download form as JSON file
downloadFormAsJson(formConfig, 'my-form.json');

// Generate export data structure
const exportData = generateFormExportData(formConfig);
```

### layoutUtils

Utilities for form layout and grid management.

```tsx
import { groupFieldsIntoRows, calculateGridClass } from './utils/layoutUtils';

// Group fields into rows based on width
const rows = groupFieldsIntoRows(fields);

// Calculate Tailwind grid class for field width
const gridClass = calculateGridClass('half'); // 'col-span-6'
```

### fieldStyles

Utilities for applying custom styles to form fields.

```tsx
import { buildFieldClassNames } from './utils/fieldStyles';

// Build HeroUI-compatible class names
const classNames = buildFieldClassNames(field.properties);
```

## Events

### Form Submission

```tsx
const handleSubmit = (formData: Record<string, any>) => {
  // formData contains field names as keys and user input as values
  console.log('Form submitted:', formData);
  
  // Example output:
  // {
  //   "first_name": "John",
  //   "email": "john@example.com",
  //   "age": 25,
  //   "newsletter": true
  // }
};
```

### Field Changes

```tsx
const handleFieldChange = (fieldName: string, value: any) => {
  console.log(`Field ${fieldName} changed to:`, value);
  
  // Use for real-time validation, auto-save, etc.
};
```

## Customization

### Adding Custom Field Types

1. Extend the `FormFieldType` type
2. Add field configuration to `DRAG_ITEMS`
3. Implement rendering in `FormFieldRenderer`
4. Add properties handling in `PropertiesPanel`

### Custom Styling

Fields support custom CSS classes through the `properties.customClasses` field:

```tsx
const customField = {
  type: 'text',
  label: 'Custom Styled Field',
  properties: {
    customClasses: 'border-2 border-blue-500 bg-blue-50'
  }
};
```

### Validation

Add custom validation rules:

```tsx
const fieldWithValidation = {
  type: 'email',
  label: 'Email',
  validation: [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' }
  ]
};
```
