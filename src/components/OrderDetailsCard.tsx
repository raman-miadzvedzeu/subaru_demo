"use client";
import { useVehicleStore } from "@/state";
import Link from "next/link";
import { FC } from "react";
import { OrderDetails } from "./OrderDetails";
import { Button } from "./Button";

type OrderDetailsProps = {
  prevLink: string;
  nextLink?: string;
  backLabel?: string;
  onSubmit?: () => void;
  nextIsDisabled?: boolean;
};

export const OrderDetailsCard: FC<OrderDetailsProps> = ({
  prevLink,
  nextLink,
  onSubmit,
  backLabel = "Back",
  nextIsDisabled,
}) => {
  const selectedSubscriptionOption = useVehicleStore(
    (state) => state.selectedSubscriptionOption
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-700">
        {selectedSubscriptionOption?.Name}
      </h3>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          {selectedSubscriptionOption?.Name}
        </p>
        <p className="text-sm font-semibold text-gray-600">
          {selectedSubscriptionOption?.Rate}
        </p>
      </div>
      {selectedSubscriptionOption?.SubProducts?.map((sub) => (
        <div
          className="flex justify-between items-center mb-4"
          key={`pricing-sub-${sub.Id}`}
        >
          <p className="text-sm text-gray-600">{sub?.Name}</p>
          <p className="text-sm font-semibold text-gray-600">{sub?.Rate}</p>
        </div>
      ))}
      <OrderDetails />

      <div className="flex justify-between">
        <Link
          href={prevLink}
          className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
        >
          {backLabel}
        </Link>
        {nextLink ? (
          <Link
            href={nextLink}
            className={
              nextIsDisabled
                ? "bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-300 cursor-not-allowed pointer-events-none"
                : "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            }
          >
            Next
          </Link>
        ) : (
          <Button
            disabled={nextIsDisabled}
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
