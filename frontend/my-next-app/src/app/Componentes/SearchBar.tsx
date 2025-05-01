"use client";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar por nome, email ou CPF"
      value={searchTerm}
      onChange={onSearchChange}
      className="w-full p-4 border border-gray-300 rounded-lg 
                text-gray-800 text-base md:text-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                placeholder-gray-500
                shadow-sm transition-all duration-200 mb-4"
    />
  );
}