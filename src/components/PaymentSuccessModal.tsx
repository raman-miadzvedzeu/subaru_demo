"use client";
import { useRouter } from "next/navigation";
import { useRef, useEffect, FC } from "react";

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const PaymentSuccessModal: FC<PaymentSuccessModalProps> = ({
  open,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      router.push("/");
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    dialogRef.current?.close();

  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg p-6 bg-white shadow-lg max-w-md w-full border border-gray-300"
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Payment Successful!
        </h2>
        <p className="mt-2 text-gray-700">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <button
          onClick={handleClose}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
