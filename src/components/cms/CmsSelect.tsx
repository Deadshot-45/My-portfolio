'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectOption {
  value: string;
  label: string;
}

interface CmsSelectProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  'aria-label'?: string;
}

export function CmsSelect({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder,
  className,
  triggerClassName,
  disabled,
  required,
  id,
  'aria-label': ariaLabel,
}: CmsSelectProps) {
  return (
    <div className={className}>
      <Select
        name={name}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(val) => {
          if (val !== null && onValueChange) {
            onValueChange(val);
          }
        }}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          id={id}
          aria-label={ariaLabel}
          className={`w-full h-10 px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors cursor-pointer justify-between ${
            triggerClassName || ''
          }`}
        >
          <SelectValue placeholder={placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent className="rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 text-sm shadow-xl z-50">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-zinc-200 hover:!text-white hover:bg-zinc-800 focus:!text-white focus:bg-zinc-800 data-[highlighted]:!text-white data-[highlighted]:bg-zinc-800 cursor-pointer text-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
