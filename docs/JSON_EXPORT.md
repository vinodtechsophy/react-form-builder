# Form Builder JSON Export

This form builder generates comprehensive JSON files that contain all the information needed to render forms in other applications.

## Exported JSON Structure

The exported JSON contains the following key sections:

### 1. Metadata
Contains form identification and versioning information:
```json
{
  "metadata": {
    "id": "unique-form-id",
    "title": "Form Title",
    "description": "Form description",
    "version": "1.0.0",
    "createdAt": "2025-01-18T00:00:00.000Z",
    "exportedAt": "2025-01-18T00:00:00.000Z",
    "builderVersion": "1.0.0"
  }
}
```

### 2. Settings
Form-level settings and configuration:
```json
{
  "settings": {
    "submitButtonText": "Submit",
    "redirectUrl": "https://example.com/thank-you",
    "emailNotifications": ["admin@example.com"],
    "allowMultipleSubmissions": true,
    "requireAuth": false,
    "captchaEnabled": false,
    "theme": "auto"
  }
}
```

### 3. Layout
Information about how fields are arranged in rows and columns:
```json
{
  "layout": {
    "rows": [
      {
        "id": "row-0",
        "fields": ["field-1", "field-2"],
        "columns": 12
      }
    ],
    "totalFields": 2
  }
}
```

### 4. Fields
Detailed field definitions with layout information:
```json
{
  "fields": [
    {
      "id": "field-1",
      "type": "text",
      "label": "Full Name",
      "placeholder": "Enter your name",
      "required": true,
      "validation": [
        {
          "type": "minLength",
          "value": 2,
          "message": "Name must be at least 2 characters"
        }
      ],
      "properties": {
        "helpText": "Enter your full legal name",
        "customClasses": "custom-class"
      },
      "layout": {
        "columnSpan": 6,
        "rowId": "row-0",
        "gridClass": "col-span-6"
      }
    }
  ]
}
```

### 5. Field Map
Quick lookup object for accessing fields by ID:
```json
{
  "fieldMap": {
    "field-1": { /* field object */ },
    "field-2": { /* field object */ }
  }
}
```

### 6. Validation
Summary of validation requirements:
```json
{
  "validation": {
    "requiredFields": ["field-1", "field-2"],
    "fieldsWithValidation": ["field-1"]
  }
}
```

## Using the JSON in Your Application

### 1. Basic Form Rendering

```typescript
import { FormRenderer } from './components/FormRenderer';
import formConfig from './exported-form.json';

function MyPage() {
  const handleSubmit = (formData: Record<string, any>) => {
    console.log('Form submitted:', formData);
    // Send to your API
  };

  return (
    <FormRenderer 
      formConfig={formConfig}
      onSubmit={handleSubmit}
    />
  );
}
```

### 2. Custom Field Rendering

You can access individual fields and render them with custom logic:

```typescript
// Get a specific field
const nameField = formConfig.fieldMap['field-1'];

// Render with custom styling
<div className={nameField.layout.gridClass}>
  <CustomInput 
    field={nameField}
    onChange={handleFieldChange}
  />
</div>
```

### 3. Layout-Aware Rendering

Use the layout information to render forms with the same grid structure:

```typescript
{formConfig.layout.rows.map((row) => (
  <div key={row.id} className="grid grid-cols-12 gap-4">
    {row.fields.map((fieldId) => {
      const field = formConfig.fieldMap[fieldId];
      return (
        <div key={fieldId} className={field.layout.gridClass}>
          {renderField(field)}
        </div>
      );
    })}
  </div>
))}
```

### 4. Validation Implementation

```typescript
function validateForm(formData: Record<string, any>, config: FormExportData) {
  const errors: Record<string, string> = {};

  // Check required fields
  config.validation.requiredFields.forEach(fieldId => {
    if (!formData[fieldId]) {
      const field = config.fieldMap[fieldId];
      errors[fieldId] = `${field.label} is required`;
    }
  });

  // Check field-specific validations
  config.validation.fieldsWithValidation.forEach(fieldId => {
    const field = config.fieldMap[fieldId];
    const value = formData[fieldId];
    
    field.validation?.forEach(rule => {
      // Implement validation logic based on rule.type
      if (rule.type === 'email' && !isValidEmail(value)) {
        errors[fieldId] = rule.message;
      }
    });
  });

  return errors;
}
```

## Field Types Supported

- **text**: Single line text input
- **textarea**: Multi-line text input
- **email**: Email input with validation
- **password**: Password input
- **number**: Numeric input
- **date**: Date picker
- **datetime**: Date and time picker
- **time**: Time picker
- **select**: Single selection dropdown
- **multiselect**: Multiple selection dropdown
- **radio**: Radio button group
- **checkbox**: Checkbox or checkbox group
- **switch**: Toggle switch
- **file**: File upload
- **rating**: Star rating
- **signature**: Signature pad
- **section**: Section header
- **paragraph**: Text content
- **pagebreak**: Page break divider
- **captcha**: CAPTCHA widget
- **html**: Custom HTML content

## Layout System

The form uses a 12-column grid system similar to Bootstrap or Tailwind:

- **col-span-1**: 1/12 width (8.33%)
- **col-span-3**: 3/12 width (25%)
- **col-span-4**: 4/12 width (33.33%)
- **col-span-6**: 6/12 width (50%)
- **col-span-12**: 12/12 width (100%)

Fields can be arranged in rows, and each field specifies its column span for responsive layouts.

## Export Options

The form builder provides several export options:

1. **Export Form JSON**: Complete form structure (current format)
2. **Export for Render**: Optimized JSON for form rendering
3. **Preview JSON**: View/copy JSON in console for testing

## Example Usage

See `src/pages/FormPreviewPage.tsx` for a complete example of how to load and render exported forms.
