import type { FormField, FormFieldType, DragItem } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

export const FIELD_TEMPLATES: Record<FormFieldType, Partial<FormField>> = {
  // Basic Inputs
  text: {
    type: 'text',
    label: 'Text Field',
    placeholder: 'Enter text...',
    required: false,
    properties: { width: 'full' }
  },
  textarea: {
    type: 'textarea',
    label: 'Textarea',
    placeholder: 'Enter multiline text...',
    required: false,
    properties: { width: 'full', rows: 4 }
  },
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email address...',
    required: false,
    validation: [{ type: 'email', message: 'Please enter a valid email address' }],
    properties: { width: 'full' }
  },
  number: {
    type: 'number',
    label: 'Number',
    placeholder: 'Enter number...',
    required: false,
    properties: { width: 'full' }
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password...',
    required: false,
    properties: { width: 'full' }
  },
  phone: {
    type: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter phone number...',
    required: false,
    properties: { width: 'full' }
  },
  url: {
    type: 'url',
    label: 'Website URL',
    placeholder: 'https://example.com',
    required: false,
    validation: [{ type: 'url', message: 'Please enter a valid URL' }],
    properties: { width: 'full' }
  },
  date: {
    type: 'date',
    label: 'Date',
    required: false,
    properties: { width: 'full' }
  },
  datetime: {
    type: 'datetime',
    label: 'Date & Time',
    required: false,
    properties: { width: 'full' }
  },
  time: {
    type: 'time',
    label: 'Time',
    required: false,
    properties: { width: 'full' }
  },
  
  // Choices
  radio: {
    type: 'radio',
    label: 'Radio Buttons',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    properties: { width: 'full' }
  },
  checkbox: {
    type: 'checkbox',
    label: 'Checkboxes',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    properties: { width: 'full' }
  },
  select: {
    type: 'select',
    label: 'Dropdown',
    placeholder: 'Select an option...',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    properties: { width: 'full' }
  },
  multiselect: {
    type: 'multiselect',
    label: 'Multi-Select',
    placeholder: 'Select multiple options...',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    properties: { width: 'full', multiple: true }
  },
  switch: {
    type: 'switch',
    label: 'Toggle Switch',
    required: false,
    properties: { width: 'full' }
  },
  
  // Advanced
  file: {
    type: 'file',
    label: 'File Upload',
    required: false,
    properties: { width: 'full', accept: '*' }
  },
  signature: {
    type: 'signature',
    label: 'Signature',
    required: false,
    properties: { width: 'full' }
  },
  rating: {
    type: 'rating',
    label: 'Rating',
    required: false,
    properties: { width: 'full', max: 5 }
  },
  range: {
    type: 'range',
    label: 'Range Slider',
    required: false,
    properties: { width: 'full', min: 0, max: 100, step: 1 }
  },
  
  // Layout
  section: {
    type: 'section',
    label: 'Section Header',
    properties: { width: 'full' }
  },
  paragraph: {
    type: 'paragraph',
    label: 'Paragraph Text',
    defaultValue: 'This is a paragraph of text that provides information or instructions.',
    properties: { width: 'full' }
  },
  pagebreak: {
    type: 'pagebreak',
    label: 'Page Break',
    properties: { width: 'full' }
  },
  
  // Custom
  html: {
    type: 'html',
    label: 'HTML Block',
    defaultValue: '<div>Custom HTML content</div>',
    properties: { width: 'full' }
  }
};

export const DRAG_ITEMS: DragItem[] = [
  // Basic Inputs
  { id: 'text', type: 'text', label: 'Text Field', icon: 'Type', category: 'basic' },
  { id: 'textarea', type: 'textarea', label: 'Textarea', icon: 'AlignLeft', category: 'basic' },
  { id: 'email', type: 'email', label: 'Email', icon: 'Mail', category: 'basic' },
  { id: 'number', type: 'number', label: 'Number', icon: 'Hash', category: 'basic' },
  { id: 'password', type: 'password', label: 'Password', icon: 'Lock', category: 'basic' },
  { id: 'phone', type: 'phone', label: 'Phone', icon: 'Phone', category: 'basic' },
  { id: 'url', type: 'url', label: 'Website URL', icon: 'Link', category: 'basic' },
  { id: 'date', type: 'date', label: 'Date', icon: 'Calendar', category: 'basic' },
  { id: 'datetime', type: 'datetime', label: 'Date & Time', icon: 'CalendarClock', category: 'basic' },
  { id: 'time', type: 'time', label: 'Time', icon: 'Clock', category: 'basic' },
  
  // Choices
  { id: 'radio', type: 'radio', label: 'Radio Buttons', icon: 'Circle', category: 'choices' },
  { id: 'checkbox', type: 'checkbox', label: 'Checkboxes', icon: 'CheckSquare', category: 'choices' },
  { id: 'select', type: 'select', label: 'Dropdown', icon: 'ChevronDown', category: 'choices' },
  { id: 'multiselect', type: 'multiselect', label: 'Multi-Select', icon: 'List', category: 'choices' },
  { id: 'switch', type: 'switch', label: 'Toggle Switch', icon: 'ToggleLeft', category: 'choices' },
  
  // Advanced
  { id: 'file', type: 'file', label: 'File Upload', icon: 'Upload', category: 'advanced' },
  { id: 'signature', type: 'signature', label: 'Signature', icon: 'PenTool', category: 'advanced' },
  { id: 'rating', type: 'rating', label: 'Rating', icon: 'Star', category: 'advanced' },
  { id: 'range', type: 'range', label: 'Range Slider', icon: 'Sliders', category: 'advanced' },
  
  // Layout
  { id: 'section', type: 'section', label: 'Section Header', icon: 'Heading', category: 'layout' },
  { id: 'paragraph', type: 'paragraph', label: 'Paragraph', icon: 'FileText', category: 'layout' },
  { id: 'pagebreak', type: 'pagebreak', label: 'Page Break', icon: 'Minus', category: 'layout' },
  
  // Custom
  { id: 'html', type: 'html', label: 'HTML Block', icon: 'Code', category: 'custom' }
];

export const createFormField = (type: FormFieldType): FormField => {
  const template = FIELD_TEMPLATES[type];
  const label = template.label || 'New Field';
  
  // Generate a default name based on the field type and label
  const generateFieldName = (fieldType: FormFieldType, fieldLabel: string): string => {
    // For some common types, use the type as the base name
    const typeBasedNames: Record<string, string> = {
      'email': 'email',
      'password': 'password',
      'date': 'date',
      'datetime': 'datetime',
      'time': 'time',
      'number': 'number',
      'file': 'file',
      'textarea': 'description'
    };
    
    if (typeBasedNames[fieldType]) {
      return typeBasedNames[fieldType];
    }
    
    // Otherwise, generate from label
    return fieldLabel.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
      || 'field'; // Fallback if nothing remains
  };
  
  return {
    id: uuidv4(),
    ...template,
    type,
    label,
    name: generateFieldName(type, label),
    required: template.required || false
  } as FormField;
};

export const FIELD_CATEGORIES = [
  { id: 'basic', label: 'Basic Inputs', icon: 'Type' },
  { id: 'choices', label: 'Choices', icon: 'Circle' },
  { id: 'advanced', label: 'Advanced', icon: 'Star' },
  { id: 'layout', label: 'Layout', icon: 'Square' },
  { id: 'custom', label: 'Custom', icon: 'Puzzle' }
];
