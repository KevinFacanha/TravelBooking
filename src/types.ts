export interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  location: string;
}

export interface Booking {
  id: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}