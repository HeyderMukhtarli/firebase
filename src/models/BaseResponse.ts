export interface BaseResponse<T> {
  message: string | null;
  data: T;
  success: boolean;
}
