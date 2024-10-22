"use client";
import { useVehicleStore } from "@/state";
import Link from "next/link";

export default function Home() {
  const { selectedVehicle } = useVehicleStore((state) => state);

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-900 text-white p-4 flex items-center pl-10">
        <div>
          <h3 className="text-sm font-semibold">{selectedVehicle?.Model}</h3>
          <p className="text-xs text-white">VIN: {selectedVehicle?.VIN}</p>
          <Link
            href={`/vehicle/${selectedVehicle?.Id}`}
            className="text-xs text-blue-400 hover:underline"
          >
            View Information
          </Link>
        </div>
      </div>

      {/* Remote Commands Section */}
      <div className="bg-gray-100 p-8 flex items-center justify-center">
        <div className="w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-8 text-black">
            Remote Commands
          </h1>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Subscription Services Section */}
            <div className="bg-gray-200 p-8 rounded-md  text-center shadow-md flex-1 lg:w-3/4">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Subscription Services
              </h2>
              <p className="text-sm text-gray-600 mb-6 px-20">
                Upgrade your STARLINK® Safety Plus plan with added security and
                convenience features such as remote services, stolen vehicle
                recovery, security alarm notification and more. Upgrade now!
              </p>
              <Link
                href="/vehicle"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Side Buttons */}
            <div className="flex flex-col gap-4 w-full lg:w-1/4 text-gray-600">
              {/* Service Button */}
              <div className="bg-white w-full rounded-md shadow-md flex items-center cursor-pointer hover:bg-gray-50">
                <div className="text-left p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3M5 21h14M5 10h14M5 14h14M9 17h6"
                    />
                  </svg>
                  <p className="font-semibold">Service</p>
                </div>
              </div>

              {/* Support Button */}
              <div className="bg-white w-full rounded-md shadow-md flex items-center cursor-pointer hover:bg-gray-50">
                <div className="text-center p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5h18M9 3v2m6-2v2m4 10v1a4 4 0 11-8 0v-1m-4 0v1a8 8 0 0016 0v-1"
                    />
                  </svg>
                  <p className="font-semibold">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
