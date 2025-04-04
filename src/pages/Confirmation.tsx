import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Users, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

export const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, booking } = location.state || {};

  if (!hotel || !booking) {
    return <div>Informações da reserva não encontradas</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800">Reserva Confirmada!</h2>
          <p className="text-lg text-blue-600 font-semibold mt-2">
            Total: R$ {booking.totalPrice}
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">{hotel.name}</h3>
          <p className="text-gray-600 mb-2">{hotel.location}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-medium">{booking.checkIn}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-medium">{booking.checkOut}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-gray-400 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Hóspedes</p>
                <p className="font-medium">{booking.guests}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Informações do hóspede</h4>
          <p>{booking.name}</p>
          <p className="text-gray-600">{booking.email}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Um email com os detalhes da sua reserva foi enviado para {booking.email}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </div>
  );
};