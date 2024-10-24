"use client"
import { useVehicleStore } from "@/state";
import Link from "next/link";

export const VehicleHeader = () => {
  const { selectedVehicle } = useVehicleStore((state) => state);

  return (
    <div className="flex items-center justify-between border-b p-4 bg-gray-800">
      <div className="flex items-center">
        <div className="ml-4">
          <h1 className="text-lg font-semibold">{selectedVehicle?.Model}</h1>
          <p className="text-sm text-white">VIN: {selectedVehicle?.VIN}</p>
        </div>
      </div>
      <Link href={`/vehicle/${selectedVehicle?.Id}`} className="text-blue-500 text-sm">
        View Information
      </Link>
    </div>
  );
};
