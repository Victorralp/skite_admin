'use client';

import { ArrowLeft, Plus, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddAdminModal from '@/components/AddAdminModal';
import EditPermissionsModal from '@/components/EditPermissionsModal';

export default function AdminRolesPage() {
  const router = useRouter();
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);

  const [roles, setRoles] = useState([
    {
      name: 'Super Admin',
      admins: 1,
      permissions: {
        liveTools: true,
        payouts: true,
        products: true,
        revenueView: true,
        viewDashboard: true,
        globalSettings: true,
      },
    },
    {
      name: 'Admin',
      admins: 2,
      permissions: {
        liveTools: false,
        payouts: true,
        products: true,
        revenueView: true,
        viewDashboard: true,
        globalSettings: true,
      },
    },
    {
      name: 'Moderator',
      admins: 5,
      permissions: {
        liveTools: true,
        payouts: false,
        products: true,
        revenueView: false,
        viewDashboard: false,
        globalSettings: false,
      },
    },
    {
      name: 'Viewer',
      admins: 12,
      permissions: {
        liveTools: false,
        payouts: false,
        products: false,
        revenueView: true,
        viewDashboard: true,
        globalSettings: false,
      },
    },
  ]);

  const permissionColumns = [
    'Live Tools',
    'Payouts',
    'Products',
    'Revenue View',
    'View Dashboard',
    'Global Settings',
  ];

  const permissionKeys: (keyof typeof roles[0]['permissions'])[] = [
    'liveTools',
    'payouts',
    'products',
    'revenueView',
    'viewDashboard',
    'globalSettings',
  ];

  const togglePermission = (roleIndex: number, permissionKey: keyof typeof roles[0]['permissions']) => {
    setRoles(prevRoles => {
      const newRoles = [...prevRoles];
      newRoles[roleIndex] = {
        ...newRoles[roleIndex],
        permissions: {
          ...newRoles[roleIndex].permissions,
          [permissionKey]: !newRoles[roleIndex].permissions[permissionKey],
        },
      };
      return newRoles;
    });
  };

  const handleAddAdmin = (email: string, role: string) => {
    // Handle adding new admin here
    console.log('Adding admin:', email, 'with role:', role);
    setShowAddAdminModal(false);
    // You might want to update the admin count for the selected role
  };

  const handleSavePermissions = (updatedPermissions: any) => {
    setRoles(updatedPermissions);
    console.log('Permissions updated:', updatedPermissions);
  };

  return (
    <div className="flex flex-col items-start gap-8 px-4 sm:px-8 md:px-12 lg:px-16 py-6 bg-white min-h-screen">
      <div className="flex flex-col items-start gap-8 w-full max-w-[1102px]">
        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center px-2 py-1.5 gap-1.5 bg-[#F9F9FB] rounded-md hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#2B2834]" strokeWidth={1.5} />
          <span className="text-sm font-medium leading-[17px] tracking-[-0.01em] text-[#2B2834]">
            Go back
          </span>
        </button>

        {/* Main Content */}
        <div className="flex flex-col items-start gap-4 w-full bg-white">
          {/* Header */}
          <div className="flex flex-row justify-between items-start w-full">
            <h1 className="text-[20px] font-bold leading-6 tracking-[-0.01em] text-[#2B2834]">
              Admin Roles
            </h1>

            <div className="flex flex-row items-center gap-2">
              <button 
                onClick={() => setShowEditPermissionsModal(true)}
                className="flex flex-row justify-center items-center px-4 py-2 h-8 bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors"
              >
                <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
                  Edit Permissions
                </span>
              </button>

              <button 
                onClick={() => setShowAddAdminModal(true)}
                className="flex flex-row justify-center items-center px-4 py-2 gap-1 h-8 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3 h-3 text-[#FFFCF8]" strokeWidth={1.5} />
                <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
                  Add Admin
                </span>
              </button>
            </div>
          </div>

          {/* Permissions Table */}
          <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg overflow-x-auto">
            {/* Table Header */}
            <div className="flex flex-row items-center px-6 py-2 gap-4 w-full min-w-[800px] bg-[#F9F9FB]">
              <div className="w-[103px] text-xs font-medium leading-[14px] text-[#2B2834]">
                Role
              </div>
              <div className="w-[80px] text-xs font-medium leading-[14px] text-[#2B2834]">
                Admins
              </div>
              <div className="w-0 h-[14px] border-l border-[#EBEBEB]" />
              <div className="flex flex-row justify-center items-center gap-4 flex-1">
                {permissionColumns.map((col, idx) => (
                  <div
                    key={idx}
                    className="flex-1 text-xs font-medium leading-[14px] text-center text-[#2B2834]"
                  >
                    {col}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden min-w-[800px]">
              {roles.map((role, roleIdx) => (
                <div
                  key={roleIdx}
                  className={`flex flex-row items-center px-6 py-3 gap-4 w-full ${
                    roleIdx !== roles.length - 1 ? 'border-b border-[#EBEBEB]' : ''
                  }`}
                >
                  <div className="w-[103px] text-[13.5px] font-normal leading-4 text-[#2B2834]">
                    {role.name}
                  </div>
                  <div className="w-[80px] text-[13.5px] font-normal leading-4 text-[#2B2834]">
                    {role.admins}
                  </div>
                  <div className="w-0 h-4 border-l border-[#EBEBEB]" />
                  <div className="flex flex-row justify-center items-center gap-4 flex-1">
                    {permissionKeys.map((permKey, permIdx) => {
                      const hasPermission = role.permissions[permKey];
                      return (
                        <div
                          key={permIdx}
                          className="flex flex-row justify-center items-center flex-1"
                        >
                          <button
                            onClick={() => togglePermission(roleIdx, permKey)}
                            className="w-4 h-4 rounded flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                            style={{
                              backgroundColor: hasPermission ? '#5F2EFC' : '#CD110A',
                              border: hasPermission ? '1px solid #5F2EFC' : 'none',
                            }}
                          >
                            {hasPermission ? (
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                            ) : (
                              <X className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onConfirm={handleAddAdmin}
      />

      <EditPermissionsModal
        isOpen={showEditPermissionsModal}
        onClose={() => setShowEditPermissionsModal(false)}
        onSave={handleSavePermissions}
        initialPermissions={roles}
      />
    </div>
  );
}
