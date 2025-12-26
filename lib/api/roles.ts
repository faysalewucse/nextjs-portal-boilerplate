import { apiClient } from "./client";

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleData {
  name: string;
  permissions?: string[];
  description?: string;
  isActive?: boolean;
}

export interface UpdateRoleData {
  name?: string;
  permissions?: string[];
  description?: string;
  isActive?: boolean;
}

export interface UpdatePermissionsData {
  permissions: string[];
}

export interface RoleResponse {
  status: string;
  message: string;
  data: Role;
}

export interface RolesListResponse {
  status: string;
  message: string;
  data: Role[];
}

export const rolesApi = {
  async getAllRoles(token: string): Promise<RolesListResponse> {
    return apiClient.get<RolesListResponse>("/roles", { token });
  },

  async getRoleById(id: string, token: string): Promise<RoleResponse> {
    return apiClient.get<RoleResponse>(`/roles/${id}`, { token });
  },

  async createRole(
    data: CreateRoleData,
    token: string
  ): Promise<RoleResponse> {
    return apiClient.post<RoleResponse>("/roles", data, { token });
  },

  async updateRole(
    id: string,
    data: UpdateRoleData,
    token: string
  ): Promise<RoleResponse> {
    return apiClient.patch<RoleResponse>(`/roles/${id}`, data, { token });
  },

  async updatePermissions(
    id: string,
    data: UpdatePermissionsData,
    token: string
  ): Promise<RoleResponse> {
    return apiClient.patch<RoleResponse>(`/roles/${id}/permissions`, data, {
      token,
    });
  },

  async deleteRole(id: string, token: string): Promise<{ status: string; message: string }> {
    return apiClient.delete(`/roles/${id}`, { token });
  },
};
