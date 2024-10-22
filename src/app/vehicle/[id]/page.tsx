"use client";

import { Preloader } from "@/components";
import { useVehicleStore } from "@/state";
import { FC, useEffect, useState } from "react";

const Field: FC<{ label: string; value: string | number; }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-md text-gray-500">{label}</span>
    <span className="text-lg font-bold text-gray-500">{value}</span>
  </div>
);

export default function VehiclePage({ params }: { params: { id: string } }) {
  const { selectVehicle, loading, selectedVehicle, vehicles } = useVehicleStore(
    (state) => state
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (vehicles.length && params.id !== selectedVehicle?.Id) {
      const vehicleById = vehicles.find((vehicle) => vehicle.Id === params.id);
      if (vehicleById) {
        selectVehicle(vehicleById);
      } else {
        setError(true);
      }
    }
  }, [selectedVehicle, vehicles]);

  if (error) {
    return (
      <div className="mx-auto max-w-xl mt-40 p-8 rounded-md bg-white-200 border border-red-400 flex justify-center gap-2">
        <span className="text-xl text-red-600 border border-red-600 rounded-full p-2 flex items-center justify-center w-8 h-8 font-bold">
          !
        </span>
        <span className="text-gray-700 font-semibold my-auto">
          Vehicle not found
        </span>
      </div>
    );
  }

  return (
    <div className="text-gray-700">
      {loading && <Preloader />}
      {selectedVehicle && (
        <div className="flex flex-col max-w-5xl mx-auto mt-16">
          <h3 className="text-xl text-center font-semibold">Vehicle Details</h3>
          <div className="w-full mt-20 p-8 rounded-md bg-gray-200">
            <div className="grid grid-cols-2 gap-6 mx-auto">
              <Field label="VIN" value={selectedVehicle?.VIN} />
              <Field label="Engine" value={selectedVehicle?.Engine} />
              <Field label="Model" value={selectedVehicle?.Model} />
              <Field label="Year" value={selectedVehicle?.Year} />
              <Field
                label="Transmission"
                value={selectedVehicle?.Transmission}
              />
              <Field label="Exterior Color" value={selectedVehicle?.extColor} />
              <Field label="Interior Color" value={selectedVehicle?.intColor} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
