import { default as default_2 } from 'react';
import { JSX } from 'react/jsx-runtime';
import { ReactNode } from 'react';

declare interface AdvancedProperties {
    valued?: boolean;
    valueType?: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
    dataBindingType?: 'none' | 'oneWay' | 'twoWay';
    uncontrolledValue?: any;
    calculable?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    validationRules?: string[];
    customValidators?: string[];
    asyncValidation?: boolean;
    deferFieldCalculation?: boolean;
    localizable?: boolean;
    localizationKey?: string;
    bindingTypes?: Record<string, 'none' | 'oneWay' | 'twoWay'>;
}

declare function App(): JSX.Element;

export declare function buildFieldClasses(field: FormField): string;

export declare function buildFieldWrapperClasses(field: FormField, isEditor?: boolean): string;

export declare function buildHeroUIClasses(field: FormField, isEditor?: boolean): {
    base: string;
    label: string;
    inputWrapper: string;
    innerWrapper: string;
    mainWrapper: string;
    input: string;
    clearButton: string;
    helperWrapper: string;
    description: string;
    errorMessage: string;
};

export declare interface ConditionalLogic {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
    action: 'show' | 'hide' | 'require';
}

/**
 * Creates a new form field with default properties
 */
export declare function createFormField(type: FormFieldType): FormField;

declare interface CustomProperties {
    cssClasses?: string[];
    customStyles?: Record<string, string>;
    wrapperCss?: Record<string, string>;
    dataAttributes?: Record<string, string>;
    ariaAttributes?: Record<string, string>;
    tabIndex?: number;
    role?: string;
    customProps?: Record<string, any>;
    componentConfig?: Record<string, any>;
    templateName?: string;
    presetConfig?: string;
}

/**
 * Drag items for the sidebar (most commonly used components)
 */
export declare const DRAG_ITEMS: DragItem[];

export declare interface DragItem {
    id: string;
    type: FormFieldType;
    label: string;
    icon: string;
    category: 'fields' | 'static' | 'structure' | 'templates' | 'error';
    description?: string;
    isPaidFeature?: boolean;
    tags?: string[];
}

declare interface EventProperties {
    onInit?: string;
    onLoad?: string;
    onSubmit?: string;
    onValidate?: string;
    onError?: string;
    onChange?: string;
    onFocus?: string;
    onBlur?: string;
    onClick?: string;
    onKeyPress?: string;
    onKeyDown?: string;
    onKeyUp?: string;
    customEvents?: Record<string, string>;
    debounceDelay?: number;
    throttleDelay?: number;
    preventDefaults?: string[];
    stopPropagation?: string[];
}

/**
 * Field categories for organizing the sidebar
 */
export declare const FIELD_CATEGORIES: {
    id: string;
    label: string;
    description: string;
}[];

/**
 * Field templates for the form builder
 */
export declare const FIELD_TEMPLATES: Record<FormFieldType, FormField>;

export declare interface FieldProperties {
    helpText?: string;
    description?: string;
    customClasses?: string;
    classNames?: Partial<Record<'base' | 'label' | 'inputWrapper' | 'innerWrapper' | 'mainWrapper' | 'input' | 'clearButton' | 'helperWrapper' | 'description' | 'errorMessage', string>>;
    width?: 'full' | 'half' | 'third' | 'quarter';
    rows?: number;
    multiple?: boolean;
    accept?: string;
    min?: number;
    max?: number;
    step?: number;
    startNewRow?: boolean;
    customType?: string;
    conditional?: boolean;
    conditionalField?: string;
    conditionalOperator?: 'equals' | 'not_equals' | 'contains' | 'empty' | 'not_empty';
    conditionalValue?: string;
    showCharacterCount?: boolean;
    minLength?: number;
    maxLength?: number;
    marginTop?: string;
    marginBottom?: string;
    padding?: string;
    alignment?: string;
    orientation?: 'vertical' | 'horizontal';
    componentAlignment?: 'left' | 'center' | 'right';
    hideOnMobile?: boolean;
    hideOnTablet?: boolean;
    hideOnDesktop?: boolean;
    dataAttributes?: string;
    ariaLabel?: string;
    tabIndex?: number;
    colorVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
    borderRadius?: 'none' | 'small' | 'default' | 'large' | 'full' | 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
    disabled?: boolean;
    readonly?: boolean;
    hidden?: boolean;
}

export declare function FieldSidebar(): JSX.Element;

declare type FormBuilderAction = {
    type: 'SET_FORM';
    payload: FormConfig;
} | {
    type: 'ADD_FIELD';
    payload: FormField;
} | {
    type: 'UPDATE_FIELD';
    payload: {
        id: string;
        updates: Partial<FormField>;
    };
} | {
    type: 'UPDATE_FIELD_PROPERTIES';
    payload: {
        id: string;
        properties: any;
    };
} | {
    type: 'UPDATE_FIELD_ADVANCED';
    payload: {
        id: string;
        advanced: any;
    };
} | {
    type: 'UPDATE_FIELD_CUSTOM';
    payload: {
        id: string;
        custom: any;
    };
} | {
    type: 'UPDATE_FIELD_EVENTS';
    payload: {
        id: string;
        events: any;
    };
} | {
    type: 'UPDATE_FIELD_SCHEMA';
    payload: {
        id: string;
        schema: any;
    };
} | {
    type: 'UPDATE_FIELD_LAYOUT';
    payload: {
        id: string;
        layout: any;
    };
} | {
    type: 'DELETE_FIELD';
    payload: string;
} | {
    type: 'REORDER_FIELDS';
    payload: {
        oldIndex: number;
        newIndex: number;
    };
} | {
    type: 'SELECT_FIELD';
    payload: string | null;
} | {
    type: 'SET_PREVIEW_MODE';
    payload: boolean;
} | {
    type: 'SET_DEVICE_VIEW';
    payload: 'desktop' | 'tablet' | 'mobile';
} | {
    type: 'UPDATE_FORM_SETTINGS';
    payload: Partial<FormSettings>;
} | {
    type: 'UPDATE_FORM_META';
    payload: {
        title?: string;
        description?: string;
    };
};

declare interface FormBuilderContextType {
    state: FormBuilderState;
    dispatch: default_2.Dispatch<FormBuilderAction>;
    actions: {
        setForm: (form: FormConfig) => void;
        addField: (field: FormField) => void;
        updateField: (id: string, updates: Partial<FormField>) => void;
        updateFieldProperties: (id: string, properties: any) => void;
        updateFieldAdvanced: (id: string, advanced: any) => void;
        updateFieldCustom: (id: string, custom: any) => void;
        updateFieldEvents: (id: string, events: any) => void;
        updateFieldSchema: (id: string, schema: any) => void;
        updateFieldLayout: (id: string, layout: any) => void;
        deleteField: (id: string) => void;
        reorderFields: (oldIndex: number, newIndex: number) => void;
        selectField: (id: string | null) => void;
        setPreviewMode: (enabled: boolean) => void;
        setDeviceView: (view: 'desktop' | 'tablet' | 'mobile') => void;
        updateFormSettings: (settings: Partial<FormSettings>) => void;
        updateFormMeta: (meta: {
            title?: string;
            description?: string;
        }) => void;
    };
}

export declare function FormBuilderProvider({ children }: {
    children: ReactNode;
}): JSX.Element;

declare interface FormBuilderState {
    currentForm: FormConfig;
    selectedFieldId: string | null;
    previewMode: boolean;
    deviceView: 'desktop' | 'tablet' | 'mobile';
}

export declare const FormBuilderSuite: typeof App;

export declare function FormBuilderToolbar(): JSX.Element;

export declare function FormCanvas(): JSX.Element;

export declare interface FormConfig {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
    settings: FormSettings;
}

export declare interface FormExportData {
    metadata: {
        id: string;
        title: string;
        description?: string;
        version: string;
        createdAt: string;
        exportedAt: string;
        builderVersion: string;
    };
    settings: {
        submitButtonText: string;
        redirectUrl?: string;
        emailNotifications?: string[];
        allowMultipleSubmissions: boolean;
        requireAuth: boolean;
        captchaEnabled: boolean;
        theme: 'light' | 'dark' | 'auto';
    };
    layout: {
        rows: FormRowExport[];
        totalFields: number;
    };
    fields: FormFieldExport[];
    fieldMap: Record<string, FormFieldExport>;
    validation: {
        requiredFields: string[];
        fieldsWithValidation: string[];
    };
}

export declare interface FormField {
    id: string;
    type: FormFieldType;
    label: string;
    name?: string;
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    validation?: ValidationRule[];
    options?: Option_2[];
    properties?: FieldProperties;
    conditionalLogic?: ConditionalLogic;
    rowId?: string;
    columnSpan?: number;
    layout?: {
        columnSpan?: number;
        rowId?: string;
        gridClass?: string;
    };
    advanced?: AdvancedProperties;
    custom?: CustomProperties;
    events?: EventProperties;
    schema?: SchemaProperties;
}

export declare interface FormFieldExport {
    id: string;
    type: string;
    label: string;
    name?: string;
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    validation?: Array<{
        type: string;
        value?: any;
        message: string;
    }>;
    options?: Array<{
        label: string;
        value: string;
    }>;
    properties: {
        helpText?: string;
        description?: string;
        customClasses?: string;
        classNames?: {
            base?: string;
            label?: string;
            inputWrapper?: string;
            innerWrapper?: string;
            mainWrapper?: string;
            input?: string;
            clearButton?: string;
            helperWrapper?: string;
            description?: string;
            errorMessage?: string;
        };
        width?: string;
        rows?: number;
        multiple?: boolean;
        accept?: string;
        min?: number;
        max?: number;
        step?: number;
        startNewRow?: boolean;
        size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
        disabled?: boolean;
        readonly?: boolean;
        hidden?: boolean;
        colorVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
        borderRadius?: 'none' | 'small' | 'default' | 'large' | 'full' | 'sm' | 'md' | 'lg';
        variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
        showCharacterCount?: boolean;
        minLength?: number;
        maxLength?: number;
        marginTop?: string;
        marginBottom?: string;
        padding?: string;
        alignment?: string;
        orientation?: 'vertical' | 'horizontal';
        componentAlignment?: 'left' | 'center' | 'right';
        hideOnMobile?: boolean;
        hideOnTablet?: boolean;
        hideOnDesktop?: boolean;
        dataAttributes?: string;
        ariaLabel?: string;
        tabIndex?: number;
    };
    layout: {
        columnSpan: number;
        rowId: string;
        gridClass: string;
    };
    conditionalLogic?: {
        field: string;
        operator: string;
        value: any;
        action: string;
    };
}

export declare function FormFieldRenderer({ field, value, onChange, }: FormFieldRendererProps): JSX.Element | null;

declare interface FormFieldRendererProps {
    field: FormField;
    value?: any;
    onChange?: (value: any) => void;
    isPreview?: boolean;
}

export declare type FormFieldType = 'text' | 'textarea' | 'email' | 'number' | 'password' | 'phone' | 'url' | 'date' | 'datetime' | 'time' | 'calendar' | 'checkbox' | 'radio' | 'select' | 'multiselect' | 'switch' | 'autocomplete' | 'search' | 'file' | 'signature' | 'rating' | 'range' | 'rich-text' | 'number-format' | 'pattern-format' | 'button' | 'label' | 'header' | 'paragraph' | 'image' | 'message' | 'progress-line' | 'progress-circle' | 'tooltip' | 'qr-code' | 'html' | 'container' | 'card' | 'tab' | 'breadcrumb' | 'section' | 'pagebreak' | 'repeater' | 'slot' | 'template' | 'error-message';

export declare function FormRenderer({ formConfig, onSubmit, className, }: FormRendererProps): JSX.Element;

declare interface FormRendererProps {
    formConfig: FormExportData;
    onSubmit?: (data: Record<string, any>) => void;
    className?: string;
}

export declare interface FormRow {
    id: string;
    fields: FormField[];
}

export declare interface FormRowExport {
    id: string;
    fields: string[];
    columns: number;
}

export declare function FormRowRenderer({ row, isPreview }: FormRowRendererProps): JSX.Element;

declare interface FormRowRendererProps {
    row: FormRow;
    isPreview: boolean;
}

export declare interface FormSettings {
    submitButtonText: string;
    redirectUrl?: string;
    emailNotifications?: string[];
    allowMultipleSubmissions: boolean;
    requireAuth: boolean;
    captchaEnabled: boolean;
    theme: 'light' | 'dark' | 'auto';
}

export declare function generateFormExportData(form: FormConfig): FormExportData;

export declare function getFieldSpan(field: FormField): number;

export declare function getGridClassName(span: number): string;

export declare function groupFieldsIntoRows(fields: FormField[]): FormRow[];

export declare function JsonFormRenderer(): JSX.Element;

declare interface Option_2 {
    label: string;
    value: string;
}
export { Option_2 as Option }

export declare function PropertiesPanel(): JSX.Element;

declare interface SchemaProperties {
    componentKind?: 'component' | 'repeater' | 'template' | 'structure';
    category?: string;
    icon?: string;
    typeName?: string;
    nestingLevel?: number;
    parentComponent?: string;
    childComponents?: string[];
    validationSchema?: Record<string, any>;
    errorMessages?: Record<string, string>;
    dataSchema?: Record<string, any>;
    defaultProperties?: Record<string, any>;
    insertRestriction?: string;
    customPreview?: string;
    builderOnly?: boolean;
}

export declare function SortableFormField({ field, isPreview, }: SortableFormFieldProps): JSX.Element;

declare interface SortableFormFieldProps {
    field: FormField;
    isPreview: boolean;
}

export declare function useFormBuilder(): FormBuilderContextType;

export declare interface ValidationRule {
    type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'url' | 'min_length' | 'max_length' | 'min_value' | 'max_value';
    value?: any;
    message: string;
}

export { }
