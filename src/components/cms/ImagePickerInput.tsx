'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, UploadCloud, FolderOpen, X, Check, Loader2, ExternalLink, FileText } from 'lucide-react';

export interface MediaLibraryItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  fileId?: string | null;
  size?: number | null;
  mimeType?: string | null;
}

interface ImagePickerInputProps {
  label?: string;
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  accept?: string;
  modalTitle?: string;
}

function isPdfFile(urlOrName: string): boolean {
  if (!urlOrName) return false;
  const lower = urlOrName.toLowerCase();
  return lower.endsWith('.pdf') || lower.includes('.pdf');
}

export function ImagePickerInput({
  label,
  name,
  defaultValue = '',
  value: controlledValue,
  onChange,
  placeholder = 'e.g. /images/hero-sunset.jpg or https://...',
  hint,
  required,
  accept = 'image/*,application/pdf',
  modalTitle,
}: ImagePickerInputProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const [modalOpen, setModalOpen] = useState(false);
  const [mediaList, setMediaList] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [previewError, setPreviewError] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateValue = (newVal: string) => {
    if (!isControlled) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
    setPreviewError(false);
  };

  const loadMedia = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      } else {
        setStatusMessage('Failed to load storage items.');
      }
    } catch {
      setStatusMessage('Network error loading storage items.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalOpen(true);
    loadMedia();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearch('');
    setStatusMessage(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      const uploadedItem = data.media as MediaLibraryItem;
      setMediaList((prev) => [uploadedItem, ...prev]);
      updateValue(uploadedItem.url);
      setModalOpen(false);
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const filteredMedia = mediaList.filter((m) =>
    (m.originalName || m.filename).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={`input-${name}`} className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {label} {required && <span className="text-emerald-500">*</span>}
          </label>
          {hint && <span className="text-[11px] text-zinc-500">{hint}</span>}
        </div>
      )}

      {/* Main Input Control Bar */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Direct URL text input */}
          <div className="relative flex-1">
            <input
              id={`input-${name}`}
              name={name}
              type="text"
              value={currentValue}
              onChange={(e) => updateValue(e.target.value)}
              placeholder={placeholder}
              required={required}
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-mono transition-colors"
            />
            {isPdfFile(currentValue) ? (
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" aria-hidden="true" />
            ) : (
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
            )}
            {currentValue && (
              <button
                type="button"
                onClick={() => updateValue('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
                title="Clear value"
                aria-label="Clear image URL"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Select from Storage Button */}
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-colors shadow-sm"
              title="Browse uploaded images from storage"
            >
              <FolderOpen className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Select from Storage</span>
            </button>

            {/* Quick Upload Button */}
            <label
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium cursor-pointer transition-colors shadow-sm"
              title="Upload an image directly to storage"
            >
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{uploading ? 'Uploading...' : 'Upload'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Live Preview Bar if value is set */}
        {currentValue && (
          <div className="flex items-center gap-3 p-2 rounded-lg border border-zinc-800/80 bg-zinc-950/60 text-xs">
            <div className="w-10 h-10 rounded overflow-hidden bg-black/40 border border-zinc-800 flex items-center justify-center shrink-0">
              {isPdfFile(currentValue) ? (
                <div className="flex flex-col items-center justify-center text-rose-400">
                  <FileText className="w-5 h-5 text-rose-400" />
                  <span className="text-[8px] font-bold text-rose-300">PDF</span>
                </div>
              ) : !previewError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentValue}
                  alt="Selected preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <span className="text-[10px] text-zinc-500 text-center px-1">No preview</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-zinc-300 truncate font-mono text-[11px]">{currentValue}</p>
              <p className="text-zinc-500 text-[10px]">
                {isPdfFile(currentValue) ? 'PDF Document' : currentValue.startsWith('http') ? 'Remote CDN URL' : 'Relative path'}
              </p>
            </div>
            {(currentValue.startsWith('http') || currentValue.startsWith('/')) && (
              <a
                href={currentValue}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-emerald-400 p-1"
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Storage Selection Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="storage-modal-title"
            className="w-full max-w-3xl rounded-xl border border-zinc-800 bg-[#07070a] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-emerald-400" />
                <h3 id="storage-modal-title" className="text-base font-semibold text-zinc-100">
                  {modalTitle || (accept?.includes('pdf') ? 'Select File / Document from Storage' : 'Select from Storage')}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Quick Upload Toolbar */}
            <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Search storage by file name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              />

              <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold cursor-pointer transition-colors shrink-0">
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5" />
                )}
                <span>{uploading ? 'Uploading...' : accept?.includes('pdf') ? 'Upload New File' : 'Upload New Image'}</span>
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Status notification */}
            {statusMessage && (
              <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs">
                {statusMessage}
              </div>
            )}

            {/* Media Grid Content */}
            <div className="p-6 overflow-y-auto flex-1 min-h-[280px]">
              {loading ? (
                <div className="h-48 flex flex-col items-center justify-center gap-2 text-zinc-400">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                  <span className="text-xs">Loading media library...</span>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-xl">
                  <ImageIcon className="w-8 h-8 text-zinc-600 mb-2" />
                  <p className="text-sm text-zinc-300 font-medium">No storage files found</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {search ? 'Try clearing your search term.' : 'Upload a file or image above to get started.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredMedia.map((item) => {
                    const isSelected = currentValue === item.url;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          updateValue(item.url);
                          closeModal();
                        }}
                        className={`group relative rounded-lg overflow-hidden border text-left transition-all p-1 flex flex-col ${
                          isSelected
                            ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-950/20'
                            : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-900/80'
                        }`}
                      >
                        <div className="relative w-full h-24 rounded bg-black/40 overflow-hidden flex items-center justify-center">
                          {isPdfFile(item.url || item.filename) ? (
                            <div className="flex flex-col items-center justify-center gap-1 text-zinc-400">
                              <FileText className="w-8 h-8 text-rose-400" />
                              <span className="text-[9px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                                PDF
                              </span>
                            </div>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.url}
                              alt={item.originalName || item.filename}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              loading="lazy"
                            />
                          )}
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="pt-2 px-1 pb-1">
                          <p className="text-[11px] font-medium text-zinc-200 truncate" title={item.originalName || item.filename}>
                            {item.originalName || item.filename}
                          </p>
                          <p className="text-[10px] text-zinc-500">
                            {item.size ? `${(item.size / 1024).toFixed(0)} KB` : 'Asset'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs text-zinc-400">
              <span>{filteredMedia.length} image(s) available</span>
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
