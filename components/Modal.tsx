import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  type?: 'success' | 'error' | 'info';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  showCancelButton = false,
  showConfirmButton = true,
  type = 'info',
}) => {
  if (!isOpen) return null;

  const typeIcon = {
    success: (
      <svg
        className="w-12 h-12 text-green-500 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    error: (
      <svg
        className="w-12 h-12 text-red-500 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    info: (
      <svg
        className="w-12 h-12 text-blue-500 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
        <div className="text-center">
          {typeIcon[type]}
          <h3 className="text-lg font-medium text-gray-900 mt-4">{title}</h3>
          <div className="mt-2 text-sm text-gray-500">
            {children}
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          {showConfirmButton && (
            <Button
              onClick={handleConfirm}
              fullWidth={!showCancelButton}
              className={`sm:col-start-2 ${showCancelButton ? '' : 'sm:col-span-2'}`}
              variant={type === 'error' ? 'danger' : 'primary'}
            >
              {confirmText}
            </Button>
          )}
          {showCancelButton && (
            <Button
              onClick={onClose}
              fullWidth
              variant="secondary"
              className="mt-3 sm:mt-0 sm:col-start-1"
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;