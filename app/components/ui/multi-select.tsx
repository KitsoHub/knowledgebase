'use client'

import * as React from 'react'
import { X, Check } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/ui/command'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'

export type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options',
  className,
  autoFocus = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter(i => i !== item))
  }

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'flex min-h-10 w-full flex-wrap items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        onClick={() => setOpen(true)}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map(item => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {options.find(option => option.value === item)?.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={e => {
                    e.stopPropagation()
                    handleUnselect(item)
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {item}</span>
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full">
          <Command className="w-full rounded-md border border-input bg-background shadow-md">
            <CommandInput
              placeholder="Search options..."
              autoFocus={autoFocus}
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                {options.map(option => {
                  const isSelected = selected.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-0" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}
