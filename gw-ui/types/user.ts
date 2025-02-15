import { LocationDto } from './location';

export interface UserOutDto {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: {
    role: string;
  };
  address: LocationDto | null;
} 