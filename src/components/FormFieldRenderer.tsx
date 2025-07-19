import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Card,
  CardBody,
  Divider,
  DateInput,
  TimeInput,
} from "@heroui/react";
import type { FormField } from "../types/form";
import { Star, Upload } from "lucide-react";
import { buildHeroUIClasses } from "../utils/fieldStyles";
import { SignaturePad } from "./SignaturePad";

interface FormFieldRendererProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
  isPreview?: boolean;
}

export function FormFieldRenderer({
  field,
  value,
  onChange,
}: FormFieldRendererProps) {
  const handleChange = (newValue: any) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  // Hide field if conditional logic applies (simplified)
  if (field.properties?.hidden) {
    return null;
  }

  // Build HeroUI-specific classes
  const heroUIClasses = buildHeroUIClasses(field);

  // For complex components that need wrapper divs
  const wrapperClasses = heroUIClasses.base;

  // Common props for the form components
  const commonProps = {
    label: field.label,
    placeholder: field.placeholder,
    isRequired: field.required,
    description: field.properties?.helpText,
    isDisabled: field.properties?.disabled,
    isReadOnly: field.properties?.readonly,
    size: field.properties?.size as any,
    color: field.properties?.colorVariant as any,
    classNames: {
      base: heroUIClasses.base,
      inputWrapper: heroUIClasses.inputWrapper,
      input: heroUIClasses.input,
      label: heroUIClasses.label,
      description: heroUIClasses.description,
    },
  };

  // Add character count for text fields
  const getCharacterCount = () => {
    if (
      field.properties?.showCharacterCount &&
      (field.type === "text" || field.type === "textarea")
    ) {
      const currentLength = value ? value.length : 0;
      const maxLength = field.properties?.maxLength;
      return maxLength ? `${currentLength}/${maxLength}` : `${currentLength}`;
    }
    return null;
  };

  const characterCount = getCharacterCount();

  switch (field.type) {
    case "text":
      return (
        <>
          <Input
            {...commonProps}
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={field.properties?.maxLength}
          />
          {characterCount && (
            <div className="text-xs text-default-500 mt-1 text-right">
              {characterCount}
            </div>
          )}
        </>
      );

    case "email":
      return (
        <Input
          {...commonProps}
          type="email"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );

    case "password":
      return (
        <Input
          {...commonProps}
          type="password"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );

    case "number":
      return (
        <Input
          {...commonProps}
          type="number"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          min={field.properties?.min}
          max={field.properties?.max}
          step={field.properties?.step}
        />
      );

    case "date":
      return (
        <DateInput
          {...commonProps}
          value={value || null}
          onChange={(date) => {
            if (date) {
              // Convert to string format for form submission
              handleChange(date.toString());
            } else {
              handleChange('');
            }
          }}
        />
      );

    case "datetime":
      return (
        <DateInput
          {...commonProps}
          granularity="second"
          value={value || null}
          onChange={(date) => {
            if (date) {
              // Convert to string format for form submission
              handleChange(date.toString());
            } else {
              handleChange('');
            }
          }}
        />
      );

    case "time":
      return (
        <TimeInput
          {...commonProps}
          value={value || null}
          onChange={(time) => {
            if (time) {
              // Convert to string format for form submission
              handleChange(time.toString());
            } else {
              handleChange('');
            }
          }}
        />
      );

    case "textarea":
      return (
        <>
          <Textarea
            {...commonProps}
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            rows={field.properties?.rows || 4}
            maxLength={field.properties?.maxLength}
          />
          {characterCount && (
            <div className="text-xs text-default-500 mt-1 text-right">
              {characterCount}
            </div>
          )}
        </>
      );

    case "select":
      return (
        <Select
          {...commonProps}
          selectedKeys={value ? [value] : []}
          onSelectionChange={(keys) => {
            const selectedValue = Array.from(keys)[0];
            handleChange(selectedValue);
          }}
        >
          {field.options?.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          )) || []}
        </Select>
      );

    case "multiselect":
      return (
        <Select
          {...commonProps}
          selectionMode="multiple"
          selectedKeys={value || []}
          onSelectionChange={(keys) => {
            handleChange(Array.from(keys));
          }}
        >
          {field.options?.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          )) || []}
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          label={field.label}
          description={field.properties?.helpText}
          isRequired={field.required}
          value={value || ""}
          onValueChange={handleChange}
          size="sm"
          classNames={{
            base: heroUIClasses.base,
            label: heroUIClasses.label,
            wrapper: heroUIClasses.inputWrapper,
          }}
        >
          {field.options?.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          )) || []}
        </RadioGroup>
      );

    case "checkbox":
      if (field.options && field.options.length > 1) {
        // Multiple checkboxes
        return (
          <div className={`space-y-2 ${wrapperClasses}`}>
            <label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            {field.properties?.helpText && (
              <p className="text-xs text-default-500">
                {field.properties.helpText}
              </p>
            )}
            <div className="flex flex-col space-y-2">
              {field.options.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  isSelected={value?.includes?.(option.value) || false}
                  onValueChange={(checked) => {
                    const currentValues = value || [];
                    if (checked) {
                      handleChange([...currentValues, option.value]);
                    } else {
                      handleChange(
                        currentValues.filter((v: any) => v !== option.value)
                      );
                    }
                  }}
                  size="sm"
                >
                  {option.label}
                </Checkbox>
              ))}
            </div>
          </div>
        );
      } else {
        // Single checkbox
        return (
          <div className={wrapperClasses}>
            <Checkbox
              isSelected={value || false}
              onValueChange={handleChange}
              size="sm"
            >
              {field.label}
              {field.required && <span className="text-danger ml-1">*</span>}
            </Checkbox>
            {field.properties?.helpText && (
              <p className="text-xs text-default-500 mt-1">
                {field.properties.helpText}
              </p>
            )}
          </div>
        );
      }

    case "switch":
      return (
        <div className={wrapperClasses}>
          <Switch
            isSelected={value || false}
            onValueChange={handleChange}
            size="sm"
          >
            {field.label}
            {field.required && <span className="text-danger ml-1">*</span>}
          </Switch>
          {field.properties?.helpText && (
            <p className="text-xs text-default-500 mt-1">
              {field.properties.helpText}
            </p>
          )}
        </div>
      );

    case "file":
      return (
        <div className={`space-y-2 ${wrapperClasses}`}>
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-danger">*</span>}
          </label>
          {field.properties?.helpText && (
            <p className="text-xs text-default-500">
              {field.properties.helpText}
            </p>
          )}
          <div className="border-2 border-dashed border-default-300 rounded-lg p-6 text-center hover:border-default-400 transition-colors relative">
            <Upload className="mx-auto text-default-400 mb-2" size={32} />
            <p className="text-sm text-default-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-default-500">
              {field.properties?.accept || "All file types"}
            </p>
            <input
              type="file"
              accept={field.properties?.accept}
              multiple={field.properties?.multiple}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleChange(field.properties?.multiple ? files : files[0]);
              }}
            />
          </div>
        </div>
      );

    case "rating":
      const maxRating = field.properties?.max || 5;
      return (
        <div className={`space-y-2 ${wrapperClasses}`}>
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-danger">*</span>}
          </label>
          {field.properties?.helpText && (
            <p className="text-xs text-default-500">
              {field.properties.helpText}
            </p>
          )}
          <div className="flex gap-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map(
              (rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleChange(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= (value || 0)
                        ? "text-warning fill-current"
                        : "text-default-300"
                    }`}
                  />
                </button>
              )
            )}
          </div>
        </div>
      );

    case "signature":
      return (
        <div className={`space-y-2 ${wrapperClasses}`}>
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-danger">*</span>}
          </label>
          {field.properties?.helpText && (
            <p className="text-xs text-default-500">
              {field.properties.helpText}
            </p>
          )}
          <SignaturePad
            value={value}
            onChange={handleChange}
            width={380}
            height={150}
            className="w-full"
          />
        </div>
      );

    case "section":
      return (
        <div className={wrapperClasses}>
          <Card>
            <CardBody className="py-4">
              <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
              {field.properties?.helpText && (
                <p className="text-default-600">{field.properties.helpText}</p>
              )}
            </CardBody>
          </Card>
        </div>
      );

    case "paragraph":
      return (
        <div className={`py-2 ${wrapperClasses}`}>
          <h4 className="text-md font-medium mb-1">{field.label}</h4>
          {field.properties?.helpText && (
            <p className="text-default-600">{field.properties.helpText}</p>
          )}
        </div>
      );

    case "pagebreak":
      return (
        <div className={`my-8 ${wrapperClasses}`}>
          <Divider className="my-4" />
          <div className="text-center text-sm text-default-500">Page Break</div>
          <Divider className="my-4" />
        </div>
      );

    case "html":
      return (
        <div
          className={`prose prose-sm max-w-none ${wrapperClasses}`}
          dangerouslySetInnerHTML={{
            __html: field.properties?.helpText || field.label,
          }}
        />
      );

    case "range":
      return (
        <div className={`space-y-2 ${wrapperClasses}`}>
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-danger">*</span>}
          </label>
          {field.properties?.helpText && (
            <p className="text-xs text-default-500">
              {field.properties.helpText}
            </p>
          )}
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={field.properties?.min || 0}
              max={field.properties?.max || 100}
              step={field.properties?.step || 1}
              value={value || field.properties?.min || 0}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="flex-1 h-2 bg-default-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-default-600 min-w-[3rem] text-right">
              {value || field.properties?.min || 0}
            </span>
          </div>
        </div>
      );

    case "phone":
      return (
        <Input
          {...commonProps}
          type="tel"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );

    case "url":
      return (
        <Input
          {...commonProps}
          type="url"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );

    default:
      return (
        <div
          className={`p-4 border border-dashed border-default-300 rounded-lg text-center ${wrapperClasses}`}
        >
          <p className="text-default-500">
            Unsupported field type: {field.type}
          </p>
        </div>
      );
  }
}
