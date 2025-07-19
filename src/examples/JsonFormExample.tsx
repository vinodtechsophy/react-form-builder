import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { FormRenderer } from '../components/FormRenderer';
import type { FormExportData } from '../utils/formExport';

export function JsonFormExample() {
  const [submissionData, setSubmissionData] = useState<Record<string, any> | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Your JSON data as provided
  const formConfig: FormExportData = {
    "metadata": {
      "id": "741d424e-e01b-4541-b3f0-67dab8918d48",
      "title": "Contact Form",
      "description": "A simple contact form created with the Form Builder",
      "version": "1.0.0",
      "createdAt": "741d424e-e01b-4541-b3f0-67dab8918d48",
      "exportedAt": "2025-07-18T22:11:05.378Z",
      "builderVersion": "1.0.0"
    },
    "settings": {
      "submitButtonText": "Send Message",
      "allowMultipleSubmissions": true,
      "requireAuth": false,
      "captchaEnabled": false,
      "theme": "auto"
    },
    "layout": {
      "rows": [
        {
          "id": "row-0",
          "fields": ["03fd95da-79b1-4fb4-bfe1-d6f08243247b"],
          "columns": 12
        },
        {
          "id": "row-1",
          "fields": ["9e5ada14-f783-4902-b686-1437157bdcd4"],
          "columns": 12
        }
      ],
      "totalFields": 2
    },
    "fields": [
      {
        "id": "03fd95da-79b1-4fb4-bfe1-d6f08243247b",
        "type": "text",
        "label": "Name",
        "placeholder": "Enter your full name",
        "required": true,
        "properties": {
          "width": "full",
          "helpText": "Please enter your full name as it appears on your ID"
        },
        "layout": {
          "columnSpan": 12,
          "rowId": "row-0",
          "gridClass": "col-span-12"
        }
      },
      {
        "id": "9e5ada14-f783-4902-b686-1437157bdcd4",
        "type": "textarea",
        "label": "Message",
        "placeholder": "Enter your message here...",
        "required": true,
        "properties": {
          "width": "full",
          "rows": 6,
          "startNewRow": false,
          "helpText": "Please provide detailed information about your inquiry"
        },
        "layout": {
          "columnSpan": 12,
          "rowId": "row-1",
          "gridClass": "col-span-12"
        }
      }
    ],
    "fieldMap": {
      "03fd95da-79b1-4fb4-bfe1-d6f08243247b": {
        "id": "03fd95da-79b1-4fb4-bfe1-d6f08243247b",
        "type": "text",
        "label": "Name",
        "placeholder": "Enter your full name",
        "required": true,
        "properties": {
          "width": "full",
          "helpText": "Please enter your full name as it appears on your ID"
        },
        "layout": {
          "columnSpan": 12,
          "rowId": "row-0",
          "gridClass": "col-span-12"
        }
      },
      "9e5ada14-f783-4902-b686-1437157bdcd4": {
        "id": "9e5ada14-f783-4902-b686-1437157bdcd4",
        "type": "textarea",
        "label": "Message",
        "placeholder": "Enter your message here...",
        "required": true,
        "properties": {
          "width": "full",
          "rows": 6,
          "startNewRow": false,
          "helpText": "Please provide detailed information about your inquiry"
        },
        "layout": {
          "columnSpan": 12,
          "rowId": "row-1",
          "gridClass": "col-span-12"
        }
      }
    },
    "validation": {
      "requiredFields": ["03fd95da-79b1-4fb4-bfe1-d6f08243247b", "9e5ada14-f783-4902-b686-1437157bdcd4"],
      "fieldsWithValidation": []
    }
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setSubmissionData(data);
    onOpen();
    console.log('Form submitted with data:', data);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">JSON Form Renderer Demo</h1>
          <p className="text-default-600">
            This form is rendered from JSON data exported from the Form Builder
          </p>
        </div>

        {/* Form Info Card */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Form Details</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Title:</strong> {formConfig.metadata.title}
                </div>
                <div>
                  <strong>Fields:</strong> {formConfig.layout.totalFields}
                </div>
                <div>
                  <strong>Required Fields:</strong> {formConfig.validation.requiredFields.length}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Rendered Form */}
        <FormRenderer
          formConfig={formConfig}
          onSubmit={handleFormSubmit}
        />

        {/* JSON Preview */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">JSON Structure</h3>
            </CardHeader>
            <CardBody>
              <pre className="text-xs overflow-auto bg-default-100 p-4 rounded-lg max-h-96">
                {JSON.stringify(formConfig, null, 2)}
              </pre>
            </CardBody>
          </Card>
        </div>

        {/* Submission Result Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Form Submission Successful!</ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <p>Your form has been submitted successfully. Here's the data:</p>
                    <div className="bg-success-50 p-4 rounded-lg">
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(submissionData, null, 2)}
                      </pre>
                    </div>
                    <div className="text-sm text-default-600">
                      <p><strong>Submission Details:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Form ID: {formConfig.metadata.id}</li>
                        <li>Submitted at: {new Date().toLocaleString()}</li>
                        <li>Total fields: {Object.keys(submissionData || {}).length}</li>
                      </ul>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
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
