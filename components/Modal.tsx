"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[90vw] rounded-xl bg-gray-800 shadow-xl max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">

          {title && (
            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

        </div>

        {/* Conteúdo */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {children}
        </div>

      </div>
    </div>
  );
}