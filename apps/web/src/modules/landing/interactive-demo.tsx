import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Button, Icon } from '@repo/ui-core/primitives';

// Example form schemas
const examples = {
  contact: {
    name: 'Contact Form',
    schema: {
      formId: 'contact-form',
      title: 'Get in Touch',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'John Doe',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'john@example.com',
          required: true,
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Your message here...',
          rows: 4,
        },
      ],
    },
  },
  conditional: {
    name: 'Conditional Logic',
    schema: {
      formId: 'smart-survey',
      title: 'Product Feedback',
      fields: [
        {
          id: 'satisfaction',
          type: 'select',
          label: 'How satisfied are you?',
          options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
          required: true,
        },
        {
          id: 'reason',
          type: 'textarea',
          label: 'What could we improve?',
          showIf: {
            field: 'satisfaction',
            operator: 'in',
            value: ['Neutral', 'Dissatisfied'],
          },
        },
        {
          id: 'recommend',
          type: 'radio',
          label: 'Would you recommend us?',
          options: ['Yes', 'No', 'Maybe'],
          showIf: {
            field: 'satisfaction',
            operator: 'equals',
            value: 'Very Satisfied',
          },
        },
      ],
    },
  },
  validation: {
    name: 'Advanced Validation',
    schema: {
      formId: 'signup-form',
      title: 'Create Account',
      fields: [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          validation: {
            pattern: '^[a-zA-Z0-9_]{3,20}$',
            message: '3-20 chars, alphanumeric',
          },
          required: true,
        },
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          validation: {
            min: 18,
            max: 120,
          },
        },
        {
          id: 'terms',
          type: 'checkbox',
          label: 'I agree to the terms',
          required: true,
        },
      ],
    },
  },
};

type ExampleKey = keyof typeof examples;

const InteractiveDemo = () => {
  const [activeExample, setActiveExample] = useState<ExampleKey>('contact');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [mobileView, setMobileView] = useState<'json' | 'form'>('json');

  const currentSchema = examples[activeExample].schema;

  // Simple conditional logic check
  const shouldShowField = (field: any) => {
    if (!field.showIf) return true;

    const { field: targetField, operator, value } = field.showIf;
    const currentValue = formData[targetField];

    if (operator === 'equals') {
      return currentValue === value;
    }
    if (operator === 'in' && Array.isArray(value)) {
      return value.includes(currentValue);
    }
    return true;
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(examples) as Array<ExampleKey>).map((key) => (
          <Button
            key={key}
            variant={activeExample === key ? 'filled' : 'default'}
            onClick={() => {
              setActiveExample(key);
              setFormData({});
            }}
          >
            {examples[key].name}
          </Button>
        ))}
      </div>

      {/* Mobile Tab Switcher */}
      <div className="mb-4 flex gap-2 lg:hidden">
        <Button onClick={() => setMobileView('json')} size="xs" variant={mobileView === 'json' ? 'subtle' : 'default'}>
          <Icon name="Code" className="size-4" />
          JSON Schema
        </Button>
        <Button size="xs" onClick={() => setMobileView('form')} variant={mobileView === 'form' ? 'subtle' : 'default'}>
          <Icon name="Eye" className="size-4" />
          Live Preview
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left side - JSON Schema */}
        <div className={`flex flex-col ${mobileView === 'form' ? 'hidden lg:flex' : ''}`}>
          <div className="mb-3 hidden items-center gap-2 text-sm text-[#868e96] dark:text-[#909296] lg:flex">
            <Icon name="Code" className="size-4" />
            <span className="font-mono">JSON Schema</span>
          </div>

          <div className="relative flex-1">
            <div className="absolute -inset-4 rounded-lg bg-[#228be6]/5 blur-xl" />
            <div className="relative h-full rounded-lg border border-[#dee2e6] dark:border-[#373a40] bg-white/90 dark:bg-[#25262b]/90 py-6 px-4 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[#fa5252]/80" />
                  <div className="size-3 rounded-full bg-[#fab005]/80" />
                  <div className="size-3 rounded-full bg-[#40c057]/80" />
                </div>
                <span className="ml-auto text-xs text-[#868e96] font-mono">{currentSchema.formId}.json</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeExample}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-x-auto text-sm max-h-[500px] overflow-y-auto"
                >
                  <code className="text-[#495057] dark:text-[#909296] font-mono">
                    {JSON.stringify(currentSchema, null, 2)}
                  </code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right side - Live Form Preview */}
        <div className={`flex flex-col ${mobileView === 'json' ? 'hidden lg:flex' : ''}`}>
          <div className="mb-3 flex items-center gap-2 text-sm text-[#868e96] dark:text-[#909296]">
            <span className="hidden font-mono lg:inline">JSON</span>
            <Icon name="ChevronRight" className="hidden size-4 lg:inline" />
            <Icon name="Eye" className="size-4 lg:hidden" />
            <span className="font-mono">Live Preview</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExample}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 rounded-lg border border-[#dee2e6] dark:border-[#373a40] bg-white dark:bg-[#25262b] p-8 shadow-lg"
            >
              <h3 className="mb-6 text-[#212529] dark:text-[#c1c2c5]">{currentSchema.title}</h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {currentSchema.fields.map((field: any) => {
                  if (!shouldShowField(field)) return null;

                  return (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <label htmlFor={field.id} className="block text-sm text-[#495057] dark:text-[#909296]">
                        {field.label}
                        {field.required && <span className="ml-1 text-[#fa5252]">*</span>}
                      </label>

                      {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full rounded-md border border-[#ced4da] dark:border-[#373a40] bg-white dark:bg-[#2c2e33] px-4 py-2 text-[#212529] dark:text-[#c1c2c5] placeholder:text-[#adb5bd] focus:border-[#228be6] focus:outline-none focus:ring-2 focus:ring-[#228be6]/20"
                        />
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          rows={field.rows || 3}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full rounded-md border border-[#ced4da] dark:border-[#373a40] bg-white dark:bg-[#2c2e33] px-4 py-2 text-[#212529] dark:text-[#c1c2c5] placeholder:text-[#adb5bd] focus:border-[#228be6] focus:outline-none focus:ring-2 focus:ring-[#228be6]/20"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.id}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full rounded-md border border-[#ced4da] dark:border-[#373a40] bg-white dark:bg-[#2c2e33] px-4 py-2 text-[#212529] dark:text-[#c1c2c5] focus:border-[#228be6] focus:outline-none focus:ring-2 focus:ring-[#228be6]/20"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'radio' ? (
                        <div className="space-y-2">
                          {field.options?.map((opt: string) => (
                            <label key={opt} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={field.id}
                                value={opt}
                                checked={formData[field.id] === opt}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                className="size-4 text-[#228be6] focus:ring-2 focus:ring-[#228be6]/20"
                              />
                              <span className="text-sm text-[#495057] dark:text-[#909296]">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === 'checkbox' ? (
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={field.id}
                            checked={formData[field.id] === 'true'}
                            onChange={(e) => handleInputChange(field.id, String(e.target.checked))}
                            className="size-4 rounded border-[#ced4da] text-[#228be6] focus:ring-2 focus:ring-[#228be6]/20"
                          />
                          <span className="text-sm text-[#495057] dark:text-[#909296]">{field.label}</span>
                        </label>
                      ) : null}

                      {field.validation?.message && (
                        <p className="text-xs text-[#868e96] dark:text-[#909296]">{field.validation.message}</p>
                      )}
                    </motion.div>
                  );
                })}

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#228be6] px-6 py-3 text-white hover:bg-[#1c7ed6] transition-colors"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
