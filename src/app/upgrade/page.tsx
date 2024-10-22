"use client";
import { StepFormContent, UpgradeOption } from "@/components";
import { Service, useVehicleStore } from "@/state";
import { useEffect } from "react";

export default function Upgrade() {
  const {
    fetchSubscriptionOptions,
    selectedVehicle,
    services,
    fetchServices,
    updateSubProducts,
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

  const onSubProjectChange = (product: Service) => () => {
    if (selectedSubscriptionOption?.SubProducts?.includes(product)) {
      const newSubProducts = selectedSubscriptionOption.SubProducts.filter(
        (row) => row.Id !== product.Id
      );
      updateSubProducts(newSubProducts);
    } else {
      const existingProducts = selectedSubscriptionOption?.SubProducts
        ? [...selectedSubscriptionOption.SubProducts]
        : [];
      updateSubProducts([...existingProducts, product]);
    }
  };

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

      <div className="flex flex-col md:flex-row gap-4">
        {subscriptionOptions.map((option, index) => (
          <UpgradeOption
            size="large"
            key={option.Id}
            name={option.Name}
            price={option.Rate}
            onClick={onOptionClick(index)}
            selected={option.Id === selectedSubscriptionOption?.Id}
          />
        ))}
      </div>

      {services && (
        <>
          <h6 className="text-md text-gray-600 mt-4">Additional Services</h6>
          <div className="flex gap-2 items-center mt-2">
            {services.map((serv) => (
              <UpgradeOption
                size="small"
                name={serv.Name}
                price={serv.Rate}
                selected={
                  !!selectedSubscriptionOption?.SubProducts?.find(
                    (sub) => sub.Id === serv.Id
                  )
                }
                onClick={onSubProjectChange(serv)}
              />
              // <div
              //   onClick={onSubProjectChange(serv)}
              //   key={serv.Id}
              //   className="flex gap-2 text-gray-600 border border-gray-300 rounded-md p-4 select-none cursor-pointer"
              // >
              //   <input
              //     type="checkbox"
              //     className="form-checkbox w-4 h-5"
              //     onChange={onSubProjectChange(serv)}
              //     checked={
              //       !!selectedSubscriptionOption?.SubProducts?.find(
              //         (sub) => sub.Id === serv.Id
              //       )
              //     }
              //   />
              //   <div className="flex flex-col gap-2">
              //     <span className="font-semibold">{serv.Name}</span>
              //     <span>{serv.Rate}</span>
              //   </div>
              // </div>
            ))}
          </div>
        </>
      )}
    </StepFormContent>
  );
}
