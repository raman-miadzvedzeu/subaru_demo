import { create } from "zustand";
import { ApiService } from "@/services";

export type Vehicle = {
  Id: string;
  Model: string;
  Customer: string;
  ProductLookup: string;
  VIN: string;
  Transmission: string;
  Engine: string;
  Year: number;
  extColor: string;
  intColor: string;
  VehicleLookup: string;
  ProductName: string;
};

export type Service = {
  Id: string;
  Name: string;
  Rate: string;
};

type SubscriptionOption = {
  SubProducts?: Service[];
} & Service;

export type SubscriptionProduct = {
  Id: string;
  ProductId: string;
  Name: string;
  StartDate: Date;
  EndDate?: Date;
};

type VehicleStore = {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  subscriptionOptions: SubscriptionOption[];
  services: Service[] | null;
  loading: boolean;
  error: string | null;
  selectedVehicle: Vehicle | null;
  selectedSubscriptionOption: SubscriptionOption | null;
  currentSubscriptions: SubscriptionProduct[];
  fetchVehicles: () => Promise<void>;
  fetchAllVehicles: () => Promise<void>;
  fetchSubscriptionOptions: () => Promise<void>;
  updateSubProducts: (subProducts: Service[]) => void;
  fetchServices: (vehicleId: string) => Promise<void>;
  selectVehicle: (vehicle: Vehicle) => void;
  selectSubscriptionOption: (subscriptionOption: SubscriptionOption) => void;
  upgradeSubscription: (
    productIds: string[]
  ) => Promise<{ error?: string } | null>;
  fetchCurrentSubscriptions: () => void;
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
  currentSubscriptions: [],

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
      const services = await apiService.getServices(vehicleId);
      set({ services, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCurrentSubscriptions: async () => {
    try {
      const { queryResponse } = await apiService.getCurrentSubscriptions();
      set({ currentSubscriptions: queryResponse, loading: false });
    } catch {
      set({ currentSubscriptions: [], loading: false });
    }
  },

  updateSubProducts: async (SubProducts: Service[]) => {
    set((state) => ({
      selectedSubscriptionOption: {
        ...state.selectedSubscriptionOption!,
        SubProducts,
      },
    }));
  },

  selectVehicle: (selectedVehicle: Vehicle) => {
    set({ selectedVehicle });
  },

  selectSubscriptionOption: (
    selectedSubscriptionOption: SubscriptionOption
  ) => {
    set({ selectedSubscriptionOption });
  },

  upgradeSubscription: async (productIds: string[]) => {
    try {
      set({ loading: true });
      return apiService.upgradeSubscription(productIds);
    } catch (error: any) {
      return { error: error };
    } finally {
      set({ loading: false });
    }
  },
}));
