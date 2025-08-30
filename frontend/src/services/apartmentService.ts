import apiService from './apiService';
import { Apartment, CreateApartmentDto } from '@/types/apartment';

interface ApartmentListResponse {
  items: Apartment[];
  page: number;
  limit: number;
  total: number;
}

class ApartmentService {
  private readonly endpoint = '/apartments';

  async getAll(page: number = 1, limit: number = 10): Promise<ApartmentListResponse> {
    return apiService.get<ApartmentListResponse>(`${this.endpoint}?page=${page}&limit=${limit}`);
  }

  async getById(id: string): Promise<Apartment> {
    return apiService.get<Apartment>(`${this.endpoint}/${id}`);
  }

  async create(apartment: CreateApartmentDto): Promise<Apartment> {
    return apiService.post<Apartment>(this.endpoint, apartment);
  }

  async getByProject(project: string, page: number = 1, limit: number = 10): Promise<ApartmentListResponse> {
    return apiService.get<ApartmentListResponse>(`${this.endpoint}?project=${encodeURIComponent(project)}&page=${page}&limit=${limit}`);
  }

  async searchByTitle(query: string, page: number = 1, limit: number = 10): Promise<ApartmentListResponse> {
    return apiService.get<ApartmentListResponse>(`${this.endpoint}?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  }


}

const apartmentService = new ApartmentService();
export default apartmentService;
