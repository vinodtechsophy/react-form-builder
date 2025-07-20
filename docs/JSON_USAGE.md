# Using Exported Form JSON

This guide shows how developers can use the JSON exported from the form builder in their own applications.

## 📋 What You Get

When you export a form from the builder, you get a comprehensive JSON structure:

```json
{
  "metadata": {
    "title": "Contact Form",
    "description": "Get in touch with us",
    "version": "1.0.0",
    "createdAt": "2025-01-19T10:30:00Z",
    "updatedAt": "2025-01-19T10:30:00Z"
  },
  "fields": [
    {
      "id": "field_1",
      "type": "text",
      "name": "full_name",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true,
      "validation": [
        { "type": "required", "message": "Name is required" }
      ],
      "properties": {
        "width": "full",
        "customClasses": "border-blue-500"
      }
    }
  ],
  "layout": {
    "rows": [
      {
        "id": "row_1",
        "fields": ["field_1", "field_2"],
        "gridClass": "grid-cols-12"
      }
    ],
    "totalFields": 5
  },
  "settings": {
    "submitButtonText": "Submit Form",
    "allowMultipleSubmissions": true,
    "theme": "light"
  },
  "validation": {
    "requiredFields": ["full_name", "email"]
  }
}
```

## 🚀 Usage Methods

### 1. React Applications (Recommended)

#### Install the Package
```bash
npm install react-form-builder
```

#### Import and Use
```tsx
import React from 'react';
import { FormRenderer } from 'react-form-builder';
import formConfig from './exported-form.json';

function ContactPage() {
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    // Send to your API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1>{formConfig.metadata.title}</h1>
      <p>{formConfig.metadata.description}</p>
      
      <FormRenderer 
        form={formConfig}
        onSubmit={handleFormSubmit}
        onFieldChange={(fieldName, value) => {
          console.log(`${fieldName} changed to:`, value);
        }}
      />
    </div>
  );
}
```

### 2. Next.js Applications

```tsx
// pages/contact.tsx
import { FormRenderer } from 'react-form-builder';
import formConfig from '../data/contact-form.json';

export default function ContactPage() {
  const handleSubmit = async (data: Record<string, any>) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <FormRenderer form={formConfig} onSubmit={handleSubmit} />
  );
}

// api/contact.ts
export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;
    // Process the form data
    console.log('Received:', formData);
    res.status(200).json({ success: true });
  }
}
```

### 3. Vanilla JavaScript/HTML

For non-React applications, you can build a form dynamically:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="form-container" class="max-w-2xl mx-auto p-6"></div>
    
    <script>
        // Load your exported JSON
        const formConfig = {
            // ... your exported JSON here
        };
        
        function createFormFromJSON(config) {
            const container = document.getElementById('form-container');
            const form = document.createElement('form');
            form.className = 'space-y-6';
            
            // Add title and description
            const title = document.createElement('h1');
            title.textContent = config.metadata.title;
            title.className = 'text-2xl font-bold';
            container.appendChild(title);
            
            if (config.metadata.description) {
                const desc = document.createElement('p');
                desc.textContent = config.metadata.description;
                desc.className = 'text-gray-600 mb-6';
                container.appendChild(desc);
            }
            
            // Create fields
            config.fields.forEach(field => {
                const fieldDiv = createField(field);
                form.appendChild(fieldDiv);
            });
            
            // Add submit button
            const submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.textContent = config.settings.submitButtonText;
            submitBtn.className = 'bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600';
            form.appendChild(submitBtn);
            
            // Handle form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                console.log('Form data:', data);
                
                // Send to your server
                fetch('/submit-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            });
            
            container.appendChild(form);
        }
        
        function createField(field) {
            const div = document.createElement('div');
            div.className = 'form-field';
            
            // Create label
            const label = document.createElement('label');
            label.textContent = field.label;
            label.className = 'block text-sm font-medium mb-2';
            if (field.required) label.textContent += ' *';
            
            // Create input based on type
            let input;
            switch (field.type) {
                case 'text':
                case 'email':
                case 'password':
                    input = document.createElement('input');
                    input.type = field.type;
                    input.name = field.name || field.id;
                    input.placeholder = field.placeholder || '';
                    input.required = field.required || false;
                    input.className = 'w-full border border-gray-300 rounded px-3 py-2';
                    break;
                    
                case 'textarea':
                    input = document.createElement('textarea');
                    input.name = field.name || field.id;
                    input.placeholder = field.placeholder || '';
                    input.required = field.required || false;
                    input.rows = field.properties?.rows || 4;
                    input.className = 'w-full border border-gray-300 rounded px-3 py-2';
                    break;
                    
                case 'select':
                    input = document.createElement('select');
                    input.name = field.name || field.id;
                    input.required = field.required || false;
                    input.className = 'w-full border border-gray-300 rounded px-3 py-2';
                    
                    if (field.placeholder) {
                        const placeholderOption = document.createElement('option');
                        placeholderOption.value = '';
                        placeholderOption.textContent = field.placeholder;
                        input.appendChild(placeholderOption);
                    }
                    
                    field.options?.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.label;
                        input.appendChild(optionElement);
                    });
                    break;
                    
                case 'radio':
                case 'checkbox':
                    const fieldset = document.createElement('fieldset');
                    fieldset.className = 'space-y-2';
                    
                    field.options?.forEach(option => {
                        const optionDiv = document.createElement('div');
                        optionDiv.className = 'flex items-center';
                        
                        const optionInput = document.createElement('input');
                        optionInput.type = field.type;
                        optionInput.name = field.name || field.id;
                        optionInput.value = option.value;
                        optionInput.id = `${field.id}_${option.value}`;
                        optionInput.className = 'mr-2';
                        
                        const optionLabel = document.createElement('label');
                        optionLabel.htmlFor = optionInput.id;
                        optionLabel.textContent = option.label;
                        
                        optionDiv.appendChild(optionInput);
                        optionDiv.appendChild(optionLabel);
                        fieldset.appendChild(optionDiv);
                    });
                    
                    input = fieldset;
                    break;
            }
            
            // Apply custom classes if provided
            if (field.properties?.customClasses && input.className) {
                input.className += ' ' + field.properties.customClasses;
            }
            
            div.appendChild(label);
            div.appendChild(input);
            
            return div;
        }
        
        // Initialize the form
        createFormFromJSON(formConfig);
    </script>
</body>
</html>
```

### 4. Vue.js Applications

```vue
<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1>{{ formConfig.metadata.title }}</h1>
    <p>{{ formConfig.metadata.description }}</p>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div v-for="field in formConfig.fields" :key="field.id" class="form-field">
        <label :class="labelClass">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>
        
        <!-- Text inputs -->
        <input 
          v-if="['text', 'email', 'password'].includes(field.type)"
          :type="field.type"
          :name="field.name || field.id"
          :placeholder="field.placeholder"
          :required="field.required"
          v-model="formData[field.name || field.id]"
          :class="inputClass"
        />
        
        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :name="field.name || field.id"
          :placeholder="field.placeholder"
          :required="field.required"
          :rows="field.properties?.rows || 4"
          v-model="formData[field.name || field.id]"
          :class="inputClass"
        ></textarea>
        
        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          :name="field.name || field.id"
          :required="field.required"
          v-model="formData[field.name || field.id]"
          :class="inputClass"
        >
          <option value="" v-if="field.placeholder">{{ field.placeholder }}</option>
          <option 
            v-for="option in field.options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        {{ formConfig.settings.submitButtonText }}
      </button>
    </form>
  </div>
</template>

<script>
import formConfig from '@/data/form-config.json';

export default {
  name: 'DynamicForm',
  data() {
    return {
      formConfig,
      formData: {},
      labelClass: 'block text-sm font-medium mb-2',
      inputClass: 'w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500'
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.formData);
      
      // Send to API
      this.$http.post('/api/contact', this.formData)
        .then(response => {
          alert('Form submitted successfully!');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>
```

### 5. Backend Processing Examples

#### Node.js/Express
```javascript
// server.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/submit-form', (req, res) => {
  const formData = req.body;
  
  // Process the form data
  console.log('Received form data:', formData);
  
  // Example: Save to database
  // await saveToDatabase(formData);
  
  // Example: Send email
  // await sendEmailNotification(formData);
  
  res.json({ success: true, message: 'Form submitted successfully' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### Python/Flask
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    form_data = request.get_json()
    
    # Process the form data
    print(f"Received form data: {form_data}")
    
    # Example: Save to database
    # save_to_database(form_data)
    
    # Example: Send email
    # send_email_notification(form_data)
    
    return jsonify({"success": True, "message": "Form submitted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
```

#### PHP
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $formData = json_decode($input, true);
    
    // Process the form data
    error_log('Received form data: ' . print_r($formData, true));
    
    // Example: Save to database
    // saveToDatabase($formData);
    
    // Example: Send email
    // sendEmailNotification($formData);
    
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
```

## 🔧 Advanced Usage

### Form Validation
```javascript
function validateForm(formData, formConfig) {
  const errors = {};
  
  formConfig.fields.forEach(field => {
    const value = formData[field.name || field.id];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
      errors[field.name || field.id] = `${field.label} is required`;
      return;
    }
    
    // Check validation rules
    if (field.validation && value) {
      field.validation.forEach(rule => {
        switch (rule.type) {
          case 'minLength':
            if (value.length < rule.value) {
              errors[field.name || field.id] = rule.message;
            }
            break;
          case 'maxLength':
            if (value.length > rule.value) {
              errors[field.name || field.id] = rule.message;
            }
            break;
          case 'pattern':
            const regex = new RegExp(rule.value);
            if (!regex.test(value)) {
              errors[field.name || field.id] = rule.message;
            }
            break;
        }
      });
    }
  });
  
  return errors;
}
```

### Custom Field Types
```javascript
// Extend the form renderer for custom field types
function renderCustomField(field) {
  switch (field.type) {
    case 'location':
      return createLocationPicker(field);
    case 'color':
      return createColorPicker(field);
    default:
      return renderStandardField(field);
  }
}
```

## 📱 Mobile Integration

### React Native
```jsx
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import formConfig from './form-config.json';

export default function DynamicForm() {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Send to API
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {formConfig.metadata.title}
      </Text>
      
      {formConfig.fields.map(field => (
        <View key={field.id} style={{ marginBottom: 15 }}>
          <Text style={{ marginBottom: 5 }}>
            {field.label}
            {field.required && <Text style={{ color: 'red' }}> *</Text>}
          </Text>
          
          <TextInput
            placeholder={field.placeholder}
            value={formData[field.name || field.id] || ''}
            onChangeText={(text) => 
              setFormData(prev => ({
                ...prev,
                [field.name || field.id]: text
              }))
            }
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 5
            }}
          />
        </View>
      ))}
      
      <Button 
        title={formConfig.settings.submitButtonText} 
        onPress={handleSubmit} 
      />
    </View>
  );
}
```

## 🌐 CDN Usage

For quick prototyping without build tools:

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/react-form-builder@latest/dist/index.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="form-root"></div>
    
    <script>
        const formConfig = {
            // Your exported JSON here
        };
        
        function handleSubmit(data) {
            console.log('Form submitted:', data);
        }
        
        ReactDOM.render(
            React.createElement(ReactFormBuilder.FormRenderer, {
                form: formConfig,
                onSubmit: handleSubmit
            }),
            document.getElementById('form-root')
        );
    </script>
</body>
</html>
```

## 📊 Analytics & Tracking

```javascript
// Track form interactions
function trackFormEvent(eventType, fieldName, value) {
  // Google Analytics
  gtag('event', eventType, {
    'form_name': formConfig.metadata.title,
    'field_name': fieldName,
    'field_value': value
  });
  
  // Custom analytics
  analytics.track(eventType, {
    formId: formConfig.id,
    fieldName: fieldName,
    value: value,
    timestamp: new Date().toISOString()
  });
}

// Usage in form renderer
<FormRenderer 
  form={formConfig}
  onFieldChange={(fieldName, value) => {
    trackFormEvent('field_change', fieldName, value);
  }}
  onSubmit={(data) => {
    trackFormEvent('form_submit', 'complete_form', data);
    handleFormSubmit(data);
  }}
/>
```

This comprehensive guide shows that your JSON export format is extremely versatile and can be used in virtually any web technology stack! 🚀
