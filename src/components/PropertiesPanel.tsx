import { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Input, 
  Switch, 
  Select, 
  SelectItem, 
  Button,
  Tabs,
  Tab,
  Chip,
  Textarea
} from '@heroui/react';
import { Plus, Trash2, Settings, Code, Layout, Palette } from 'lucide-react';
import { useFormBuilder } from '../context/FormBuilderContext';
import type { FormField, Option, ValidationRule } from '../types/form';

export function PropertiesPanel() {
  const { state } = useFormBuilder();
  const { selectedFieldId, currentForm } = state;
  
  const selectedField = currentForm.fields.find(field => field.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="w-full bg-background border-l border-divider h-full mt-1 sm:mt-2 p-1 sm:p-2">
        <Card radius='sm' className="py-4 sm:py-10">
          <CardBody className="text-center py-2 sm:py-4">
            <Settings className="text-lg sm:text-2xl text-default-400 mx-auto mb-1 sm:mb-2" />
            <h3 className="text-xs font-semibold mb-1 hidden sm:block">No Field Selected</h3>
            <h3 className="text-xs font-semibold mb-1 sm:hidden">Select Field</h3>
            <p className="text-default-600 text-xs hidden sm:block">
              Select a field to edit properties
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full bg-background border-l border-divider h-full overflow-y-auto">
      <div className="p-2">
        <h2 className="text-sm font-semibold mb-2">Properties</h2>
        
        <Tabs aria-label="Properties" variant="underlined" size="sm">
          <Tab key="basic" title="Basic">
            <BasicProperties field={selectedField} />
          </Tab>
          <Tab key="advanced" title="Advanced">
            <AdvancedProperties field={selectedField} />
          </Tab>
          <Tab key="layout" title="Layout">
            <LayoutProperties field={selectedField} />
          </Tab>
          <Tab key="custom" title="Custom">
            <CustomProperties field={selectedField} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

function BasicProperties({ field }: { field: FormField }) {
  const { actions } = useFormBuilder();

  const updateField = (updates: Partial<FormField>) => {
    actions.updateField(field.id, updates);
  };

  const updateProperties = (updates: any) => {
    actions.updateField(field.id, {
      properties: { ...field.properties, ...updates }
    });
  };

  return (
    <div className="space-y-2 pt-2">
      <Input
        label="Label"
        value={field.label}
        onChange={(e) => updateField({ label: e.target.value })}
        size="sm"
      />

      <Input
        label="Field Name"
        placeholder="e.g., first_name, email, age"
        value={field.name || ''}
        onChange={(e) => updateField({ name: e.target.value })}
        size="sm"
        description="Used as the key in form submissions"
      />

      {field.type !== 'section' && field.type !== 'paragraph' && (
        <Input
          label="Placeholder"
          value={field.placeholder || ''}
          onChange={(e) => updateField({ placeholder: e.target.value })}
          size="sm"
        />
      )}

      <Switch
        isSelected={field.required}
        onValueChange={(checked) => updateField({ required: checked })}
        size="sm"
      >
        Required
      </Switch>

      <Select
        label="Width"
        selectedKeys={[field.properties?.width || 'full']}
        onSelectionChange={(keys) => {
          const width = Array.from(keys)[0] as string;
          updateProperties({ width });
        }}
        size="sm"
      >
        <SelectItem key="full">Full</SelectItem>
        <SelectItem key="half">Half</SelectItem>
        <SelectItem key="third">Third</SelectItem>
        <SelectItem key="quarter">Quarter</SelectItem>
      </Select>

      {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'select' || field.type === 'multiselect') && (
        <OptionsEditor field={field} />
      )}

      {field.type === 'textarea' && (
        <Input
          type="number"
          label="Rows"
          value={field.properties?.rows?.toString() || '4'}
          onChange={(e) => updateProperties({ rows: parseInt(e.target.value) || 4 })}
          size="sm"
        />
      )}

      {field.type === 'rating' && (
        <Input
          type="number"
          label="Max Rating"
          value={field.properties?.max?.toString() || '5'}
          onChange={(e) => updateProperties({ max: parseInt(e.target.value) || 5 })}
          size="sm"
        />
      )}

      {field.type === 'file' && (
        <>
          <Input
            label="File Types"
            placeholder="e.g., .jpg,.png,.pdf"
            value={field.properties?.accept || ''}
            onChange={(e) => updateProperties({ accept: e.target.value })}
            size="sm"
          />
          <Switch
            isSelected={field.properties?.multiple || false}
            onValueChange={(checked) => updateProperties({ multiple: checked })}
            size="sm"
          >
            Multiple Files
          </Switch>
        </>
      )}

      {field.type === 'number' && (
        <>
          <Input
            type="number"
            label="Min Value"
            value={field.properties?.min?.toString() || ''}
            onChange={(e) => updateProperties({ min: e.target.value ? parseFloat(e.target.value) : undefined })}
            size="sm"
          />
          <Input
            type="number"
            label="Max Value"
            value={field.properties?.max?.toString() || ''}
            onChange={(e) => updateProperties({ max: e.target.value ? parseFloat(e.target.value) : undefined })}
            size="sm"
          />
        </>
      )}
    </div>
  );
}

function OptionsEditor({ field }: { field: FormField }) {
  const { actions } = useFormBuilder();
  const [newOption, setNewOption] = useState({ label: '', value: '' });

  const updateOptions = (options: Option[]) => {
    actions.updateField(field.id, { options });
  };

  const addOption = () => {
    if (newOption.label && newOption.value) {
      const currentOptions = field.options || [];
      updateOptions([...currentOptions, newOption]);
      setNewOption({ label: '', value: '' });
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = field.options || [];
    updateOptions(currentOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium">Options</h4>
        <Chip size="sm" variant="flat">{field.options?.length || 0}</Chip>
      </div>

      {field.options?.map((option, index) => (
        <div key={index} className="p-2 border border-default-200 rounded space-y-1">
          <Input
            size="sm"
            placeholder="Label"
            value={option.label}
            onChange={(e) => {
              const currentOptions = field.options || [];
              const updatedOptions = currentOptions.map((opt, i) => 
                i === index ? { ...opt, label: e.target.value } : opt
              );
              updateOptions(updatedOptions);
            }}
          />
          <div className="flex gap-1">
            <Input
              size="sm"
              placeholder="Value"
              value={option.value}
              onChange={(e) => {
                const currentOptions = field.options || [];
                const updatedOptions = currentOptions.map((opt, i) => 
                  i === index ? { ...opt, value: e.target.value } : opt
                );
                updateOptions(updatedOptions);
              }}
              className="flex-1"
            />
            <Button
              size="sm"
              color="danger"
              variant="flat"
              isIconOnly
              onPress={() => removeOption(index)}
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
      ))}

      <div className="p-2 border border-dashed border-default-300 rounded space-y-1">
        <Input
          size="sm"
          placeholder="New option label"
          value={newOption.label}
          onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
        />
        <div className="flex gap-1">
          <Input
            size="sm"
            placeholder="Value"
            value={newOption.value}
            onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
            className="flex-1"
          />
          <Button
            size="sm"
            color="primary"
            variant="flat"
            isIconOnly
            onPress={addOption}
            isDisabled={!newOption.label || !newOption.value}
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdvancedProperties({ field }: { field: FormField }) {
  const { actions } = useFormBuilder();

  const updateField = (updates: Partial<FormField>) => {
    actions.updateField(field.id, updates);
  };

  const updateProperties = (updates: any) => {
    actions.updateField(field.id, {
      properties: { ...field.properties, ...updates }
    });
  };

  const addValidation = () => {
    const currentValidation = field.validation || [];
    const newValidation: ValidationRule = {
      type: 'required',
      message: 'This field is required'
    };
    updateField({ validation: [...currentValidation, newValidation] });
  };

  const removeValidation = (index: number) => {
    const currentValidation = field.validation || [];
    updateField({ validation: currentValidation.filter((_, i) => i !== index) });
  };

  const updateValidation = (index: number, updates: any) => {
    const currentValidation = field.validation || [];
    const updatedValidation = currentValidation.map((val, i) => 
      i === index ? { ...val, ...updates } : val
    );
    updateField({ validation: updatedValidation });
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Default Value */}
      <Input
        label="Default Value"
        value={field.defaultValue || ''}
        onChange={(e) => updateField({ defaultValue: e.target.value })}
        size="sm"
      />

      {/* Help Text */}
      <Textarea
        label="Help Text"
        value={field.properties?.helpText || ''}
        onChange={(e) => updateProperties({ helpText: e.target.value })}
        size="sm"
        rows={2}
      />

      {/* Conditional Logic */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h4 className="text-xs font-medium text-default-700 flex items-center gap-1">
          <Settings size={12} />
          Conditional Logic
        </h4>
        
        <Switch
          isSelected={field.properties?.conditional || false}
          onValueChange={(checked) => updateProperties({ conditional: checked })}
          size="sm"
        >
          Enable Conditional Display
        </Switch>

        {field.properties?.conditional && (
          <div className="space-y-2 pl-4">
            <Select
              label="Show when field"
              selectedKeys={field.properties?.conditionalField ? [field.properties.conditionalField] : []}
              onSelectionChange={(keys) => {
                const fieldId = Array.from(keys)[0] as string;
                updateProperties({ conditionalField: fieldId });
              }}
              size="sm"
            >
              <SelectItem key="field1">Name</SelectItem>
              <SelectItem key="field2">Email</SelectItem>
              <SelectItem key="field3">Age</SelectItem>
            </Select>

            <Select
              label="Condition"
              selectedKeys={[field.properties?.conditionalOperator || 'equals']}
              onSelectionChange={(keys) => {
                const operator = Array.from(keys)[0] as string;
                updateProperties({ conditionalOperator: operator });
              }}
              size="sm"
            >
              <SelectItem key="equals">Equals</SelectItem>
              <SelectItem key="not_equals">Not equals</SelectItem>
              <SelectItem key="contains">Contains</SelectItem>
              <SelectItem key="empty">Is empty</SelectItem>
              <SelectItem key="not_empty">Is not empty</SelectItem>
            </Select>

            <Input
              label="Value"
              value={field.properties?.conditionalValue || ''}
              onChange={(e) => updateProperties({ conditionalValue: e.target.value })}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Validation Rules */}
      <div className="space-y-2 border-t border-divider pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium text-default-700">Validation Rules</h4>
          <Button
            size="sm"
            variant="flat"
            startContent={<Plus size={12} />}
            onPress={addValidation}
          >
            Add Rule
          </Button>
        </div>

        {field.validation?.map((validation, index) => (
          <div key={index} className="p-2 border border-default-200 rounded space-y-2">
            <div className="flex gap-2">
              <Select
                label="Type"
                selectedKeys={[validation.type]}
                onSelectionChange={(keys) => {
                  const type = Array.from(keys)[0] as string;
                  updateValidation(index, { type });
                }}
                size="sm"
                className="flex-1"
              >
                <SelectItem key="required">Required</SelectItem>
                <SelectItem key="email">Email</SelectItem>
                <SelectItem key="url">URL</SelectItem>
                <SelectItem key="pattern">Pattern</SelectItem>
                <SelectItem key="min_length">Min Length</SelectItem>
                <SelectItem key="max_length">Max Length</SelectItem>
                <SelectItem key="min_value">Min Value</SelectItem>
                <SelectItem key="max_value">Max Value</SelectItem>
              </Select>
              
              <Button
                size="sm"
                color="danger"
                variant="flat"
                isIconOnly
                onPress={() => removeValidation(index)}
              >
                <Trash2 size={12} />
              </Button>
            </div>

            {(validation.type === 'pattern' || validation.type === 'minLength' || 
              validation.type === 'maxLength' || validation.type === 'min' || 
              validation.type === 'max') && (
              <Input
                label="Value"
                value={validation.value || ''}
                onChange={(e) => updateValidation(index, { value: e.target.value })}
                size="sm"
              />
            )}

            <Input
              label="Error Message"
              value={validation.message || ''}
              onChange={(e) => updateValidation(index, { message: e.target.value })}
              size="sm"
            />
          </div>
        ))}
      </div>

      {/* Field Specific Properties */}
      {field.type === 'number' && (
        <div className="space-y-2 border-t border-divider pt-2">
          <h4 className="text-xs font-medium text-default-700">Number Properties</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              label="Min Value"
              value={field.properties?.min?.toString() || ''}
              onChange={(e) => updateProperties({ min: e.target.value ? parseFloat(e.target.value) : undefined })}
              size="sm"
            />
            <Input
              type="number"
              label="Max Value"
              value={field.properties?.max?.toString() || ''}
              onChange={(e) => updateProperties({ max: e.target.value ? parseFloat(e.target.value) : undefined })}
              size="sm"
            />
          </div>
          <Input
            type="number"
            label="Step"
            value={field.properties?.step?.toString() || ''}
            onChange={(e) => updateProperties({ step: e.target.value ? parseFloat(e.target.value) : undefined })}
            size="sm"
          />
        </div>
      )}

      {/* Character Counter */}
      {(field.type === 'text' || field.type === 'textarea') && (
        <div className="space-y-2 border-t border-divider pt-2">
          <h4 className="text-xs font-medium text-default-700">Text Properties</h4>
          <Switch
            isSelected={field.properties?.showCharacterCount || false}
            onValueChange={(checked) => updateProperties({ showCharacterCount: checked })}
            size="sm"
          >
            Show Character Count
          </Switch>
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              label="Min Length"
              value={field.properties?.minLength?.toString() || ''}
              onChange={(e) => updateProperties({ minLength: e.target.value ? parseInt(e.target.value) : undefined })}
              size="sm"
            />
            <Input
              type="number"
              label="Max Length"
              value={field.properties?.maxLength?.toString() || ''}
              onChange={(e) => updateProperties({ maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function LayoutProperties({ field }: { field: FormField }) {
  const { actions } = useFormBuilder();

  const updateField = (updates: Partial<FormField>) => {
    actions.updateField(field.id, updates);
  };

  const updateProperties = (updates: any) => {
    actions.updateField(field.id, {
      properties: { ...field.properties, ...updates }
    });
  };

  return (
    <div className="space-y-3 pt-2">
      <h4 className="text-xs font-medium text-default-700 flex items-center gap-1">
        <Layout size={12} />
        Layout & Positioning
      </h4>

      {/* Grid Layout */}
      <div className="space-y-2">
        <Select
          label="Column Span"
          selectedKeys={[field.layout?.columnSpan?.toString() || field.columnSpan?.toString() || '12']}
          onSelectionChange={(keys) => {
            const span = parseInt(Array.from(keys)[0] as string);
            updateField({ 
              columnSpan: span, // For backward compatibility
              layout: { 
                ...field.layout, 
                columnSpan: span,
                gridClass: `col-span-${span}`
              }
            });
          }}
          size="sm"
        >
          <SelectItem key="1">1 column (8.33%)</SelectItem>
          <SelectItem key="2">2 columns (16.67%)</SelectItem>
          <SelectItem key="3">3 columns (25%)</SelectItem>
          <SelectItem key="4">4 columns (33.33%)</SelectItem>
          <SelectItem key="5">5 columns (41.67%)</SelectItem>
          <SelectItem key="6">6 columns (50%)</SelectItem>
          <SelectItem key="7">7 columns (58.33%)</SelectItem>
          <SelectItem key="8">8 columns (66.67%)</SelectItem>
          <SelectItem key="9">9 columns (75%)</SelectItem>
          <SelectItem key="10">10 columns (83.33%)</SelectItem>
          <SelectItem key="11">11 columns (91.67%)</SelectItem>
          <SelectItem key="12">12 columns (100%)</SelectItem>
        </Select>

        <Switch
          isSelected={field.properties?.startNewRow || false}
          onValueChange={(checked) => updateProperties({ startNewRow: checked })}
          size="sm"
        >
          Start New Row
        </Switch>
      </div>

      {/* Spacing */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600">Spacing</h5>
        
        <div className="grid grid-cols-2 gap-2">
          <Select
            label="Margin Top"
            selectedKeys={[field.properties?.marginTop || 'default']}
            onSelectionChange={(keys) => {
              const margin = Array.from(keys)[0] as string;
              updateProperties({ marginTop: margin });
            }}
            size="sm"
          >
            <SelectItem key="none">None</SelectItem>
            <SelectItem key="small">Small</SelectItem>
            <SelectItem key="default">Default</SelectItem>
            <SelectItem key="large">Large</SelectItem>
          </Select>

          <Select
            label="Margin Bottom"
            selectedKeys={[field.properties?.marginBottom || 'default']}
            onSelectionChange={(keys) => {
              const margin = Array.from(keys)[0] as string;
              updateProperties({ marginBottom: margin });
            }}
            size="sm"
          >
            <SelectItem key="none">None</SelectItem>
            <SelectItem key="small">Small</SelectItem>
            <SelectItem key="default">Default</SelectItem>
            <SelectItem key="large">Large</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select
            label="Padding"
            selectedKeys={[field.properties?.padding || 'default']}
            onSelectionChange={(keys) => {
              const padding = Array.from(keys)[0] as string;
              updateProperties({ padding });
            }}
            size="sm"
          >
            <SelectItem key="none">None</SelectItem>
            <SelectItem key="small">Small</SelectItem>
            <SelectItem key="default">Default</SelectItem>
            <SelectItem key="large">Large</SelectItem>
          </Select>

          <Select
            label="Alignment"
            selectedKeys={[field.properties?.alignment || 'left']}
            onSelectionChange={(keys) => {
              const alignment = Array.from(keys)[0] as string;
              updateProperties({ alignment });
            }}
            size="sm"
          >
            <SelectItem key="left">Left</SelectItem>
            <SelectItem key="center">Center</SelectItem>
            <SelectItem key="right">Right</SelectItem>
          </Select>
        </div>
      </div>

      {/* Responsive Settings */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600">Responsive</h5>
        
        <Switch
          isSelected={field.properties?.hideOnMobile || false}
          onValueChange={(checked) => updateProperties({ hideOnMobile: checked })}
          size="sm"
        >
          Hide on Mobile
        </Switch>

        <Switch
          isSelected={field.properties?.hideOnTablet || false}
          onValueChange={(checked) => updateProperties({ hideOnTablet: checked })}
          size="sm"
        >
          Hide on Tablet
        </Switch>

        <Switch
          isSelected={field.properties?.hideOnDesktop || false}
          onValueChange={(checked) => updateProperties({ hideOnDesktop: checked })}
          size="sm"
        >
          Hide on Desktop
        </Switch>
      </div>
    </div>
  );
}

function CustomProperties({ field }: { field: FormField }) {
  const { actions } = useFormBuilder();

  const updateProperties = (updates: any) => {
    actions.updateField(field.id, {
      properties: { ...field.properties, ...updates }
    });
  };

  return (
    <div className="space-y-3 pt-2">
      <h4 className="text-xs font-medium text-default-700 flex items-center gap-1">
        <Code size={12} />
        Custom Styling
      </h4>

      {/* CSS Classes */}
      <Input
        label="CSS Classes"
        placeholder="btn-primary custom-field"
        value={field.properties?.customClasses || ''}
        onChange={(e) => updateProperties({ customClasses: e.target.value })}
        size="sm"
      />

      {/* Custom Attributes */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600">HTML Attributes</h5>
        
        <Input
          label="Data Attributes"
          placeholder="data-test=value"
          value={field.properties?.dataAttributes || ''}
          onChange={(e) => updateProperties({ dataAttributes: e.target.value })}
          size="sm"
        />

        <Input
          label="ARIA Label"
          value={field.properties?.ariaLabel || ''}
          onChange={(e) => updateProperties({ ariaLabel: e.target.value })}
          size="sm"
        />

        <Input
          label="Tab Index"
          type="number"
          value={field.properties?.tabIndex?.toString() || ''}
          onChange={(e) => updateProperties({ tabIndex: e.target.value ? parseInt(e.target.value) : undefined })}
          size="sm"
        />
      </div>

      {/* Styling */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600 flex items-center gap-1">
          <Palette size={12} />
          Appearance
        </h5>
        
        <Select
          label="Color Variant"
          selectedKeys={[field.properties?.colorVariant || 'default']}
          onSelectionChange={(keys) => {
            const variant = Array.from(keys)[0] as string;
            updateProperties({ colorVariant: variant });
          }}
          size="sm"
        >
          <SelectItem key="default">Default</SelectItem>
          <SelectItem key="primary">Primary</SelectItem>
          <SelectItem key="secondary">Secondary</SelectItem>
          <SelectItem key="success">Success</SelectItem>
          <SelectItem key="warning">Warning</SelectItem>
          <SelectItem key="danger">Danger</SelectItem>
        </Select>

        <Select
          label="Size"
          selectedKeys={[field.properties?.size || 'sm']}
          onSelectionChange={(keys) => {
            const size = Array.from(keys)[0] as string;
            updateProperties({ size });
          }}
          size="sm"
        >
          <SelectItem key="sm">Small</SelectItem>
          <SelectItem key="md">Medium</SelectItem>
          <SelectItem key="lg">Large</SelectItem>
        </Select>

        <Select
          label="Border Radius"
          selectedKeys={[field.properties?.borderRadius || 'default']}
          onSelectionChange={(keys) => {
            const radius = Array.from(keys)[0] as string;
            updateProperties({ borderRadius: radius });
          }}
          size="sm"
        >
          <SelectItem key="none">None</SelectItem>
          <SelectItem key="small">Small</SelectItem>
          <SelectItem key="default">Default</SelectItem>
          <SelectItem key="large">Large</SelectItem>
          <SelectItem key="full">Full</SelectItem>
        </Select>
      </div>

      {/* Field ID */}
      <div className="border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600 mb-1">Field ID</h5>
        <p className="text-xs text-default-500 font-mono bg-default-100 p-2 rounded">
          {field.id}
        </p>
      </div>

      {/* Advanced Options */}
      <div className="space-y-2 border-t border-divider pt-2">
        <h5 className="text-xs font-medium text-default-600">Advanced</h5>
        
        <Switch
          isSelected={field.properties?.disabled || false}
          onValueChange={(checked) => updateProperties({ disabled: checked })}
          size="sm"
        >
          Disabled
        </Switch>

        <Switch
          isSelected={field.properties?.readonly || false}
          onValueChange={(checked) => updateProperties({ readonly: checked })}
          size="sm"
        >
          Read Only
        </Switch>

        <Switch
          isSelected={field.properties?.hidden || false}
          onValueChange={(checked) => updateProperties({ hidden: checked })}
          size="sm"
        >
          Hidden Field
        </Switch>
      </div>
    </div>
  );
}