"use client";

import { ReactNode, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminConfiguracoes from '../sections/AdminConfiguracoes';
import AdminHome from '../sections/AdminHome';
import AdminImigrantes from '../sections/AdminImigrantes';
import AdminUsuarios from '../sections/AdminUsuarios';

interface AdminLayoutProps {
  children: ReactNode;
}


export default function AdminLayout({ children }: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <AdminHome />
        );
      case 'usuarios':
        return (
          <AdminUsuarios />
        );
      case 'imigrantes':
        return (
          <AdminImigrantes />
        );
      case 'configuracoes':
        return (
          <AdminConfiguracoes />
        );
      default:
        return (
          <AdminHome />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 overflow-auto bg-indigo-50 p-4">
        {renderSection()}
      </div>
    </div>
  );
}
