import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  Download,
  Upload,
  MoreVertical,
  FileJson,
  Copy,
  Check,
  Rows4,
} from "lucide-react";
import { useState } from "react";
import { useFormBuilder } from "../context/FormBuilderContext";
import {
  downloadFormAsJson,
  generateFormExportData,
} from "../utils/formExport";
import type { FormConfig } from "../types/form";

export function FormBuilderToolbar() {
  const { state, actions } = useFormBuilder();
  const { previewMode, currentForm } = state;
  const {
    isOpen: isJsonOpen,
    onOpen: onJsonOpen,
    onOpenChange: onJsonOpenChange,
  } = useDisclosure();

  const handlePreview = () => {
    // Toggle preview mode
    actions.setPreviewMode(!previewMode);
  };

  const handleExport = () => {
    downloadFormAsJson(currentForm);
  };

  const handlePreviewJson = () => {
    // Show JSON preview in modal UI
    onJsonOpen();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const formData = JSON.parse(e.target?.result as string);
            // Import form logic
            console.log("Importing form:", formData);
          } catch (error) {
            console.error("Error importing form:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <>
      <Navbar className="border-b border-divider" maxWidth="full">
        <NavbarBrand>
          <h1 className="font-bold text-inherit text-sm sm:text-base">
            Form Builder
          </h1>
        </NavbarBrand>

        <NavbarContent className="flex gap-2 sm:gap-4" justify="center">
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ButtonGroup radius="sm" size="sm">
              <Button
                variant="flat"
                onPress={handlePreview}
                size="sm"
                className="hidden sm:flex"
              >
                {previewMode ? "Edit Form" : "Preview Form"}
              </Button>
              <Button
                variant="flat"
                isIconOnly
                onPress={handlePreview}
                size="sm"
                className="sm:hidden"
              >
                <Rows4 size={16} />
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" isIconOnly size="sm">
                    <MoreVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="export"
                    startContent={<Download size={16} />}
                    onPress={handleExport}
                  >
                    Export Form JSON
                  </DropdownItem>
                  <DropdownItem
                    key="preview-json"
                    startContent={<FileJson size={16} />}
                    onPress={handlePreviewJson}
                  >
                    Preview JSON
                  </DropdownItem>
                  <DropdownItem
                    key="import"
                    startContent={<Upload size={16} />}
                    onPress={handleImport}
                  >
                    Import Form
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <JsonPreviewModal
        isOpen={isJsonOpen}
        onOpenChange={onJsonOpenChange}
        form={currentForm}
      />
    </>
  );
}

function JsonPreviewModal({
  isOpen,
  onOpenChange,
  form,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: FormConfig;
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("formatted");

  const formExportData = generateFormExportData(form);
  const formattedJson = JSON.stringify(formExportData, null, 2);
  const compactJson = JSON.stringify(formExportData);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title.replace(/\s+/g, "_")}_form_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Form JSON Configuration
                  </h3>
                  <p className="text-sm text-default-500">
                    Use this JSON to render your form elsewhere
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={
                      copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )
                    }
                    onPress={handleCopy}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    startContent={<Download className="w-4 h-4" />}
                    onPress={handleDownload}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                aria-label="JSON Format Options"
              >
                <Tab key="formatted" title="Formatted">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium">Formatted JSON</h4>
                        <div className="text-sm text-default-500">
                          {formExportData.layout.totalFields} fields •{" "}
                          {formExportData.layout.rows.length} rows
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <pre className="text-xs overflow-auto bg-default-50 p-4 rounded-lg max-h-96 font-mono">
                        {formattedJson}
                      </pre>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="compact" title="Compact">
                  <Card>
                    <CardHeader>
                      <h4 className="text-md font-medium">Compact JSON</h4>
                    </CardHeader>
                    <CardBody>
                      <pre className="text-xs overflow-auto bg-default-50 p-4 rounded-lg max-h-96 font-mono break-all">
                        {compactJson}
                      </pre>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="metadata" title="Metadata">
                  <Card>
                    <CardHeader>
                      <h4 className="text-md font-medium">Form Information</h4>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-default-700">
                              Title
                            </label>
                            <p className="text-sm text-default-600">
                              {formExportData.metadata.title}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-default-700">
                              Version
                            </label>
                            <p className="text-sm text-default-600">
                              {formExportData.metadata.version}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-default-700">
                              Total Fields
                            </label>
                            <p className="text-sm text-default-600">
                              {formExportData.layout.totalFields}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-default-700">
                              Required Fields
                            </label>
                            <p className="text-sm text-default-600">
                              {formExportData.validation.requiredFields.length}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-default-700">
                            Description
                          </label>
                          <p className="text-sm text-default-600">
                            {formExportData.metadata.description ||
                              "No description provided"}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-default-700">
                            Field Types
                          </label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {[
                              ...new Set(
                                formExportData.fields.map((f) => f.type)
                              ),
                            ].map((type) => (
                              <span
                                key={type}
                                className="text-xs bg-default-100 text-default-700 px-2 py-1 rounded"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-default-700">
                            Settings
                          </label>
                          <div className="bg-default-50 p-3 rounded-lg mt-1">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-default-700">
                                  Submit Button:
                                </span>
                                <span className="text-default-600 ml-2">
                                  {formExportData.settings.submitButtonText}
                                </span>
                              </div>
                              <div>
                                <span className="text-default-700">Theme:</span>
                                <span className="text-default-600 ml-2">
                                  {formExportData.settings.theme}
                                </span>
                              </div>
                              <div>
                                <span className="text-default-700">
                                  Multiple Submissions:
                                </span>
                                <span className="text-default-600 ml-2">
                                  {formExportData.settings
                                    .allowMultipleSubmissions
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </div>
                              <div>
                                <span className="text-default-700">
                                  Captcha:
                                </span>
                                <span className="text-default-600 ml-2">
                                  {formExportData.settings.captchaEnabled
                                    ? "Enabled"
                                    : "Disabled"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
