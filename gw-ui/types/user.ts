export interface UserOutDto {
  username: string;
  role: {
    role: string;
  };
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
} 