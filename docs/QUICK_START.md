# Quick Start Template

This is the simplest way to use exported forms from the React Form Builder.

## 🚀 1-Minute Setup

### Step 1: Install the package
```bash
npm install react-form-builder
```

### Step 2: Use the exported JSON
```jsx
import React from 'react';
import { FormRenderer } from 'react-form-builder';

// JSON exported from the form builder
const myForm = {
  "metadata": {
    "title": "Contact Form",
    "description": "Get in touch with us"
  },
  "fields": [
    {
      "id": "1",
      "type": "text",
      "name": "name",
      "label": "Your Name",
      "required": true
    },
    {
      "id": "2", 
      "type": "email",
      "name": "email",
      "label": "Email",
      "required": true
    },
    {
      "id": "3",
      "type": "textarea", 
      "name": "message",
      "label": "Message",
      "required": true
    }
  ],
  "settings": {
    "submitButtonText": "Send Message"
  }
};

function App() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Output: { name: "John", email: "john@email.com", message: "Hello!" }
    
    // Send to your API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>{myForm.metadata.title}</h1>
      <p>{myForm.metadata.description}</p>
      
      <FormRenderer 
        form={myForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
```

### Step 3: Handle the form data on your server

**Node.js/Express:**
```javascript
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received:', { name, email, message });
  res.json({ success: true });
});
```

**Next.js API Route:**
```javascript
// pages/api/contact.js
export default function handler(req, res) {
  const { name, email, message } = req.body;
  console.log('Received:', { name, email, message });
  res.json({ success: true });
}
```

**PHP:**
```php
<?php
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email']; 
$message = $data['message'];

// Process the data
echo json_encode(['success' => true]);
?>
```

## ✨ That's it!

The JSON from your form builder contains everything needed:
- ✅ Field types and properties
- ✅ Labels and placeholders  
- ✅ Validation rules
- ✅ Layout information
- ✅ Styling classes

## 🎯 Key Benefits

1. **Zero Configuration**: Just import the JSON and render
2. **Type Safety**: All field types are properly typed
3. **Responsive**: Works on mobile, tablet, desktop
4. **Accessible**: Built-in accessibility features
5. **Customizable**: Easy to style and extend
6. **Framework Agnostic**: Use with React, Vue, vanilla JS, etc.

## 📱 Example Use Cases

- **Contact Forms**: Customer inquiries
- **Registration**: User signups  
- **Surveys**: Data collection
- **Applications**: Job/loan applications
- **Feedback**: Reviews and ratings
- **Orders**: Product purchases

## 🔧 Advanced Features

**Custom Styling:**
```jsx
<FormRenderer 
  form={myForm}
  onSubmit={handleSubmit}
  className="my-custom-form"
  theme="dark"
/>
```

**Field Change Tracking:**
```jsx
<FormRenderer 
  form={myForm}
  onSubmit={handleSubmit}
  onFieldChange={(fieldName, value) => {
    console.log(`${fieldName} = ${value}`);
  }}
/>
```

**Validation:**
```jsx
const handleSubmit = (data, errors) => {
  if (errors && Object.keys(errors).length > 0) {
    console.log('Validation errors:', errors);
    return;
  }
  
  // Process valid data
  console.log('Valid data:', data);
};
```

The exported JSON makes your forms completely portable and easy to integrate anywhere! 🚀
