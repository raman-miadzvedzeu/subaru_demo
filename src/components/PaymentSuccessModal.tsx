"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Modal } from "./Modal";

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const PaymentSuccessModal: FC<PaymentSuccessModalProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push("/");
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
    </Modal>
  );
};