export interface ApiResponse<T = any> {
  status: number;
  message: string;
  type: 'success' | 'error';
  data?: T;
  error?: any;
}
