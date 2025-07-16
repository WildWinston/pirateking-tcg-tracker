import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  label,
  className = ''
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isOpen && (
            <SearchIcon size={16} className="text-zinc-400" />
          )}
          <ChevronDownIcon 
            size={16} 
            className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left px-3 py-2 hover:bg-zinc-700 text-white transition-colors"
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-zinc-400">
              No decks found
            </div>
          )}
        </div>
      )}
    </div>
  );
} 