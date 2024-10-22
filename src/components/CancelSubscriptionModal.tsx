import { FC, useState } from "react";
import { Modal } from "./Modal";
import { ApiService } from "@/services";
import { Preloader } from "./Preloader";

interface CancelSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  accountProductId?: string;
}

export const CancelSubscriptionModal: FC<CancelSubscriptionModalProps> = ({
  open,
  onClose,
  accountProductId
}) => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const handleAcceptDiscount = async () => {
    setFetching(true);
    setError("");
    try {
      await ApiService.getInstance().applyDiscount();
      onClose();
    } catch {
      setError("Can't apply the discount. Try again later");
    } finally {
      setFetching(false);
    }
  };

  const onConfirmCancel = async () => {
    setFetching(true);
    setError("");
    try {
      await ApiService.getInstance().cancelSubscription(accountProductId!);
      onClose();
    } catch {
      setError("Can't apply the discount. Try again later");
    } finally {
      setFetching(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 p-6">
        {
          fetching &&
          <Preloader/>
        }
        <h1 className="text-2xl font-bold text-center">
          Are you sure you want to cancel the subscription?
        </h1>
        {error && <span className="text-red-500 text-center">{error}</span>}
        <p className="text-center">
          Wait! We {"don't"} want to see you go. How about a special offer?
        </p>
        <div className="bg-yellow-100 p-4 rounded-md text-center">
          <p className="text-lg font-semibold">Stay and Save 100%!</p>
          <p>Get a 100% discount on your next year if you decide to stay with us.</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleAcceptDiscount}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Yes, {"I'll"} stay
          </button>
          <button
            onClick={onConfirmCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel my subscription
          </button>
        </div>
      </div>
    </Modal>
  );
};