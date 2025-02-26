import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import {allUserTypes, OverviewsRaw} from "@/context/AuthProvider.tsx";

// Login Hook
export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
  });
};

// Check Auth
export const useCheckAuth = () => {
  return useMutation({
    mutationKey: ["check-auth"],
    mutationFn: async () => {
      const response = await api.post("/check-auth");
      return response.data as {message: string};
    },
  });
};

// Change Password Hook
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await api.post("/change-password", data);
      return response.data;
    },
  });
};

// Change Username Hook
export const useChangeUsername = () => {
  return useMutation({
    mutationKey: ["change-username"],
    mutationFn: async (data: { username: string }) => {
      const response = await api.post("/user/change-username", data);
      return response.data;
    },
  });
};

// Get Referrals Hook
export const useGetReferrals = () => {
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const response = await api.get("/referrals");
      return response.data;
    },
  });
};

// Get Referrals Hook
export const useGetLevelTwoSum = (address: string) => {
  return useQuery({
    queryKey: ["level-two", address],
    queryFn: async () => {
      const response = await api.get(`/level2?address=${address}`);
      return response.data as {address: string, total: number};
    },
  });
};

// Get Statistics Hook
export const useGetStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await api.get("/statistics");
      return response.data;
    },
  });
};

// Get Overview Hook
export const useGetOverview = (address: string) => {
  return useQuery({
    queryKey: ["overview", address],
    queryFn: async () => {
      const response = await api.get("/overview");
      return response.data as OverviewsRaw[];
    },
  });
};

// Get all users Hook
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const response = await api.get("/get-all-users");
      return response.data as allUserTypes;
    },
  });
};

// Get Total Expenses Hook
export const useGetTotalExpenses = () => {
  return useQuery({
    queryKey: ["total-expenses"],
    queryFn: async () => {
      const response = await api.get("/expenses/total");
      return response.data;
    },
  });
};

// Set Admin Address Hook
export const useSetAdminAddress = () => {
  return useMutation({
    mutationKey: ["set-admin"],
    mutationFn: async (data: { adminAddress: string }) => {
      const response = await api.post("/set", data);
      return response.data;
    },
  });
};

// Set Referral Admin Address Hook
export const useSetRefAdminAddress = () => {
  return useMutation({
    mutationKey: ["set-refAdmin"],
    mutationFn: async (data: {address: string, currentAddress: string, type: string}) => {
      const response = await api.put("/update-admin-address", data);
      return response.data;
    },
  });
};

interface Admin {
  id: number;
  adminId: number;
  type: string;
  address: string;
  active: boolean;
}

interface AdminResponse {
  admin: Admin;
  refAdmin: Admin
}

// Get Admin Address Hook
export const useGetAdminAddress = () => {
  return useQuery({
    queryKey: ["admin-address"],
    queryFn: async () => {
      const response = await api.get("/address");
      return response.data as AdminResponse;
    },
  });
};