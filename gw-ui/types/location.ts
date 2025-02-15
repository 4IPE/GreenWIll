export interface LocationDto {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  floor?: number;
  entrance?: number;
  latitude?: number;
  longitude?: number;
}