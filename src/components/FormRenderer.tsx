import React, { useState } from 'react';
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Button,
  Card,
  CardBody,
  CardHeader,
  Slider,
  Chip,
  Divider,
} from '@heroui/react';
import { Star, Upload } from 'lucide-react';
import { SignaturePad } from './SignaturePad';
import type { FormExportData, FormFieldExport } from '../utils/formExport';

interface FormRendererProps {
  formConfig: FormExportData;
  onSubmit?: (data: Record<string, any>) => void;
  className?: string;
}

export function FormRenderer({ formConfig, onSubmit, className = '' }: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check required fields
    formConfig.validation.requiredFields.forEach(fieldId => {
      const field = formConfig.fieldMap[fieldId];
      const value = formData[fieldId];
      
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors[fieldId] = `${field.label} is required`;
      }
    });

    // Check field-specific validation
    formConfig.validation.fieldsWithValidation.forEach(fieldId => {
      const field = formConfig.fieldMap[fieldId];
      const value = formData[fieldId];

      if (field.validation && value) {
        field.validation.forEach(rule => {
          switch (rule.type) {
            case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                newErrors[fieldId] = rule.message;
              }
              break;
            case 'minLength':
              if (value.length < rule.value) {
                newErrors[fieldId] = rule.message;
              }
              break;
            case 'maxLength':
              if (value.length > rule.value) {
                newErrors[fieldId] = rule.message;
              }
              break;
            case 'min':
              if (parseFloat(value) < rule.value) {
                newErrors[fieldId] = rule.message;
              }
              break;
            case 'max':
              if (parseFloat(value) > rule.value) {
                newErrors[fieldId] = rule.message;
              }
              break;
            case 'pattern':
              const regex = new RegExp(rule.value);
              if (!regex.test(value)) {
                newErrors[fieldId] = rule.message;
              }
              break;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Transform the form data to use field names instead of IDs
      const submissionData: Record<string, any> = {};
      
      Object.entries(formData).forEach(([fieldId, value]) => {
        const field = formConfig.fieldMap[fieldId];
        const fieldName = field.name || field.label.toLowerCase().replace(/\s+/g, '_');
        submissionData[fieldName] = value;
      });
      
      onSubmit?.(submissionData);
    }
  };

  const renderField = (field: FormFieldExport) => {
    const value = formData[field.id] || field.defaultValue || '';
    const error = errors[field.id];
    const hasError = !!error;

    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      isRequired: field.required,
      description: field.properties.helpText,
      className: field.properties.customClasses,
      isInvalid: hasError,
      errorMessage: error,
      size: 'sm' as const,
    };

    switch (field.type) {
      case 'text':
        return (
          <Input
            {...commonProps}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'email':
        return (
          <Input
            {...commonProps}
            type="email"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'password':
        return (
          <Input
            {...commonProps}
            type="password"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            min={field.properties.min}
            max={field.properties.max}
            step={field.properties.step}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            rows={field.properties.rows || 4}
          />
        );

      case 'select':
        return (
          <Select
            {...commonProps}
            selectedKeys={value ? [value] : []}
            onSelectionChange={(keys) => {
              const selectedValue = Array.from(keys)[0];
              handleFieldChange(field.id, selectedValue);
            }}
          >
            {field.options?.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            )) || []}
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            label={field.label}
            description={field.properties.helpText}
            isRequired={field.required}
            value={value}
            onValueChange={(val) => handleFieldChange(field.id, val)}
            isInvalid={hasError}
            errorMessage={error}
            size="sm"
          >
            {field.options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            )) || []}
          </RadioGroup>
        );

      case 'checkbox':
        if (field.options && field.options.length > 1) {
          return (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-danger">*</span>}
              </label>
              {field.properties.helpText && (
                <p className="text-xs text-default-500">{field.properties.helpText}</p>
              )}
              <div className="space-y-2">
                {field.options.map((option) => (
                  <Checkbox
                    key={option.value}
                    isSelected={value?.includes?.(option.value) || false}
                    onValueChange={(checked) => {
                      const currentValues = value || [];
                      if (checked) {
                        handleFieldChange(field.id, [...currentValues, option.value]);
                      } else {
                        handleFieldChange(field.id, currentValues.filter((v: any) => v !== option.value));
                      }
                    }}
                    size="sm"
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </div>
              {hasError && <p className="text-danger text-xs">{error}</p>}
            </div>
          );
        } else {
          return (
            <div>
              <Checkbox
                isSelected={value || false}
                onValueChange={(checked) => handleFieldChange(field.id, checked)}
                size="sm"
              >
                {field.label}
                {field.required && <span className="text-danger ml-1">*</span>}
              </Checkbox>
              {field.properties.helpText && (
                <p className="text-xs text-default-500 mt-1">{field.properties.helpText}</p>
              )}
              {hasError && <p className="text-danger text-xs mt-1">{error}</p>}
            </div>
          );
        }

      case 'switch':
        return (
          <div>
            <Switch
              isSelected={value || false}
              onValueChange={(checked) => handleFieldChange(field.id, checked)}
              size="sm"
            >
              {field.label}
              {field.required && <span className="text-danger ml-1">*</span>}
            </Switch>
            {field.properties.helpText && (
              <p className="text-xs text-default-500 mt-1">{field.properties.helpText}</p>
            )}
            {hasError && <p className="text-danger text-xs mt-1">{error}</p>}
          </div>
        );

      case 'section':
        return (
          <Card>
            <CardBody className="py-4">
              <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
              {field.properties.helpText && (
                <p className="text-default-600">{field.properties.helpText}</p>
              )}
            </CardBody>
          </Card>
        );

      case 'paragraph':
        return (
          <div className="py-2">
            <h4 className="text-md font-medium mb-1">{field.label}</h4>
            {field.properties.helpText && (
              <p className="text-default-600">{field.properties.helpText}</p>
            )}
          </div>
        );

      case 'phone':
        return (
          <Input
            {...commonProps}
            type="tel"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'url':
        return (
          <Input
            {...commonProps}
            type="url"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'time':
        return (
          <Input
            {...commonProps}
            type="time"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'datetime':
        return (
          <Input
            {...commonProps}
            type="datetime-local"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'multiselect':
        return (
          <Select
            {...commonProps}
            selectionMode="multiple"
            selectedKeys={value || []}
            onSelectionChange={(keys) => {
              const selectedValues = Array.from(keys);
              handleFieldChange(field.id, selectedValues);
            }}
          >
            {field.options?.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            )) || []}
          </Select>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            {field.properties.helpText && (
              <p className="text-xs text-default-500">{field.properties.helpText}</p>
            )}
            <Slider
              value={value || field.properties.min || 0}
              onChange={(val: number | number[]) => {
                const newValue = Array.isArray(val) ? val[0] : val;
                handleFieldChange(field.id, newValue);
              }}
              minValue={field.properties.min || 0}
              maxValue={field.properties.max || 100}
              step={field.properties.step || 1}
              className="max-w-md"
              size="sm"
            />
            <div className="text-xs text-default-500">
              Value: {value || field.properties.min || 0}
            </div>
            {hasError && <p className="text-danger text-xs">{error}</p>}
          </div>
        );

      case 'file':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            {field.properties.helpText && (
              <p className="text-xs text-default-500">{field.properties.helpText}</p>
            )}
            <div className="border-2 border-dashed border-default-300 rounded-lg p-4 text-center hover:border-default-400 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-default-400 mb-2" />
              <input
                type="file"
                accept={field.properties.accept || '*'}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleFieldChange(field.id, file);
                }}
                className="hidden"
                id={`file-${field.id}`}
              />
              <label htmlFor={`file-${field.id}`} className="cursor-pointer">
                <div className="text-sm text-default-600">
                  Click to upload a file
                </div>
                {value && (
                  <div className="mt-2">
                    <Chip color="primary" size="sm">
                      {value.name || 'File selected'}
                    </Chip>
                  </div>
                )}
              </label>
            </div>
            {hasError && <p className="text-danger text-xs">{error}</p>}
          </div>
        );

      case 'rating':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            {field.properties.helpText && (
              <p className="text-xs text-default-500">{field.properties.helpText}</p>
            )}
            <div className="flex space-x-1">
              {Array.from({ length: field.properties.max || 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleFieldChange(field.id, i + 1)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-6 w-6 ${
                      (value || 0) > i
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-default-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {value && (
              <div className="text-sm text-default-600">
                {value} out of {field.properties.max || 5} stars
              </div>
            )}
            {hasError && <p className="text-danger text-xs">{error}</p>}
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            {field.properties.helpText && (
              <p className="text-xs text-default-500">{field.properties.helpText}</p>
            )}
            <SignaturePad
              value={value}
              onChange={(signature) => handleFieldChange(field.id, signature)}
              width={400}
              height={200}
              className="w-full"
            />
            {hasError && <p className="text-danger text-xs">{error}</p>}
          </div>
        );

      case 'pagebreak':
        return (
          <div className="py-4">
            <Divider />
          </div>
        );

      case 'html':
        return (
          <div className="py-2">
            <div
              dangerouslySetInnerHTML={{
                __html: field.defaultValue || '<div>HTML content</div>'
              }}
              className="prose prose-sm max-w-none"
            />
          </div>
        );

      default:
        return (
          <div className="p-4 border border-dashed border-default-300 rounded-lg text-center">
            <p className="text-default-500">Unsupported field type: {field.type}</p>
          </div>
        );
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <Card>
        <CardHeader>
          <div>
            <h1 className="text-2xl font-bold">{formConfig.metadata.title}</h1>
            {formConfig.metadata.description && (
              <p className="text-default-600 mt-2">{formConfig.metadata.description}</p>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Render form rows with grid layout */}
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

            {/* Submit Button */}
            <div className="pt-6 border-t border-divider">
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {formConfig.settings.submitButtonText}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
