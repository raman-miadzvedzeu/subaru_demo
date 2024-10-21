"use client";
import { expirationDate } from "@/constants";
import { useVehicleStore } from "@/state";

export const OrderDetails = () => {
  const selectedSubscriptionOption = useVehicleStore(
    (state) => state.selectedSubscriptionOption
  );

  return (
    <>
      <p className="text-xs text-gray-400 mb-6">(through {expirationDate})</p>

      <div className="flex justify-between items-center mb-2 text-gray-600">
        <p className="text-sm">Your Subtotal</p>
        <p className="text-sm font-semibold">
          {selectedSubscriptionOption?.Rate}
        </p>
      </div>
      <div className="flex justify-between items-center mb-6 text-gray-500">
        <p className="text-sm">Sales Tax</p>
        <p className="text-sm font-semibold">$0.00</p>
      </div>
      <div className="flex justify-between items-center mb-8 border-t pt-4 text-gray-800">
        <p className="text-lg font-bold">TOTAL</p>
        <p className="text-lg font-bold">{selectedSubscriptionOption?.Rate}</p>
      </div>
    </>
  );
};
