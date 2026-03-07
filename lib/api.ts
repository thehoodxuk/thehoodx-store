import axios, { AxiosError } from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status || 500;
    const data = error.response?.data;
    const message = ((data as any)?.error) || ((data as any)?.message) || error.message || "An unexpected error occurred";

    // You can handle 401 Unauthorized globally here if needed (e.g., dispatch logout)

    return Promise.reject(new ApiError(message, status, data));
  }
);
