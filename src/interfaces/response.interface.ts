export interface ApiResponse {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}