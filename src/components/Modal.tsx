"use client";
import { useRef, useEffect, FC, ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  className,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`rounded-lg p-6 bg-white shadow-lg max-w-lg w-full border border-gray-300 ${className}`}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      {children}
    </dialog>
  );
};
