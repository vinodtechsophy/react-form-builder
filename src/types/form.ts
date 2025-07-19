export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  name?: string; // Field name for form submission (e.g., "first_name", "email")
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
  validation?: ValidationRule[];
  options?: Option[];
  properties?: FieldProperties;
  conditionalLogic?: ConditionalLogic;
  rowId?: string; // For grouping fields into rows
  columnSpan?: number; // 1-12 for grid system
  layout?: {
    columnSpan?: number;
    rowId?: string;
    gridClass?: string;
  };
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'url' | 'min_length' | 'max_length' | 'min_value' | 'max_value';
  value?: any;
  message: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface FieldProperties {
  helpText?: string;
  customClasses?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
  rows?: number; // for textarea
  multiple?: boolean; // for select
  accept?: string; // for file upload
  min?: number;
  max?: number;
  step?: number;
  startNewRow?: boolean; // Force this field to start a new row
  
  // Custom field type for extensibility
  customType?: string;
  
  // Conditional Logic
  conditional?: boolean;
  conditionalField?: string;
  conditionalOperator?: 'equals' | 'not_equals' | 'contains' | 'empty' | 'not_empty';
  conditionalValue?: string;
  
  // Text Properties
  showCharacterCount?: boolean;
  minLength?: number;
  maxLength?: number;
  
  // Layout Properties
  marginTop?: 'none' | 'small' | 'default' | 'large';
  marginBottom?: 'none' | 'small' | 'default' | 'large';
  padding?: 'none' | 'small' | 'default' | 'large';
  alignment?: 'left' | 'center' | 'right';
  
  // Responsive Properties
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  
  // Custom Styling
  dataAttributes?: string;
  ariaLabel?: string;
  tabIndex?: number;
  colorVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'default' | 'large' | 'full';
  
  // Advanced Options
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
}

export interface ConditionalLogic {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
  action: 'show' | 'hide' | 'require';
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
}

export interface FormSettings {
  submitButtonText: string;
  redirectUrl?: string;
  emailNotifications?: string[];
  allowMultipleSubmissions: boolean;
  requireAuth: boolean;
  captchaEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export type FormFieldType = 
  // Basic Inputs
  | 'text'
  | 'textarea' 
  | 'email'
  | 'number'
  | 'password'
  | 'phone'
  | 'url'
  | 'date'
  | 'datetime'
  | 'time'
  // Choices
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'multiselect'
  | 'switch'
  // Advanced
  | 'file'
  | 'signature'
  | 'rating'
  | 'range'
  // Layout
  | 'section'
  | 'paragraph'
  | 'pagebreak'
  // Custom
  | 'html';

export interface DragItem {
  id: string;
  type: FormFieldType;
  label: string;
  icon: string;
  category: 'basic' | 'choices' | 'advanced' | 'layout' | 'custom';
}

export interface FormRow {
  id: string;
  fields: FormField[];
}
