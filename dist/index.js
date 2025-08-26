import { jsx as e, jsxs as r, Fragment as j } from "react/jsx-runtime";
import oe, { createContext as rt, useContext as at, useReducer as st, useRef as nt, useState as $, useEffect as lt, useCallback as it } from "react";
import { v4 as Ve } from "uuid";
import { useDroppable as ot, useDraggable as ct, DndContext as dt } from "@dnd-kit/core";
import { useSortable as pt, SortableContext as mt, verticalListSortingStrategy as ut } from "@dnd-kit/sortable";
import { Button as F, Input as A, Divider as ne, Card as z, CardBody as T, Switch as U, Checkbox as pe, RadioGroup as Me, Radio as je, Select as V, SelectItem as b, Autocomplete as Be, AutocompleteItem as _e, Textarea as he, TimeInput as ht, DateInput as Oe, ButtonGroup as ve, CardHeader as R, Chip as _, Slider as bt, useDisclosure as X, Modal as Z, ModalContent as ee, ModalHeader as te, ModalBody as re, ModalFooter as be, Accordion as gt, AccordionItem as xt, Tabs as we, Tab as H, Navbar as yt, NavbarBrand as Nt, NavbarContent as De, NavbarItem as ft, Dropdown as vt, DropdownTrigger as wt, DropdownMenu as Ct, DropdownItem as ge, Progress as Ft, Spacer as We, Snippet as G, Code as k, Link as ze, HeroUIProvider as St } from "@heroui/react";
import * as Te from "lucide-react";
import { RotateCcw as At, Check as le, Star as qe, Upload as Y, Smartphone as Et, Tablet as Ot, Monitor as Dt, GripVertical as zt, Edit as Tt, Copy as Ce, Trash2 as Fe, Plus as ae, Layout as Pt, Settings as se, Rows4 as It, MoreVertical as Rt, Download as Ue, FileJson as $t, CheckCircle as xe, AlertCircle as Je, FileText as Lt, Gift as kt, Rocket as me, Zap as ue, Clock as Vt, Target as Mt, Sparkles as ye, BookOpen as He, Code as Pe, Terminal as jt, Users as Bt, ExternalLink as Ie, Github as _t, Package as Ke, Shield as Re, Palette as Wt } from "lucide-react";
import { CSS as qt } from "@dnd-kit/utilities";
function Ut(t, s) {
  if (t.name && t.name.trim())
    return t.name;
  const o = t.type.replace(/[-_]/g, "_").toLowerCase(), l = s.map((g) => g.name).filter(Boolean);
  if (!l.includes(o))
    return o;
  let i = 2, n = `${o}${i}`;
  for (; l.includes(n); )
    i++, n = `${o}${i}`;
  return n;
}
const Jt = {
  currentForm: {
    id: Ve(),
    title: "New Form",
    description: "",
    fields: [],
    settings: {
      submitButtonText: "Submit",
      allowMultipleSubmissions: !0,
      requireAuth: !1,
      captchaEnabled: !1,
      theme: "auto"
    }
  },
  selectedFieldId: null,
  previewMode: !1,
  deviceView: "desktop"
};
function Ht(t, s) {
  switch (s.type) {
    case "SET_FORM":
      return {
        ...t,
        currentForm: s.payload,
        selectedFieldId: null
      };
    case "ADD_FIELD":
      const o = {
        ...s.payload,
        name: Ut(s.payload, t.currentForm.fields)
      };
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: [...t.currentForm.fields, o]
        },
        selectedFieldId: s.payload.id
      };
    case "UPDATE_FIELD":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? {
              ...n,
              ...s.payload.updates,
              // Deep merge nested objects to prevent component remounting
              properties: s.payload.updates.properties ? { ...n.properties, ...s.payload.updates.properties } : n.properties,
              advanced: s.payload.updates.advanced ? { ...n.advanced, ...s.payload.updates.advanced } : n.advanced,
              custom: s.payload.updates.custom ? { ...n.custom, ...s.payload.updates.custom } : n.custom,
              events: s.payload.updates.events ? { ...n.events, ...s.payload.updates.events } : n.events,
              schema: s.payload.updates.schema ? { ...n.schema, ...s.payload.updates.schema } : n.schema,
              layout: s.payload.updates.layout ? { ...n.layout, ...s.payload.updates.layout } : n.layout
            } : n
          )
        }
      };
    case "UPDATE_FIELD_PROPERTIES":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, properties: { ...n.properties, ...s.payload.properties } } : n
          )
        }
      };
    case "UPDATE_FIELD_ADVANCED":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, advanced: { ...n.advanced, ...s.payload.advanced } } : n
          )
        }
      };
    case "UPDATE_FIELD_CUSTOM":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, custom: { ...n.custom, ...s.payload.custom } } : n
          )
        }
      };
    case "UPDATE_FIELD_EVENTS":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, events: { ...n.events, ...s.payload.events } } : n
          )
        }
      };
    case "UPDATE_FIELD_SCHEMA":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, schema: { ...n.schema, ...s.payload.schema } } : n
          )
        }
      };
    case "UPDATE_FIELD_LAYOUT":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.map(
            (n) => n.id === s.payload.id ? { ...n, layout: { ...n.layout, ...s.payload.layout } } : n
          )
        }
      };
    case "DELETE_FIELD":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: t.currentForm.fields.filter((n) => n.id !== s.payload)
        },
        selectedFieldId: t.selectedFieldId === s.payload ? null : t.selectedFieldId
      };
    case "REORDER_FIELDS":
      const l = [...t.currentForm.fields], [i] = l.splice(s.payload.oldIndex, 1);
      return l.splice(s.payload.newIndex, 0, i), {
        ...t,
        currentForm: {
          ...t.currentForm,
          fields: l
        }
      };
    case "SELECT_FIELD":
      return {
        ...t,
        selectedFieldId: s.payload
      };
    case "SET_PREVIEW_MODE":
      return {
        ...t,
        previewMode: s.payload,
        selectedFieldId: s.payload ? null : t.selectedFieldId
      };
    case "SET_DEVICE_VIEW":
      return {
        ...t,
        deviceView: s.payload
      };
    case "UPDATE_FORM_SETTINGS":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          settings: {
            ...t.currentForm.settings,
            ...s.payload
          }
        }
      };
    case "UPDATE_FORM_META":
      return {
        ...t,
        currentForm: {
          ...t.currentForm,
          title: s.payload.title ?? t.currentForm.title,
          description: s.payload.description ?? t.currentForm.description
        }
      };
    default:
      return t;
  }
}
const Ge = rt(void 0);
function Kt({ children: t }) {
  const [s, o] = st(Ht, Jt), l = {
    setForm: (i) => o({ type: "SET_FORM", payload: i }),
    addField: (i) => o({ type: "ADD_FIELD", payload: i }),
    updateField: (i, n) => o({ type: "UPDATE_FIELD", payload: { id: i, updates: n } }),
    updateFieldProperties: (i, n) => o({ type: "UPDATE_FIELD_PROPERTIES", payload: { id: i, properties: n } }),
    updateFieldAdvanced: (i, n) => o({ type: "UPDATE_FIELD_ADVANCED", payload: { id: i, advanced: n } }),
    updateFieldCustom: (i, n) => o({ type: "UPDATE_FIELD_CUSTOM", payload: { id: i, custom: n } }),
    updateFieldEvents: (i, n) => o({ type: "UPDATE_FIELD_EVENTS", payload: { id: i, events: n } }),
    updateFieldSchema: (i, n) => o({ type: "UPDATE_FIELD_SCHEMA", payload: { id: i, schema: n } }),
    updateFieldLayout: (i, n) => o({ type: "UPDATE_FIELD_LAYOUT", payload: { id: i, layout: n } }),
    deleteField: (i) => o({ type: "DELETE_FIELD", payload: i }),
    reorderFields: (i, n) => o({ type: "REORDER_FIELDS", payload: { oldIndex: i, newIndex: n } }),
    selectField: (i) => o({ type: "SELECT_FIELD", payload: i }),
    setPreviewMode: (i) => o({ type: "SET_PREVIEW_MODE", payload: i }),
    setDeviceView: (i) => o({ type: "SET_DEVICE_VIEW", payload: i }),
    updateFormSettings: (i) => o({ type: "UPDATE_FORM_SETTINGS", payload: i }),
    updateFormMeta: (i) => o({ type: "UPDATE_FORM_META", payload: i })
  };
  return /* @__PURE__ */ e(Ge.Provider, { value: { state: s, dispatch: o, actions: l }, children: t });
}
function J() {
  const t = at(Ge);
  if (t === void 0)
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  return t;
}
function C(t) {
  const s = {
    id: Ve(),
    type: t,
    label: Gt(t),
    required: !1,
    properties: {},
    advanced: {
      valued: !0,
      valueType: "string",
      dataBindingType: "twoWay",
      calculable: !1,
      localizable: !1,
      readOnly: !1,
      disabled: !1,
      asyncValidation: !1,
      deferFieldCalculation: !1
    },
    layout: {
      columnSpan: 12,
      gridClass: "col-span-12"
    },
    custom: {
      cssClasses: [],
      dataAttributes: {}
    },
    events: {},
    schema: {
      componentKind: "component",
      category: Yt(t),
      typeName: t,
      icon: Qt(t),
      nestingLevel: 0,
      builderOnly: !1
    }
  };
  switch (t) {
    case "text":
    case "email":
    case "password":
    case "phone":
    case "url":
      return {
        ...s,
        placeholder: `Enter ${s.label.toLowerCase()}`,
        properties: {
          ...s.properties,
          width: "full",
          maxLength: 255,
          colorVariant: "default",
          size: "md",
          borderRadius: "md"
        }
      };
    case "textarea":
      return {
        ...s,
        placeholder: `Enter ${s.label.toLowerCase()}`,
        properties: {
          ...s.properties,
          width: "full",
          rows: 4,
          maxLength: 1e3,
          colorVariant: "default",
          size: "md",
          borderRadius: "md"
        }
      };
    case "number":
    case "number-format":
      return {
        ...s,
        placeholder: "Enter number",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valueType: "number"
        }
      };
    case "select":
    case "radio":
    case "checkbox":
    case "multiselect":
    case "autocomplete":
      return {
        ...s,
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ],
        properties: {
          ...s.properties,
          width: "full",
          colorVariant: "default",
          size: "md",
          borderRadius: "md",
          orientation: t === "radio" || t === "checkbox" ? "vertical" : void 0,
          componentAlignment: t === "radio" || t === "checkbox" ? "left" : void 0
        },
        advanced: {
          ...s.advanced,
          valueType: t === "multiselect" || t === "checkbox" ? "array" : "string"
        }
      };
    case "date":
    case "datetime":
    case "time":
    case "calendar":
      return {
        ...s,
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valueType: "date"
        }
      };
    case "file":
      return {
        ...s,
        properties: {
          ...s.properties,
          width: "full",
          accept: "",
          multiple: !1
        },
        advanced: {
          ...s.advanced,
          valueType: "array"
        }
      };
    case "rating":
    case "range":
      return {
        ...s,
        properties: {
          ...s.properties,
          width: "full",
          max: 5,
          componentAlignment: t === "rating" ? "left" : void 0
        },
        advanced: {
          ...s.advanced,
          valueType: "number"
        }
      };
    case "switch":
      return {
        ...s,
        properties: {
          ...s.properties,
          width: "full",
          size: "md",
          componentAlignment: "left"
        },
        advanced: {
          ...s.advanced,
          valueType: "boolean"
        }
      };
    case "signature":
      return {
        ...s,
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valueType: "string"
        }
      };
    // Static content fields
    case "header":
      return {
        ...s,
        label: "Header",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    case "paragraph":
    case "label":
    case "message":
      return {
        ...s,
        label: "Paragraph",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    case "image":
      return {
        ...s,
        label: "Image",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    case "button":
      return {
        ...s,
        label: "Button",
        properties: {
          ...s.properties,
          width: "full",
          colorVariant: "primary",
          size: "md",
          borderRadius: "md",
          variant: "solid"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    // Structure fields
    case "section":
    case "pagebreak":
      return {
        ...s,
        label: "Section",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    case "container":
    case "card":
      return {
        ...s,
        label: "Container",
        properties: {
          ...s.properties,
          width: "full"
        },
        advanced: {
          ...s.advanced,
          valued: !1
        }
      };
    default:
      return s;
  }
}
function Gt(t) {
  return {
    // Input fields
    text: "Text Input",
    email: "Email",
    password: "Password",
    number: "Number",
    phone: "Phone",
    url: "URL",
    textarea: "Text Area",
    // Selection fields
    select: "Select",
    multiselect: "Multi Select",
    radio: "Radio Group",
    checkbox: "Checkbox Group",
    switch: "Switch",
    autocomplete: "Auto Complete",
    search: "Search",
    // Date/Time fields
    date: "Date",
    datetime: "Date Time",
    time: "Time",
    calendar: "Calendar",
    // Special fields
    file: "File Upload",
    rating: "Rating",
    signature: "Signature",
    range: "Range Slider",
    "rich-text": "Rich Text",
    "number-format": "Formatted Number",
    "pattern-format": "Pattern Format",
    // Static content
    button: "Button",
    label: "Label",
    header: "Header",
    paragraph: "Paragraph",
    image: "Image",
    message: "Message",
    "progress-line": "Progress Line",
    "progress-circle": "Progress Circle",
    tooltip: "Tooltip",
    "qr-code": "QR Code",
    html: "HTML",
    // Structure
    container: "Container",
    card: "Card",
    tab: "Tab",
    breadcrumb: "Breadcrumb",
    section: "Section",
    pagebreak: "Page Break",
    repeater: "Repeater",
    // Template fields
    slot: "Slot",
    template: "Template",
    // Error fields
    "error-message": "Error Message"
  }[t] || "Field";
}
function Yt(t) {
  return {
    // Input fields
    text: "fields",
    email: "fields",
    password: "fields",
    number: "fields",
    phone: "fields",
    url: "fields",
    textarea: "fields",
    // Selection fields
    select: "fields",
    multiselect: "fields",
    radio: "fields",
    checkbox: "fields",
    switch: "fields",
    autocomplete: "fields",
    search: "fields",
    // Date/Time fields
    date: "fields",
    datetime: "fields",
    time: "fields",
    calendar: "fields",
    // Special fields
    file: "fields",
    rating: "fields",
    signature: "fields",
    range: "fields",
    "rich-text": "fields",
    "number-format": "fields",
    "pattern-format": "fields",
    // Static content
    button: "static",
    label: "static",
    header: "static",
    paragraph: "static",
    image: "static",
    message: "static",
    "progress-line": "static",
    "progress-circle": "static",
    tooltip: "static",
    "qr-code": "static",
    html: "static",
    // Structure
    container: "structure",
    card: "structure",
    tab: "structure",
    breadcrumb: "structure",
    section: "structure",
    pagebreak: "structure",
    repeater: "structure",
    // Template fields
    slot: "templates",
    template: "templates",
    // Error fields
    "error-message": "error"
  }[t] || "fields";
}
function Qt(t) {
  return {
    // Input fields
    text: "Type",
    email: "Mail",
    password: "Key",
    number: "Hash",
    phone: "Phone",
    url: "Link",
    textarea: "FileText",
    // Selection fields
    select: "ChevronDown",
    multiselect: "List",
    radio: "Circle",
    checkbox: "Square",
    switch: "ToggleLeft",
    autocomplete: "Search",
    search: "Search",
    // Date/Time fields
    date: "Calendar",
    datetime: "Clock",
    time: "Clock",
    calendar: "Calendar",
    // Special fields
    file: "Upload",
    rating: "Star",
    signature: "PenTool",
    range: "Sliders",
    "rich-text": "FileText",
    "number-format": "Hash",
    "pattern-format": "Hash",
    // Static content
    button: "MousePointer",
    label: "Tag",
    header: "Heading",
    paragraph: "Type",
    image: "Image",
    message: "MessageSquare",
    "progress-line": "TrendingUp",
    "progress-circle": "Circle",
    tooltip: "Info",
    "qr-code": "QrCode",
    html: "Code",
    // Structure
    container: "Box",
    card: "Square",
    tab: "Tabs",
    breadcrumb: "ChevronRight",
    section: "Layout",
    pagebreak: "Scissors",
    repeater: "Copy",
    // Template fields
    slot: "Grid",
    template: "FileTemplate",
    // Error fields
    "error-message": "AlertCircle"
  }[t] || "Square";
}
const Rr = {
  // Input fields
  text: C("text"),
  email: C("email"),
  password: C("password"),
  number: C("number"),
  phone: C("phone"),
  url: C("url"),
  textarea: C("textarea"),
  // Selection fields
  select: C("select"),
  multiselect: C("multiselect"),
  radio: C("radio"),
  checkbox: C("checkbox"),
  switch: C("switch"),
  autocomplete: C("autocomplete"),
  search: C("search"),
  // Date/Time fields
  date: C("date"),
  datetime: C("datetime"),
  time: C("time"),
  calendar: C("calendar"),
  // Special fields
  file: C("file"),
  rating: C("rating"),
  signature: C("signature"),
  range: C("range"),
  "rich-text": C("rich-text"),
  "number-format": C("number-format"),
  "pattern-format": C("pattern-format"),
  // Static content
  button: C("button"),
  label: C("label"),
  header: C("header"),
  paragraph: C("paragraph"),
  image: C("image"),
  message: C("message"),
  "progress-line": C("progress-line"),
  "progress-circle": C("progress-circle"),
  tooltip: C("tooltip"),
  "qr-code": C("qr-code"),
  html: C("html"),
  // Structure
  container: C("container"),
  card: C("card"),
  tab: C("tab"),
  breadcrumb: C("breadcrumb"),
  section: C("section"),
  pagebreak: C("pagebreak"),
  repeater: C("repeater"),
  // Template fields
  slot: C("slot"),
  template: C("template"),
  // Error fields
  "error-message": C("error-message")
}, Xt = [
  // Most common input fields
  { id: "text", type: "text", label: "Text Input", icon: "Type", category: "fields" },
  { id: "email", type: "email", label: "Email", icon: "Mail", category: "fields" },
  { id: "password", type: "password", label: "Password", icon: "Key", category: "fields" },
  { id: "number", type: "number", label: "Number", icon: "Hash", category: "fields" },
  { id: "phone", type: "phone", label: "Phone", icon: "Phone", category: "fields" },
  { id: "textarea", type: "textarea", label: "Text Area", icon: "FileText", category: "fields" },
  // Selection fields
  { id: "select", type: "select", label: "Select", icon: "ChevronDown", category: "fields" },
  { id: "autocomplete", type: "autocomplete", label: "Auto Complete", icon: "Search", category: "fields" },
  { id: "radio", type: "radio", label: "Radio Group", icon: "Circle", category: "fields" },
  { id: "checkbox", type: "checkbox", label: "Checkbox Group", icon: "Square", category: "fields" },
  { id: "switch", type: "switch", label: "Switch", icon: "ToggleLeft", category: "fields" },
  // Date/Time fields
  { id: "date", type: "date", label: "Date", icon: "Calendar", category: "fields" },
  { id: "time", type: "time", label: "Time", icon: "Clock", category: "fields" },
  // Special fields
  { id: "file", type: "file", label: "File Upload", icon: "Upload", category: "fields" },
  { id: "rating", type: "rating", label: "Rating", icon: "Star", category: "fields" },
  // Static content
  { id: "header", type: "header", label: "Header", icon: "Heading", category: "static" },
  { id: "paragraph", type: "paragraph", label: "Paragraph", icon: "Type", category: "static" },
  { id: "image", type: "image", label: "Image", icon: "Image", category: "static" },
  { id: "button", type: "button", label: "Button", icon: "MousePointer", category: "static" },
  // Structure
  { id: "section", type: "section", label: "Section", icon: "Layout", category: "structure" },
  { id: "container", type: "container", label: "Container", icon: "Box", category: "structure" },
  { id: "card", type: "card", label: "Card", icon: "Square", category: "structure" }
], Zt = [
  {
    id: "fields",
    label: "Form Fields",
    description: "Input and selection fields"
  },
  {
    id: "static",
    label: "Static Content",
    description: "Text, images, and layout elements"
  },
  {
    id: "structure",
    label: "Structure",
    description: "Containers and layout components"
  },
  {
    id: "templates",
    label: "Templates",
    description: "Pre-built field combinations"
  },
  {
    id: "error",
    label: "Error Handling",
    description: "Error display components"
  }
];
function Se(t, s = !1) {
  const o = tr(t.properties?.borderRadius), l = rr(t), i = Ye(t, s), n = t.properties?.customClasses || "", g = t.custom?.cssClasses?.join(" ") || "", m = [n, g].filter(Boolean).join(" "), S = er(m), c = t.properties?.classNames || {}, p = (d) => d ? (d.includes("text-") || d.includes("bg-") || d.includes("border-"), d) : "";
  return {
    // Base wrapper/container classes - for outer spacing and visibility
    base: [
      l.margin,
      l.padding,
      s ? "" : i.visibility,
      // Only apply responsive hiding in preview/renderer
      S.wrapper,
      c.base || ""
    ].filter(Boolean).join(" "),
    // Label classes - ensure custom classes take precedence
    label: [
      "text-left",
      // Ensure labels are left-aligned by default
      S.label,
      p(c.label || "")
    ].filter(Boolean).join(" "),
    // Input wrapper classes - for border, shadow, background, etc.
    inputWrapper: [
      o,
      S.inputWrapper,
      p(c.inputWrapper || "")
    ].filter(Boolean).join(" "),
    // Inner wrapper classes
    innerWrapper: [
      p(c.innerWrapper || "")
    ].filter(Boolean).join(" "),
    // Main wrapper classes
    mainWrapper: [
      p(c.mainWrapper || "")
    ].filter(Boolean).join(" "),
    // Input field classes - ensure custom text styles take precedence
    input: [
      t.properties?.alignment || "",
      S.input,
      p(c.input || "")
    ].filter(Boolean).join(" "),
    // Clear button classes
    clearButton: [
      p(c.clearButton || "")
    ].filter(Boolean).join(" "),
    // Helper wrapper classes
    helperWrapper: [
      p(c.helperWrapper || "")
    ].filter(Boolean).join(" "),
    // Description classes
    description: [
      "text-left",
      // Ensure description text is left-aligned
      S.description,
      p(c.description || "")
    ].filter(Boolean).join(" "),
    // Error message classes
    errorMessage: [
      p(c.errorMessage || "")
    ].filter(Boolean).join(" ")
  };
}
function er(t) {
  if (!t.trim())
    return {
      wrapper: "",
      inputWrapper: "",
      input: "",
      label: "",
      description: ""
    };
  const s = t.trim().split(/\s+/), o = {
    wrapper: [],
    inputWrapper: [],
    input: [],
    label: [],
    description: []
  };
  return s.forEach((l) => {
    l.match(/^(border|shadow|bg-|rounded|ring)/) ? o.inputWrapper.push(l) : l.match(/^(text-|font-|placeholder|italic|underline)/) ? o.input.push(l) : l.match(/^(m[tlrb]?-|p[tlrb]?-|w-|h-|max-|min-|flex|grid|col-|row-|gap-|space-|justify-|items-|self-)/) ? o.wrapper.push(l) : o.inputWrapper.push(l);
  }), {
    wrapper: o.wrapper.join(" "),
    inputWrapper: o.inputWrapper.join(" "),
    input: o.input.join(" "),
    label: o.label.join(" "),
    description: o.description.join(" ")
  };
}
function tr(t) {
  switch (t) {
    case "none":
      return "rounded-none";
    case "small":
      return "rounded-sm";
    case "default":
      return "rounded-md";
    case "large":
      return "rounded-lg";
    case "full":
      return "rounded-full";
    default:
      return "";
  }
}
function rr(t) {
  const s = t.properties?.marginTop, o = t.properties?.marginBottom, l = t.properties?.padding;
  return {
    margin: [
      s || "",
      o || ""
    ].filter(Boolean).join(" "),
    padding: l || ""
  };
}
function Ye(t, s = !1) {
  const o = [];
  return s || (t.properties?.hideOnMobile && o.push("hidden sm:block"), t.properties?.hideOnTablet && o.push("sm:hidden lg:block"), t.properties?.hideOnDesktop && o.push("lg:hidden")), {
    visibility: o.join(" ")
  };
}
function $r(t) {
  return Se(t).base;
}
function Ne(t, s = !1) {
  const o = [];
  t.layout?.gridClass && o.push(t.layout.gridClass);
  const l = Ye(t, s);
  return l.visibility && o.push(l.visibility), o.join(" ");
}
function Qe({
  value: t,
  onChange: s,
  width: o = 400,
  height: l = 200,
  disabled: i = !1,
  className: n = ""
}) {
  const g = nt(null), [m, S] = $(!1), [c, p] = $(!0), [a, d] = $({ x: 0, y: 0 });
  lt(() => {
    const y = g.current;
    if (!y) return;
    const x = y.getContext("2d");
    if (x && (y.width = o, y.height = l, x.lineCap = "round", x.lineJoin = "round", x.strokeStyle = "#000000", x.lineWidth = 2, x.fillStyle = "#ffffff", x.fillRect(0, 0, o, l), t && t.startsWith("data:image"))) {
      const E = new Image();
      E.onload = () => {
        x.clearRect(0, 0, o, l), x.fillStyle = "#ffffff", x.fillRect(0, 0, o, l), x.drawImage(E, 0, 0, o, l), p(!1);
      }, E.src = t;
    }
  }, [o, l, t]);
  const u = (y) => {
    const x = g.current;
    if (!x) return { x: 0, y: 0 };
    const E = x.getBoundingClientRect(), I = x.width / E.width, M = x.height / E.height;
    if ("touches" in y) {
      const B = y.touches[0];
      return {
        x: (B.clientX - E.left) * I,
        y: (B.clientY - E.top) * M
      };
    } else
      return {
        x: (y.clientX - E.left) * I,
        y: (y.clientY - E.top) * M
      };
  }, v = (y) => {
    if (i) return;
    y.preventDefault();
    const x = u(y);
    S(!0), d(x), p(!1);
  }, h = (y) => {
    if (!m || i) return;
    y.preventDefault();
    const x = g.current, E = x?.getContext("2d");
    if (!x || !E) return;
    const I = u(y);
    E.beginPath(), E.moveTo(a.x, a.y), E.lineTo(I.x, I.y), E.stroke(), d(I);
  }, w = () => {
    m && (S(!1), D());
  }, D = () => {
    const y = g.current;
    if (!y) return;
    const x = y.toDataURL("image/png");
    s?.(x);
  }, L = () => {
    const y = g.current, x = y?.getContext("2d");
    !y || !x || (x.fillStyle = "#ffffff", x.fillRect(0, 0, o, l), p(!0), s?.(""));
  };
  return /* @__PURE__ */ r("div", { className: `signature-pad ${n}`, children: [
    /* @__PURE__ */ e("div", { className: "border-2 border-default-300 rounded-lg overflow-hidden bg-white", children: /* @__PURE__ */ e(
      "canvas",
      {
        ref: g,
        className: "block cursor-crosshair touch-none",
        style: { width: "100%", height: "auto", maxWidth: `${o}px` },
        onMouseDown: v,
        onMouseMove: h,
        onMouseUp: w,
        onMouseLeave: w,
        onTouchStart: v,
        onTouchMove: h,
        onTouchEnd: w
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "flex justify-between items-center mt-3", children: [
      /* @__PURE__ */ e("div", { className: "text-xs text-default-500", children: c ? "Sign above" : "Signature captured" }),
      /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            color: "warning",
            startContent: /* @__PURE__ */ e(At, { size: 16 }),
            onPress: L,
            isDisabled: i || c,
            children: "Clear"
          }
        ),
        !c && /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            color: "success",
            variant: "flat",
            startContent: /* @__PURE__ */ e(le, { size: 16 }),
            onPress: D,
            isDisabled: i,
            children: "Save"
          }
        )
      ] })
    ] })
  ] });
}
function fe({
  field: t,
  value: s,
  onChange: o
}) {
  const l = (h) => {
    o && o(h);
  };
  if (t.advanced?.hidden || t.properties?.hidden)
    return null;
  const i = Se(t, !0), n = i.base, m = (() => {
    const h = [];
    return t.properties?.hideOnMobile && h.push("Hidden on Mobile"), t.properties?.hideOnTablet && h.push("Hidden on Tablet"), t.properties?.hideOnDesktop && h.push("Hidden on Desktop"), h;
  })(), S = ({ children: h }) => m.length === 0 ? /* @__PURE__ */ e(j, { children: h }) : /* @__PURE__ */ r("div", { className: "relative", children: [
    h,
    /* @__PURE__ */ e("div", { className: "absolute top-0 right-0 flex items-center gap-1 -mt-2 -mr-2 z-10", children: m.map((w) => /* @__PURE__ */ e(
      "span",
      {
        className: "text-danger-700 text-xs px-1.5 py-0.5 rounded-full ",
        title: w,
        children: w.includes("Mobile") ? /* @__PURE__ */ e(Et, { size: 15 }) : w.includes("Tablet") ? /* @__PURE__ */ e(Ot, { size: 15 }) : /* @__PURE__ */ e(Dt, { size: 15 })
      },
      w
    )) })
  ] }), c = (h) => /* @__PURE__ */ e(S, { children: h }), p = {
    label: t.label,
    placeholder: t.placeholder,
    isRequired: t.required,
    description: t.properties?.description,
    isDisabled: t.advanced?.disabled || t.properties?.disabled,
    isReadOnly: t.advanced?.readOnly || t.properties?.readonly,
    size: t.properties?.size,
    color: t.properties?.colorVariant,
    variant: t.properties?.variant,
    radius: t.properties?.borderRadius,
    classNames: {
      base: i.base,
      label: i.label,
      inputWrapper: i.inputWrapper,
      innerWrapper: i.innerWrapper,
      mainWrapper: i.mainWrapper,
      input: i.input,
      clearButton: i.clearButton,
      helperWrapper: i.helperWrapper,
      description: i.description,
      errorMessage: i.errorMessage
    }
  }, d = (() => {
    const h = {}, w = t.custom?.dataAttributes || {};
    return Object.entries(w).forEach(([D, L]) => {
      h[`data-${D}`] = L;
    }), t.custom?.role && (h.role = t.custom.role), t.custom?.tabIndex !== void 0 && (h.tabIndex = t.custom.tabIndex), t.properties?.ariaLabel && (h["aria-label"] = t.properties.ariaLabel), t.type === "number" && (t.properties?.min !== void 0 && (h.min = t.properties.min), t.properties?.max !== void 0 && (h.max = t.properties.max), t.properties?.step !== void 0 && (h.step = t.properties.step)), h;
  })(), v = (() => {
    if (t.properties?.showCharacterCount && (t.type === "text" || t.type === "textarea")) {
      const h = s ? s.length : 0, w = t.properties?.maxLength;
      return w ? `${h}/${w}` : `${h}`;
    }
    return null;
  })();
  switch (t.type) {
    case "text":
      return /* @__PURE__ */ r(S, { children: [
        /* @__PURE__ */ e(
          A,
          {
            ...p,
            ...d,
            type: "text",
            value: s || "",
            onValueChange: (N) => l(N),
            maxLength: t.properties?.maxLength
          },
          `text-${t.id}`
        ),
        v && /* @__PURE__ */ e("div", { className: "text-xs text-default-500 mt-1 text-right", children: v })
      ] });
    case "email":
      return /* @__PURE__ */ e(S, { children: /* @__PURE__ */ e(
        A,
        {
          ...p,
          ...d,
          type: "email",
          value: s || "",
          onValueChange: (N) => l(N)
        },
        `email-${t.id}`
      ) });
    case "password":
      return /* @__PURE__ */ e(S, { children: /* @__PURE__ */ e(
        A,
        {
          ...p,
          ...d,
          type: "password",
          value: s || "",
          onValueChange: (N) => l(N)
        },
        `password-${t.id}`
      ) });
    case "number":
      return c(
        /* @__PURE__ */ e(
          A,
          {
            ...p,
            ...d,
            type: "number",
            value: s || "",
            onValueChange: (N) => {
              const P = parseFloat(N);
              !isNaN(P) && (t.properties?.min !== void 0 && P < t.properties.min || t.properties?.max !== void 0 && P > t.properties.max) || l(N);
            }
          },
          `number-${t.id}`
        )
      );
    case "date":
      return c(
        /* @__PURE__ */ e(
          Oe,
          {
            ...p,
            value: s || null,
            onChange: (N) => {
              l(N ? N.toString() : "");
            }
          },
          `date-${t.id}`
        )
      );
    case "datetime":
      return /* @__PURE__ */ e(
        Oe,
        {
          ...p,
          granularity: "second",
          value: s || null,
          onChange: (N) => {
            l(N ? N.toString() : "");
          }
        },
        `datetime-${t.id}`
      );
    case "time":
      return /* @__PURE__ */ e(
        ht,
        {
          ...p,
          value: s || null,
          onChange: (N) => {
            l(N ? N.toString() : "");
          }
        },
        `time-${t.id}`
      );
    case "textarea":
      return c(
        /* @__PURE__ */ r(j, { children: [
          /* @__PURE__ */ e(
            he,
            {
              ...p,
              ...d,
              value: s || "",
              onValueChange: (N) => l(N),
              rows: t.properties?.rows || 4,
              maxLength: t.properties?.maxLength
            },
            `textarea-${t.id}`
          ),
          v && /* @__PURE__ */ e("div", { className: "text-xs text-default-500 mt-1 text-right", children: v })
        ] })
      );
    case "select":
      return c(
        /* @__PURE__ */ e(
          V,
          {
            ...p,
            ...d,
            selectedKeys: s ? [s] : [],
            onSelectionChange: (N) => {
              const P = Array.from(N)[0];
              l(P);
            },
            children: t.options?.map((N) => /* @__PURE__ */ e(b, { children: N.label }, N.value)) || []
          }
        )
      );
    case "autocomplete":
      return c(
        /* @__PURE__ */ e(
          Be,
          {
            ...p,
            ...d,
            selectedKey: s || "",
            onSelectionChange: (N) => {
              l(N);
            },
            allowsCustomValue: !0,
            children: t.options?.map((N) => /* @__PURE__ */ e(_e, { children: N.label }, N.value)) || []
          }
        )
      );
    case "multiselect":
      return /* @__PURE__ */ e(
        V,
        {
          ...p,
          selectionMode: "multiple",
          selectedKeys: s || [],
          onSelectionChange: (N) => {
            l(Array.from(N));
          },
          children: t.options?.map((N) => /* @__PURE__ */ e(b, { children: N.label }, N.value)) || []
        }
      );
    case "radio":
      const h = t.properties?.orientation || "vertical", w = t.properties?.componentAlignment || "left", D = h === "horizontal" ? w === "center" ? "justify-center" : w === "right" ? "justify-end" : "justify-start" : w === "center" ? "items-center" : w === "right" ? "items-end" : "items-start", L = w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
      return /* @__PURE__ */ e("div", { className: w === "center" ? "flex flex-col items-center" : w === "right" ? "flex flex-col items-end" : "flex flex-col items-start", children: /* @__PURE__ */ e(
        Me,
        {
          label: t.label,
          description: t.properties?.description,
          isRequired: t.required,
          value: s || "",
          onValueChange: l,
          size: t.properties?.size,
          color: t.properties?.colorVariant,
          isDisabled: t.advanced?.disabled || t.properties?.disabled,
          isReadOnly: t.advanced?.readOnly || t.properties?.readonly,
          orientation: h,
          classNames: {
            base: i.base,
            label: `${i.label} ${L}`,
            wrapper: `${i.inputWrapper} ${D}`,
            description: `${i.description} ${L}`
          },
          children: t.options?.map((N) => /* @__PURE__ */ e(je, { value: N.value, children: N.label }, N.value)) || []
        }
      ) });
    case "checkbox":
      if (t.options && t.options.length > 1) {
        const N = t.properties?.orientation || "vertical", P = t.properties?.componentAlignment || "left", W = N === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col space-y-2", f = N === "horizontal" ? P === "center" ? "justify-center" : P === "right" ? "justify-end" : "justify-start" : P === "center" ? "items-center" : P === "right" ? "items-end" : "items-start", O = P === "center" ? "text-center" : P === "right" ? "text-right" : "text-left";
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${n} ${P === "center" ? "flex flex-col items-center" : P === "right" ? "flex flex-col items-end" : "flex flex-col items-start"}`, children: [
          /* @__PURE__ */ r("label", { className: `text-sm font-medium ${O}`, children: [
            t.label,
            t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }),
          t.properties?.description && /* @__PURE__ */ e("p", { className: `text-xs text-default-500 ${O}`, children: t.properties?.description }),
          /* @__PURE__ */ e("div", { className: `${W} ${f}`, children: t.options.map((q) => /* @__PURE__ */ e(
            pe,
            {
              value: q.value,
              isSelected: s?.includes?.(q.value) || !1,
              onValueChange: (ce) => {
                const de = s || [];
                l(ce ? [...de, q.value] : de.filter((K) => K !== q.value));
              },
              size: t.properties?.size,
              color: t.properties?.colorVariant,
              radius: t.properties?.borderRadius,
              isDisabled: t.advanced?.disabled || t.properties?.disabled,
              isReadOnly: t.advanced?.readOnly || t.properties?.readonly,
              children: q.label
            },
            q.value
          )) })
        ] });
      } else {
        const N = t.properties?.componentAlignment || "left", P = N === "center" ? "flex justify-center" : N === "right" ? "flex justify-end" : "flex justify-start", W = N === "center" ? "text-center" : N === "right" ? "text-right" : "text-left";
        return /* @__PURE__ */ r("div", { className: `${n} ${P} flex-col items-start`, children: [
          /* @__PURE__ */ r("label", { className: `text-sm font-medium ${W} block mb-2`, children: [
            t.label,
            t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }),
          t.properties?.description && /* @__PURE__ */ e("p", { className: `text-xs text-default-500 mb-2 ${W}`, children: t.properties?.description }),
          /* @__PURE__ */ e(
            pe,
            {
              isSelected: s || !1,
              onValueChange: l,
              size: t.properties?.size,
              color: t.properties?.colorVariant,
              radius: t.properties?.borderRadius,
              isDisabled: t.advanced?.disabled || t.properties?.disabled,
              isReadOnly: t.advanced?.readOnly || t.properties?.readonly,
              children: "Check to confirm"
            }
          )
        ] });
      }
    case "switch":
      const x = t.properties?.componentAlignment || "left", E = x === "center" ? "flex justify-center" : x === "right" ? "flex justify-end" : "flex justify-start";
      return /* @__PURE__ */ r("div", { className: `space-y-2 ${n}`, children: [
        /* @__PURE__ */ e("div", { className: E, children: /* @__PURE__ */ r(
          U,
          {
            isSelected: s || !1,
            onValueChange: l,
            size: t.properties?.size,
            color: t.properties?.colorVariant,
            isDisabled: t.advanced?.disabled || t.properties?.disabled,
            isReadOnly: t.advanced?.readOnly || t.properties?.readonly,
            children: [
              t.label,
              t.required && /* @__PURE__ */ e("span", { className: "text-danger ml-1", children: "*" })
            ]
          }
        ) }),
        t.properties?.description && /* @__PURE__ */ e("div", { className: E, children: /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.description }) })
      ] });
    case "file":
      return /* @__PURE__ */ r("div", { className: `space-y-2 ${n}`, children: [
        /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
          t.label,
          t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
        ] }),
        t.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.description }),
        /* @__PURE__ */ r("div", { className: "border-2 border-dashed border-default-300 rounded-lg p-6 text-center hover:border-default-400 transition-colors relative", children: [
          /* @__PURE__ */ e(Y, { className: "mx-auto text-default-400 mb-2", size: 32 }),
          /* @__PURE__ */ e("p", { className: "text-sm text-default-600 mb-2", children: "Click to upload or drag and drop" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.accept || "All file types" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "file",
              accept: t.properties?.accept,
              multiple: t.properties?.multiple,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              onChange: (N) => {
                const P = Array.from(N.target.files || []);
                l(t.properties?.multiple ? P : P[0]);
              }
            }
          )
        ] })
      ] });
    case "rating":
      const I = t.properties?.max || 5, M = t.properties?.componentAlignment || "left", B = M === "center" ? "flex justify-center" : M === "right" ? "flex justify-end" : "flex justify-start";
      return /* @__PURE__ */ r("div", { className: `space-y-2 ${n}`, children: [
        /* @__PURE__ */ e("div", { className: B, children: /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
          t.label,
          t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
        ] }) }),
        t.properties?.description && /* @__PURE__ */ e("div", { className: B, children: /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.description }) }),
        /* @__PURE__ */ e("div", { className: B, children: /* @__PURE__ */ e("div", { className: "flex gap-1", children: Array.from({ length: I }, (N, P) => P + 1).map(
          (N) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => l(N),
              className: "focus:outline-none",
              children: /* @__PURE__ */ e(
                qe,
                {
                  className: `w-6 h-6 ${N <= (s || 0) ? "text-warning fill-current" : "text-default-300"}`
                }
              )
            },
            N
          )
        ) }) })
      ] });
    case "signature":
      return /* @__PURE__ */ r("div", { className: `space-y-2 ${n}`, children: [
        /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
          t.label,
          t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
        ] }),
        t.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.description }),
        /* @__PURE__ */ e(
          Qe,
          {
            value: s,
            onChange: l,
            width: 380,
            height: 150,
            className: "w-full"
          }
        )
      ] });
    case "section":
      return /* @__PURE__ */ e("div", { className: n, children: /* @__PURE__ */ e(z, { children: /* @__PURE__ */ r(T, { className: "py-4", children: [
        /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: t.label }),
        t.properties?.description && /* @__PURE__ */ e("p", { className: "text-default-600", children: t.properties?.description })
      ] }) }) });
    case "paragraph":
      return /* @__PURE__ */ r("div", { className: `py-2 ${n}`, children: [
        /* @__PURE__ */ e("h4", { className: "text-md font-medium mb-1", children: t.label }),
        t.properties?.description && /* @__PURE__ */ e("p", { className: "text-default-600", children: t.properties?.description })
      ] });
    case "pagebreak":
      return /* @__PURE__ */ r("div", { className: `my-8 ${n}`, children: [
        /* @__PURE__ */ e(ne, { className: "my-4" }),
        /* @__PURE__ */ e("div", { className: "text-center text-sm text-default-500", children: "Page Break" }),
        /* @__PURE__ */ e(ne, { className: "my-4" })
      ] });
    case "html":
      return /* @__PURE__ */ e(
        "div",
        {
          className: `prose prose-sm max-w-none ${n}`,
          dangerouslySetInnerHTML: {
            __html: t.properties?.description || t.label
          }
        }
      );
    case "range":
      return /* @__PURE__ */ r("div", { className: `space-y-2 ${n}`, children: [
        /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
          t.label,
          t.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
        ] }),
        t.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: t.properties?.description }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: t.properties?.min || 0,
              max: t.properties?.max || 100,
              step: t.properties?.step || 1,
              value: s || t.properties?.min || 0,
              onChange: (N) => l(Number(N.target.value)),
              className: "flex-1 h-2 bg-default-200 rounded-lg appearance-none cursor-pointer"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-sm text-default-600 min-w-[3rem] text-right", children: s || t.properties?.min || 0 })
        ] })
      ] });
    case "phone":
      return /* @__PURE__ */ e(
        A,
        {
          ...p,
          type: "tel",
          value: s || "",
          onValueChange: (N) => l(N)
        }
      );
    case "url":
      return /* @__PURE__ */ e(
        A,
        {
          ...p,
          type: "url",
          value: s || "",
          onValueChange: (N) => l(N)
        }
      );
    case "button":
      return c(
        /* @__PURE__ */ e(
          F,
          {
            color: t.properties?.colorVariant,
            size: t.properties?.size,
            variant: t.properties?.variant,
            radius: t.properties?.borderRadius,
            isDisabled: t.advanced?.disabled || t.properties?.disabled,
            className: i.base,
            onPress: () => {
              l("clicked");
            },
            ...d,
            children: t.label
          },
          `button-${t.id}`
        )
      );
    default:
      return /* @__PURE__ */ e(
        "div",
        {
          className: `p-4 border border-dashed border-default-300 rounded-lg text-center ${n}`,
          children: /* @__PURE__ */ r("p", { className: "text-default-500", children: [
            "Unsupported field type: ",
            t.type
          ] })
        }
      );
  }
}
oe.memo(fe);
function $e({
  field: t,
  isPreview: s
}) {
  const { state: o, actions: l } = J(), { selectedFieldId: i } = o, {
    attributes: n,
    listeners: g,
    setNodeRef: m,
    transform: S,
    transition: c,
    isDragging: p
  } = pt({ id: t.id }), a = {
    transform: qt.Transform.toString(S),
    transition: c
  }, d = i === t.id, u = () => {
    s || l.selectField(t.id);
  }, v = () => {
    const L = {
      ...t,
      id: crypto.randomUUID(),
      label: `${t.label} (Copy)`
    };
    l.addField(L);
  }, h = () => {
    l.deleteField(t.id);
  }, w = () => {
    l.selectField(t.id);
  }, D = Ne(t, !s);
  return s ? /* @__PURE__ */ e("div", { className: `w-full ${D}`, children: /* @__PURE__ */ e(fe, { field: t }) }) : /* @__PURE__ */ e(
    "div",
    {
      ref: m,
      style: a,
      className: `
        relative group
        ${p ? "opacity-50 z-50" : ""}
        
        ${D}
      `,
      onClick: p ? void 0 : u,
      children: /* @__PURE__ */ e(
        "div",
        {
          className: `
          border transition-all duration-200 cursor-pointer
          ${d ? "border-primary shadow-lg" : "border-default-200 hover:border-default-300"}
          ${p ? "shadow-2xl" : ""}
        `,
          children: /* @__PURE__ */ r("div", { className: "p-2", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2 ", children: [
              /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    ...n,
                    ...g,
                    className: "cursor-grab active:cursor-grabbing p-1 hover:bg-default-100 rounded",
                    children: /* @__PURE__ */ e(zt, { className: "text-default-400", size: 14 })
                  }
                ),
                /* @__PURE__ */ e("span", { className: "text-xs text-default-600 font-medium", children: t.type.charAt(0).toUpperCase() + t.type.slice(1) })
              ] }),
              /* @__PURE__ */ r(ve, { size: "sm", variant: "flat", children: [
                /* @__PURE__ */ e(
                  F,
                  {
                    isIconOnly: !0,
                    onPress: w,
                    color: d ? "primary" : "default",
                    children: /* @__PURE__ */ e(Tt, { size: 16 })
                  }
                ),
                /* @__PURE__ */ e(F, { isIconOnly: !0, onPress: v, children: /* @__PURE__ */ e(Ce, { size: 16 }) }),
                /* @__PURE__ */ e(F, { isIconOnly: !0, color: "danger", onPress: h, children: /* @__PURE__ */ e(Fe, { size: 16 }) })
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "pointer-events-none", children: /* @__PURE__ */ e(fe, { field: t }) }),
            /* @__PURE__ */ e("div", { className: "mt-2 pt-2 border-t border-default-200", children: /* @__PURE__ */ r("div", { className: "flex items-center justify-between text-xs text-default-500", children: [
              /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ r("span", { children: [
                  "Req: ",
                  t.required ? "Yes" : "No"
                ] }),
                t.validation && t.validation.length > 0 && /* @__PURE__ */ r("span", { children: [
                  "Val: ",
                  t.validation.length
                ] })
              ] }),
              /* @__PURE__ */ r("span", { children: [
                "ID: ",
                t.id.slice(0, 6),
                "..."
              ] })
            ] }) })
          ] })
        }
      )
    }
  );
}
function Xe(t) {
  const s = [];
  let o = [], l = 0;
  return t.forEach((i, n) => {
    const g = ie(i);
    i.properties?.startNewRow || !1 || l + g > 12 || o.length === 0 ? (o.length > 0 && s.push({
      id: `row-${s.length}`,
      fields: [...o]
    }), o = [i], l = g) : (o.push(i), l += g), n === t.length - 1 && o.length > 0 && s.push({
      id: `row-${s.length}`,
      fields: [...o]
    });
  }), s;
}
function ie(t) {
  const s = t.layout?.columnSpan || t.columnSpan;
  if (s)
    return Math.min(12, Math.max(1, s));
  switch (t.properties?.width) {
    case "quarter":
      return 3;
    case "third":
      return 4;
    case "half":
      return 6;
    case "full":
    default:
      return 12;
  }
}
function ar(t) {
  return {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12"
  }[t] || "col-span-12";
}
function sr({ row: t, isPreview: s }) {
  const { fields: o } = t;
  if (o.length === 1 && ie(o[0]) === 12) {
    const l = Ne(o[0], !s);
    return /* @__PURE__ */ e("div", { className: l, children: /* @__PURE__ */ e(
      $e,
      {
        field: o[0],
        isPreview: s
      },
      o[0].id
    ) });
  }
  return /* @__PURE__ */ e("div", { className: "grid grid-cols-12 gap-3", children: o.map((l) => {
    const i = ie(l), n = ar(i), g = Ne(l, !s), m = [n, g].filter(Boolean).join(" ");
    return /* @__PURE__ */ e("div", { className: m, children: /* @__PURE__ */ e(
      $e,
      {
        field: l,
        isPreview: s
      }
    ) }, l.id);
  }) });
}
function Ze({
  formConfig: t,
  onSubmit: s,
  className: o = ""
}) {
  const [l, i] = $({}), [n, g] = $({}), m = it((a, d) => {
    i((u) => ({
      ...u,
      [a]: d
    })), g((u) => {
      if (u[a]) {
        const v = { ...u };
        return delete v[a], v;
      }
      return u;
    });
  }, []), S = () => {
    const a = {};
    return t.validation.requiredFields.forEach((d) => {
      const u = t.fieldMap[d], v = l[d];
      (!v || typeof v == "string" && v.trim() === "") && (a[d] = `${u.label} is required`);
    }), t.validation.fieldsWithValidation.forEach((d) => {
      const u = t.fieldMap[d], v = l[d];
      u.validation && v && u.validation.forEach((h) => {
        switch (h.type) {
          case "email":
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (a[d] = h.message);
            break;
          case "minLength":
            v.length < h.value && (a[d] = h.message);
            break;
          case "maxLength":
            v.length > h.value && (a[d] = h.message);
            break;
          case "min":
            parseFloat(v) < h.value && (a[d] = h.message);
            break;
          case "max":
            parseFloat(v) > h.value && (a[d] = h.message);
            break;
          case "pattern":
            new RegExp(h.value).test(v) || (a[d] = h.message);
            break;
        }
      });
    }), g(a), Object.keys(a).length === 0;
  }, c = (a) => {
    if (a.preventDefault(), S()) {
      const d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
      Object.keys(l).forEach((h) => {
        const w = t.fieldMap[h];
        let D = w.name;
        if (!D || !D.trim()) {
          const L = w.type.replace(/[-_]/g, "_").toLowerCase();
          if (D = L, u.has(D)) {
            let y = 2;
            for (D = `${L}${y}`; u.has(D); )
              y++, D = `${L}${y}`;
          }
        }
        u.add(D), d.set(h, D);
      });
      const v = {};
      Object.entries(l).forEach(([h, w]) => {
        const D = d.get(h);
        v[D] = w;
      }), s?.(v);
    }
  }, p = (a) => {
    const d = l[a.id] || a.defaultValue || "", u = n[a.id], v = !!u, h = Se(a, !1), w = {
      label: a.label,
      placeholder: a.placeholder,
      isRequired: a.required,
      description: a.properties?.description,
      classNames: {
        base: h.base,
        label: h.label,
        inputWrapper: h.inputWrapper,
        innerWrapper: h.innerWrapper,
        mainWrapper: h.mainWrapper,
        input: h.input,
        clearButton: h.clearButton,
        helperWrapper: h.helperWrapper,
        description: h.description,
        errorMessage: h.errorMessage
      },
      // isInvalid: hasError,
      errorMessage: u,
      size: a.properties.size || "md",
      isDisabled: a.properties.disabled,
      isReadOnly: a.properties.readonly,
      color: a.properties.colorVariant,
      radius: a.properties.borderRadius,
      variant: a.properties.variant
    };
    if (a.properties.hidden)
      return null;
    const L = (() => {
      const y = {};
      return a.properties.ariaLabel && (y["aria-label"] = a.properties.ariaLabel), a.properties.tabIndex !== void 0 && (y.tabIndex = a.properties.tabIndex), a.properties.dataAttributes && a.properties.dataAttributes.split(",").forEach((E) => {
        const [I, M] = E.split("=");
        I && M && (y[I.trim()] = M.trim());
      }), y;
    })();
    switch (a.type) {
      case "text":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "text",
            value: d,
            onValueChange: (f) => m(a.id, f),
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `text-${a.id}`
        );
      case "email":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "email",
            value: d,
            onValueChange: (f) => m(a.id, f),
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `email-${a.id}`
        );
      case "password":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "password",
            value: d,
            onValueChange: (f) => m(a.id, f),
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `password-${a.id}`
        );
      case "number":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "number",
            value: d,
            onValueChange: (f) => {
              const O = parseFloat(f);
              !isNaN(O) && (a.properties.min !== void 0 && O < a.properties.min || a.properties.max !== void 0 && O > a.properties.max) || m(a.id, f);
            },
            min: a.properties.min,
            max: a.properties.max,
            step: a.properties.step
          },
          `number-${a.id}`
        );
      case "textarea":
        return /* @__PURE__ */ e(
          he,
          {
            ...w,
            value: d,
            onValueChange: (f) => m(a.id, f),
            rows: a.properties.rows || 4,
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `textarea-${a.id}`
        );
      case "select":
        return /* @__PURE__ */ e(
          V,
          {
            ...w,
            selectedKeys: d ? [d] : [],
            onSelectionChange: (f) => {
              const O = Array.from(f)[0];
              m(a.id, O);
            },
            selectionMode: a.properties.multiple ? "multiple" : "single",
            children: a.options?.map((f) => /* @__PURE__ */ e(b, { children: f.label }, f.value)) || []
          }
        );
      case "autocomplete":
        return /* @__PURE__ */ e(
          Be,
          {
            ...w,
            selectedKey: d || "",
            onSelectionChange: (f) => {
              m(a.id, f);
            },
            allowsCustomValue: !0,
            children: a.options?.map((f) => /* @__PURE__ */ e(_e, { children: f.label }, f.value)) || []
          }
        );
      case "radio":
        const y = a.properties?.orientation || "vertical", x = a.properties?.componentAlignment || "left", E = y === "horizontal" ? x === "center" ? "justify-center" : x === "right" ? "justify-end" : "justify-start" : x === "center" ? "items-center" : x === "right" ? "items-end" : "items-start", I = x === "center" ? "text-center" : x === "right" ? "text-right" : "text-left";
        return /* @__PURE__ */ e("div", { className: x === "center" ? "flex flex-col items-center" : x === "right" ? "flex flex-col items-end" : "flex flex-col items-start", children: /* @__PURE__ */ e(
          Me,
          {
            label: a.label,
            description: a.properties?.description,
            isRequired: a.required,
            value: d,
            onValueChange: (f) => m(a.id, f),
            isInvalid: v,
            errorMessage: u,
            size: a.properties.size || "md",
            isDisabled: a.properties.disabled,
            color: a.properties.colorVariant,
            orientation: y,
            classNames: {
              base: [
                a.properties.marginTop,
                a.properties.marginBottom,
                a.properties.padding
              ].filter(Boolean).join(" "),
              wrapper: `${a.properties.alignment || ""} ${E}`,
              label: I,
              description: I
            },
            className: a.properties.customClasses,
            children: a.options?.map((f) => /* @__PURE__ */ e(je, { value: f.value, children: f.label }, f.value)) || []
          }
        ) });
      case "checkbox":
        if (a.options && a.options.length > 1) {
          const f = a.properties?.orientation || "vertical", O = a.properties?.componentAlignment || "left", Q = f === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col space-y-2", q = f === "horizontal" ? O === "center" ? "justify-center" : O === "right" ? "justify-end" : "justify-start" : O === "center" ? "items-center" : O === "right" ? "items-end" : "items-start", ce = O === "center" ? "text-center" : O === "right" ? "text-right" : "text-left", de = O === "center" ? "flex flex-col items-center" : O === "right" ? "flex flex-col items-end" : "flex flex-col items-start";
          return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""} ${de}`, children: [
            /* @__PURE__ */ r("label", { className: `text-sm font-medium ${ce}`, children: [
              a.label,
              a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
            ] }),
            a.properties?.description && /* @__PURE__ */ e("p", { className: `text-xs text-default-500 ${ce}`, children: a.properties?.description }),
            /* @__PURE__ */ e("div", { className: `${Q} ${q}`, children: a.options.map((K) => /* @__PURE__ */ e(
              pe,
              {
                isSelected: d?.includes?.(K.value) || !1,
                onValueChange: (et) => {
                  const Ee = d || [];
                  et ? m(a.id, [
                    ...Ee,
                    K.value
                  ]) : m(
                    a.id,
                    Ee.filter((tt) => tt !== K.value)
                  );
                },
                size: a.properties.size || "md",
                isDisabled: a.properties.disabled,
                color: a.properties.colorVariant,
                radius: a.properties.borderRadius,
                children: K.label
              },
              K.value
            )) }),
            v && /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u })
          ] });
        } else {
          const f = a.properties?.componentAlignment || "left", O = f === "center" ? "justify-center" : f === "right" ? "justify-end" : "justify-start", Q = f === "center" ? "text-center" : f === "right" ? "text-right" : "text-left";
          return /* @__PURE__ */ r("div", { className: `${a.properties.customClasses} ${O}`, children: [
            /* @__PURE__ */ r("label", { className: `text-sm font-medium block mb-2 ${Q}`, children: [
              a.label,
              a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
            ] }),
            a.properties?.description && /* @__PURE__ */ e("p", { className: `text-xs text-default-500 mb-2 ${Q}`, children: a.properties?.description }),
            /* @__PURE__ */ e(
              pe,
              {
                isSelected: d || !1,
                onValueChange: (q) => m(a.id, q),
                size: a.properties.size || "md",
                isDisabled: a.properties.disabled,
                color: a.properties.colorVariant,
                radius: a.properties.borderRadius,
                children: "Check to confirm"
              }
            ),
            v && /* @__PURE__ */ e("p", { className: `text-danger text-xs mt-1 ${Q}`, children: u })
          ] });
        }
      case "switch":
        const B = a.properties?.componentAlignment || "left", N = B === "center" ? "flex justify-center" : B === "right" ? "flex justify-end" : "flex justify-start";
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ e("div", { className: N, children: /* @__PURE__ */ r(
            U,
            {
              isSelected: d || !1,
              onValueChange: (f) => m(a.id, f),
              size: a.properties.size || "sm",
              isDisabled: a.properties.disabled,
              color: a.properties.colorVariant,
              children: [
                a.label,
                a.required && /* @__PURE__ */ e("span", { className: "text-danger ml-1", children: "*" })
              ]
            }
          ) }),
          a.properties?.description && /* @__PURE__ */ e("div", { className: N, children: /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: a.properties?.description }) }),
          v && /* @__PURE__ */ e("div", { className: N, children: /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u }) })
        ] });
      case "section":
        return /* @__PURE__ */ e(
          z,
          {
            radius: a.properties.borderRadius || "sm",
            className: a.properties.customClasses,
            children: /* @__PURE__ */ r(T, { className: "py-4", children: [
              /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: a.label }),
              a.properties?.description && /* @__PURE__ */ e("p", { className: "text-default-600", children: a.properties?.description })
            ] })
          }
        );
      case "paragraph":
        return /* @__PURE__ */ r("div", { className: `py-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ e("h4", { className: "text-md font-medium mb-1", children: a.label }),
          a.properties?.description && /* @__PURE__ */ e("p", { className: "text-default-600", children: a.properties?.description })
        ] });
      case "phone":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "tel",
            value: d,
            onValueChange: (f) => m(a.id, f),
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `phone-${a.id}`
        );
      case "url":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "url",
            value: d,
            onValueChange: (f) => m(a.id, f),
            minLength: a.properties.minLength,
            maxLength: a.properties.maxLength
          },
          `url-${a.id}`
        );
      case "date":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "date",
            value: d,
            onValueChange: (f) => m(a.id, f)
          },
          `date-${a.id}`
        );
      case "time":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "time",
            value: d,
            onValueChange: (f) => m(a.id, f)
          },
          `time-${a.id}`
        );
      case "datetime":
        return /* @__PURE__ */ e(
          A,
          {
            ...w,
            type: "datetime-local",
            value: d,
            onValueChange: (f) => m(a.id, f)
          },
          `datetime-${a.id}`
        );
      case "multiselect":
        return /* @__PURE__ */ e(
          V,
          {
            ...w,
            selectionMode: "multiple",
            selectedKeys: d || [],
            onSelectionChange: (f) => {
              const O = Array.from(f);
              m(a.id, O);
            },
            children: a.options?.map((f) => /* @__PURE__ */ e(b, { children: f.label }, f.value)) || []
          }
        );
      case "range":
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
            a.label,
            a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }),
          a.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: a.properties?.description }),
          /* @__PURE__ */ e(
            bt,
            {
              value: d || a.properties.min || 0,
              onChange: (f) => {
                const O = Array.isArray(f) ? f[0] : f;
                m(a.id, O);
              },
              minValue: a.properties.min || 0,
              maxValue: a.properties.max || 100,
              step: a.properties.step || 1,
              className: "max-w-md",
              size: a.properties.size || "sm",
              isDisabled: a.properties.disabled,
              color: a.properties.colorVariant
            }
          ),
          /* @__PURE__ */ r("div", { className: "text-xs text-default-500", children: [
            "Value: ",
            d || a.properties.min || 0
          ] }),
          v && /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u })
        ] });
      case "file":
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
            a.label,
            a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }),
          a.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: a.properties?.description }),
          /* @__PURE__ */ r("div", { className: `border-2 border-dashed border-default-300 rounded-lg p-4 text-center hover:border-default-400 transition-colors ${a.properties.disabled ? "opacity-50 cursor-not-allowed" : ""}`, children: [
            /* @__PURE__ */ e(Y, { className: "mx-auto h-8 w-8 text-default-400 mb-2" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "file",
                accept: a.properties.accept || "*",
                multiple: a.properties.multiple,
                disabled: a.properties.disabled,
                onChange: (f) => {
                  const O = a.properties.multiple ? Array.from(f.target.files || []) : f.target.files?.[0];
                  m(a.id, O);
                },
                className: "hidden",
                id: `file-${a.id}`
              }
            ),
            /* @__PURE__ */ r("label", { htmlFor: `file-${a.id}`, className: `cursor-pointer ${a.properties.disabled ? "cursor-not-allowed" : ""}`, children: [
              /* @__PURE__ */ r("div", { className: "text-sm text-default-600", children: [
                "Click to upload ",
                a.properties.multiple ? "files" : "a file"
              ] }),
              d && /* @__PURE__ */ e("div", { className: "mt-2", children: Array.isArray(d) ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: d.map((f, O) => /* @__PURE__ */ e(_, { color: "primary", size: "sm", children: f.name || `File ${O + 1}` }, O)) }) : /* @__PURE__ */ e(_, { color: "primary", size: "sm", children: d.name || "File selected" }) })
            ] })
          ] }),
          v && /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u })
        ] });
      case "rating":
        const P = a.properties?.componentAlignment || "left", W = P === "center" ? "flex justify-center" : P === "right" ? "flex justify-end" : "flex justify-start";
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ e("div", { className: W, children: /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
            a.label,
            a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }) }),
          a.properties?.description && /* @__PURE__ */ e("div", { className: W, children: /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: a.properties?.description }) }),
          /* @__PURE__ */ e("div", { className: W, children: /* @__PURE__ */ e("div", { className: "flex space-x-1", children: Array.from({ length: a.properties.max || 5 }, (f, O) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              disabled: a.properties.disabled,
              onClick: () => m(a.id, O + 1),
              className: `p-1 hover:scale-110 transition-transform ${a.properties.disabled ? "opacity-50 cursor-not-allowed" : ""}`,
              children: /* @__PURE__ */ e(
                qe,
                {
                  className: `h-6 w-6 ${(d || 0) > O ? "text-yellow-400 fill-yellow-400" : "text-default-300"}`
                }
              )
            },
            O
          )) }) }),
          d && /* @__PURE__ */ e("div", { className: W, children: /* @__PURE__ */ r("div", { className: "text-sm text-default-600", children: [
            d,
            " out of ",
            a.properties.max || 5,
            " stars"
          ] }) }),
          v && /* @__PURE__ */ e("div", { className: W, children: /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u }) })
        ] });
      case "signature":
        return /* @__PURE__ */ r("div", { className: `space-y-2 ${a.properties.customClasses || ""}`, children: [
          /* @__PURE__ */ r("label", { className: "text-sm font-medium", children: [
            a.label,
            a.required && /* @__PURE__ */ e("span", { className: "text-danger", children: "*" })
          ] }),
          a.properties?.description && /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: a.properties?.description }),
          /* @__PURE__ */ e(
            Qe,
            {
              value: d,
              onChange: (f) => m(a.id, f),
              width: 400,
              height: 200,
              className: "w-full",
              disabled: a.properties.disabled
            }
          ),
          v && /* @__PURE__ */ e("p", { className: "text-danger text-xs", children: u })
        ] });
      case "pagebreak":
        return /* @__PURE__ */ e("div", { className: "py-4", children: /* @__PURE__ */ e(ne, {}) });
      case "html":
        return /* @__PURE__ */ e("div", { className: "py-2", children: /* @__PURE__ */ e(
          "div",
          {
            dangerouslySetInnerHTML: {
              __html: a.defaultValue || "<div>HTML content</div>"
            },
            className: "prose prose-sm max-w-none"
          }
        ) });
      case "button":
        return /* @__PURE__ */ e(
          F,
          {
            color: a.properties.colorVariant,
            size: a.properties.size,
            variant: a.properties.variant,
            radius: a.properties.borderRadius,
            isDisabled: a.properties.disabled,
            className: a.properties.customClasses,
            onPress: () => {
              console.log("Button clicked:", a.label), m(a.id, "clicked");
            },
            ...L,
            children: a.label
          },
          `button-${a.id}`
        );
      default:
        return /* @__PURE__ */ e("div", { className: "p-4 border border-dashed border-default-300 rounded-lg text-center", children: /* @__PURE__ */ r("p", { className: "text-default-500", children: [
          "Unsupported field type: ",
          a.type
        ] }) });
    }
  };
  return /* @__PURE__ */ e("div", { className: `max-w-4xl mx-auto p-6 ${o}`, children: /* @__PURE__ */ r(z, { radius: "sm", className: "p-1", children: [
    /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("h1", { className: "text-2xl font-bold", children: t.metadata.title }),
      t.metadata.description && /* @__PURE__ */ e("p", { className: "text-default-600 mt-2", children: t.metadata.description })
    ] }) }),
    /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("form", { onSubmit: c, className: "space-y-6", children: [
      t.layout.rows.map((a) => /* @__PURE__ */ e("div", { className: "grid grid-cols-12 gap-4", children: a.fields.map((d) => {
        const u = t.fieldMap[d], h = (() => {
          const w = [];
          return u.properties.hideOnMobile && w.push("hidden sm:block"), u.properties.hideOnTablet && w.push("md:hidden lg:block"), u.properties.hideOnDesktop && w.push("lg:hidden"), w.join(" ");
        })();
        return /* @__PURE__ */ e(
          "div",
          {
            className: `${u.layout.gridClass} ${h}`,
            children: p(u)
          },
          d
        );
      }) }, a.id)),
      /* @__PURE__ */ e("div", { className: "flex justify-end pt-6 border-t border-divider", children: /* @__PURE__ */ e(
        F,
        {
          radius: "sm",
          type: "submit",
          color: "primary",
          size: "md",
          className: "w-full sm:w-auto",
          children: t.settings.submitButtonText
        }
      ) })
    ] }) })
  ] }) });
}
function Ae(t) {
  const s = Xe(t.fields), o = (/* @__PURE__ */ new Date()).toISOString(), l = t.fields.map((c, p) => {
    if (c.name && c.name.trim())
      return c;
    const a = c.type.replace(/[-_]/g, "_").toLowerCase(), d = t.fields.slice(0, p).map((v) => v.name).filter(Boolean);
    let u = a;
    if (d.includes(a)) {
      let v = 2;
      for (u = `${a}${v}`; d.includes(u); )
        v++, u = `${a}${v}`;
    }
    return {
      ...c,
      name: u
    };
  }), i = s.map((c) => ({
    id: c.id,
    fields: c.fields.map((p) => p.id),
    columns: c.fields.reduce((p, a) => p + ie(a), 0)
  })), n = l.map((c) => {
    const p = ie(c), a = s.find((d) => d.fields.some((u) => u.id === c.id))?.id || "row-0";
    return {
      id: c.id,
      type: c.type,
      label: c.label,
      name: c.name,
      placeholder: c.placeholder,
      required: c.required,
      defaultValue: c.defaultValue,
      validation: c.validation,
      options: c.options,
      properties: {
        helpText: c.properties?.helpText,
        description: c.properties?.description,
        customClasses: c.properties?.customClasses || c.custom?.cssClasses?.join(" ") || "",
        classNames: c.properties?.classNames,
        width: c.properties?.width || "full",
        rows: c.properties?.rows,
        multiple: c.properties?.multiple,
        accept: c.properties?.accept,
        min: c.properties?.min,
        max: c.properties?.max,
        step: c.properties?.step,
        startNewRow: c.properties?.startNewRow,
        size: c.properties?.size,
        disabled: c.advanced?.disabled || c.properties?.disabled,
        readonly: c.advanced?.readOnly || c.properties?.readonly,
        hidden: c.advanced?.hidden || c.properties?.hidden,
        colorVariant: c.properties?.colorVariant,
        borderRadius: c.properties?.borderRadius,
        variant: c.properties?.variant,
        showCharacterCount: c.properties?.showCharacterCount,
        minLength: c.properties?.minLength,
        maxLength: c.properties?.maxLength,
        // Layout properties
        marginTop: c.properties?.marginTop,
        marginBottom: c.properties?.marginBottom,
        padding: c.properties?.padding,
        alignment: c.properties?.alignment,
        orientation: c.properties?.orientation,
        componentAlignment: c.properties?.componentAlignment,
        // Responsive properties
        hideOnMobile: c.properties?.hideOnMobile,
        hideOnTablet: c.properties?.hideOnTablet,
        hideOnDesktop: c.properties?.hideOnDesktop,
        // Custom attributes
        dataAttributes: c.properties?.dataAttributes,
        ariaLabel: c.properties?.ariaLabel,
        tabIndex: c.properties?.tabIndex
      },
      layout: {
        columnSpan: c.columnSpan || p,
        rowId: a,
        gridClass: nr(c.columnSpan || p)
      },
      conditionalLogic: c.conditionalLogic
    };
  }), g = {};
  n.forEach((c) => {
    g[c.id] = c;
  });
  const m = n.filter((c) => c.required).map((c) => c.id), S = n.filter((c) => c.validation && c.validation.length > 0).map((c) => c.id);
  return {
    metadata: {
      id: t.id,
      title: t.title,
      description: t.description,
      version: "1.0.0",
      createdAt: t.id,
      // Using ID as creation timestamp for now
      exportedAt: o,
      builderVersion: "1.0.0"
    },
    settings: t.settings,
    layout: {
      rows: i,
      totalFields: n.length
    },
    fields: n,
    fieldMap: g,
    validation: {
      requiredFields: m,
      fieldsWithValidation: S
    }
  };
}
function nr(t) {
  return {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12"
  }[t] || "col-span-12";
}
function lr(t, s) {
  const o = Ae(t), l = JSON.stringify(o, null, 2), i = new Blob([l], { type: "application/json" }), n = URL.createObjectURL(i), g = document.createElement("a");
  g.href = n, g.download = `${t.title.replace(/\s+/g, "_")}_form_export.json`, g.click(), URL.revokeObjectURL(n);
}
function ir() {
  const { state: t, actions: s } = J(), { currentForm: o, previewMode: l } = t, [i, n] = $(null), {
    isOpen: g,
    onOpen: m,
    onOpenChange: S
  } = X(), { setNodeRef: c, isOver: p } = ot({
    id: "form-canvas"
  }), a = () => {
    const u = C("text");
    s.addField(u);
  }, d = (u) => {
    n(u), m();
  };
  return o.fields.length === 0 ? /* @__PURE__ */ e(
    "div",
    {
      ref: c,
      className: `flex-1 p-2 sm:p-4 ${p ? "bg-primary-50" : "bg-background"} transition-colors`,
      children: /* @__PURE__ */ e(
        z,
        {
          radius: "sm",
          className: "h-full border-2 p-4 sm:p-10 border-dashed border-default-300",
          children: /* @__PURE__ */ r(T, { className: "flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ e(ae, { className: "text-4xl sm:text-6xl text-default-400 mb-2 sm:mb-4" }),
            /* @__PURE__ */ e("h3", { className: "text-sm sm:text-md font-semibold mb-2", children: "Start Building Your Form" }),
            /* @__PURE__ */ e("p", { className: "text-default-600 mb-4 sm:mb-6 text-xs sm:text-sm max-w-xs sm:max-w-md", children: "Drag elements from the sidebar or click the button below to add your first field" }),
            /* @__PURE__ */ e(
              F,
              {
                color: "secondary",
                size: "sm",
                radius: "sm",
                startContent: /* @__PURE__ */ e(ae, {}),
                onPress: a,
                children: "Add First Field"
              }
            )
          ] })
        }
      )
    }
  ) : /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      className: `flex-1 p-2 sm:p-4 overflow-y-auto ${p ? "bg-primary-50" : "bg-background"} transition-colors`,
      children: [
        /* @__PURE__ */ r("div", { className: `w-full ${l ? "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto" : ""}`, children: [
          /* @__PURE__ */ e("div", { className: "mb-2 sm:mb-4 px-1 sm:px-2", children: l ? /* @__PURE__ */ e(j, {}) : /* @__PURE__ */ r("div", { className: "space-y-2 sm:space-y-3 mb-2 sm:mb-4 p-2 sm:p-4 bg-default-50 rounded-lg border border-default-200", children: [
            /* @__PURE__ */ e("h3", { className: "text-xs sm:text-sm font-semibold text-default-700 mb-1 sm:mb-2", children: "Form Information" }),
            /* @__PURE__ */ e(
              A,
              {
                label: "Form Title",
                placeholder: "Enter form title...",
                value: o.title,
                onChange: (u) => s.updateFormMeta({ title: u.target.value }),
                size: "sm",
                className: "w-full"
              }
            ),
            /* @__PURE__ */ e(
              he,
              {
                label: "Form Description (Optional)",
                placeholder: "Enter a brief description of your form...",
                value: o.description || "",
                onChange: (u) => s.updateFormMeta({ description: u.target.value }),
                size: "sm",
                rows: 2,
                className: "w-full"
              }
            )
          ] }) }),
          l ? (
            // In preview mode, use the same FormRenderer that will be used with exported JSON
            /* @__PURE__ */ e(
              Ze,
              {
                formConfig: Ae(o),
                onSubmit: d
              }
            )
          ) : /* @__PURE__ */ r(j, { children: [
            /* @__PURE__ */ e(
              mt,
              {
                items: o.fields.map((u) => u.id),
                strategy: ut,
                children: /* @__PURE__ */ e("div", { className: "space-y-2 sm:space-y-4", children: Xe(o.fields).map((u) => /* @__PURE__ */ e(sr, { row: u, isPreview: !1 }, u.id)) })
              }
            ),
            /* @__PURE__ */ e("div", { className: "mt-2 flex justify-end sm:mt-4 pt-2 sm:pt-4 border-t border-divider px-1 sm:px-2", children: /* @__PURE__ */ e(
              F,
              {
                radius: "sm",
                color: "primary",
                type: "submit",
                disabled: !0,
                className: "sm:size-lg",
                children: o.settings.submitButtonText
              }
            ) }),
            /* @__PURE__ */ e("div", { className: "mt-2 sm:mt-4 px-1 sm:px-2", children: /* @__PURE__ */ r(
              F,
              {
                radius: "sm",
                variant: "bordered",
                startContent: /* @__PURE__ */ e(ae, {}),
                onPress: a,
                className: "w-full",
                size: "sm",
                children: [
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: "Add Field" }),
                  /* @__PURE__ */ e("span", { className: "sm:hidden", children: "Add" })
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ e(
          Z,
          {
            isOpen: g,
            onOpenChange: S,
            size: "2xl",
            children: /* @__PURE__ */ e(ee, { children: (u) => /* @__PURE__ */ r(j, { children: [
              /* @__PURE__ */ e(te, { children: "Form Preview Submission" }),
              /* @__PURE__ */ e(re, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
                /* @__PURE__ */ r("div", { className: "flex items-center gap-2 text-success", children: [
                  /* @__PURE__ */ e(le, { className: "w-5 h-5" }),
                  /* @__PURE__ */ e("span", { className: "font-medium", children: "Form submitted successfully in preview mode!" })
                ] }),
                /* @__PURE__ */ e(ne, {}),
                /* @__PURE__ */ r("div", { children: [
                  /* @__PURE__ */ e("h4", { className: "font-semibold mb-2", children: "Submitted Data:" }),
                  /* @__PURE__ */ e("div", { className: "bg-success-50 p-4 rounded-lg", children: /* @__PURE__ */ e("pre", { className: "text-sm overflow-auto whitespace-pre-wrap", children: JSON.stringify(i, null, 2) }) })
                ] }),
                /* @__PURE__ */ r("div", { className: "text-sm text-default-600", children: [
                  /* @__PURE__ */ e("strong", { children: "Preview Mode:" }),
                  " This shows how your form will behave when submitted. In a real application, this data would be sent to your server or API endpoint."
                ] })
              ] }) }),
              /* @__PURE__ */ r(be, { children: [
                /* @__PURE__ */ e(
                  F,
                  {
                    color: "default",
                    variant: "flat",
                    onPress: async () => {
                      i && await navigator.clipboard.writeText(
                        JSON.stringify(i, null, 2)
                      );
                    },
                    children: "Copy Data"
                  }
                ),
                /* @__PURE__ */ e(F, { color: "primary", onPress: u, children: "Close" })
              ] })
            ] }) })
          }
        )
      ]
    }
  );
}
function or({
  id: t,
  type: s,
  label: o,
  icon: l,
  category: i
}) {
  const { addField: n } = J().actions, g = i === "static" || i === "structure", { attributes: m, listeners: S, setNodeRef: c, transform: p, isDragging: a } = ct({
    id: t,
    disabled: g
    // Disable dragging for coming soon items
  }), d = p ? {
    transform: `translate3d(${p.x}px, ${p.y}px, 0)`
  } : void 0, u = Te[l] || Te.Plus;
  return /* @__PURE__ */ e(
    "div",
    {
      ref: c,
      style: d,
      ...g ? {} : S,
      ...g ? {} : m,
      className: `${g ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"} ${a ? "opacity-50" : ""}`,
      children: /* @__PURE__ */ r(
        F,
        {
          size: "sm",
          radius: "sm",
          variant: "flat",
          className: `mb-1 w-full transition-colors relative ${g ? "bg-white" : "bg-white hover:bg-default-100 cursor-pointer"}`,
          onPress: () => {
            if (g)
              return;
            const h = C(s);
            n(h);
          },
          isDisabled: g,
          children: [
            /* @__PURE__ */ r("div", { className: "flex absolute left-1 sm:left-3 items-center justify-start text-start gap-1 sm:gap-1.5", children: [
              /* @__PURE__ */ e(u, { size: 14, className: "sm:w-4 sm:h-4" }),
              /* @__PURE__ */ e("span", { className: "text-xs font-body inline", children: o })
            ] }),
            g && /* @__PURE__ */ e("div", { className: "absolute bg-white right-1 top-1/2 transform -translate-y-1/2", children: /* @__PURE__ */ e(
              _,
              {
                size: "sm",
                color: "secondary",
                variant: "flat",
                className: "text-xs px-1 py-0 min-h-unit-5 h-5",
                children: "Soon"
              }
            ) })
          ]
        }
      )
    }
  );
}
function Le() {
  const [t, s] = $(""), o = Xt.filter(
    (i) => i.label.toLowerCase().includes(t.toLowerCase())
  ), l = Zt.map((i) => ({
    ...i,
    items: o.filter((n) => n.category === i.id)
  })).filter((i) => i.items.length > 0);
  return /* @__PURE__ */ r("div", { className: "w-full bg-background border-r border-divider h-full overflow-y-auto scrollbar-hide", children: [
    /* @__PURE__ */ r("div", { className: "p-1 sm:p-2 border-b border-divider", children: [
      /* @__PURE__ */ e("h2", { className: "text-xs sm:text-sm font-semibold mb-2 hidden sm:block", children: "Form Elements" }),
      /* @__PURE__ */ e("h2", { className: "text-xs font-semibold mb-2 sm:hidden", children: "Elements" }),
      /* @__PURE__ */ e(
        A,
        {
          radius: "sm",
          type: "text",
          placeholder: "Search...",
          value: t,
          onChange: (i) => s(i.target.value),
          size: "sm",
          className: "w-full text-xs"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "p-1 sm:p-2", children: /* @__PURE__ */ e(
      gt,
      {
        isCompact: !0,
        variant: "light",
        selectionMode: "multiple",
        defaultExpandedKeys: ["basic", "choices"],
        children: l.map((i) => /* @__PURE__ */ e(
          xt,
          {
            "aria-label": i.label,
            title: /* @__PURE__ */ r("div", { className: "flex items-center gap-1 sm:gap-2", children: [
              /* @__PURE__ */ e("span", { className: "text-xs sm:text-sm inline", children: i.label }),
              /* @__PURE__ */ e("span", { className: "text-xs sm:hidden", children: i.label.charAt(0) }),
              /* @__PURE__ */ r("span", { className: "text-xs text-default-500 inline", children: [
                "(",
                i.items.length,
                ")"
              ] })
            ] }),
            children: /* @__PURE__ */ e("div", { className: "space-y-1 sm:space-y-2 pb-2", children: i.items.map((n) => /* @__PURE__ */ e(
              or,
              {
                id: n.id,
                type: n.type,
                label: n.label,
                icon: n.icon,
                category: n.category
              },
              n.id
            )) })
          },
          i.id
        ))
      }
    ) })
  ] });
}
function ke() {
  const { state: t } = J(), { selectedFieldId: s, currentForm: o } = t, l = o.fields.find(
    (i) => i.id === s
  );
  return l ? /* @__PURE__ */ e("div", { className: "w-full bg-background border-l border-divider h-full overflow-y-auto", children: /* @__PURE__ */ r("div", { className: "p-2", children: [
    /* @__PURE__ */ e("h2", { className: "text-sm font-semibold mb-2", children: "Properties" }),
    /* @__PURE__ */ r(we, { "aria-label": "Properties", variant: "underlined", size: "sm", children: [
      /* @__PURE__ */ e(H, { title: "Basic", children: /* @__PURE__ */ e(ur, { field: l }) }, "basic"),
      /* @__PURE__ */ e(H, { title: "Layout", children: /* @__PURE__ */ e(hr, { field: l }) }, "layout"),
      /* @__PURE__ */ e(H, { title: "Custom", children: /* @__PURE__ */ e(br, { field: l }) }, "custom")
    ] })
  ] }) }) : /* @__PURE__ */ e("div", { className: "w-full bg-background border-l border-divider h-full mt-1 sm:mt-2 p-1 sm:p-2", children: /* @__PURE__ */ e(z, { radius: "sm", className: "py-4 sm:py-10", children: /* @__PURE__ */ r(T, { className: "text-center py-2 sm:py-4", children: [
    /* @__PURE__ */ e(se, { className: "text-lg sm:text-2xl text-default-400 mx-auto mb-1 sm:mb-2" }),
    /* @__PURE__ */ e("h3", { className: "text-xs font-semibold mb-1 hidden sm:block", children: "No Field Selected" }),
    /* @__PURE__ */ e("h3", { className: "text-xs font-semibold mb-1 sm:hidden", children: "Select Field" }),
    /* @__PURE__ */ e("p", { className: "text-default-600 text-xs hidden sm:block", children: "Select a field to edit properties" })
  ] }) }) });
}
function cr({ field: t }) {
  const { actions: s } = J(), o = (n) => {
    s.updateField(t.id, n);
  }, l = (n) => {
    s.updateFieldProperties(t.id, n);
  }, i = (n) => {
    s.updateFieldAdvanced(t.id, n);
  };
  return /* @__PURE__ */ r("div", { className: "space-y-2 pt-2", children: [
    /* @__PURE__ */ e(
      A,
      {
        label: "Label",
        value: t.label,
        onValueChange: (n) => o({ label: n }),
        size: "sm"
      },
      `label-${t.id}`
    ),
    /* @__PURE__ */ e(
      A,
      {
        label: "Field Name",
        placeholder: "e.g., first_name, email, age",
        value: t.name || "",
        onValueChange: (n) => o({ name: n }),
        size: "sm",
        description: "Used as the key in form submissions"
      },
      `name-${t.id}`
    ),
    t.type !== "section" && t.type !== "paragraph" && /* @__PURE__ */ e(
      A,
      {
        label: "Placeholder",
        value: t.placeholder || "",
        onValueChange: (n) => o({ placeholder: n }),
        size: "sm"
      },
      `placeholder-${t.id}`
    ),
    t.type !== "section" && t.type !== "paragraph" && /* @__PURE__ */ e(
      A,
      {
        label: "Description",
        placeholder: "e.g. We'll never share your email with anyone else.",
        value: t.properties?.description || "",
        onValueChange: (n) => l({ description: n }),
        size: "sm",
        description: "Helper text shown below the input field"
      },
      `description-${t.id}`
    ),
    (t.type === "text" || t.type === "email" || t.type === "password" || t.type === "number" || t.type === "phone" || t.type === "url" || t.type === "date" || t.type === "time" || t.type === "datetime" || t.type === "calendar" || t.type === "textarea" || t.type === "select" || t.type === "multiselect" || t.type === "autocomplete" || t.type === "search" || t.type === "file" || t.type === "rating" || t.type === "range" || t.type === "rich-text" || t.type === "number-format" || t.type === "pattern-format") && /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "Field State" }),
      /* @__PURE__ */ r("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.required,
            onValueChange: (n) => o({ required: n }),
            size: "sm",
            children: "Required"
          },
          `required-${t.id}`
        ),
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.advanced?.readOnly || !1,
            onValueChange: (n) => i({ readOnly: n }),
            size: "sm",
            children: "Read Only"
          },
          `readonly-${t.id}`
        ),
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.advanced?.disabled || !1,
            onValueChange: (n) => i({ disabled: n }),
            size: "sm",
            children: "Disabled"
          },
          `disabled-${t.id}`
        )
      ] })
    ] }),
    (t.type === "text" || t.type === "email" || t.type === "password" || t.type === "number" || t.type === "phone" || t.type === "url" || t.type === "date" || t.type === "time" || t.type === "datetime" || t.type === "calendar" || t.type === "textarea" || t.type === "select" || t.type === "multiselect" || t.type === "autocomplete" || t.type === "search" || t.type === "file" || t.type === "range") && /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "Appearance" }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ r(
          V,
          {
            label: "Color",
            selectedKeys: [t.properties?.colorVariant || "default"],
            onSelectionChange: (n) => {
              const g = Array.from(n)[0];
              l({ colorVariant: g });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "Default" }, "default"),
              /* @__PURE__ */ e(b, { children: "Primary" }, "primary"),
              /* @__PURE__ */ e(b, { children: "Secondary" }, "secondary"),
              /* @__PURE__ */ e(b, { children: "Success" }, "success"),
              /* @__PURE__ */ e(b, { children: "Warning" }, "warning"),
              /* @__PURE__ */ e(b, { children: "Danger" }, "danger")
            ]
          }
        ),
        /* @__PURE__ */ r(
          V,
          {
            label: "Size",
            selectedKeys: [t.properties?.size || "md"],
            onSelectionChange: (n) => {
              const g = Array.from(n)[0];
              l({ size: g });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "Small" }, "sm"),
              /* @__PURE__ */ e(b, { children: "Medium" }, "md"),
              /* @__PURE__ */ e(b, { children: "Large" }, "lg")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r(
        V,
        {
          label: "Border Radius",
          selectedKeys: [t.properties?.borderRadius || "md"],
          onSelectionChange: (n) => {
            const g = Array.from(n)[0];
            l({ borderRadius: g });
          },
          size: "sm",
          children: [
            /* @__PURE__ */ e(b, { children: "None" }, "none"),
            /* @__PURE__ */ e(b, { children: "Small" }, "sm"),
            /* @__PURE__ */ e(b, { children: "Medium" }, "md"),
            /* @__PURE__ */ e(b, { children: "Large" }, "lg"),
            /* @__PURE__ */ e(b, { children: "Full" }, "full")
          ]
        }
      )
    ] }),
    (t.type === "button" || t.type === "switch" || t.type === "checkbox" || t.type === "radio") && /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "Appearance" }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ r(
          V,
          {
            label: "Color",
            selectedKeys: [t.properties?.colorVariant || "default"],
            onSelectionChange: (n) => {
              const g = Array.from(n)[0];
              l({ colorVariant: g });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "Default" }, "default"),
              /* @__PURE__ */ e(b, { children: "Primary" }, "primary"),
              /* @__PURE__ */ e(b, { children: "Secondary" }, "secondary"),
              /* @__PURE__ */ e(b, { children: "Success" }, "success"),
              /* @__PURE__ */ e(b, { children: "Warning" }, "warning"),
              /* @__PURE__ */ e(b, { children: "Danger" }, "danger")
            ]
          }
        ),
        /* @__PURE__ */ r(
          V,
          {
            label: "Size",
            selectedKeys: [t.properties?.size || "md"],
            onSelectionChange: (n) => {
              const g = Array.from(n)[0];
              l({ size: g });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "Small" }, "sm"),
              /* @__PURE__ */ e(b, { children: "Medium" }, "md"),
              /* @__PURE__ */ e(b, { children: "Large" }, "lg")
            ]
          }
        )
      ] }),
      t.type === "button" && /* @__PURE__ */ r(
        V,
        {
          label: "Variant",
          selectedKeys: [t.properties?.variant || "solid"],
          onSelectionChange: (n) => {
            const g = Array.from(n)[0];
            l({ variant: g });
          },
          size: "sm",
          children: [
            /* @__PURE__ */ e(b, { children: "Solid" }, "solid"),
            /* @__PURE__ */ e(b, { children: "Bordered" }, "bordered"),
            /* @__PURE__ */ e(b, { children: "Light" }, "light"),
            /* @__PURE__ */ e(b, { children: "Flat" }, "flat"),
            /* @__PURE__ */ e(b, { children: "Faded" }, "faded"),
            /* @__PURE__ */ e(b, { children: "Shadow" }, "shadow"),
            /* @__PURE__ */ e(b, { children: "Ghost" }, "ghost")
          ]
        }
      )
    ] }),
    (t.type === "radio" || t.type === "checkbox" || t.type === "select" || t.type === "multiselect") && /* @__PURE__ */ e(gr, { field: t }),
    t.type === "textarea" && /* @__PURE__ */ e(
      A,
      {
        type: "number",
        label: "Rows",
        value: t.properties?.rows?.toString() || "4",
        onValueChange: (n) => l({ rows: parseInt(n) || 4 }),
        size: "sm"
      },
      `rows-${t.id}`
    ),
    t.type === "rating" && /* @__PURE__ */ e(
      A,
      {
        type: "number",
        label: "Max Rating",
        value: t.properties?.max?.toString() || "5",
        onValueChange: (n) => l({ max: parseInt(n) || 5 }),
        size: "sm"
      },
      `max-rating-${t.id}`
    ),
    t.type === "file" && /* @__PURE__ */ r(j, { children: [
      /* @__PURE__ */ e(
        A,
        {
          label: "File Types",
          placeholder: "e.g., .jpg,.png,.pdf",
          value: t.properties?.accept || "",
          onValueChange: (n) => l({ accept: n }),
          size: "sm"
        },
        `accept-${t.id}`
      ),
      /* @__PURE__ */ e(
        U,
        {
          isSelected: t.properties?.multiple || !1,
          onValueChange: (n) => l({ multiple: n }),
          size: "sm",
          children: "Multiple Files"
        },
        `multiple-${t.id}`
      )
    ] }),
    t.type === "number" && /* @__PURE__ */ r(j, { children: [
      /* @__PURE__ */ e(
        A,
        {
          type: "number",
          label: "Min Value",
          value: t.properties?.min?.toString() || "",
          onValueChange: (n) => l({ min: n ? parseFloat(n) : void 0 }),
          size: "sm"
        },
        `min-${t.id}`
      ),
      /* @__PURE__ */ e(
        A,
        {
          type: "number",
          label: "Max Value",
          value: t.properties?.max?.toString() || "",
          onValueChange: (n) => l({ max: n ? parseFloat(n) : void 0 }),
          size: "sm"
        },
        `max-${t.id}`
      )
    ] })
  ] });
}
function dr({ field: t }) {
  const { actions: s } = J(), [o, l] = $({ label: "", value: "" }), i = (m) => {
    s.updateField(t.id, { options: m });
  }, n = () => {
    if (o.label && o.value) {
      const m = t.options || [];
      i([...m, o]), l({ label: "", value: "" });
    }
  }, g = (m) => {
    const S = t.options || [];
    i(S.filter((c, p) => p !== m));
  };
  return /* @__PURE__ */ r("div", { className: "space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h4", { className: "text-xs font-medium", children: "Options" }),
      /* @__PURE__ */ e(_, { size: "sm", variant: "flat", children: t.options?.length || 0 })
    ] }),
    t.options?.map((m, S) => /* @__PURE__ */ r(
      "div",
      {
        className: "p-2 border border-default-200 rounded space-y-1",
        children: [
          /* @__PURE__ */ e(
            A,
            {
              size: "sm",
              placeholder: "Label",
              value: m.label,
              onValueChange: (c) => {
                const a = (t.options || []).map(
                  (d, u) => u === S ? { ...d, label: c } : d
                );
                i(a);
              }
            },
            `option-label-${S}-${t.id}`
          ),
          /* @__PURE__ */ r("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ e(
              A,
              {
                size: "sm",
                placeholder: "Value",
                value: m.value,
                onValueChange: (c) => {
                  const a = (t.options || []).map(
                    (d, u) => u === S ? { ...d, value: c } : d
                  );
                  i(a);
                },
                className: "flex-1"
              },
              `option-value-${S}-${t.id}`
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                color: "danger",
                variant: "flat",
                isIconOnly: !0,
                onPress: () => g(S),
                children: /* @__PURE__ */ e(Fe, { size: 12 })
              }
            )
          ] })
        ]
      },
      `option-${S}-${t.id}`
    )),
    /* @__PURE__ */ r("div", { className: "p-2 border border-dashed border-default-300 rounded space-y-1", children: [
      /* @__PURE__ */ e(
        A,
        {
          size: "sm",
          placeholder: "New option label",
          value: o.label,
          onValueChange: (m) => l({ ...o, label: m })
        },
        `new-option-label-${t.id}`
      ),
      /* @__PURE__ */ r("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ e(
          A,
          {
            size: "sm",
            placeholder: "Value",
            value: o.value,
            onValueChange: (m) => l({ ...o, value: m }),
            className: "flex-1"
          },
          `new-option-value-${t.id}`
        ),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            color: "primary",
            variant: "flat",
            isIconOnly: !0,
            onPress: n,
            isDisabled: !o.label || !o.value,
            children: /* @__PURE__ */ e(ae, { size: 12 })
          }
        )
      ] })
    ] })
  ] });
}
function pr({ field: t }) {
  const { actions: s } = J(), o = (i) => {
    s.updateField(t.id, i);
  }, l = (i) => {
    s.updateFieldProperties(t.id, i);
  };
  return /* @__PURE__ */ r("div", { className: "space-y-3 pt-2", children: [
    /* @__PURE__ */ r("h4", { className: "text-xs font-medium text-default-700 flex items-center gap-1", children: [
      /* @__PURE__ */ e(Pt, { size: 12 }),
      "Layout & Positioning"
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2", children: [
      /* @__PURE__ */ r(
        V,
        {
          label: "Column Span",
          selectedKeys: [
            t.layout?.columnSpan?.toString() || t.columnSpan?.toString() || "12"
          ],
          onSelectionChange: (i) => {
            const n = parseInt(Array.from(i)[0]);
            o({
              columnSpan: n,
              // For backward compatibility
              layout: {
                ...t.layout,
                columnSpan: n,
                gridClass: `col-span-${n}`
              }
            });
          },
          size: "sm",
          children: [
            /* @__PURE__ */ e(b, { children: "1 column (8.33%)" }, "1"),
            /* @__PURE__ */ e(b, { children: "2 columns (16.67%)" }, "2"),
            /* @__PURE__ */ e(b, { children: "3 columns (25%)" }, "3"),
            /* @__PURE__ */ e(b, { children: "4 columns (33.33%)" }, "4"),
            /* @__PURE__ */ e(b, { children: "5 columns (41.67%)" }, "5"),
            /* @__PURE__ */ e(b, { children: "6 columns (50%)" }, "6"),
            /* @__PURE__ */ e(b, { children: "7 columns (58.33%)" }, "7"),
            /* @__PURE__ */ e(b, { children: "8 columns (66.67%)" }, "8"),
            /* @__PURE__ */ e(b, { children: "9 columns (75%)" }, "9"),
            /* @__PURE__ */ e(b, { children: "10 columns (83.33%)" }, "10"),
            /* @__PURE__ */ e(b, { children: "11 columns (91.67%)" }, "11"),
            /* @__PURE__ */ e(b, { children: "12 columns (100%)" }, "12")
          ]
        }
      ),
      (t.type === "radio" || t.type === "checkbox") && /* @__PURE__ */ r(
        V,
        {
          label: "Options Layout",
          selectedKeys: [t.properties?.orientation || "vertical"],
          onSelectionChange: (i) => {
            const n = Array.from(i)[0];
            l({ orientation: n });
          },
          size: "sm",
          children: [
            /* @__PURE__ */ e(b, { children: "Vertical" }, "vertical"),
            /* @__PURE__ */ e(b, { children: "Horizontal" }, "horizontal")
          ]
        }
      ),
      (t.type === "radio" || t.type === "checkbox" || t.type === "switch" || t.type === "rating") && /* @__PURE__ */ r(
        V,
        {
          label: "Alignment",
          selectedKeys: [t.properties?.componentAlignment || "left"],
          onSelectionChange: (i) => {
            const n = Array.from(i)[0];
            l({ componentAlignment: n });
          },
          size: "sm",
          children: [
            /* @__PURE__ */ e(b, { children: "Left" }, "left"),
            /* @__PURE__ */ e(b, { children: "Center" }, "center"),
            /* @__PURE__ */ e(b, { children: "Right" }, "right")
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex justify-start", children: /* @__PURE__ */ e(
        U,
        {
          isSelected: t.properties?.startNewRow || !1,
          onValueChange: (i) => l({ startNewRow: i }),
          size: "sm",
          children: "Start New Row"
        }
      ) })
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600 text-start", children: "Spacing" }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ r(
          V,
          {
            label: "Margin Top",
            selectedKeys: [t.properties?.marginTop || "mt-0"],
            onSelectionChange: (i) => {
              const n = Array.from(i)[0];
              l({ marginTop: n });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "None (mt-0)" }, "mt-0"),
              /* @__PURE__ */ e(b, { children: "Small (mt-1)" }, "mt-1"),
              /* @__PURE__ */ e(b, { children: "Medium (mt-2)" }, "mt-2"),
              /* @__PURE__ */ e(b, { children: "Default (mt-4)" }, "mt-4"),
              /* @__PURE__ */ e(b, { children: "Large (mt-6)" }, "mt-6"),
              /* @__PURE__ */ e(b, { children: "Extra Large (mt-8)" }, "mt-8")
            ]
          }
        ),
        /* @__PURE__ */ r(
          V,
          {
            label: "Margin Bottom",
            selectedKeys: [t.properties?.marginBottom || "mb-0"],
            onSelectionChange: (i) => {
              const n = Array.from(i)[0];
              l({ marginBottom: n });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "None (mb-0)" }, "mb-0"),
              /* @__PURE__ */ e(b, { children: "Small (mb-1)" }, "mb-1"),
              /* @__PURE__ */ e(b, { children: "Medium (mb-2)" }, "mb-2"),
              /* @__PURE__ */ e(b, { children: "Default (mb-4)" }, "mb-4"),
              /* @__PURE__ */ e(b, { children: "Large (mb-6)" }, "mb-6"),
              /* @__PURE__ */ e(b, { children: "Extra Large (mb-8)" }, "mb-8")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ r(
          V,
          {
            label: "Outer Spacing",
            selectedKeys: [t.properties?.padding || "p-0"],
            onSelectionChange: (i) => {
              const n = Array.from(i)[0];
              l({ padding: n });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "None (p-0)" }, "p-0"),
              /* @__PURE__ */ e(b, { children: "Small (p-1)" }, "p-1"),
              /* @__PURE__ */ e(b, { children: "Medium (p-2)" }, "p-2"),
              /* @__PURE__ */ e(b, { children: "Default (p-4)" }, "p-4"),
              /* @__PURE__ */ e(b, { children: "Large (p-6)" }, "p-6"),
              /* @__PURE__ */ e(b, { children: "Extra Large (p-8)" }, "p-8")
            ]
          }
        ),
        !["select", "autocomplete", "radio", "checkbox", "switch", "date", "time", "file", "rating"].includes(t.type) && /* @__PURE__ */ r(
          V,
          {
            label: "Text Alignment",
            selectedKeys: [t.properties?.alignment || "text-left"],
            onSelectionChange: (i) => {
              const n = Array.from(i)[0];
              l({ alignment: n });
            },
            size: "sm",
            children: [
              /* @__PURE__ */ e(b, { children: "Left" }, "text-left"),
              /* @__PURE__ */ e(b, { children: "Center" }, "text-center"),
              /* @__PURE__ */ e(b, { children: "Right" }, "text-right")
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600 text-start", children: "Responsive" }),
      /* @__PURE__ */ r("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.properties?.hideOnMobile || !1,
            onValueChange: (i) => l({ hideOnMobile: i }),
            size: "sm",
            children: "Hide on Mobile"
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.properties?.hideOnTablet || !1,
            onValueChange: (i) => l({ hideOnTablet: i }),
            size: "sm",
            children: "Hide on Tablet"
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            isSelected: t.properties?.hideOnDesktop || !1,
            onValueChange: (i) => l({ hideOnDesktop: i }),
            size: "sm",
            children: "Hide on Desktop"
          }
        )
      ] })
    ] })
  ] });
}
function mr({ field: t }) {
  const { actions: s } = J(), [o, l] = $(""), [i, n] = $(""), g = (p) => {
    s.updateFieldCustom(t.id, p);
  }, m = (p) => {
    s.updateFieldProperties(t.id, p);
  }, S = () => {
    if (o && i) {
      const p = t.custom?.dataAttributes || {};
      g({
        dataAttributes: {
          ...p,
          [o]: i
        }
      }), l(""), n("");
    }
  }, c = (p) => {
    const d = { ...t.custom?.dataAttributes || {} };
    delete d[p], g({ dataAttributes: d });
  };
  return /* @__PURE__ */ r("div", { className: "space-y-4 py-4", children: [
    /* @__PURE__ */ r("div", { className: "space-y-2", children: [
      /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "HeroUI ClassNames" }),
      /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-default-500 font-medium", children: "Layout & Structure" }),
        /* @__PURE__ */ e(
          A,
          {
            label: "Base (Outer Container)",
            placeholder: "e.g. p-4 bg-gray-50 rounded-lg",
            value: t.properties?.classNames?.base || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  base: p
                }
              });
            },
            size: "sm",
            description: "Outer wrapper container"
          },
          `classnames-base-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Main Wrapper",
            placeholder: "e.g. flex flex-col gap-2",
            value: t.properties?.classNames?.mainWrapper || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  mainWrapper: p
                }
              });
            },
            size: "sm",
            description: "Main wrapper around input elements"
          },
          `classnames-mainwrapper-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Inner Wrapper",
            placeholder: "e.g. relative flex items-center",
            value: t.properties?.classNames?.innerWrapper || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  innerWrapper: p
                }
              });
            },
            size: "sm",
            description: "Inner wrapper around input field"
          },
          `classnames-innerwrapper-${t.id}`
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-default-500 font-medium", children: "Input Elements" }),
        /* @__PURE__ */ e(
          A,
          {
            label: "Input Wrapper",
            placeholder: "e.g. border border-red-500 shadow-lg",
            value: t.properties?.classNames?.inputWrapper || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  inputWrapper: p
                }
              });
            },
            size: "sm",
            description: "Input border, background, and styling"
          },
          `classnames-inputwrapper-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Input Field",
            placeholder: "e.g. text-lg font-bold text-blue-600",
            value: t.properties?.classNames?.input || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  input: p
                }
              });
            },
            size: "sm",
            description: "Text styling for input content"
          },
          `classnames-input-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Clear Button",
            placeholder: "e.g. text-gray-400 hover:text-red-500",
            value: t.properties?.classNames?.clearButton || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  clearButton: p
                }
              });
            },
            size: "sm",
            description: "Clear button styling"
          },
          `classnames-clearbutton-${t.id}`
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-default-500 font-medium", children: "Labels & Text" }),
        /* @__PURE__ */ e(
          A,
          {
            label: "Label",
            placeholder: "e.g. text-sm font-semibold text-purple-700",
            value: t.properties?.classNames?.label || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  label: p
                }
              });
            },
            size: "sm",
            description: "Field label styling"
          },
          `classnames-label-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Description/Helper",
            placeholder: "e.g. text-xs text-gray-500 italic",
            value: t.properties?.classNames?.description || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  description: p
                }
              });
            },
            size: "sm",
            description: "Help text styling"
          },
          `classnames-description-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Helper Wrapper",
            placeholder: "e.g. mt-1 flex justify-between",
            value: t.properties?.classNames?.helperWrapper || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  helperWrapper: p
                }
              });
            },
            size: "sm",
            description: "Wrapper for helper text and validation"
          },
          `classnames-helperwrapper-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            label: "Error Message",
            placeholder: "e.g. text-red-500 text-xs font-medium",
            value: t.properties?.classNames?.errorMessage || "",
            onValueChange: (p) => {
              const a = t.properties?.classNames || {};
              m({
                classNames: {
                  ...a,
                  errorMessage: p
                }
              });
            },
            size: "sm",
            description: "Error message styling"
          },
          `classnames-errormessage-${t.id}`
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "flex gap-2 pt-2 border-t border-divider", children: [
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            onPress: () => {
              m({ classNames: void 0 });
            },
            children: "Clear All"
          }
        ),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            color: "primary",
            onPress: () => {
              m({
                classNames: {
                  base: "p-4",
                  inputWrapper: "border-2 border-primary-300 hover:border-primary-500",
                  input: "text-primary-700 font-medium",
                  label: "text-primary-600 font-semibold",
                  description: "text-primary-400"
                }
              });
            },
            children: "Example Style"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "Data Attributes" }),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            onPress: () => {
              g({
                dataAttributes: {
                  ...t.custom?.dataAttributes,
                  "field-type": t.type,
                  "field-name": t.name || t.label.toLowerCase().replace(/\s+/g, "-")
                }
              });
            },
            children: "Add Defaults"
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          A,
          {
            placeholder: "e.g. analytics-event",
            value: o,
            onValueChange: l,
            size: "sm",
            className: "flex-1"
          },
          `new-data-key-${t.id}`
        ),
        /* @__PURE__ */ e(
          A,
          {
            placeholder: "e.g. form-submit",
            value: i,
            onValueChange: n,
            size: "sm",
            className: "flex-1"
          },
          `new-data-value-${t.id}`
        ),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            onPress: S,
            isIconOnly: !0,
            children: /* @__PURE__ */ e(ae, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "space-y-1", children: Object.entries(t.custom?.dataAttributes || {}).map(
        ([p, a]) => /* @__PURE__ */ r(
          "div",
          {
            className: "flex items-center justify-between bg-default-100 p-2 rounded text-xs",
            children: [
              /* @__PURE__ */ r("span", { children: [
                /* @__PURE__ */ r("strong", { children: [
                  p,
                  ":"
                ] }),
                " ",
                a
              ] }),
              /* @__PURE__ */ e(
                F,
                {
                  size: "sm",
                  variant: "light",
                  color: "danger",
                  onPress: () => c(p),
                  isIconOnly: !0,
                  children: /* @__PURE__ */ e(Fe, { className: "w-3 h-3" })
                }
              )
            ]
          },
          p
        )
      ) })
    ] }),
    /* @__PURE__ */ r("div", { className: "space-y-2 border-t border-divider pt-2", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e("h5", { className: "text-xs font-medium text-default-600", children: "Accessibility" }),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            onPress: () => {
              g({
                role: t.type === "button" ? "button" : t.type === "select" || t.type === "multiselect" ? "combobox" : t.type === "radio" ? "radiogroup" : t.type === "checkbox" ? "checkbox" : "textbox",
                tabIndex: 0
              });
            },
            children: "Add Defaults"
          }
        )
      ] }),
      /* @__PURE__ */ e(
        A,
        {
          label: "Tab Index",
          type: "number",
          value: t.custom?.tabIndex?.toString() || "",
          onValueChange: (p) => g({ tabIndex: parseInt(p) || void 0 }),
          size: "sm",
          placeholder: "0 for normal tab order, -1 to skip"
        },
        `tab-index-${t.id}`
      ),
      /* @__PURE__ */ e(
        A,
        {
          label: "ARIA Role",
          placeholder: "textbox, button, combobox, etc.",
          value: t.custom?.role || "",
          onValueChange: (p) => g({ role: p }),
          size: "sm",
          description: "Override the default ARIA role for this element"
        },
        `role-${t.id}`
      )
    ] })
  ] });
}
const ur = oe.memo(cr), hr = oe.memo(pr), br = oe.memo(mr), gr = oe.memo(dr);
function xr() {
  const { state: t, actions: s } = J(), { previewMode: o, currentForm: l } = t, [i, n] = $({ type: null, message: "" }), {
    isOpen: g,
    onOpen: m,
    onOpenChange: S
  } = X(), {
    isOpen: c,
    onOpen: p,
    onOpenChange: a
  } = X(), d = () => {
    s.setPreviewMode(!o);
  }, u = () => {
    lr(l);
  }, v = () => {
    m();
  }, h = (y) => {
    if (!y || typeof y != "object") return !1;
    if (y.metadata && y.fields) {
      if (!y.metadata.title || typeof y.metadata.title != "string" || !Array.isArray(y.fields)) return !1;
      for (const x of y.fields)
        if (!x.id || !x.type || !x.label) return !1;
      return !0;
    }
    if (y.title && y.fields) {
      if (typeof y.title != "string" || !Array.isArray(y.fields)) return !1;
      for (const x of y.fields)
        if (!x.id || !x.type || !x.label) return !1;
      return !0;
    }
    return !1;
  }, w = () => {
    n({ type: null, message: "" }), p();
  }, D = (y) => y.title && y.fields && !y.metadata ? y : {
    id: y.metadata?.id || y.id,
    title: y.metadata?.title || y.title,
    description: y.metadata?.description || y.description || "",
    fields: y.fields,
    settings: y.settings || {
      submitButtonText: "Submit",
      allowMultipleSubmissions: !0,
      requireAuth: !1,
      captchaEnabled: !1,
      theme: "auto"
    }
  }, L = (y) => {
    const x = new FileReader();
    x.onload = (E) => {
      try {
        const I = JSON.parse(E.target?.result);
        if (!h(I)) {
          n({
            type: "error",
            message: "Invalid form structure. Please ensure the JSON file contains a valid form configuration."
          });
          return;
        }
        const M = D(I);
        s.setForm(M), n({
          type: "success",
          message: `Successfully imported "${M.title}" with ${M.fields.length} field(s).`
        }), setTimeout(() => {
          a(), n({ type: null, message: "" });
        }, 2e3);
      } catch {
        n({
          type: "error",
          message: "Invalid JSON file. Please check the file format and try again."
        });
      }
    }, x.readAsText(y);
  };
  return /* @__PURE__ */ r(j, { children: [
    /* @__PURE__ */ r(yt, { className: "border-b border-divider", maxWidth: "full", children: [
      /* @__PURE__ */ e(Nt, { children: /* @__PURE__ */ e("h1", { className: "font-bold text-inherit text-sm sm:text-base", children: "Form Builder" }) }),
      /* @__PURE__ */ e(De, { className: "flex gap-2 sm:gap-4", justify: "center" }),
      /* @__PURE__ */ e(De, { justify: "end", children: /* @__PURE__ */ e(ft, { children: /* @__PURE__ */ r(ve, { radius: "sm", size: "sm", children: [
        /* @__PURE__ */ e(
          F,
          {
            variant: "flat",
            onPress: d,
            size: "sm",
            className: "hidden sm:flex",
            children: o ? "Edit Form" : "Preview Form"
          }
        ),
        /* @__PURE__ */ e(
          F,
          {
            variant: "flat",
            isIconOnly: !0,
            onPress: d,
            size: "sm",
            className: "sm:hidden",
            children: /* @__PURE__ */ e(It, { size: 16 })
          }
        ),
        /* @__PURE__ */ r(vt, { children: [
          /* @__PURE__ */ e(wt, { children: /* @__PURE__ */ e(F, { variant: "flat", isIconOnly: !0, size: "sm", children: /* @__PURE__ */ e(Rt, {}) }) }),
          /* @__PURE__ */ r(Ct, { children: [
            /* @__PURE__ */ e(
              ge,
              {
                startContent: /* @__PURE__ */ e(Ue, { size: 16 }),
                onPress: u,
                children: "Export Form JSON"
              },
              "export"
            ),
            /* @__PURE__ */ e(
              ge,
              {
                startContent: /* @__PURE__ */ e($t, { size: 16 }),
                onPress: v,
                children: "Preview JSON"
              },
              "preview-json"
            ),
            /* @__PURE__ */ e(
              ge,
              {
                startContent: /* @__PURE__ */ e(Y, { size: 16 }),
                onPress: w,
                children: "Import Form"
              },
              "import"
            )
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ e(
      yr,
      {
        isOpen: g,
        onOpenChange: S,
        form: l
      }
    ),
    /* @__PURE__ */ e(Z, { isOpen: c, onOpenChange: a, size: "2xl", children: /* @__PURE__ */ e(ee, { children: (y) => /* @__PURE__ */ r(j, { children: [
      /* @__PURE__ */ r(te, { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: "Import Form" }),
        /* @__PURE__ */ e("p", { className: "text-sm text-default-500", children: "Import a form configuration from JSON file or paste JSON directly" })
      ] }),
      /* @__PURE__ */ r(re, { children: [
        /* @__PURE__ */ e("div", { className: "space-y-4", children: /* @__PURE__ */ r("div", { className: "border-2 border-dashed border-default-300 rounded-lg p-6 text-center hover:border-default-400 transition-colors", children: [
          /* @__PURE__ */ e(Y, { className: "mx-auto text-default-400 mb-2", size: 32 }),
          /* @__PURE__ */ e("p", { className: "text-sm text-default-600 mb-2", children: "Click to upload or drag and drop" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-default-500", children: "JSON files only (.json)" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "file",
              accept: ".json",
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              onChange: (x) => {
                const E = x.target.files?.[0];
                E && L(E);
              }
            }
          )
        ] }) }),
        i.type && /* @__PURE__ */ e("div", { className: "mt-4", children: /* @__PURE__ */ r("div", { className: `flex items-center gap-2 p-3 rounded-lg ${i.type === "success" ? "bg-success-50 border border-success-200 text-success-700" : "bg-danger-50 border border-danger-200 text-danger-700"}`, children: [
          i.type === "success" ? /* @__PURE__ */ e(xe, { className: "w-4 h-4" }) : /* @__PURE__ */ e(Je, { className: "w-4 h-4" }),
          /* @__PURE__ */ e("span", { className: "text-sm", children: i.message })
        ] }) })
      ] }),
      /* @__PURE__ */ e(be, { children: /* @__PURE__ */ e(F, { variant: "flat", onPress: y, children: "Close" }) })
    ] }) }) })
  ] });
}
function yr({
  isOpen: t,
  onOpenChange: s,
  form: o
}) {
  const [l, i] = $(!1), [n, g] = $("formatted"), m = Ae(o), S = JSON.stringify(m, null, 2), c = JSON.stringify(m), p = () => {
    navigator.clipboard.writeText(S), i(!0), setTimeout(() => i(!1), 2e3);
  }, a = () => {
    const d = new Blob([S], { type: "application/json" }), u = URL.createObjectURL(d), v = document.createElement("a");
    v.href = u, v.download = `${o.title.replace(/\s+/g, "_")}_form_config.json`, document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(u);
  };
  return /* @__PURE__ */ e(
    Z,
    {
      isOpen: t,
      onOpenChange: s,
      size: "5xl",
      scrollBehavior: "inside",
      hideCloseButton: !0,
      children: /* @__PURE__ */ e(ee, { children: (d) => /* @__PURE__ */ r(j, { children: [
        /* @__PURE__ */ e(te, { className: "flex flex-col gap-1", children: /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: "Form JSON Configuration" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-default-500", children: "Use this JSON to render your form elsewhere" })
          ] }),
          /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                variant: "flat",
                startContent: l ? /* @__PURE__ */ e(le, { className: "w-4 h-4" }) : /* @__PURE__ */ e(Ce, { className: "w-4 h-4" }),
                onPress: p,
                children: l ? "Copied!" : "Copy"
              }
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                color: "primary",
                startContent: /* @__PURE__ */ e(Ue, { className: "w-4 h-4" }),
                onPress: a,
                children: "Download"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ e(re, { children: /* @__PURE__ */ r(
          we,
          {
            selectedKey: n,
            onSelectionChange: (u) => g(u),
            "aria-label": "JSON Format Options",
            children: [
              /* @__PURE__ */ e(H, { title: "Formatted", children: /* @__PURE__ */ r(z, { children: [
                /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ e("h4", { className: "text-md font-medium", children: "Formatted JSON" }),
                  /* @__PURE__ */ r("div", { className: "text-sm text-default-500", children: [
                    m.layout.totalFields,
                    " fields •",
                    " ",
                    m.layout.rows.length,
                    " rows"
                  ] })
                ] }) }),
                /* @__PURE__ */ e(T, { children: /* @__PURE__ */ e("pre", { className: "text-xs overflow-auto bg-default-50 p-4 rounded-lg max-h-96 font-mono", children: S }) })
              ] }) }, "formatted"),
              /* @__PURE__ */ e(H, { title: "Compact", children: /* @__PURE__ */ r(z, { children: [
                /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("h4", { className: "text-md font-medium", children: "Compact JSON" }) }),
                /* @__PURE__ */ e(T, { children: /* @__PURE__ */ e("pre", { className: "text-xs overflow-auto bg-default-50 p-4 rounded-lg max-h-96 font-mono break-all", children: c }) })
              ] }) }, "compact"),
              /* @__PURE__ */ e(H, { title: "Metadata", children: /* @__PURE__ */ r(z, { children: [
                /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("h4", { className: "text-md font-medium", children: "Form Information" }) }),
                /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Title" }),
                      /* @__PURE__ */ e("p", { className: "text-sm text-default-600", children: m.metadata.title })
                    ] }),
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Version" }),
                      /* @__PURE__ */ e("p", { className: "text-sm text-default-600", children: m.metadata.version })
                    ] }),
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Total Fields" }),
                      /* @__PURE__ */ e("p", { className: "text-sm text-default-600", children: m.layout.totalFields })
                    ] }),
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Required Fields" }),
                      /* @__PURE__ */ e("p", { className: "text-sm text-default-600", children: m.validation.requiredFields.length })
                    ] })
                  ] }),
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Description" }),
                    /* @__PURE__ */ e("p", { className: "text-sm text-default-600", children: m.metadata.description || "No description provided" })
                  ] }),
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Field Types" }),
                    /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2 mt-1", children: [
                      ...new Set(
                        m.fields.map((u) => u.type)
                      )
                    ].map((u) => /* @__PURE__ */ e(
                      "span",
                      {
                        className: "text-xs bg-default-100 text-default-700 px-2 py-1 rounded",
                        children: u
                      },
                      u
                    )) })
                  ] }),
                  /* @__PURE__ */ r("div", { children: [
                    /* @__PURE__ */ e("label", { className: "text-sm font-medium text-default-700", children: "Settings" }),
                    /* @__PURE__ */ e("div", { className: "bg-default-50 p-3 rounded-lg mt-1", children: /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("span", { className: "text-default-700", children: "Submit Button:" }),
                        /* @__PURE__ */ e("span", { className: "text-default-600 ml-2", children: m.settings.submitButtonText })
                      ] }),
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("span", { className: "text-default-700", children: "Theme:" }),
                        /* @__PURE__ */ e("span", { className: "text-default-600 ml-2", children: m.settings.theme })
                      ] }),
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("span", { className: "text-default-700", children: "Multiple Submissions:" }),
                        /* @__PURE__ */ e("span", { className: "text-default-600 ml-2", children: m.settings.allowMultipleSubmissions ? "Yes" : "No" })
                      ] }),
                      /* @__PURE__ */ r("div", { children: [
                        /* @__PURE__ */ e("span", { className: "text-default-700", children: "Captcha:" }),
                        /* @__PURE__ */ e("span", { className: "text-default-600 ml-2", children: m.settings.captchaEnabled ? "Enabled" : "Disabled" })
                      ] })
                    ] }) })
                  ] })
                ] }) })
              ] }) }, "metadata")
            ]
          }
        ) }),
        /* @__PURE__ */ e(be, { children: /* @__PURE__ */ e(F, { color: "default", variant: "light", onPress: d, children: "Close" }) })
      ] }) })
    }
  );
}
function Nr() {
  const [t, s] = $(""), [o, l] = $(null), [i, n] = $(""), [g, m] = $(null), [S, c] = $(!1), {
    isOpen: p,
    onOpen: a,
    onOpenChange: d
  } = X(), u = {
    metadata: {
      id: "sample-form-001",
      title: "Contact Information Form",
      description: "A simple contact form example",
      version: "1.0.0",
      createdAt: "2025-07-19T00:00:00.000Z",
      exportedAt: "2025-07-19T00:00:00.000Z",
      builderVersion: "1.0.0"
    },
    settings: {
      submitButtonText: "Submit Form",
      allowMultipleSubmissions: !0,
      requireAuth: !1,
      captchaEnabled: !1,
      theme: "auto"
    },
    layout: {
      rows: [
        {
          id: "row-0",
          fields: ["name-field", "email-field"],
          columns: 12
        },
        {
          id: "row-1",
          fields: ["message-field"],
          columns: 12
        }
      ],
      totalFields: 3
    },
    fields: [
      {
        id: "name-field",
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "Enter your full name",
        required: !0,
        properties: {
          width: "full",
          helpText: "Please enter your complete name"
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6"
        }
      },
      {
        id: "email-field",
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        required: !0,
        properties: {
          width: "full",
          helpText: "We'll use this to contact you"
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6"
        }
      },
      {
        id: "message-field",
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Enter your message here...",
        required: !1,
        properties: {
          width: "full",
          rows: 4,
          helpText: "Tell us how we can help you"
        },
        layout: {
          columnSpan: 12,
          rowId: "row-1",
          gridClass: "col-span-12"
        }
      }
    ],
    fieldMap: {
      "name-field": {
        id: "name-field",
        type: "text",
        label: "Full Name",
        name: "full_name",
        placeholder: "Enter your full name",
        required: !0,
        properties: {
          width: "full",
          helpText: "Please enter your complete name"
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6"
        }
      },
      "email-field": {
        id: "email-field",
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        required: !0,
        properties: {
          width: "full",
          helpText: "We'll use this to contact you"
        },
        layout: {
          columnSpan: 6,
          rowId: "row-0",
          gridClass: "col-span-6"
        }
      },
      "message-field": {
        id: "message-field",
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "Enter your message here...",
        required: !1,
        properties: {
          width: "full",
          rows: 4,
          helpText: "Tell us how we can help you"
        },
        layout: {
          columnSpan: 12,
          rowId: "row-1",
          gridClass: "col-span-12"
        }
      }
    },
    validation: {
      requiredFields: ["name-field", "email-field"],
      fieldsWithValidation: ["email-field"]
    }
  }, v = () => {
    try {
      n("");
      const x = JSON.parse(t);
      if (!x.metadata || !x.settings || !x.layout || !x.fields || !x.fieldMap)
        throw new Error(
          "Invalid form JSON structure. Missing required properties."
        );
      l(x);
    } catch (x) {
      n(
        x instanceof Error ? x.message : "Invalid JSON format. Please check your syntax."
      ), l(null);
    }
  }, h = () => {
    s(JSON.stringify(u, null, 2)), l(u), n("");
  }, w = async () => {
    await navigator.clipboard.writeText(JSON.stringify(u, null, 2)), c(!0), setTimeout(() => c(!1), 2e3);
  }, D = (x) => {
    m(x), a();
  };
  return /* @__PURE__ */ e("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ r("div", { className: "mx-auto p-6", children: [
    /* @__PURE__ */ r("div", { className: "mb-8", children: [
      /* @__PURE__ */ e("h1", { className: "text-3xl font-bold mb-2", children: "JSON Form Renderer" }),
      /* @__PURE__ */ e("p", { className: "text-default-600", children: "Paste your form JSON configuration to render and test a live form" })
    ] }),
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row gap-6", children: [
      /* @__PURE__ */ r("div", { className: "basis-4/12", children: [
        /* @__PURE__ */ r(z, { radius: "sm", children: [
          /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("div", { className: "flex items-center justify-between w-full p-1", children: /* @__PURE__ */ r("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "file",
                accept: ".json",
                onChange: (x) => {
                  const E = x.target.files?.[0];
                  if (E && E.type === "application/json") {
                    const I = new FileReader();
                    I.onload = (M) => {
                      const B = M.target?.result;
                      s(B);
                      try {
                        const N = JSON.parse(B);
                        l(N), n("");
                      } catch {
                        n("Invalid JSON file format"), l(null);
                      }
                    }, I.readAsText(E);
                  }
                },
                className: "hidden",
                id: "json-file-upload"
              }
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                variant: "flat",
                startContent: /* @__PURE__ */ e(Y, { className: "w-4 h-4" }),
                onPress: () => document.getElementById("json-file-upload")?.click(),
                children: "Upload JSON"
              }
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                variant: "flat",
                startContent: S ? /* @__PURE__ */ e(le, { className: "w-4 h-4" }) : /* @__PURE__ */ e(Ce, { className: "w-4 h-4" }),
                onPress: w,
                children: S ? "Copied!" : "Sample"
              }
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                color: "secondary",
                onPress: h,
                children: "Load Sample"
              }
            ),
            /* @__PURE__ */ e(
              F,
              {
                size: "sm",
                color: "danger",
                variant: "flat",
                onPress: () => {
                  s(""), l(null), n(""), m(null);
                },
                children: "Clear"
              }
            )
          ] }) }) }),
          /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "p-1 ", children: [
            /* @__PURE__ */ e(
              he,
              {
                placeholder: "Paste your form JSON configuration here...",
                value: t,
                onChange: (x) => s(x.target.value),
                maxRows: 20,
                className: "font-mono text-sm",
                classNames: {
                  description: "h-96",
                  input: "resize-none"
                }
              }
            ),
            i && /* @__PURE__ */ r("div", { className: "flex items-start gap-2 text-danger text-sm bg-danger-50 p-3 rounded-lg", children: [
              /* @__PURE__ */ e(Je, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ e("strong", { children: "Parse Error:" }),
                " ",
                i
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "flex gap-2 mt-4", children: /* @__PURE__ */ e(
              F,
              {
                radius: "sm",
                color: "secondary",
                onPress: v,
                isDisabled: !t.trim(),
                className: "flex-1",
                children: "Parse & Render Form"
              }
            ) })
          ] }) })
        ] }),
        o && /* @__PURE__ */ r(z, { radius: "sm", className: "mt-5", children: [
          /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: "Form Information" }) }),
          /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-default-600", children: "Title:" }),
              /* @__PURE__ */ e("span", { className: "font-medium", children: o.metadata.title })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-default-600", children: "Fields:" }),
              /* @__PURE__ */ e("span", { className: "font-medium", children: o.fields.length })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-default-600", children: "Required Fields:" }),
              /* @__PURE__ */ e("span", { className: "font-medium", children: o.validation.requiredFields.length })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-default-600", children: "Version:" }),
              /* @__PURE__ */ e("span", { className: "font-medium", children: o.metadata.version })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "basis-8/12", children: o ? /* @__PURE__ */ e("div", { className: "", children: /* @__PURE__ */ e(
        Ze,
        {
          formConfig: o,
          onSubmit: D
        }
      ) }) : /* @__PURE__ */ r("div", { className: "text-center py-12 text-default-500", children: [
        /* @__PURE__ */ e(Lt, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ e("p", { className: "text-lg font-medium mb-2", children: "No Form Data" }),
        /* @__PURE__ */ e("p", { children: "Upload a JSON file, paste JSON data, or load a sample to preview the form" })
      ] }) })
    ] }),
    /* @__PURE__ */ e(
      Z,
      {
        isOpen: p,
        onOpenChange: d,
        size: "2xl",
        children: /* @__PURE__ */ e(ee, { children: (x) => /* @__PURE__ */ r(j, { children: [
          /* @__PURE__ */ e(te, { children: "Form Submission Result" }),
          /* @__PURE__ */ e(re, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-2 text-success", children: [
              /* @__PURE__ */ e(le, { className: "w-5 h-5" }),
              /* @__PURE__ */ e("span", { className: "font-medium", children: "Form submitted successfully!" })
            ] }),
            /* @__PURE__ */ e(ne, {}),
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("h4", { className: "font-semibold mb-2", children: "Submitted Data:" }),
              /* @__PURE__ */ e("div", { className: "bg-success-50 p-4 rounded-lg", children: /* @__PURE__ */ e("pre", { className: "text-sm overflow-auto whitespace-pre-wrap", children: JSON.stringify(g, null, 2) }) })
            ] }),
            /* @__PURE__ */ r("div", { className: "text-sm text-default-600", children: [
              /* @__PURE__ */ e("strong", { children: "Note:" }),
              " This is a demonstration. In a real application, this data would be sent to your server or API endpoint."
            ] })
          ] }) }),
          /* @__PURE__ */ r(be, { children: [
            /* @__PURE__ */ e(
              F,
              {
                color: "default",
                variant: "flat",
                onPress: async () => {
                  g && await navigator.clipboard.writeText(
                    JSON.stringify(g, null, 2)
                  );
                },
                children: "Copy Data"
              }
            ),
            /* @__PURE__ */ e(F, { color: "primary", onPress: x, children: "Close" })
          ] })
        ] }) })
      }
    )
  ] }) });
}
const fr = () => {
  const t = [
    {
      icon: /* @__PURE__ */ e(Mt, { className: "w-5 h-5" }),
      title: "Unified Field Alignment",
      description: "Radio, checkbox, switch, and rating fields now have consistent label and component alignment controls.",
      status: "released"
    },
    {
      icon: /* @__PURE__ */ e(ue, { className: "w-5 h-5" }),
      title: "Auto-Generated Field Names",
      description: "Fields without custom names automatically get unique identifiers (e.g., text_input, text_input2).",
      status: "released"
    },
    {
      icon: /* @__PURE__ */ e(ye, { className: "w-5 h-5" }),
      title: "Autocomplete Field Support",
      description: "Full HeroUI Autocomplete field with searchable dropdown options and validation.",
      status: "released"
    },
    {
      icon: /* @__PURE__ */ e(Y, { className: "w-5 h-5" }),
      title: "Form Import/Export System",
      description: "Complete JSON import/export functionality with validation and format conversion for seamless form portability.",
      status: "released"
    }
  ], s = [
    "Cleaner Properties Panel with context-aware controls",
    "Hidden text alignment for field types that don't need it",
    "Better drag-and-drop experience with disabled state handling",
    "Enhanced form export with auto-naming logic",
    "Form import functionality with format validation",
    "Improved accessibility and user experience"
  ], o = [
    {
      title: "Static Content Elements",
      description: "Rich text, images, dividers, and spacers",
      eta: "Next Release"
    },
    {
      title: "Advanced Layout Controls",
      description: "Sections, tabs, and multi-step wizards",
      eta: "Q2 2024"
    },
    {
      title: "Conditional Logic",
      description: "Show/hide fields based on other field values",
      eta: "Q2 2024"
    },
    {
      title: "Custom Validation Rules",
      description: "Advanced validation with custom error messages",
      eta: "Q3 2024"
    }
  ];
  return /* @__PURE__ */ r("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ r("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ e("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ e(
        _,
        {
          color: "primary",
          variant: "flat",
          startContent: /* @__PURE__ */ e(kt, { className: "w-4 h-4" }),
          size: "lg",
          children: "Version 1.1 - New Features"
        }
      ) }),
      /* @__PURE__ */ e("h1", { className: "text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-5", children: "🎉 Major Updates Available!" }),
      /* @__PURE__ */ e("p", { className: "text-xl text-default-600 max-w-3xl mx-auto mb-8", children: "We've been working hard to bring you exciting new features, improvements, and a better overall experience. Here's everything new in React Form Builder!" }),
      /* @__PURE__ */ e("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: /* @__PURE__ */ e(z, { className: "bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200", children: /* @__PURE__ */ e(T, { className: "text-center py-4", children: /* @__PURE__ */ r("div", { className: "flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ e(me, { className: "w-6 h-6 text-primary-600" }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("p", { className: "font-semibold text-primary-700", children: "Try Live Demo" }),
          /* @__PURE__ */ e(
            "a",
            {
              href: "https://react-form-builder.flowcsolutions.com/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary-600 hover:text-primary-800 underline text-sm",
              children: "react-form-builder.flowcsolutions.com"
            }
          )
        ] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ e(z, { className: "mb-8", children: /* @__PURE__ */ r(T, { children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-medium", children: "Release Progress" }),
        /* @__PURE__ */ e("span", { className: "text-sm text-default-600", children: "4/4 Features Completed" })
      ] }),
      /* @__PURE__ */ e(Ft, { value: 100, color: "success", className: "mb-2" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-default-600", children: "All planned features for v1.1 have been successfully implemented!" })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "mb-12", children: [
      /* @__PURE__ */ r("h2", { className: "text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ e(me, { className: "w-8 h-8 text-primary-500" }),
        "New Features & Enhancements"
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: t.map((l, i) => /* @__PURE__ */ r(z, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ e(R, { className: "pb-2", children: /* @__PURE__ */ r("div", { className: "flex items-center gap-x-3 justify-between", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-primary-50 text-primary-500", children: l.icon }),
            /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: l.title })
          ] }),
          /* @__PURE__ */ e(
            _,
            {
              color: "success",
              variant: "flat",
              size: "sm",
              startContent: /* @__PURE__ */ e(xe, { className: "w-3 h-3" }),
              children: "Released"
            }
          )
        ] }) }),
        /* @__PURE__ */ e(T, { className: "pt-0", children: /* @__PURE__ */ e("p", { className: "text-default-600", children: l.description }) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-12", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(ue, { className: "w-6 h-6 text-warning-500" }),
        "Quality Improvements"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ e("div", { className: "space-y-3", children: s.map((l, i) => /* @__PURE__ */ r("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ e(xe, { className: "w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ e("span", { className: "text-default-700", children: l })
      ] }, i)) }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "mb-12", children: [
      /* @__PURE__ */ r("h2", { className: "text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ e(Vt, { className: "w-8 h-8 text-secondary-500" }),
        "What's Coming Next"
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: o.map((l, i) => /* @__PURE__ */ r(z, { className: "border-dashed border-2 border-default-200", children: [
        /* @__PURE__ */ e(R, { className: "pb-2", children: /* @__PURE__ */ r("div", { className: "flex items-center gap-x-3 justify-between", children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: l.title }),
          /* @__PURE__ */ e(_, { color: "secondary", variant: "flat", size: "sm", children: l.eta })
        ] }) }),
        /* @__PURE__ */ e(T, { className: "pt-0", children: /* @__PURE__ */ e("p", { className: "text-default-600", children: l.description }) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-12", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ e("h2", { className: "text-2xl font-bold flex items-center gap-2", children: "📋 Version 1.1 Changelog" }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h4", { className: "font-semibold text-primary-600 mb-2", children: "🆕 New Features" }),
          /* @__PURE__ */ r("ul", { className: "space-y-2 text-sm text-default-600 ml-4", children: [
            /* @__PURE__ */ e("li", { children: "• Added Autocomplete field type with HeroUI integration" }),
            /* @__PURE__ */ e("li", { children: "• Implemented auto-generated field naming system" }),
            /* @__PURE__ */ e("li", { children: "• Added unified alignment controls for radio, checkbox, switch, and rating fields" }),
            /* @__PURE__ */ e("li", { children: "• Built comprehensive form import/export system with validation" })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h4", { className: "font-semibold text-warning-600 mb-2", children: "🛠️ Improvements" }),
          /* @__PURE__ */ r("ul", { className: "space-y-2 text-sm text-default-600 ml-4", children: [
            /* @__PURE__ */ e("li", { children: "• Enhanced Properties Panel with context-aware controls" }),
            /* @__PURE__ */ e("li", { children: "• Hidden text alignment for irrelevant field types" }),
            /* @__PURE__ */ e("li", { children: "• Improved drag-and-drop experience with disabled states" }),
            /* @__PURE__ */ e("li", { children: "• Better form export logic with intelligent naming" }),
            /* @__PURE__ */ e("li", { children: "• Added form import functionality with validation and format conversion" }),
            /* @__PURE__ */ e("li", { children: "• Enhanced accessibility and user experience" })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h4", { className: "font-semibold text-success-600 mb-2", children: "🐛 Bug Fixes" }),
          /* @__PURE__ */ r("ul", { className: "space-y-2 text-sm text-default-600 ml-4", children: [
            /* @__PURE__ */ e("li", { children: "• Fixed alignment inconsistencies across different field types" }),
            /* @__PURE__ */ e("li", { children: "• Resolved field naming conflicts in form exports" }),
            /* @__PURE__ */ e("li", { children: "• Improved error handling for invalid field configurations" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ e(We, { y: 8 }),
    /* @__PURE__ */ e("div", { className: "text-center text-sm text-default-500", children: /* @__PURE__ */ e("p", { children: "React Form Builder v1.1 • Built with ❤️ by FlowC Solutions" }) })
  ] });
}, vr = () => {
  const t = [
    {
      icon: /* @__PURE__ */ e(ue, { className: "w-5 h-5" }),
      title: "Drag & Drop Interface",
      description: "Intuitive form building with drag-and-drop functionality"
    },
    {
      icon: /* @__PURE__ */ e(Wt, { className: "w-5 h-5" }),
      title: "HeroUI Components",
      description: "Beautiful, accessible components with modern design"
    },
    {
      icon: /* @__PURE__ */ e(Re, { className: "w-5 h-5" }),
      title: "TypeScript Support",
      description: "Full type safety and excellent developer experience"
    },
    {
      icon: /* @__PURE__ */ e(se, { className: "w-5 h-5" }),
      title: "Responsive Design",
      description: "Mobile-first design that works on all devices"
    },
    {
      icon: /* @__PURE__ */ e(Y, { className: "w-5 h-5" }),
      title: "Advanced Import/Export",
      description: "Complete JSON import/export system with validation and format conversion"
    },
    {
      icon: /* @__PURE__ */ e(Pe, { className: "w-5 h-5" }),
      title: "Extensive Field Types",
      description: "17+ field types including advanced components"
    }
  ], s = [
    "Text Input",
    "Email",
    "Password",
    "Number",
    "Date",
    "Time",
    "Textarea",
    "Select",
    "Autocomplete",
    "Multi-select",
    "Radio",
    "Checkbox",
    "Switch",
    "File Upload",
    "Rating",
    "Phone"
  ];
  return /* @__PURE__ */ r("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ r("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ e("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ e(
        _,
        {
          color: "primary",
          variant: "flat",
          startContent: /* @__PURE__ */ e(He, { className: "w-4 h-4" }),
          size: "lg",
          children: "Documentation"
        }
      ) }),
      /* @__PURE__ */ e("h1", { className: "text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4", children: "📚 Complete Guide" }),
      /* @__PURE__ */ e("p", { className: "text-xl text-default-600 max-w-3xl mx-auto mb-8", children: "Everything you need to know about React Form Builder - installation, usage, customization, and more." })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(me, { className: "w-6 h-6 text-primary-500" }),
        "Quick Start"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-6", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Installation" }),
          /* @__PURE__ */ r("div", { className: "space-y-4", children: [
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-sm text-default-600 mb-2", children: "Install the package and required dependencies:" }),
              /* @__PURE__ */ e(
                G,
                {
                  symbol: "",
                  variant: "bordered",
                  color: "default",
                  className: "w-full",
                  classNames: {
                    base: "w-full",
                    pre: "whitespace-pre-wrap break-all"
                  },
                  children: "npm install @flowcsolutions/react-form-builder react react-dom @heroui/react framer-motion lucide-react uuid"
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-sm text-default-600 mb-2", children: "Install TailwindCSS (required for styling):" }),
              /* @__PURE__ */ e(
                G,
                {
                  symbol: "",
                  variant: "bordered",
                  color: "default",
                  className: "w-full",
                  classNames: {
                    base: "w-full",
                    pre: "whitespace-pre-wrap break-all"
                  },
                  children: "npm install -D tailwindcss @tailwindcss/vite"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Required Dependencies" }),
          /* @__PURE__ */ r("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ r(z, { className: "bg-primary-50 border-primary-200", children: [
              /* @__PURE__ */ e(R, { className: "pb-2", children: /* @__PURE__ */ e("h4", { className: "font-medium text-sm text-primary-700", children: "Core Dependencies" }) }),
              /* @__PURE__ */ e(T, { className: "pt-0", children: /* @__PURE__ */ r("ul", { className: "text-sm text-default-600 space-y-1", children: [
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "react" }),
                  " (^18.0.0 || ^19.0.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "react-dom" }),
                  " (^18.0.0 || ^19.0.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "@heroui/react" }),
                  " (^2.8.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "framer-motion" }),
                  " (^12.0.0)"
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ r(z, { className: "bg-secondary-50 border-secondary-200", children: [
              /* @__PURE__ */ e(R, { className: "pb-2", children: /* @__PURE__ */ e("h4", { className: "font-medium text-sm text-secondary-700", children: "Additional Dependencies" }) }),
              /* @__PURE__ */ e(T, { className: "pt-0", children: /* @__PURE__ */ r("ul", { className: "text-sm text-default-600 space-y-1", children: [
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "lucide-react" }),
                  " (^0.400.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "uuid" }),
                  " (^11.0.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "tailwindcss" }),
                  " (^4.0.0)"
                ] }),
                /* @__PURE__ */ r("li", { children: [
                  "• ",
                  /* @__PURE__ */ e(k, { size: "sm", children: "@tailwindcss/vite" }),
                  " (^4.0.0)"
                ] })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Basic Usage" }),
          /* @__PURE__ */ e(
            G,
            {
              symbol: "",
              variant: "bordered",
              color: "default",
              className: "w-full",
              classNames: {
                base: "w-full",
                pre: "whitespace-pre-wrap"
              },
              children: `import { ReactFormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

function App() {
  return <ReactFormBuilderSuite />;
}`
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "mb-12", children: [
      /* @__PURE__ */ r("h2", { className: "text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ e(ue, { className: "w-8 h-8 text-primary-500" }),
        "Key Features"
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: t.map((o, l) => /* @__PURE__ */ r(z, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ e(R, { className: "pb-2", children: /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-primary-50 text-primary-500", children: o.icon }),
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: o.title })
        ] }) }),
        /* @__PURE__ */ e(T, { className: "pt-0", children: /* @__PURE__ */ e("p", { className: "text-default-600", children: o.description }) })
      ] }, l)) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(se, { className: "w-6 h-6 text-secondary-500" }),
        "Supported Field Types"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: s.map((o) => /* @__PURE__ */ e(
        _,
        {
          variant: "flat",
          color: "secondary",
          size: "sm",
          children: o
        },
        o
      )) }) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(Pe, { className: "w-6 h-6 text-warning-500" }),
        "Advanced Usage"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-6", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Custom Form Renderer" }),
          /* @__PURE__ */ e(
            G,
            {
              symbol: "",
              variant: "bordered",
              color: "default",
              className: "w-full",
              classNames: {
                base: "w-full",
                pre: "whitespace-pre-wrap text-xs sm:text-sm"
              },
              children: `import { FormRenderer } from '@flowcsolutions/react-form-builder';

const MyForm = () => {
  const formConfig = {
    title: "Contact Form",
    fields: [
      {
        id: "1",
        type: "text",
        label: "Name",
        required: true
      }
    ]
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer 
      form={formConfig} 
      onSubmit={handleSubmit}
    />
  );
};`
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Custom Form Builder" }),
          /* @__PURE__ */ e(
            G,
            {
              symbol: "",
              variant: "bordered",
              color: "default",
              className: "w-full",
              classNames: {
                base: "w-full",
                pre: "whitespace-pre-wrap text-xs sm:text-sm"
              },
              children: `import { 
  FormBuilderProvider, 
  FormBuilder 
} from '@flowcsolutions/react-form-builder';

const MyFormBuilder = () => {
  return (
    <FormBuilderProvider>
      <FormBuilder 
        onFormChange={(form) => {
          console.log('Form updated:', form);
        }}
      />
    </FormBuilderProvider>
  );
};`
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(se, { className: "w-6 h-6 text-success-500" }),
        "Configuration"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Form Settings" }),
          /* @__PURE__ */ e(
            G,
            {
              symbol: "",
              variant: "flat",
              color: "default",
              className: "w-full",
              classNames: {
                base: "w-full",
                pre: "whitespace-pre-wrap text-xs sm:text-sm"
              },
              children: `{
  "submitButtonText": "Submit Form",
  "allowMultipleSubmissions": true,
  "requireAuth": false,
  "captchaEnabled": false,
  "theme": "auto"
}`
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Field Properties" }),
          /* @__PURE__ */ e(
            G,
            {
              symbol: "",
              variant: "flat",
              color: "default",
              className: "w-full",
              classNames: {
                base: "w-full",
                pre: "whitespace-pre-wrap text-xs sm:text-sm"
              },
              children: `{
  "label": "Field Label",
  "placeholder": "Enter value...",
  "required": true,
  "properties": {
    "size": "md",
    "colorVariant": "primary",
    "borderRadius": "md",
    "width": "full"
  }
}`
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(jt, { className: "w-6 h-6 text-danger-500" }),
        "API Reference"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Available Components" }),
          /* @__PURE__ */ r("ul", { className: "list-disc list-inside space-y-1 text-default-600", children: [
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "ReactFormBuilderSuite" }),
              " - Complete form builder with preview"
            ] }),
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "FormBuilder" }),
              " - Form builder interface only"
            ] }),
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "FormRenderer" }),
              " - Render forms from JSON configuration"
            ] }),
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "FormBuilderProvider" }),
              " - Context provider for state management"
            ] }),
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "FieldSidebar" }),
              " - Draggable field components panel"
            ] }),
            /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ e(k, { children: "PropertiesPanel" }),
              " - Field properties editor"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Props" }),
          /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-default-200", children: [
              /* @__PURE__ */ e("th", { className: "text-left p-2", children: "Component" }),
              /* @__PURE__ */ e("th", { className: "text-left p-2", children: "Prop" }),
              /* @__PURE__ */ e("th", { className: "text-left p-2", children: "Type" }),
              /* @__PURE__ */ e("th", { className: "text-left p-2", children: "Description" })
            ] }) }),
            /* @__PURE__ */ r("tbody", { className: "text-default-600", children: [
              /* @__PURE__ */ r("tr", { className: "border-b border-default-100", children: [
                /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(k, { children: "FormRenderer" }) }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "form" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "FormConfig" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "Form configuration object" })
              ] }),
              /* @__PURE__ */ r("tr", { className: "border-b border-default-100", children: [
                /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(k, { children: "FormRenderer" }) }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "onSubmit" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "Function" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "Form submission handler" })
              ] }),
              /* @__PURE__ */ r("tr", { className: "border-b border-default-100", children: [
                /* @__PURE__ */ e("td", { className: "p-2", children: /* @__PURE__ */ e(k, { children: "FormBuilder" }) }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "onFormChange" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "Function" }),
                /* @__PURE__ */ e("td", { className: "p-2", children: "Form change handler" })
              ] })
            ] })
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(Bt, { className: "w-6 h-6 text-primary-500" }),
        "Contributing"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e("p", { className: "text-default-600", children: "We welcome contributions! Please feel free to submit a Pull Request." }),
        /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ r(
            F,
            {
              color: "primary",
              variant: "flat",
              startContent: /* @__PURE__ */ e(_t, { className: "w-4 h-4" }),
              as: ze,
              href: "https://github.com/zenpou21/react-form-builder",
              isExternal: !0,
              children: [
                "View on GitHub",
                /* @__PURE__ */ e(Ie, { className: "w-3 h-3 ml-1" })
              ]
            }
          ),
          /* @__PURE__ */ r(
            F,
            {
              color: "secondary",
              variant: "flat",
              startContent: /* @__PURE__ */ e(Ke, { className: "w-4 h-4" }),
              as: ze,
              href: "https://www.npmjs.com/package/@flowcsolutions/react-form-builder",
              isExternal: !0,
              children: [
                "View on NPM",
                /* @__PURE__ */ e(Ie, { className: "w-3 h-3 ml-1" })
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ r(z, { className: "mb-8", children: [
      /* @__PURE__ */ e(R, { children: /* @__PURE__ */ r("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ e(Re, { className: "w-6 h-6 text-success-500" }),
        "License"
      ] }) }),
      /* @__PURE__ */ e(T, { children: /* @__PURE__ */ e("p", { className: "text-default-600", children: "This project is licensed under the MIT License - see the LICENSE file for details." }) })
    ] }),
    /* @__PURE__ */ e(We, { y: 8 }),
    /* @__PURE__ */ e("div", { className: "text-center text-sm text-default-500", children: /* @__PURE__ */ e("p", { children: "React Form Builder v1.1.4 • Built with ❤️ by FlowC Solutions" }) })
  ] });
}, wr = () => /* @__PURE__ */ e("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ r(
  we,
  {
    color: "secondary",
    defaultSelectedKey: "announcements",
    className: "w-full text-white",
    classNames: {
      base: "w-full",
      tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider bg-background",
      cursor: "w-full !text-white",
      tab: "max-w-fit px-6 h-12 text-medium text-white"
    },
    children: [
      /* @__PURE__ */ e(
        H,
        {
          title: /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(me, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { children: "What's New" })
          ] }),
          children: /* @__PURE__ */ e(fr, {})
        },
        "announcements"
      ),
      /* @__PURE__ */ e(
        H,
        {
          title: /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(He, { className: "w-4 h-4" }),
            /* @__PURE__ */ e("span", { children: "Documentation" })
          ] }),
          children: /* @__PURE__ */ e(vr, {})
        },
        "documentation"
      )
    ]
  }
) });
function Cr({
  mode: t,
  setMode: s
}) {
  return /* @__PURE__ */ e("div", { className: "p-4 border-b border-divider bg-background", children: /* @__PURE__ */ r("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ e("h1", { className: "text-xl sm:text-2xl font-bold mb-2", children: "Form Builder Suite" }),
    /* @__PURE__ */ e("div", { className: "hidden sm:block", children: /* @__PURE__ */ r(ve, { className: "", radius: "sm", children: [
      /* @__PURE__ */ e(
        F,
        {
          variant: t === "builder" ? "solid" : "flat",
          color: t === "builder" ? "secondary" : "default",
          onPress: () => s("builder"),
          children: "Form Builder"
        }
      ),
      /* @__PURE__ */ e(
        F,
        {
          variant: t === "renderer" ? "solid" : "flat",
          color: t === "renderer" ? "secondary" : "default",
          onPress: () => s("renderer"),
          children: "JSON Renderer"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: t === "announcement" ? "solid" : "flat",
          color: t === "announcement" ? "secondary" : "default",
          onPress: () => s("announcement"),
          startContent: /* @__PURE__ */ e(ye, { className: "w-4 h-4 sparkle-animation text-warning-500" }),
          children: [
            "What's New",
            " ",
            /* @__PURE__ */ e(
              _,
              {
                size: "sm",
                color: "success",
                variant: "solid",
                className: "ml-2 text-white",
                children: "v1.1"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ e("div", { className: "block sm:hidden", children: /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          F,
          {
            variant: t === "builder" ? "solid" : "flat",
            color: t === "builder" ? "secondary" : "default",
            onPress: () => s("builder"),
            className: "flex-1",
            size: "sm",
            children: "Builder"
          }
        ),
        /* @__PURE__ */ e(
          F,
          {
            variant: t === "renderer" ? "solid" : "flat",
            color: t === "renderer" ? "secondary" : "default",
            onPress: () => s("renderer"),
            className: "flex-1",
            size: "sm",
            children: "Renderer"
          }
        )
      ] }),
      /* @__PURE__ */ r(
        F,
        {
          variant: t === "announcement" ? "solid" : "flat",
          color: t === "announcement" ? "secondary" : "default",
          onPress: () => s("announcement"),
          startContent: /* @__PURE__ */ e(ye, { className: "w-3 h-3 sparkle-animation text-warning-500" }),
          className: "w-full",
          size: "sm",
          children: [
            "What's New",
            " ",
            /* @__PURE__ */ e(
              _,
              {
                size: "sm",
                color: "success",
                variant: "solid",
                className: "ml-1 text-white text-xs",
                children: "v1.1"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ r("div", { className: "mt-3 text-sm text-default-500", children: [
      t === "builder" && "Create and design forms with drag-and-drop interface",
      t === "renderer" && "Import JSON configurations and render live forms",
      t === "announcement" && "Discover new features and improvements in the latest version"
    ] })
  ] }) });
}
function Fr() {
  const { state: t, actions: s } = J(), { currentForm: o, previewMode: l } = t, {
    isOpen: i,
    onOpen: n,
    onOpenChange: g
  } = X(), {
    isOpen: m,
    onOpen: S,
    onOpenChange: c
  } = X();
  return /* @__PURE__ */ r(j, { children: [
    /* @__PURE__ */ r("div", { className: "h-[calc(100vh-120px)] font-sans flex flex-col bg-background", children: [
      /* @__PURE__ */ e(xr, {}),
      /* @__PURE__ */ e("div", { className: "flex flex-1 overflow-hidden", children: /* @__PURE__ */ r(dt, { onDragEnd: (d) => {
        const { active: u, over: v } = d;
        if (v) {
          if (v.id === "form-canvas" && typeof u.id == "string" && !u.id.includes("-")) {
            const h = u.id, w = C(h);
            s.addField(w);
            return;
          }
          if (u.id !== v.id) {
            const h = o.fields.findIndex(
              (D) => D.id === u.id
            ), w = o.fields.findIndex(
              (D) => D.id === v.id
            );
            h !== -1 && w !== -1 && s.reorderFields(h, w);
          }
        }
      }, onDragOver: (d) => {
      }, children: [
        !l && /* @__PURE__ */ e("div", { className: "hidden md:block md:w-1/4", children: /* @__PURE__ */ e(Le, {}) }),
        /* @__PURE__ */ e(
          "div",
          {
            className: `
              flex-1 overflow-auto scrollbar-hide
              ${l ? "w-full" : "w-full md:w-2/4"}
            `,
            children: /* @__PURE__ */ e(ir, {})
          }
        ),
        !l && /* @__PURE__ */ e("div", { className: "hidden md:block md:w-1/4", children: /* @__PURE__ */ e(ke, {}) })
      ] }) }),
      !l && /* @__PURE__ */ e("div", { className: "md:hidden border-t border-divider bg-background p-2", children: /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            className: "flex-1",
            startContent: /* @__PURE__ */ e(Ke, { size: 16 }),
            onPress: n,
            children: "Elements"
          }
        ),
        /* @__PURE__ */ e(
          F,
          {
            size: "sm",
            variant: "flat",
            className: "flex-1",
            startContent: /* @__PURE__ */ e(se, { size: 16 }),
            onPress: S,
            children: "Properties"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ e(
      Z,
      {
        isOpen: i,
        onOpenChange: g,
        size: "full",
        placement: "bottom",
        classNames: {
          base: "md:hidden",
          backdrop: "md:hidden"
        },
        children: /* @__PURE__ */ e(ee, { children: () => /* @__PURE__ */ r(j, { children: [
          /* @__PURE__ */ r(te, { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: "Form Elements" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-default-500", children: "Drag or tap to add elements to your form" })
          ] }),
          /* @__PURE__ */ e(re, { children: /* @__PURE__ */ e(Le, {}) })
        ] }) })
      }
    ),
    /* @__PURE__ */ e(
      Z,
      {
        isOpen: m,
        onOpenChange: c,
        size: "full",
        placement: "bottom",
        classNames: {
          base: "md:hidden",
          backdrop: "md:hidden"
        },
        children: /* @__PURE__ */ e(ee, { children: () => /* @__PURE__ */ r(j, { children: [
          /* @__PURE__ */ r(te, { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: "Field Properties" }),
            /* @__PURE__ */ e("p", { className: "text-sm text-default-500", children: t.selectedFieldId ? `Editing: ${o.fields.find(
              (d) => d.id === t.selectedFieldId
            )?.label || "Untitled Field"}` : "Select a field to edit properties" })
          ] }),
          /* @__PURE__ */ e(re, { children: /* @__PURE__ */ e(ke, {}) })
        ] }) })
      }
    )
  ] });
}
function Sr() {
  const [t, s] = $("builder");
  return /* @__PURE__ */ e(St, { children: /* @__PURE__ */ r("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ e(Cr, { mode: t, setMode: s }),
    t === "builder" && /* @__PURE__ */ e(Kt, { children: /* @__PURE__ */ e(Fr, {}) }),
    t === "renderer" && /* @__PURE__ */ e(Nr, {}),
    t === "announcement" && /* @__PURE__ */ e(wr, {})
  ] }) });
}
const Lr = Sr;
export {
  Xt as DRAG_ITEMS,
  Zt as FIELD_CATEGORIES,
  Rr as FIELD_TEMPLATES,
  Le as FieldSidebar,
  Kt as FormBuilderProvider,
  Lr as FormBuilderSuite,
  xr as FormBuilderToolbar,
  ir as FormCanvas,
  fe as FormFieldRenderer,
  Ze as FormRenderer,
  sr as FormRowRenderer,
  Nr as JsonFormRenderer,
  ke as PropertiesPanel,
  $e as SortableFormField,
  $r as buildFieldClasses,
  Ne as buildFieldWrapperClasses,
  Se as buildHeroUIClasses,
  C as createFormField,
  Ae as generateFormExportData,
  ie as getFieldSpan,
  ar as getGridClassName,
  Xe as groupFieldsIntoRows,
  J as useFormBuilder
};
//# sourceMappingURL=index.js.map
