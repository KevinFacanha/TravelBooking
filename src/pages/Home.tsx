import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';
import { hotels } from '../data/mockData';
import { Star, MapPin, RefreshCw } from 'lucide-react';

export const Home: React.FC = () => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (location: string, checkIn: string, checkOut: string, guests: number) => {
    const filtered = hotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setFilteredHotels(hotels);
    setSearchPerformed(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchForm onSearch={handleSearch} />
      </div>

      {searchPerformed && filteredHotels.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum hotel encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Não encontramos hotéis para os critérios selecionados. Tente outras datas ou destinos.
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              Destinos disponíveis: Rio de Janeiro, São Paulo, Campos do Jordão, Florianópolis, 
              Manaus, Salvador, Foz do Iguaçu, Búzios, Bento Gonçalves, Natal, Ouro Preto, Corumbá
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <RefreshCw size={20} className="mr-2" />
              Voltar para todos os hotéis
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {hotel.location}
                </p>
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400" size={20} />
                  <span className="ml-1">{hotel.rating}</span>
                </div>
                <p className="text-gray-700 mb-4">{hotel.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {hotel.price}
                  </span>
                  <button
                    onClick={() => navigate(`/booking/${hotel.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};