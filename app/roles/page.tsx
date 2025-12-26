"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/lib/auth/withAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRolesStore } from "@/stores/rolesStore";
import MainLayout from "@/components/layouts/MainLayout";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextFieldWithLabel from "@/components/forms/TextFieldWithLabel";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
} from "lucide-react";
import { isSystemAdmin, PERMISSIONS, getPermissionCategories, getPermissionsByCategory } from "@/lib/constants/permissions";
import { formatPermission } from "@/lib/utils/formatPermission";
import type { Role } from "@/lib/api/roles";

function RolesPage() {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const { roles, isLoading, error, fetchRoles, createRole, updateRole, updatePermissions, deleteRole, clearError } = useRolesStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleFormData, setRoleFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const userRole = typeof user?.role === "string" ? null : user?.role;
  const isSuperAdmin = userRole ? isSystemAdmin(userRole.permissions) : false;

  useEffect(() => {
    if (!isSuperAdmin) {
      router.replace("/unauthorized");
      return;
    }

    if (accessToken) {
      fetchRoles(accessToken).catch(console.error);
    }
  }, [accessToken, isSuperAdmin, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setEditingRole(null);
    setRoleFormData({
      name: "",
      description: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (role: Role) => {
    setEditingRole(role);
    setRoleFormData({
      name: role.name,
      description: role.description,
      isActive: role.isActive,
    });
    setIsModalOpen(true);
  };

  const handleOpenPermissionsModal = (role: Role) => {
    setEditingRole(role);
    setSelectedPermissions(role.permissions);
    setIsPermissionsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPermissionsModalOpen(false);
    setEditingRole(null);
    clearError();
  };

  const handleSubmitRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      if (editingRole) {
        await updateRole(editingRole._id, roleFormData, accessToken);
      } else {
        await createRole(roleFormData, accessToken);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const handleSubmitPermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !editingRole) return;

    try {
      await updatePermissions(editingRole._id, { permissions: selectedPermissions }, accessToken);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!accessToken) return;
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      await deleteRole(roleId, accessToken);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const togglePermission = (permissionKey: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((p) => p !== permissionKey)
        : [...prev, permissionKey]
    );
  };

  const selectAllInCategory = (category: string) => {
    const categoryPerms = getPermissionsByCategory(category).map((p) => p.key);
    const allSelected = categoryPerms.every((p) => selectedPermissions.includes(p));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPerms.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryPerms])]);
    }
  };

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <MainLayout title="Roles Management">
      <div className="mx-auto max-w-7xl space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <PrimaryButton
                onClick={handleOpenCreateModal}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Create Role
              </PrimaryButton>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                {error}
              </div>
            )}

            {/* Roles Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRoles.map((role) => (
                  <div
                    key={role._id}
                    className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold capitalize">{role.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {role.permissions.length} permissions
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          role.isActive
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {role.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {role.description || "No description"}
                    </p>

                    <div className="flex gap-2">
                      <PrimaryButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenPermissionsModal(role)}
                        className="flex-1"
                      >
                        Permissions
                      </PrimaryButton>
                      <PrimaryButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditModal(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </PrimaryButton>
                      <PrimaryButton
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRole(role._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? "No roles found matching your search" : "No roles yet. Create one to get started!"}
                </p>
              </div>
            )}
          </div>

      {/* Create/Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingRole ? "Edit Role" : "Create Role"}
            </h2>
            <form onSubmit={handleSubmitRole} className="space-y-4">
              <TextFieldWithLabel
                label="Role Name"
                type="text"
                value={roleFormData.name}
                onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                placeholder="e.g., moderator"
                required
                disabled={isLoading}
              />
              <TextFieldWithLabel
                label="Description"
                type="text"
                value={roleFormData.description}
                onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                placeholder="Role description"
                disabled={isLoading}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={roleFormData.isActive}
                  onChange={(e) => setRoleFormData({ ...roleFormData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-input"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active Role
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <PrimaryButton type="submit" loading={isLoading} className="flex-1">
                  {editingRole ? "Update" : "Create"}
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                >
                  Cancel
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {isPermissionsModalOpen && editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border bg-card p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">
              Manage Permissions: <span className="capitalize text-primary">{editingRole.name}</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {selectedPermissions.length} of {PERMISSIONS.length} permissions selected
            </p>

            <form onSubmit={handleSubmitPermissions} className="space-y-6">
              {getPermissionCategories().map((category) => {
                const categoryPerms = getPermissionsByCategory(category);
                const selectedCount = categoryPerms.filter((p) =>
                  selectedPermissions.includes(p.key)
                ).length;

                return (
                  <div key={category} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{category}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {selectedCount}/{categoryPerms.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => selectAllInCategory(category)}
                          className="text-xs text-primary hover:underline"
                        >
                          {selectedCount === categoryPerms.length ? "Deselect All" : "Select All"}
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {categoryPerms.map((permission) => (
                        <label
                          key={permission.key}
                          className="flex items-start gap-2 p-2 rounded hover:bg-accent/50 cursor-pointer"
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(permission.key)}
                              onChange={() => togglePermission(permission.key)}
                              className="h-4 w-4 rounded border-input"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{formatPermission(permission.key)}</p>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 pt-4 sticky bottom-0 bg-card pb-2">
                <PrimaryButton type="submit" loading={isLoading} className="flex-1">
                  Save Permissions
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                >
                  Cancel
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default withAuth(RolesPage, { requirePortalAccess: true });
