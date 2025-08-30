export interface Apartment {
  id: string; 
  unitName: string;
  unitNumber: string; 
  project: string;
  price: number;
  description: string;
  imageUrl?: string; 
  createdAt: string; 
  updatedAt: string;
}

export interface CreateApartmentDto {
  unitName: string; 
  unitNumber: string;
  project: string;
  price: number;
  description: string;
  imageUrl?: string;
}
