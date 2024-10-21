"use client"
import { useVehicleStore } from "@/state";

export const VehicleHeader = () => {
  const { selectedVehicle } = useVehicleStore((state) => state);

  return (
    <div className="flex items-center justify-between border-b p-4 bg-gray-800">
      <div className="flex items-center">
        <div className="ml-4">
          <h1 className="text-lg font-semibold">{selectedVehicle?.Model}</h1>
          <p className="text-sm text-gray-500">VIN: {selectedVehicle?.VIN}</p>
        </div>
      </div>
      <a href="#" className="text-blue-500 text-sm">
        View Information
      </a>
    </div>
  );
};
