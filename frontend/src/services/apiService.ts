import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const url = error.config?.url;
          const data = error.response?.data;
          console.error(
            `API Error${status ? ` ${status}` : ''} on ${url ?? '(unknown url)'}:`,
            data ?? error.message
          );
        } else {
          console.error('Unexpected non-Axios error:', error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url: endpoint,
    });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url: endpoint,
      data,
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url: endpoint,
      data,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url: endpoint,
    });
  }
}

const apiService = new ApiService();
export default apiService;
