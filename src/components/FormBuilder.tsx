import { 
  DndContext, 
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { FormBuilderProvider, useFormBuilder } from '../context/FormBuilderContext';
import { FormBuilderToolbar } from './FormBuilderToolbar';
import { FieldSidebar } from './FieldSidebar';
import { FormCanvas } from './FormCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { createFormField } from '../data/formFields';
import type { FormFieldType } from '../types/form';

function FormBuilderContent() {
  const { state, actions } = useFormBuilder();
  const { currentForm, previewMode, deviceView } = state;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping field from sidebar to canvas
    if (over.id === 'form-canvas' && !currentForm.fields.find(f => f.id === active.id)) {
      const fieldType = active.id as FormFieldType;
      const newField = createFormField(fieldType);
      actions.addField(newField);
      return;
    }

    // Handle reordering fields within the canvas
    if (active.id !== over.id) {
      const oldIndex = currentForm.fields.findIndex(field => field.id === active.id);
      const newIndex = currentForm.fields.findIndex(field => field.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        actions.reorderFields(oldIndex, newIndex);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // Handle dropping between fields
    if (over.id === 'form-canvas') {
      return;
    }

    // Handle reordering logic
    const activeIndex = currentForm.fields.findIndex(field => field.id === active.id);
    const overIndex = currentForm.fields.findIndex(field => field.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      // This will be handled in dragEnd
    }
  };

  const getCanvasMaxWidth = () => {
    switch (deviceView) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-4xl';
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="h-screen flex flex-col bg-background">
        <FormBuilderToolbar />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Hidden in preview mode */}
          {!previewMode && <FieldSidebar />}
          
          {/* Main Canvas */}
          <div className="flex-1 flex justify-center overflow-hidden">
            <div className={`w-full ${previewMode ? getCanvasMaxWidth() : ''} flex`}>
              <div className="flex-1">
                <FormCanvas />
              </div>
            </div>
          </div>
          
          {/* Properties Panel - Hidden in preview mode */}
          {!previewMode && <PropertiesPanel />}
        </div>
      </div>

      <DragOverlay>
        {/* Add drag overlay content if needed */}
      </DragOverlay>
    </DndContext>
  );
}

export function FormBuilder() {
  return (
    <FormBuilderProvider>
      <FormBuilderContent />
    </FormBuilderProvider>
  );
}
