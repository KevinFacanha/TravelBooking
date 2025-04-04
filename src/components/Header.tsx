import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Hotel } from 'lucide-react';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Hotel size={24} />
          <span className="text-xl font-bold">TravelBooking</span>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 hover:text-blue-200"
          >
            <LogOut size={20} />
            Sair
          </button>
        )}
      </div>
    </header>
  );
};