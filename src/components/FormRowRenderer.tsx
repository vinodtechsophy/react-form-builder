import { SortableFormField } from './SortableFormField';
import { getFieldSpan, getGridClassName } from '../utils/layoutUtils';
import { buildFieldWrapperClasses } from '../utils/fieldStyles';
import type { FormRow } from '../types/form';

interface FormRowRendererProps {
  row: FormRow;
  isPreview: boolean;
}

export function FormRowRenderer({ row, isPreview }: FormRowRendererProps) {
  const { fields } = row;
  
  // If there's only one field with full width, don't use grid
  if (fields.length === 1 && getFieldSpan(fields[0]) === 12) {
    const wrapperClasses = buildFieldWrapperClasses(fields[0], !isPreview); // isEditor = !isPreview
    return (
      <div className={wrapperClasses}>
        <SortableFormField
          key={fields[0].id}
          field={fields[0]}
          isPreview={isPreview}
        />
      </div>
    );
  }
  
  // Use CSS Grid for multi-column layout
  return (
    <div className="grid grid-cols-12 gap-3">
      {fields.map((field) => {
        const span = getFieldSpan(field);
        const gridClass = getGridClassName(span);
        const wrapperClasses = buildFieldWrapperClasses(field, !isPreview); // isEditor = !isPreview
        const combinedClasses = [gridClass, wrapperClasses].filter(Boolean).join(' ');
        
        return (
          <div key={field.id} className={combinedClasses}>
            <SortableFormField
              field={field}
              isPreview={isPreview}
            />
          </div>
        );
      })}
    </div>
  );
}
