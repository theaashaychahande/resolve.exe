import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center text-gray hover:text-dark transition"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold text-dark mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}
