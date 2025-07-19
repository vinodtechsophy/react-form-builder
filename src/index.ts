// Main Form Builder Components
export { FormBuilderProvider, useFormBuilder } from './context/FormBuilderContext';
export { FormCanvas } from './components/FormCanvas';
export { FieldSidebar } from './components/FieldSidebar';
export { PropertiesPanel } from './components/PropertiesPanel';
export { FormBuilderToolbar } from './components/FormBuilderToolbar';

// Form Rendering Components
export { FormRenderer } from './components/FormRenderer';
export { FormFieldRenderer } from './components/FormFieldRenderer';
export { SortableFormField } from './components/SortableFormField';
export { FormRowRenderer } from './components/FormRowRenderer';

// Example Components for JSON Rendering
export { JsonFormRenderer } from './examples/JsonFormRenderer';

// Types
export type {
  FormField,
  FormFieldType,
  ValidationRule,
  Option,
  FieldProperties,
  ConditionalLogic,
  FormConfig,
  FormSettings,
  DragItem,
  FormRow
} from './types/form';

// Export types from formExport
export type {
  FormExportData,
  FormRowExport,
  FormFieldExport
} from './utils/formExport';

// Utilities
export { generateFormExportData } from './utils/formExport';
export { createFormField, FIELD_TEMPLATES, DRAG_ITEMS, FIELD_CATEGORIES } from './data/formFields';
export { groupFieldsIntoRows, getFieldSpan, getGridClassName } from './utils/layoutUtils';
export { buildHeroUIClasses, buildFieldClasses, buildFieldWrapperClasses } from './utils/fieldStyles';

// Pre-built Form Builder Suite (for easy integration)
export { FormBuilderSuite } from './components/FormBuilderSuite';
