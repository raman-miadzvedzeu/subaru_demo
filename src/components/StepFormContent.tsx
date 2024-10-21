"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import { Progress } from "./Progress";
import { OrderDetailsCard } from "./OrderDetailsCard";
import { useVehicleStore } from "@/state";
import {useRouter} from 'next/navigation';

interface StepFormContentProps extends PropsWithChildren {
  step: number;
  prevLink: string;
  nextLink?: string;
  onSubmit?: () => void
}

export const StepFormContent: FC<StepFormContentProps> = ({
  step,
  prevLink,
  nextLink,
  onSubmit,
  children,
}) => {
  const selectedSubscriptionOption = useVehicleStore(
    (state) => state.selectedSubscriptionOption
  );

  const router = useRouter();

  useEffect(() => {
    if (!selectedSubscriptionOption) {
      router.push("/upgrade");
    }
  }, [selectedSubscriptionOption, router]);

  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center">
      <Progress step={step} totalSteps={3} />
      <div className="max-w-7xl mt-2 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-6 rounded-md shadow-md">
          {children}
        </div>

        {/* Plan Summary */}
        <OrderDetailsCard backLabel={step > 1 ? "Back": "Cancel"} prevLink={prevLink} nextLink={nextLink} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
