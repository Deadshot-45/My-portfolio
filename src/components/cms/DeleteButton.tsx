'use client';

import React from 'react';

interface DeleteButtonProps {
  action: (formData: FormData) => void | Promise<any>;
  id: string;
  itemTitle?: string;
  variant?: 'icon' | 'button';
}

export function DeleteButton({
  action,
  id,
  itemTitle,
  variant = 'icon',
}: DeleteButtonProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const label = itemTitle ? ` "${itemTitle}"` : '';
    if (!window.confirm(`Delete${label}? This cannot be undone.`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} className="inline" onSubmit={handleSubmit}>
      <input type="hidden" name="id" defaultValue={id} />
      {variant === 'icon' ? (
        <button
          type="submit"
          className="p-2 rounded-md text-zinc-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
          title="Delete"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      ) : (
        <button
          type="submit"
          className="w-full rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          Delete
        </button>
      )}
    </form>
  );
}
