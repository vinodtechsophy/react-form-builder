import { useState } from "react";
import { HeroUIProvider, Button, ButtonGroup, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import {
  FormBuilderProvider,
  useFormBuilder,
} from "./context/FormBuilderContext";
import { FormBuilderToolbar } from "./components/FormBuilderToolbar";
import { FieldSidebar } from "./components/FieldSidebar";
import { FormCanvas } from "./components/FormCanvas";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { JsonFormRenderer } from "./examples/JsonFormRenderer";
import { createFormField } from "./data/formFields";
import type { FormFieldType } from "./types/form";
import { Package, Settings } from "lucide-react";
import "./App.css";

type AppMode = 'builder' | 'renderer';

function AppModeSelector({ mode, setMode }: { mode: AppMode; setMode: (mode: AppMode) => void }) {
  return (
    <div className="p-4 border-b border-divider bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Form Builder Suite</h1>
        <p className="text-default-600 mb-4">Create, test, and render dynamic forms with ease</p>
        <ButtonGroup>
          <Button
            variant={mode === 'builder' ? 'solid' : 'flat'}
            color={mode === 'builder' ? 'primary' : 'default'}
            onPress={() => setMode('builder')}
          >
            Form Builder
          </Button>
          <Button
            variant={mode === 'renderer' ? 'solid' : 'flat'}
            color={mode === 'renderer' ? 'primary' : 'default'}
            onPress={() => setMode('renderer')}
          >
            JSON Renderer
          </Button>
        </ButtonGroup>
        
        {/* Mode descriptions */}
        <div className="mt-3 text-sm text-default-500">
          {mode === 'builder' && "Create and design forms with drag-and-drop interface"}
          {mode === 'renderer' && "Import JSON configurations and render live forms"}
        </div>
      </div>
    </div>
  );
}

function FormBuilderContent() {
  const { state, actions } = useFormBuilder();
  const { currentForm, previewMode } = state;
  
  // Modal controls for mobile panels
  const {
    isOpen: isElementsOpen,
    onOpen: onElementsOpen,
    onOpenChange: onElementsOpenChange,
  } = useDisclosure();
  
  const {
    isOpen: isPropertiesOpen,
    onOpen: onPropertiesOpen,
    onOpenChange: onPropertiesOpenChange,
  } = useDisclosure();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping from sidebar to canvas
    if (
      over.id === "form-canvas" &&
      typeof active.id === "string" &&
      !active.id.includes("-")
    ) {
      const fieldType = active.id as FormFieldType;
      const newField = createFormField(fieldType);
      actions.addField(newField);
      return;
    }

    // Handle reordering within canvas
    if (active.id !== over.id) {
      const oldIndex = currentForm.fields.findIndex(
        (field) => field.id === active.id
      );
      const newIndex = currentForm.fields.findIndex(
        (field) => field.id === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        actions.reorderFields(oldIndex, newIndex);
      }
    }
  };

  const handleDragOver = (_event: DragOverEvent) => {
    // Handle drag over logic if needed
  };

  return (
    <>
      <div className="h-[calc(100vh-120px)] font-sans flex flex-col bg-background">
        <FormBuilderToolbar />
        <div className="flex flex-1 overflow-hidden">
          <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            {/* Desktop Sidebar - Hidden on mobile */}
            {!previewMode && (
              <div className="hidden md:block md:w-1/4">
                <FieldSidebar />
              </div>
            )}
            
            {/* Main Canvas - Full width on mobile, responsive on desktop */}
            <div className={`
              flex-1 overflow-auto scrollbar-hide
              ${previewMode 
                ? 'w-full' 
                : 'w-full md:w-2/4'
              }
            `}>
              <FormCanvas />
            </div>
            
            {/* Desktop Properties Panel - Hidden on mobile */}
            {!previewMode && (
              <div className="hidden md:block md:w-1/4">
                <PropertiesPanel />
              </div>
            )}
          </DndContext>
        </div>
        
        {/* Mobile Bottom Navigation */}
        {!previewMode && (
          <div className="md:hidden border-t border-divider bg-background p-2">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="flat" 
                className="flex-1"
                startContent={<Package size={16} />}
                onPress={onElementsOpen}
              >
                Elements
              </Button>
              <Button 
                size="sm" 
                variant="flat" 
                className="flex-1"
                startContent={<Settings size={16} />}
                onPress={onPropertiesOpen}
              >
                Properties
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Elements Modal for Mobile */}
      <Modal
        isOpen={isElementsOpen}
        onOpenChange={onElementsOpenChange}
        size="full"
        placement="bottom"
        classNames={{
          base: "md:hidden",
          backdrop: "md:hidden",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Form Elements</h3>
                <p className="text-sm text-default-500">
                  Drag or tap to add elements to your form
                </p>
              </ModalHeader>
              <ModalBody>
                <FieldSidebar />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Properties Modal for Mobile */}
      <Modal
        isOpen={isPropertiesOpen}
        onOpenChange={onPropertiesOpenChange}
        size="full"
        placement="bottom"
        classNames={{
          base: "md:hidden",
          backdrop: "md:hidden",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Field Properties</h3>
                <p className="text-sm text-default-500">
                  {state.selectedFieldId 
                    ? `Editing: ${currentForm.fields.find(f => f.id === state.selectedFieldId)?.label || 'Untitled Field'}`
                    : 'Select a field to edit properties'
                  }
                </p>
              </ModalHeader>
              <ModalBody>
                <PropertiesPanel />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function App() {
  const [mode, setMode] = useState<AppMode>('builder');

  return (
    <HeroUIProvider>
      <div className="min-h-screen bg-background">
        <AppModeSelector mode={mode} setMode={setMode} />
        
        {mode === 'builder' && (
          <FormBuilderProvider>
            <FormBuilderContent />
          </FormBuilderProvider>
        )}
        {mode === 'renderer' && <JsonFormRenderer />}
      </div>
    </HeroUIProvider>
  );
}

export default App;
