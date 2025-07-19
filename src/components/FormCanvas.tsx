import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardBody, Button, Input, Textarea } from "@heroui/react";
import { Plus } from "lucide-react";
import { useFormBuilder } from "../context/FormBuilderContext";
import { createFormField } from "../data/formFields";
import { FormRowRenderer } from "./FormRowRenderer";
import { FormRenderer } from "./FormRenderer";
import { groupFieldsIntoRows } from "../utils/layoutUtils";
import { generateFormExportData } from "../utils/formExport";

export function FormCanvas() {
  const { state, actions } = useFormBuilder();
  const { currentForm, previewMode } = state;

  const { setNodeRef, isOver } = useDroppable({
    id: "form-canvas",
  });

  const handleAddField = () => {
    const newField = createFormField("text");
    actions.addField(newField);
  };

  if (currentForm.fields.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className={`flex-1 p-2 sm:p-4 ${
          isOver ? "bg-primary-50" : "bg-background"
        } transition-colors`}
      >
        <Card
          radius="sm"
          className="h-full border-2 p-4 sm:p-10 border-dashed border-default-300"
        >
          <CardBody className="flex flex-col items-center justify-center text-center">
            <Plus className="text-4xl sm:text-6xl text-default-400 mb-2 sm:mb-4" />
            <h3 className="text-sm sm:text-md font-semibold mb-2">
              Start Building Your Form
            </h3>
            <p className="text-default-600 mb-4 sm:mb-6 text-xs sm:text-sm max-w-xs sm:max-w-md">
              Drag elements from the sidebar or click the button below to add
              your first field
            </p>
            <Button
              color="primary"
              size="sm"
              radius="sm"
              startContent={<Plus />}
              onPress={handleAddField}
            >
              Add First Field
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-2 sm:p-4 overflow-y-auto ${
        isOver ? "bg-primary-50" : "bg-background"
      } transition-colors`}
    >
      <div className={`w-full ${previewMode ? 'max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto' : ''}`}>
        {/* Form Header */}
        <div className="mb-2 sm:mb-4 px-1 sm:px-2">
          {previewMode ? (
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{currentForm.title}</h1>
              {currentForm.description && (
                <p className="text-xs sm:text-sm md:text-base text-default-600">{currentForm.description}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4 p-2 sm:p-4 bg-default-50 rounded-lg border border-default-200">
              <h3 className="text-xs sm:text-sm font-semibold text-default-700 mb-1 sm:mb-2">Form Information</h3>
              <Input
                label="Form Title"
                placeholder="Enter form title..."
                value={currentForm.title}
                onChange={(e) => actions.updateFormMeta({ title: e.target.value })}
                size="sm"
                className="w-full"
              />
              <Textarea
                label="Form Description (Optional)"
                placeholder="Enter a brief description of your form..."
                value={currentForm.description || ""}
                onChange={(e) => actions.updateFormMeta({ description: e.target.value })}
                size="sm"
                rows={2}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Form Fields */}
        {previewMode ? (
          // In preview mode, use the same FormRenderer that will be used with exported JSON
          <FormRenderer 
            formConfig={generateFormExportData(currentForm)}
            onSubmit={(data: Record<string, any>) => {
              console.log('Preview form submission:', data);
              alert('Form submitted! Check console for data.');
            }}
          />
        ) : (
          <>
            <SortableContext
              items={currentForm.fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 sm:space-y-4">
                {groupFieldsIntoRows(currentForm.fields).map((row) => (
                  <FormRowRenderer key={row.id} row={row} isPreview={false} />
                ))}
              </div>
            </SortableContext>

            {/* Submit Button (edit mode) */}
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-divider px-1 sm:px-2">
              <Button
                radius="sm"
                color="primary"
                size="sm"
                type="submit"
                disabled={true}
                className="sm:size-lg"
              >
                {currentForm.settings.submitButtonText}
              </Button>
            </div>

            {/* Add Field Button */}
            <div className="mt-2 sm:mt-4 px-1 sm:px-2">
              <Button
                radius="sm"
                variant="bordered"
                startContent={<Plus />}
                onPress={handleAddField}
                className="w-full"
                size="sm"
              >
                <span className="hidden sm:inline">Add Field</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
