'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from '@/components/ui/dialog';
import { LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface SignOutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => Promise<void> | void;
}

export function SignOutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: SignOutConfirmDialogProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      if (onConfirm) {
        await onConfirm();
      } else {
        await fetch('/api/cms/logout', { method: 'POST' });
        router.push('/cms/login');
      }
    } catch {
      router.push('/cms/login');
    } finally {
      setIsSigningOut(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isSigningOut && onOpenChange(val)}>
      <DialogOverlay className="bg-transparent! inset-0 backdrop-blur-sm"/>
      <DialogContent
        showCloseButton={!isSigningOut}
        className="w-[calc(100%-2rem)] max-w-md p-6 bg-zinc-950/95 border-white/10 text-white shadow-2xl rounded-2xl"
      >
        <DialogHeader className="flex flex-col items-center text-center gap-3 space-y-0">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <LogOut className="w-5 h-5 ml-0.5" />
          </div>
          <DialogTitle className="text-lg font-grotesk font-bold text-white">
            Confirm Sign Out
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Are you sure you want to end your session? You will need your admin credentials to log back in.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            disabled={isSigningOut}
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-zinc-800 text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSigningOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Yes, Sign Out</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
