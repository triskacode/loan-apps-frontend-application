export interface HttpResponse<Data = any> {
  code: number;
  message: string;
  errors: null;
  data: Data;
}
export interface HttpErrorResponse {
  code: number;
  message: string;
  errors: string | Record<string, string> | null;
  data: null;
}
