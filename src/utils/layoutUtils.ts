import type { FormField, FormRow } from '../types/form';

export function groupFieldsIntoRows(fields: FormField[]): FormRow[] {
  const rows: FormRow[] = [];
  let currentRow: FormField[] = [];
  let currentRowSpan = 0;
  
  fields.forEach((field, index) => {
    const fieldSpan = getFieldSpan(field);
    const startNewRow = field.properties?.startNewRow || false;
    
    // Start a new row if:
    // 1. This field is marked to start a new row
    // 2. Current row would exceed 12 columns
    // 3. This is the first field
    if (startNewRow || currentRowSpan + fieldSpan > 12 || currentRow.length === 0) {
      if (currentRow.length > 0) {
        rows.push({
          id: `row-${rows.length}`,
          fields: [...currentRow]
        });
      }
      currentRow = [field];
      currentRowSpan = fieldSpan;
    } else {
      currentRow.push(field);
      currentRowSpan += fieldSpan;
    }
    
    // If this is the last field, add the current row
    if (index === fields.length - 1 && currentRow.length > 0) {
      rows.push({
        id: `row-${rows.length}`,
        fields: [...currentRow]
      });
    }
  });
  
  return rows;
}

export function getFieldSpan(field: FormField): number {
  // Check both field.layout.columnSpan and field.columnSpan for backward compatibility
  const columnSpan = field.layout?.columnSpan || field.columnSpan;
  if (columnSpan) {
    return Math.min(12, Math.max(1, columnSpan));
  }
  
  // Map width property to column spans
  switch (field.properties?.width) {
    case 'quarter':
      return 3;
    case 'third':
      return 4;
    case 'half':
      return 6;
    case 'full':
    default:
      return 12;
  }
}

export function getGridClassName(span: number): string {
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
