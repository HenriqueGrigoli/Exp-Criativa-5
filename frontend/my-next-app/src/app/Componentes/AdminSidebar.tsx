"use client";

import { JSX } from 'react';

interface AdminSidebarProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

export default function AdminSidebar({ onSectionChange, activeSection }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-indigo-700 text-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="p-4 flex flex-col items-center border-b border-indigo-600">
          <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center mb-2">
            <span className="text-xl font-semibold">AD</span>
          </div>
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-xs text-indigo-200">admin@example.com</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem 
              icon="home" 
              onClick={() => onSectionChange('home')}
              active={activeSection === 'home'}
            >
              Home
            </NavItem>
            <NavItem 
              icon="users" 
              onClick={() => onSectionChange('usuarios')}
              active={activeSection === 'usuarios'}
            >
              Usuários
            </NavItem>
            <NavItem 
              icon="documents" 
              onClick={() => onSectionChange('imigrantes')}
              active={activeSection === 'imigrantes'}
            >
              Imigrantes
            </NavItem>
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-indigo-600">
        <button className="flex items-center p-2 w-full rounded-lg hover:bg-indigo-800">
          <SidebarIcon icon="logout" />
          Sair
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: string;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ icon, onClick, children, active = false }: NavItemProps) {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`flex items-center p-2 w-full rounded-lg hover:bg-indigo-800 ${active ? 'bg-indigo-800' : ''}`}
      >
        <SidebarIcon icon={icon} />
        {children}
      </button>
    </li>
  );
}

function SidebarIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    documents: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    logout: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    )
  };

  return icons[icon] || null;
}
