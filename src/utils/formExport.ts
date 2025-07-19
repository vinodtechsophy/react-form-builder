import type { FormConfig } from '../types/form';
import { groupFieldsIntoRows, getFieldSpan } from './layoutUtils';

export interface FormExportData {
  metadata: {
    id: string;
    title: string;
    description?: string;
    version: string;
    createdAt: string;
    exportedAt: string;
    builderVersion: string;
  };
  settings: {
    submitButtonText: string;
    redirectUrl?: string;
    emailNotifications?: string[];
    allowMultipleSubmissions: boolean;
    requireAuth: boolean;
    captchaEnabled: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  layout: {
    rows: FormRowExport[];
    totalFields: number;
  };
  fields: FormFieldExport[];
  fieldMap: Record<string, FormFieldExport>;
  validation: {
    requiredFields: string[];
    fieldsWithValidation: string[];
  };
}

export interface FormRowExport {
  id: string;
  fields: string[]; // Array of field IDs
  columns: number; // Total columns used in this row
}

export interface FormFieldExport {
  id: string;
  type: string;
  label: string;
  name?: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
  validation?: Array<{
    type: string;
    value?: any;
    message: string;
  }>;
  options?: Array<{
    label: string;
    value: string;
  }>;
  properties: {
    helpText?: string;
    customClasses?: string;
    width?: string;
    rows?: number;
    multiple?: boolean;
    accept?: string;
    min?: number;
    max?: number;
    step?: number;
    startNewRow?: boolean;
  };
  layout: {
    columnSpan: number;
    rowId: string;
    gridClass: string;
  };
  conditionalLogic?: {
    field: string;
    operator: string;
    value: any;
    action: string;
  };
}

export function generateFormExportData(form: FormConfig): FormExportData {
  const rows = groupFieldsIntoRows(form.fields);
  const now = new Date().toISOString();
  
  // Process rows for export
  const exportRows: FormRowExport[] = rows.map(row => ({
    id: row.id,
    fields: row.fields.map(field => field.id),
    columns: row.fields.reduce((total, field) => total + getFieldSpan(field), 0)
  }));

  // Process fields for export
  const exportFields: FormFieldExport[] = form.fields.map(field => {
    const span = getFieldSpan(field);
    const rowId = rows.find(row => row.fields.some(f => f.id === field.id))?.id || 'row-0';
    
    return {
      id: field.id,
      type: field.type,
      label: field.label,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      defaultValue: field.defaultValue,
      validation: field.validation,
      options: field.options,
      properties: {
        helpText: field.properties?.helpText,
        customClasses: field.properties?.customClasses,
        width: field.properties?.width || 'full',
        rows: field.properties?.rows,
        multiple: field.properties?.multiple,
        accept: field.properties?.accept,
        min: field.properties?.min,
        max: field.properties?.max,
        step: field.properties?.step,
        startNewRow: field.properties?.startNewRow,
      },
      layout: {
        columnSpan: field.columnSpan || span,
        rowId: rowId,
        gridClass: getGridClassName(field.columnSpan || span),
      },
      conditionalLogic: field.conditionalLogic,
    };
  });

  // Create field map for easy lookup
  const fieldMap: Record<string, FormFieldExport> = {};
  exportFields.forEach(field => {
    fieldMap[field.id] = field;
  });

  // Validation summary
  const requiredFields = exportFields.filter(field => field.required).map(field => field.id);
  const fieldsWithValidation = exportFields
    .filter(field => field.validation && field.validation.length > 0)
    .map(field => field.id);

  return {
    metadata: {
      id: form.id,
      title: form.title,
      description: form.description,
      version: '1.0.0',
      createdAt: form.id, // Using ID as creation timestamp for now
      exportedAt: now,
      builderVersion: '1.0.0',
    },
    settings: form.settings,
    layout: {
      rows: exportRows,
      totalFields: exportFields.length,
    },
    fields: exportFields,
    fieldMap,
    validation: {
      requiredFields,
      fieldsWithValidation,
    },
  };
}

function getGridClassName(span: number): string {
  const gridClasses: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };
  
  return gridClasses[span] || 'col-span-12';
}

export function downloadFormAsJson(form: FormConfig, filename?: string) {
  const exportData = generateFormExportData(form);
  const jsonString = JSON.stringify(exportData, null, 2);
  
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${form.title.replace(/\s+/g, '_')}_form_export.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Utility function to generate form preview JSON (for embedding in preview mode)
export function generateFormPreviewJson(form: FormConfig): string {
  const exportData = generateFormExportData(form);
  return JSON.stringify(exportData, null, 2);
}
