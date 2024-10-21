"use client";
import { Preloader, VehicleHeader } from "@/components";
import { useVehicleStore } from "@/state";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = useVehicleStore((state) => state.loading);

  return (
    <>
      <VehicleHeader />
      {
        loading &&
        <Preloader/>
      }
      {children}
    </>
  );
}
