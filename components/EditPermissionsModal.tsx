'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: any) => void;
  initialPermissions: any;
}

export default function EditPermissionsModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialPermissions 
}: EditPermissionsModalProps) {
  const [permissions, setPermissions] = useState(initialPermissions);

  const roleNames = ['Super Admin', 'Admin', 'Moderator', 'Viewer'];
  const permissionNames = [
    'Live Tools',
    'Payouts', 
    'Products',
    'Revenue View',
    'View Dashboard',
    'Global Settings'
  ];

  const permissionKeys = [
    'liveTools',
    'payouts',
    'products', 
    'revenueView',
    'viewDashboard',
    'globalSettings'
  ];

  const togglePermission = (roleIndex: number, permissionKey: string) => {
    setPermissions((prev: any) => {
      const newPermissions = [...prev];
      newPermissions[roleIndex] = {
        ...newPermissions[roleIndex],
        permissions: {
          ...newPermissions[roleIndex].permissions,
          [permissionKey]: !newPermissions[roleIndex].permissions[permissionKey],
        },
      };
      return newPermissions;
    });
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="flex flex-col justify-end items-end p-5 gap-6 w-[519px] h-[443px] bg-white rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-1 w-[479px] h-[37px] self-start">
          <h3 className="text-base font-bold leading-[19px] text-[#2B2834] w-full">
            Edit Permissions
          </h3>
          <p className="text-xs font-medium leading-[14px] text-[#A5A1AF] w-full">
            Click the check boxes to modify permissions
          </p>
        </div>

        {/* Permissions Table */}
        <div className="flex flex-col items-start p-1 gap-1 w-[479px] h-[282px] bg-[#F9F9FB] rounded-lg">
          {/* Table Header */}
          <div className="flex flex-row items-center px-6 py-2 gap-4 w-[471px] h-[30px]">
            <div className="w-[90.84px] text-xs font-medium leading-[14px] text-[#2B2834]">
              Permission
            </div>
            <div className="w-0 h-[14px] border-l border-[#EBEBEB]" />
            <div className="flex flex-row justify-center items-center gap-2 flex-1">
              {roleNames.map((roleName, idx) => (
                <div
                  key={idx}
                  className="flex-1 text-xs font-medium leading-[14px] text-center text-[#2B2834]"
                >
                  {roleName}
                </div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col items-start w-[471px] h-[240px] bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
            {permissionNames.map((permissionName, permIdx) => (
              <div
                key={permIdx}
                className={`flex flex-row items-center px-6 py-3 gap-4 w-full h-10 ${
                  permIdx !== permissionNames.length - 1 ? 'border-b border-[#EBEBEB]' : ''
                }`}
              >
                <div className="w-[90.84px] text-xs font-medium leading-[14px] text-[#2B2834]">
                  {permissionName}
                </div>
                <div className="w-0 h-4 border-l border-[#EBEBEB]" />
                <div className="flex flex-row justify-center items-center gap-2 flex-1">
                  {permissions.map((role: any, roleIdx: number) => {
                    const hasPermission = role.permissions[permissionKeys[permIdx]];
                    return (
                      <div
                        key={roleIdx}
                        className="flex flex-row justify-center items-center flex-1"
                      >
                        <button
                          onClick={() => togglePermission(roleIdx, permissionKeys[permIdx])}
                          className={`w-4 h-4 rounded flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                            hasPermission 
                              ? 'bg-[#5F2EFC] border border-[#5F2EFC]' 
                              : 'bg-white border border-[#EBEBEB]'
                          }`}
                        >
                          {hasPermission && (
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
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

        {/* Action Buttons */}
        <div className="flex flex-row items-start gap-2 w-[176px] h-9">
          <button
            onClick={onClose}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#353A44]">
              Cancel
            </span>
          </button>

          <button
            onClick={handleSave}
            className="flex flex-row justify-center items-center px-6 py-2 h-9 bg-gradient-to-b from-[#5F2EFC] to-[#4E18FC] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:opacity-90 transition-opacity"
          >
            <span className="text-[13.5px] font-medium leading-4 text-[#FFFCF8]">
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}