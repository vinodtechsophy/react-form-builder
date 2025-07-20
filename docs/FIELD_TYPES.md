# Field Types Reference

Complete reference for all available form field types and their properties.

## 📝 Text Input Fields

### Text
Basic single-line text input.

```tsx
{
  type: 'text',
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true,
  validation: [
    { type: 'required', message: 'Name is required' },
    { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
  ]
}
```

**Properties:**
- `placeholder?: string` - Placeholder text
- `maxLength?: number` - Maximum character length
- `minLength?: number` - Minimum character length

### Email
Email input with built-in validation.

```tsx
{
  type: 'email',
  label: 'Email Address',
  placeholder: 'you@example.com',
  required: true
}
```

**Properties:**
- `placeholder?: string` - Placeholder text
- Automatically validates email format

### Password
Password input with hidden text.

```tsx
{
  type: 'password',
  label: 'Password',
  placeholder: 'Enter password',
  required: true,
  validation: [
    { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
  ]
}
```

**Properties:**
- `placeholder?: string` - Placeholder text
- `showStrengthIndicator?: boolean` - Show password strength (if implemented)

### Number
Numeric input with increment/decrement controls.

```tsx
{
  type: 'number',
  label: 'Age',
  placeholder: 'Enter your age',
  properties: {
    min: 0,
    max: 120,
    step: 1
  }
}
```

**Properties:**
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Step increment

### Phone
Phone number input.

```tsx
{
  type: 'phone',
  label: 'Phone Number',
  placeholder: '+1 (555) 123-4567',
  required: true
}
```

**Properties:**
- `format?: string` - Phone number format pattern
- `countryCode?: string` - Default country code

## 📄 Text Area

### Textarea
Multi-line text input.

```tsx
{
  type: 'textarea',
  label: 'Message',
  placeholder: 'Enter your message here...',
  properties: {
    rows: 4,
    maxLength: 500
  }
}
```

**Properties:**
- `rows?: number` - Number of visible rows (default: 4)
- `maxLength?: number` - Maximum character length
- `resize?: 'none' | 'vertical' | 'horizontal' | 'both'` - Resize behavior

## 🎯 Selection Fields

### Select
Single-choice dropdown.

```tsx
{
  type: 'select',
  label: 'Country',
  placeholder: 'Select your country',
  options: [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' }
  ],
  required: true
}
```

**Properties:**
- `searchable?: boolean` - Enable search functionality
- `clearable?: boolean` - Allow clearing selection

### Multi-Select
Multiple-choice dropdown.

```tsx
{
  type: 'multiselect',
  label: 'Skills',
  placeholder: 'Select your skills',
  options: [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' }
  ]
}
```

**Properties:**
- `maxSelections?: number` - Maximum number of selections
- `searchable?: boolean` - Enable search functionality

### Radio
Single-choice radio buttons.

```tsx
{
  type: 'radio',
  label: 'Preferred Contact Method',
  options: [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'SMS', value: 'sms' }
  ],
  required: true
}
```

**Properties:**
- `layout?: 'horizontal' | 'vertical'` - Layout direction
- `allowOther?: boolean` - Allow "Other" option with text input

### Checkbox
Multiple-choice checkboxes.

```tsx
{
  type: 'checkbox',
  label: 'Interests',
  options: [
    { label: 'Technology', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Travel', value: 'travel' }
  ]
}
```

**Properties:**
- `layout?: 'horizontal' | 'vertical'` - Layout direction
- `minSelections?: number` - Minimum required selections
- `maxSelections?: number` - Maximum allowed selections

## 📅 Date & Time Fields

### Date
Date picker input.

```tsx
{
  type: 'date',
  label: 'Birth Date',
  required: true,
  properties: {
    minDate: '1900-01-01',
    maxDate: '2023-12-31',
    format: 'YYYY-MM-DD'
  }
}
```

**Properties:**
- `minDate?: string` - Minimum selectable date
- `maxDate?: string` - Maximum selectable date
- `format?: string` - Date display format

### Time
Time picker input.

```tsx
{
  type: 'time',
  label: 'Preferred Time',
  properties: {
    format: '24h', // or '12h'
    step: 15 // minutes
  }
}
```

**Properties:**
- `format?: '12h' | '24h'` - Time format
- `step?: number` - Minute step increment

### DateTime
Combined date and time picker.

```tsx
{
  type: 'datetime',
  label: 'Appointment Time',
  required: true,
  properties: {
    minDate: '2024-01-01',
    format: 'YYYY-MM-DD HH:mm'
  }
}
```

**Properties:**
- Combines date and time properties
- `timezone?: string` - Timezone handling

## 📎 File Upload

### File
File upload input.

```tsx
{
  type: 'file',
  label: 'Upload Resume',
  properties: {
    accept: '.pdf,.doc,.docx',
    multiple: false,
    maxSize: 5242880, // 5MB in bytes
    allowedTypes: ['application/pdf', 'application/msword']
  }
}
```

**Properties:**
- `accept?: string` - Accepted file types
- `multiple?: boolean` - Allow multiple files
- `maxSize?: number` - Maximum file size in bytes
- `allowedTypes?: string[]` - MIME types allowed

## ⭐ Rating

### Rating
Star rating input.

```tsx
{
  type: 'rating',
  label: 'Rate Your Experience',
  properties: {
    max: 5,
    allowHalf: true,
    icon: 'star' // or 'heart', 'thumb'
  }
}
```

**Properties:**
- `max?: number` - Maximum rating value (default: 5)
- `allowHalf?: boolean` - Allow half-star ratings
- `icon?: string` - Rating icon type

## 🔘 Switch & Toggle

### Switch
Binary toggle switch.

```tsx
{
  type: 'switch',
  label: 'Enable Notifications',
  properties: {
    defaultValue: false,
    size: 'md' // 'sm', 'md', 'lg'
  }
}
```

**Properties:**
- `defaultValue?: boolean` - Initial state
- `size?: 'sm' | 'md' | 'lg'` - Switch size

## 📋 Content Fields

### Section
Section header for grouping fields.

```tsx
{
  type: 'section',
  label: 'Personal Information',
  properties: {
    description: 'Please provide your personal details',
    collapsible: true,
    collapsed: false
  }
}
```

**Properties:**
- `description?: string` - Section description
- `collapsible?: boolean` - Can be collapsed
- `collapsed?: boolean` - Initially collapsed

### Paragraph
Static text content.

```tsx
{
  type: 'paragraph',
  label: 'Terms and Conditions',
  properties: {
    content: 'By submitting this form, you agree to our terms and conditions...',
    style: 'info' // 'default', 'info', 'warning', 'error'
  }
}
```

**Properties:**
- `content?: string` - Text content
- `style?: string` - Visual style variant

## 🎨 Styling Properties

All field types support these styling properties:

```tsx
{
  properties: {
    // Layout
    width: 'full' | 'half' | 'third' | 'quarter',
    columnSpan: 1 | 2 | 3 | 4,
    
    // Styling
    customClasses: 'border-blue-500 bg-blue-50',
    borderRadius: 'sm' | 'md' | 'lg' | 'full',
    spacing: 'sm' | 'md' | 'lg',
    
    // Responsive
    hideOnMobile: boolean,
    hideOnTablet: boolean,
    hideOnDesktop: boolean
  }
}
```

## ✅ Validation Rules

All field types support validation:

```tsx
{
  validation: [
    { type: 'required', message: 'This field is required' },
    { type: 'minLength', value: 3, message: 'Minimum 3 characters' },
    { type: 'maxLength', value: 50, message: 'Maximum 50 characters' },
    { type: 'pattern', value: /^[A-Za-z]+$/, message: 'Letters only' },
    { 
      type: 'custom', 
      value: (fieldValue, formData) => fieldValue !== 'invalid',
      message: 'Custom validation failed' 
    }
  ]
}
```

## 🔧 Advanced Properties

### Conditional Logic
```tsx
{
  properties: {
    showWhen: {
      field: 'other_field_name',
      operator: 'equals',
      value: 'specific_value'
    }
  }
}
```

### Default Values
```tsx
{
  properties: {
    defaultValue: 'Initial value',
    autoFocus: true,
    readonly: false,
    disabled: false
  }
}
```

### Help Text
```tsx
{
  properties: {
    helpText: 'Additional information about this field',
    helpPosition: 'bottom' // 'top', 'bottom', 'side'
  }
}
```

This comprehensive field type system allows you to create rich, interactive forms for any use case.
