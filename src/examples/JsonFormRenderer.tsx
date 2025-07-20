import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@heroui/react";
import { Copy, Check, Upload, FileText, AlertCircle } from "lucide-react";
import { FormRenderer } from "../components/FormRenderer";
import type { FormExportData } from "../utils/formExport";

export function JsonFormRenderer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedForm, setParsedForm] = useState<FormExportData | null>(null);
  const [parseError, setParseError] = useState("");
  const [submissionData, setSubmissionData] = useState<Record<
    string,
    any
  > | null>(null);
  const [copied, setCopied] = useState(false);
  const {
    isOpen: isSubmissionModalOpen,
    onOpen: onSubmissionModalOpen,
    onOpenChange: onSubmissionModalOpenChange,
  } = useDisclosure();

  // Simple sample JSON for demonstration
  const sampleJson = {
    metadata: {
      id: "sample-form-001",
      title: "Contact Information Form",
      description: "A simple contact form example",
      version: "1.0.0",
      createdAt: "2025-07-19T00:00:00.000Z",
      exportedAt: "2025-07-19T00:00:00.000Z",
      builderVersion: "1.0.0",
    },
    settings: {
      submitButtonText: "Submit Form",
      allowMultipleSubmissions: true,
      requireAuth: false,
      captchaEnabled: false,
      theme: "auto" as const,
    },
    layout: {
      rows: [
        {
          id: "row-0",
          fields: ["name-field", "email-field"],
          columns: 12,
        },
        {
          id: "row-1",
          fields: ["message-field"],
          columns: 12,
        },
      ],
      totalFields: 3,
    },
    fields: [
      {
        id: "name-field",
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "Enter your full name",
        required: true,
        properties: {
          width: "full",
          helpText: "Please enter your complete name",
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6",
        },
      },
      {
        id: "email-field",
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        required: true,
        properties: {
          width: "full",
          helpText: "We'll use this to contact you",
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6",
        },
      },
      {
        id: "message-field",
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Enter your message here...",
        required: false,
        properties: {
          width: "full",
          rows: 4,
          helpText: "Tell us how we can help you",
        },
        layout: {
          columnSpan: 12,
          rowId: "row-1",
          gridClass: "col-span-12",
        },
      },
    ],
    fieldMap: {
      "name-field": {
        id: "name-field",
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "Enter your full name",
        required: true,
        properties: {
          width: "full",
          helpText: "Please enter your complete name",
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6",
        },
      },
      "email-field": {
        id: "email-field",
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        required: true,
        properties: {
          width: "full",
          helpText: "We'll use this to contact you",
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6",
        },
      },
      "message-field": {
        id: "message-field",
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Enter your message here...",
        required: false,
        properties: {
          width: "full",
          rows: 4,
          helpText: "Tell us how we can help you",
        },
        layout: {
          columnSpan: 12,
          rowId: "row-1",
          gridClass: "col-span-12",
        },
      },
    },
    validation: {
      requiredFields: ["name-field", "email-field"],
      fieldsWithValidation: ["email-field"],
    },
  };

  const handleParseJson = () => {
    try {
      setParseError("");
      const parsed = JSON.parse(jsonInput);

      // Basic validation of JSON structure
      if (
        !parsed.metadata ||
        !parsed.settings ||
        !parsed.layout ||
        !parsed.fields ||
        !parsed.fieldMap
      ) {
        throw new Error(
          "Invalid form JSON structure. Missing required properties."
        );
      }

      setParsedForm(parsed);
    } catch (error) {
      setParseError(
        error instanceof Error
          ? error.message
          : "Invalid JSON format. Please check your syntax."
      );
      setParsedForm(null);
    }
  };

  const loadSampleJson = () => {
    setJsonInput(JSON.stringify(sampleJson, null, 2));
    setParsedForm(sampleJson);
    setParseError("");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(sampleJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setSubmissionData(data);
    onSubmissionModalOpen();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
        try {
          const parsed = JSON.parse(content);
          setParsedForm(parsed);
          setParseError("");
        } catch (error) {
          setParseError("Invalid JSON file format");
          setParsedForm(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const clearForm = () => {
    setJsonInput("");
    setParsedForm(null);
    setParseError("");
    setSubmissionData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">JSON Form Renderer</h1>
          <p className="text-default-600">
            Paste your form JSON configuration to render and test a live form
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* JSON Input Panel */}
          <div className="basis-4/12">
            <Card radius="sm">
              <CardHeader>
                <div className="flex items-center justify-between w-full p-1">
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="json-file-upload"
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Upload className="w-4 h-4" />}
                      onPress={() =>
                        document.getElementById("json-file-upload")?.click()
                      }
                    >
                      Upload JSON
                    </Button>
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
                      onPress={copyToClipboard}
                    >
                      {copied ? "Copied!" : "Sample"}
                    </Button>
                    <Button
                      size="sm"
                      color="secondary"
                      onPress={loadSampleJson}
                    >
                      Load Sample
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={clearForm}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="p-1 ">
                  <Textarea
                    placeholder="Paste your form JSON configuration here..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    maxRows={20}
                    className="font-mono text-sm"
                    classNames={{
                      description: "h-96",
                      input: "resize-none",
                    }}
                  />

                  {parseError && (
                    <div className="flex items-start gap-2 text-danger text-sm bg-danger-50 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Parse Error:</strong> {parseError}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button
                      radius="sm"
                      color="secondary"
                      onPress={handleParseJson}
                      isDisabled={!jsonInput.trim()}
                      className="flex-1"
                    >
                      Parse & Render Form
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Form Info */}
            {parsedForm && (
              <Card radius="sm" className="mt-5">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Form Information</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-default-600">Title:</span>
                      <span className="font-medium">
                        {parsedForm.metadata.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Fields:</span>
                      <span className="font-medium">
                        {parsedForm.fields.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Required Fields:</span>
                      <span className="font-medium">
                        {parsedForm.validation.requiredFields.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Version:</span>
                      <span className="font-medium">
                        {parsedForm.metadata.version}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Form Preview Panel */}
          <div className="basis-8/12">
            {parsedForm ? (
              <div className="">
                <FormRenderer
                  formConfig={parsedForm}
                  onSubmit={handleFormSubmit}
                />
              </div>
            ) : (
              <div className="text-center py-12 text-default-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No Form Data</p>
                <p>
                  Upload a JSON file, paste JSON data, or load a sample to
                  preview the form
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submission Result Modal */}
        <Modal
          isOpen={isSubmissionModalOpen}
          onOpenChange={onSubmissionModalOpenChange}
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Form Submission Result</ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-success">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">
                        Form submitted successfully!
                      </span>
                    </div>
                    <Divider />
                    <div>
                      <h4 className="font-semibold mb-2">Submitted Data:</h4>
                      <div className="bg-success-50 p-4 rounded-lg">
                        <pre className="text-sm overflow-auto whitespace-pre-wrap">
                          {JSON.stringify(submissionData, null, 2)}
                        </pre>
                      </div>
                    </div>
                    <div className="text-sm text-default-600">
                      <strong>Note:</strong> This is a demonstration. In a real
                      application, this data would be sent to your server or API
                      endpoint.
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="flat"
                    onPress={async () => {
                      if (submissionData) {
                        await navigator.clipboard.writeText(
                          JSON.stringify(submissionData, null, 2)
                        );
                      }
                    }}
                  >
                    Copy Data
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
