'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function FAQ({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <Accordion.Root type="multiple" className="space-y-4">
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          value={item.question}
          className="rounded-2xl border border-brand-500/20"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-foreground">
              {item.question}
              <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-6 pb-6 text-sm text-muted data-[state=open]:animate-accordionDown data-[state=closed]:animate-accordionUp">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
