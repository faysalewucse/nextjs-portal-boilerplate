import { create } from "zustand";
import { rolesApi, type Role, type CreateRoleData, type UpdateRoleData, type UpdatePermissionsData } from "@/lib/api/roles";
import { ApiError } from "@/lib/api/client";

interface RolesState {
  roles: Role[];
  selectedRole: Role | null;
  isLoading: boolean;
  error: string | null;
}

interface RolesActions {
  fetchRoles: (token: string) => Promise<void>;
  fetchRoleById: (id: string, token: string) => Promise<void>;
  createRole: (data: CreateRoleData, token: string) => Promise<void>;
  updateRole: (id: string, data: UpdateRoleData, token: string) => Promise<void>;
  updatePermissions: (id: string, data: UpdatePermissionsData, token: string) => Promise<void>;
  deleteRole: (id: string, token: string) => Promise<void>;
  setSelectedRole: (role: Role | null) => void;
  clearError: () => void;
}

type RolesStore = RolesState & RolesActions;

export const useRolesStore = create<RolesStore>((set, get) => ({
  roles: [],
  selectedRole: null,
  isLoading: false,
  error: null,

  fetchRoles: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesApi.getAllRoles(token);
      set({ roles: response.data, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to fetch roles";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  fetchRoleById: async (id: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesApi.getRoleById(id, token);
      set({ selectedRole: response.data, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to fetch role";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  createRole: async (data: CreateRoleData, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesApi.createRole(data, token);
      const { roles} = get();
      set({
        roles: [...roles, response.data],
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to create role";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateRole: async (id: string, data: UpdateRoleData, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesApi.updateRole(id, data, token);
      const { roles } = get();
      set({
        roles: roles.map((role) =>
          role._id === id ? response.data : role
        ),
        selectedRole: response.data,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to update role";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updatePermissions: async (id: string, data: UpdatePermissionsData, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rolesApi.updatePermissions(id, data, token);
      const { roles } = get();
      set({
        roles: roles.map((role) =>
          role._id === id ? response.data : role
        ),
        selectedRole: response.data,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to update permissions";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteRole: async (id: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      await rolesApi.deleteRole(id, token);
      const { roles } = get();
      set({
        roles: roles.filter((role) => role._id !== id),
        selectedRole: null,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Failed to delete role";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  setSelectedRole: (role: Role | null) => {
    set({ selectedRole: role });
  },

  clearError: () => {
    set({ error: null });
  },
}));
