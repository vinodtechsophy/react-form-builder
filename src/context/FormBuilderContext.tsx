import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FormConfig, FormField, FormSettings } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderState {
  currentForm: FormConfig;
  selectedFieldId: string | null;
  previewMode: boolean;
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

type FormBuilderAction =
  | { type: 'SET_FORM'; payload: FormConfig }
  | { type: 'ADD_FIELD'; payload: FormField }
  | { type: 'UPDATE_FIELD'; payload: { id: string; updates: Partial<FormField> } }
  | { type: 'DELETE_FIELD'; payload: string }
  | { type: 'REORDER_FIELDS'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'SELECT_FIELD'; payload: string | null }
  | { type: 'SET_PREVIEW_MODE'; payload: boolean }
  | { type: 'SET_DEVICE_VIEW'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'UPDATE_FORM_SETTINGS'; payload: Partial<FormSettings> }
  | { type: 'UPDATE_FORM_META'; payload: { title?: string; description?: string } };

const initialState: FormBuilderState = {
  currentForm: {
    id: uuidv4(),
    title: 'New Form',
    description: '',
    fields: [],
    settings: {
      submitButtonText: 'Submit',
      allowMultipleSubmissions: true,
      requireAuth: false,
      captchaEnabled: false,
      theme: 'auto'
    }
  },
  selectedFieldId: null,
  previewMode: false,
  deviceView: 'desktop'
};

function formBuilderReducer(state: FormBuilderState, action: FormBuilderAction): FormBuilderState {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        currentForm: action.payload,
        selectedFieldId: null
      };

    case 'ADD_FIELD':
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: [...state.currentForm.fields, action.payload]
        },
        selectedFieldId: action.payload.id
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.map(field =>
            field.id === action.payload.id
              ? { ...field, ...action.payload.updates }
              : field
          )
        }
      };

    case 'DELETE_FIELD':
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields: state.currentForm.fields.filter(field => field.id !== action.payload)
        },
        selectedFieldId: state.selectedFieldId === action.payload ? null : state.selectedFieldId
      };

    case 'REORDER_FIELDS':
      const fields = [...state.currentForm.fields];
      const [removed] = fields.splice(action.payload.oldIndex, 1);
      fields.splice(action.payload.newIndex, 0, removed);
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          fields
        }
      };

    case 'SELECT_FIELD':
      return {
        ...state,
        selectedFieldId: action.payload
      };

    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload,
        selectedFieldId: action.payload ? null : state.selectedFieldId
      };

    case 'SET_DEVICE_VIEW':
      return {
        ...state,
        deviceView: action.payload
      };

    case 'UPDATE_FORM_SETTINGS':
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          settings: {
            ...state.currentForm.settings,
            ...action.payload
          }
        }
      };

    case 'UPDATE_FORM_META':
      return {
        ...state,
        currentForm: {
          ...state.currentForm,
          title: action.payload.title ?? state.currentForm.title,
          description: action.payload.description ?? state.currentForm.description
        }
      };

    default:
      return state;
  }
}

interface FormBuilderContextType {
  state: FormBuilderState;
  dispatch: React.Dispatch<FormBuilderAction>;
  actions: {
    addField: (field: FormField) => void;
    updateField: (id: string, updates: Partial<FormField>) => void;
    deleteField: (id: string) => void;
    reorderFields: (oldIndex: number, newIndex: number) => void;
    selectField: (id: string | null) => void;
    setPreviewMode: (enabled: boolean) => void;
    setDeviceView: (view: 'desktop' | 'tablet' | 'mobile') => void;
    updateFormSettings: (settings: Partial<FormSettings>) => void;
    updateFormMeta: (meta: { title?: string; description?: string }) => void;
  };
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);

  const actions = {
    addField: (field: FormField) => dispatch({ type: 'ADD_FIELD', payload: field }),
    updateField: (id: string, updates: Partial<FormField>) => 
      dispatch({ type: 'UPDATE_FIELD', payload: { id, updates } }),
    deleteField: (id: string) => dispatch({ type: 'DELETE_FIELD', payload: id }),
    reorderFields: (oldIndex: number, newIndex: number) => 
      dispatch({ type: 'REORDER_FIELDS', payload: { oldIndex, newIndex } }),
    selectField: (id: string | null) => dispatch({ type: 'SELECT_FIELD', payload: id }),
    setPreviewMode: (enabled: boolean) => dispatch({ type: 'SET_PREVIEW_MODE', payload: enabled }),
    setDeviceView: (view: 'desktop' | 'tablet' | 'mobile') => 
      dispatch({ type: 'SET_DEVICE_VIEW', payload: view }),
    updateFormSettings: (settings: Partial<FormSettings>) => 
      dispatch({ type: 'UPDATE_FORM_SETTINGS', payload: settings }),
    updateFormMeta: (meta: { title?: string; description?: string }) => 
      dispatch({ type: 'UPDATE_FORM_META', payload: meta })
  };

  return (
    <FormBuilderContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
}
