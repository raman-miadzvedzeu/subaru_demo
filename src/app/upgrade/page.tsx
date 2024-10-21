"use client";
import { StepFormContent, UpgradeOption } from "@/components";
import { useVehicleStore } from "@/state";
import { useEffect } from "react";

export default function Upgrade() {
  const {
    fetchSubscriptionOptions,
    selectedVehicle,
    services,
    fetchServices,
    selectSubscriptionOption,
    selectedSubscriptionOption,
    subscriptionOptions,
  } = useVehicleStore((state) => state);

  useEffect(() => {
    fetchSubscriptionOptions();
    if (selectedVehicle) {
      fetchServices(selectedVehicle?.VehicleLookup);
    }
  }, [selectedVehicle]);

  const onOptionClick = (index: number) => () => {
    selectSubscriptionOption(subscriptionOptions[index]);
  };

  return (
    <StepFormContent
      step={1}
      prevLink={"/vehicle"}
      nextLink={"/upgrade/confirmation"}
    >
      <p className="text-sm text-gray-600 mb-4">
        Access your vehicle{"'"}s features from anywhere with the STARLINK®
        Security Plus package. Security Plus allows you to track your vehicle
        and activate features remotely through your desktop or the MySubaru app,
        giving you control 24/7.
      </p>
      <h2 className="text-xl font-bold mb-6 text-gray-600">
        Add Your Optional Upgrade:
      </h2>

      {/* Upgrade Options */}
      <div className="flex flex-col md:flex-row gap-4">
        {subscriptionOptions.map((option, index) => (
          <UpgradeOption
            key={option.Id}
            name={option.Name}
            price={option.Rate}
            onClick={onOptionClick(index)}
            selected={option.Id === selectedSubscriptionOption?.Id}
          />
        ))}
      </div>

      {services && (
        <div className="flex gap-10 mt-6 items-center">
          <div className="flex flex-col text-gray-600">
            <span className="font-semibold">Concierge Services</span>
            <span>{services.ConciergeServices}</span>
          </div>
          <div className="flex flex-col text-gray-600">
            <span className="font-semibold">WiFi</span>
            <span>{services.WiFi}</span>
          </div>
        </div>
      )}
    </StepFormContent>
  );
}
