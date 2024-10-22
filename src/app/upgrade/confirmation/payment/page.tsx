"use client";
import { Input, PaymentSuccessModal, Preloader, StepFormContent } from "@/components";
import { useVehicleStore } from "@/state";
import { useState } from "react";

export default function Payment() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { upgradeSubscription, selectedSubscriptionOption, loading } = useVehicleStore(
    (state) => state
  );

  const onDataSubmit = async () => {
    if (selectedSubscriptionOption?.Id) {
      const ids = [selectedSubscriptionOption?.Id];
      if (selectedSubscriptionOption.SubProducts) {
        ids.push(...selectedSubscriptionOption.SubProducts.map((sub) => sub.Id));
      }
      await upgradeSubscription(ids);
      setPaymentCompleted(true);
    }
  };

  return (
    <StepFormContent
      step={3}
      prevLink={"/upgrade/confirmation"}
      onSubmit={onDataSubmit}
    >
      {loading && <Preloader/>}
      <PaymentSuccessModal open={paymentCompleted} onClose={() => setPaymentCompleted(false)} />
      <h3 className="text-2xl font-bold mb-4 text-gray-700">
        Payment Information
      </h3>

      <div className="mt-4">
        <p className="font-semibold text-gray-500">Credit Card</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Input type="text" placeholder="* Card Number" />
          <Input type="text" placeholder="* CVV code" />
          <Input type="text" placeholder="* Expiration Month" />
          <Input type="text" placeholder="* Expiration Year" />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <p className="font-semibold text-gray-500">Billing Information</p>
          <input type="checkbox" className="ml-2 mr-2" />
          <span className="text-gray-700">Same as Home Address</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Input type="text" placeholder="* First Name" />
          <Input type="text" placeholder="* Last Name" />
          <Input type="text" placeholder="* Address Line 1" />
          <Input type="text" placeholder="Address Line 2" />
          <Input type="text" placeholder="* City" />
          <Input type="text" placeholder="* State" />
          <Input type="text" placeholder="* ZIP" />
        </div>
      </div>
    </StepFormContent>
  );
}
