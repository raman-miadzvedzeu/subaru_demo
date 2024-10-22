"use client";
import { Preloader, VehicleHeader } from "@/components";
import { useVehicleStore, Vehicle as VehicleType } from "@/state";
import Link from "next/link";
import { useEffect } from "react";

export default function Vehicle() {
  const { vehicles, fetchVehicles, loading, selectVehicle, selectedVehicle } =
    useVehicleStore((state) => state);

  useEffect(() => {
    if (!vehicles.length) {
      fetchVehicles();
    }
  }, [vehicles]);

  const onVehicleSelect = (vehicle: VehicleType) => () =>
    selectVehicle(vehicle);
  return (
    <div>
      {
        loading && <Preloader/>
      }
      <VehicleHeader />
      <div className="rounded-md p-8">
        <div className="mt-8 w-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-600 text-center">
            My Vehicles
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Add, manage, archive and select any of your Subaru Vehicles.
          </p>

          <div className="bg-gray-200 flex flex-col min-w-3xl p-4 justify-center rounded-md">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                Current Vehicles
              </h3>
              <div className="flex flex-col gap-2">
                {vehicles?.map((vehicle) => (
                  <div
                    onClick={onVehicleSelect(vehicle)}
                    key={vehicle.Id}
                    className="bg-white p-4 rounded-md flex items-center justify-between [&_*]:cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="vehicle"
                        className="mr-2"
                        checked={selectedVehicle?.Id === vehicle.Id}
                        readOnly
                      />
                      <span className="text-md text-gray-600">
                        {vehicle.Model}
                      </span>
                    </div>
                    <button className="text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 w-full flex justify-end">
                <Link
                  href="/upgrade"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
