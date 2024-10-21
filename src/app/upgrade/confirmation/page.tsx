"use client";
import { OrderDetails, StepFormContent } from "@/components";
import { ChangeEvent, useState } from "react";

export default function Confirmation() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onCheck = (e: ChangeEvent<HTMLInputElement>) =>
    setTermsAccepted(e.target.checked);

  return (
    <StepFormContent
      step={2}
      prevLink={"/upgrade"}
      nextLink={"/upgrade/confirmation/payment"}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Subscription & Services
      </h2>
      <h3 className="text-lg font-semibold text-gray-700">Confirmation</h3>
      <div className="mt-4">
        <p className="font-semibold text-gray-500">Order Details</p>
        <div className="mt-6">
          <OrderDetails />
        </div>
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={onCheck}
              className="mr-2"
              checked={termsAccepted}
            />
            <span className="text-gray-600">I agree to the</span>
            <a
              href="https://billingplatform.com/privacy"
              target="_blank"
              className="ml-1 text-blue-600 underline"
            >
              Terms & Conditions
            </a>
          </label>
        </div>
      </div>
    </StepFormContent>
  );
}
