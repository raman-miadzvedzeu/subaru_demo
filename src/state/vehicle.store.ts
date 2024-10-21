import { create } from "zustand";
import { ApiService } from "@/services";

export type Vehicle = {
  Id: string;
  Model: string;
  Customer: string;
  ProductLookup: string;
  VIN: string;
  VehicleLookup: string;
  ProductName: string;
};

type SubscriptionOption = {
  Id: string;
  Name: string;
  Rate: string;
};

type Service = {
  Id: string;
  ConciergeServices: string;
  WiFi: string;
};

type VehicleStore = {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  subscriptionOptions: SubscriptionOption[];
  services: Service | null;
  loading: boolean;
  error: string | null;
  selectedVehicle: Vehicle | null;
  selectedSubscriptionOption: SubscriptionOption | null;
  fetchVehicles: () => Promise<void>;
  fetchAllVehicles: () => Promise<void>;
  fetchSubscriptionOptions: () => Promise<void>;
  fetchServices: (vehicleId: string) => Promise<void>;
  selectVehicle: (vehicle: Vehicle) => void;
  selectSubscriptionOption: (subscriptionOption: SubscriptionOption) => void;
  upgradeSubscription: (
    subscriptionOptionId: string
  ) => Promise<{ error?: string } | null>;
};

const apiService = ApiService.getInstance();

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  allVehicles: [],
  subscriptionOptions: [],
  services: null,
  loading: false,
  error: null,
  selectedVehicle: null,
  selectedSubscriptionOption: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.getVehicles();
      set({
        vehicles: response.queryResponse,
        loading: false,
        selectedVehicle: response.queryResponse[0],
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAllVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.getAllVehicles();
      set({ allVehicles: response.records, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSubscriptionOptions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.getSubscriptionOptions();
      set({
        subscriptionOptions: response.queryResponse,
        loading: false,
        selectedSubscriptionOption: response.queryResponse?.[0],
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchServices: async (vehicleId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.getServices(vehicleId);
      set({ services: response.queryResponse?.[0], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  selectVehicle: (selectedVehicle: Vehicle) => {
    set({ selectedVehicle });
  },

  selectSubscriptionOption: (
    selectedSubscriptionOption: SubscriptionOption
  ) => {
    set({ selectedSubscriptionOption });
  },

  upgradeSubscription: async (selectedOptionId: string) => {
    return apiService.upgradeSubscription(selectedOptionId);
  },
}));
