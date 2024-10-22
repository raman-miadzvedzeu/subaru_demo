"use client";
import { Button, CancelSubscriptionModal, Preloader } from "@/components";
import { SubscriptionProduct, useVehicleStore } from "@/state";
import { formatUsDate } from "@/utils";
import { useEffect, useState } from "react";

export default function Subscriptions() {
  const { fetchCurrentSubscriptions, currentSubscriptions, loading } =
    useVehicleStore((state) => state);

  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionProduct | null>(null);

  useEffect(() => {
    fetchCurrentSubscriptions();
  }, []);

  const selectSubscription = (sub: SubscriptionProduct | null) => () => {
    setSelectedSubscription(sub);
    if (!sub) {
        fetchCurrentSubscriptions();
    }
  }

  return (
    <div className="flex flex-col mt-12 gap-12">
      {loading && <Preloader />}
      <h3 className="text-3xl text-center text-gray-800">
        Current Subscriptions
      </h3>
      <div className="max-w-3xl rounded-md mt-12 w-full mx-auto gap-4 flex flex-col">
        {currentSubscriptions.map((sub) => (
          <div className="bg-white flex justify-between p-4 rounded-md" key={sub.Id}>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600">{sub.Name}</span>
              <div className="flex gap-1 text-gray-500">
                <span>{formatUsDate(new Date(sub.StartDate))}</span>
                {sub.EndDate && (
                  <>
                    <span> - </span>
                    <span>{formatUsDate(new Date(sub.EndDate))}</span>
                  </>
                )}
              </div>
            </div>
            {
                (!sub.EndDate || new Date(sub.EndDate).getTime() > new Date().getTime()) && 
                <Button onClick={selectSubscription(sub)} className="my-auto">Cancel</Button>
            }
          </div>
        ))}
      </div>
      <CancelSubscriptionModal
        onClose={selectSubscription(null)}
        open={!!selectedSubscription}
        accountProductId={selectedSubscription?.Id}
      />
    </div>
  );
}
