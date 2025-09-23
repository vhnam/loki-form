import React from 'react';

import { type IForm } from '@repo/form-ui/types/form';

import { sortBy } from '@repo/core-ui/lib/lodash';

import { useLokiForm } from '@repo/form-ui/hooks/use-loki-form';

import { Card, CardContent } from '@repo/core-ui/components/card';

interface FormRendererProps {
  data: IForm;
}

const FormRenderer = ({ data }: FormRendererProps) => {
  const { renderQuestion } = useLokiForm();

  const orderedSections = sortBy(data.sections, 'order');

  return (
    <div className="mx-auto w-full max-w-2xl px-12 py-8">
      <div className="mb-8 font-serif">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>
      <div className="space-y-8">
        {orderedSections.map((section) => (
          <div key={section.id}>
            {section.showInfo && (
              <div className="mb-3 font-serif">
                <h2 className="text-base font-medium">{section.title}</h2>
                {section.description && (
                  <p className="text-sm text-gray-500">{section.description}</p>
                )}
              </div>
            )}
            <Card>
              <CardContent>
                <div className="space-y-6">
                  {sortBy(section.fields, 'order').map((field) => (
                    <div key={field.id}>{renderQuestion(field)}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormRenderer;
