'use client';

import { Plus, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import AddAdminModal from '@/components/AddAdminModal';
import EditPermissionsModal from '@/components/EditPermissionsModal';
import {
  createAdmin,
  type AdminPermissions,
  type AdminRole,
  type PermissionLevel
} from '@/lib/api';

type UiRole = {
  name: Exclude<AdminRole, 'User'>;
  admins: number;
  permissions: {
    liveTools: boolean;
    payouts: boolean;
    products: boolean;
    revenueView: boolean;
    viewDashboard: boolean;
    globalSettings: boolean;
  };
};

const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  live_tools: 'none',
  payout: 'none',
  products: 'none',
  revenue_view: 'none',
  dashboard: 'none',
  global_settings: 'none',
  logs: 'none',
  creators: 'none',
  users: 'none',
  events: 'none',
  support_center: 'none',
  notifications: 'none',
  settings: 'none'
};

export default function AdminRolesPage() {
  const router = useRouter();
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [roles, setRoles] = useState<UiRole[]>([
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

  const toPermissionLevel = (value: boolean): PermissionLevel =>
    value ? 'both' : 'none';

  const buildPermissionsForRole = (role: AdminRole): AdminPermissions => {
    const selectedRole = roles.find((item) => item.name === role);
    if (!selectedRole) {
      return DEFAULT_ADMIN_PERMISSIONS;
    }

    return {
      ...DEFAULT_ADMIN_PERMISSIONS,
      live_tools: toPermissionLevel(selectedRole.permissions.liveTools),
      payout: toPermissionLevel(selectedRole.permissions.payouts),
      products: toPermissionLevel(selectedRole.permissions.products),
      revenue_view: toPermissionLevel(selectedRole.permissions.revenueView),
      dashboard: toPermissionLevel(selectedRole.permissions.viewDashboard),
      global_settings: toPermissionLevel(selectedRole.permissions.globalSettings)
    };
  };

  const handleAddAdmin = async ({
    email,
    firstName,
    lastName,
    role
  }: {
    email: string;
    firstName: string;
    lastName: string;
    role: AdminRole;
  }) => {
    await createAdmin({
      email,
      first_name: firstName,
      last_name: lastName,
      role,
      permissions: buildPermissionsForRole(role)
    });

    if (role !== 'User') {
      setRoles((prevRoles) =>
        prevRoles.map((item) =>
          item.name === role ? { ...item, admins: item.admins + 1 } : item
        )
      );
    }

    setFeedback({
      type: 'success',
      text: `Admin created successfully for ${email}.`
    });
    setShowAddAdminModal(false);
  };

  const handleSavePermissions = (updatedPermissions: any) => {
    setRoles(updatedPermissions);
    console.log('Permissions updated:', updatedPermissions);
  };

  return (
    <PageContainer>
      {/* Go Back Button */}
      <button
        onClick={() => router.back()}
        className="flex flex-row items-center px-2 py-1.5 gap-1.5 w-[88px] h-[29px] bg-[#F9F9FB] rounded-md hover:bg-gray-200 transition-colors"
        style={{
          padding: '6px 8px',
          gap: '6px',
          width: '88px',
          height: '29px',
          background: '#F9F9FB',
          borderRadius: '6px',
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '16px',
            height: '16px',
            flexShrink: 0,
          }}
        >
          <path 
            d="M13.3333 8H2.66666M2.66666 8L6.66666 4M2.66666 8L6.66666 12" 
            stroke="#2B2834" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span 
          className="text-sm font-medium leading-[17px] tracking-[-0.01em] text-[#2B2834]"
          style={{
            width: '50px',
            height: '17px',
            fontFamily: 'Neue Montreal',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
            color: '#2B2834',
          }}
        >
          Go back
        </span>
      </button>

      {/* Main Content */}
      <div className="flex flex-col gap-2 w-full">
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <h1 className="text-[20px] font-bold text-[#2B2834] leading-[100%] tracking-[-0.01em] font-['Neue_Montreal']">
            Admin Roles
          </h1>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowEditPermissionsModal(true)}
              className="flex justify-center items-center px-4 py-2 h-8 bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors"
            >
              <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
                Edit Permissions
              </span>
            </button>

            <button 
              onClick={() => setShowAddAdminModal(true)}
              className="flex justify-center items-center px-4 py-2 gap-1 h-8 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3 h-3 text-[#FFFCF8]" strokeWidth={1.5} />
              <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
                Add Admin
              </span>
            </button>
          </div>
        </div>

        {feedback ? (
          <div
            className={`w-full rounded-md border px-3 py-2 text-sm ${
              feedback.type === 'success'
                ? 'border-[#B5E3D3] bg-[#E7F3EF] text-[#239B73]'
                : 'border-[#F1C6C4] bg-[#FBECEB] text-[#CD110A]'
            }`}
          >
            {feedback.text}
          </div>
        ) : null}

        {/* Permissions Table */}
        <div className="flex flex-col p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg overflow-x-auto">
          {/* Table Header */}
          <div className="flex items-center px-6 py-2 gap-4 w-full min-w-[800px] bg-[#F9F9FB]">
            <div className="w-[103px] text-xs font-medium leading-[14px] text-[#2B2834]">
              Role
            </div>
            <div className="w-[80px] text-xs font-medium leading-[14px] text-[#2B2834]">
              Admins
            </div>
            <div className="w-0 h-[14px] border-l border-[#EBEBEB]" />
            <div className="flex justify-center items-center gap-4 flex-1">
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
          <div className="flex flex-col w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden min-w-[800px]">
            {roles.map((role, roleIdx) => (
              <div
                key={roleIdx}
                className={`flex items-center px-6 py-3 gap-4 w-full ${
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
                <div className="flex justify-center items-center gap-4 flex-1">
                  {permissionKeys.map((permKey, permIdx) => {
                    const hasPermission = role.permissions[permKey];
                    return (
                      <div
                        key={permIdx}
                        className="flex justify-center items-center flex-1"
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

      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => {
          setShowAddAdminModal(false);
          setFeedback(null);
        }}
        onConfirm={handleAddAdmin}
      />

      <EditPermissionsModal
        isOpen={showEditPermissionsModal}
        onClose={() => setShowEditPermissionsModal(false)}
        onSave={handleSavePermissions}
        initialPermissions={roles}
      />
    </PageContainer>
  );
}
