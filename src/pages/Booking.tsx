import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotels } from '../data/mockData';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Users, CreditCard, Calculator } from 'lucide-react';

export const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = hotels.find(h => h.id === Number(id));

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const priceCalculation = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return null;

    const nights = differenceInDays(new Date(formData.checkOut), new Date(formData.checkIn));
    if (nights <= 0) return null;

    const basePrice = hotel?.price || 0;
    const guestMultiplier = formData.guests > 2 ? 1 + ((formData.guests - 2) * 0.3) : 1;
    const totalPrice = basePrice * nights * guestMultiplier;

    return {
      nights,
      basePrice,
      guestMultiplier,
      totalPrice: Math.round(totalPrice),
      pricePerNight: Math.round(totalPrice / nights)
    };
  }, [formData.checkIn, formData.checkOut, formData.guests, hotel?.price]);

  if (!hotel) {
    return <div>Hotel não encontrado</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/confirmation', { 
      state: { 
        hotel,
        booking: {
          ...formData,
          totalPrice: priceCalculation?.totalPrice
        }
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Reserva - {hotel.name}</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              A partir de R$ {hotel.price}/noite
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de hóspedes
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                className="pl-10 w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {priceCalculation && (
            <div className="mb-6 bg-blue-50 p-4 rounded-md">
              <div className="flex items-center mb-3">
                <Calculator className="text-blue-600 mr-2" size={24} />
                <h4 className="text-lg font-semibold text-blue-900">Resumo do preço</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Diária base:</span>
                  <span>R$ {hotel.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Número de noites:</span>
                  <span>{priceCalculation.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hóspedes:</span>
                  <span>{formData.guests} {formData.guests > 2 && `(+${Math.round((priceCalculation.guestMultiplier - 1) * 100)}% taxa adicional)`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Preço por noite:</span>
                  <span>R$ {priceCalculation.pricePerNight}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-blue-900">
                  <span>Total:</span>
                  <span>R$ {priceCalculation.totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Informações pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Informações de pagamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número do cartão"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};