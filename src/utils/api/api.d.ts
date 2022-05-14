interface ApiSuccessResponse<T> {
  data: T;
  success: true;
  status: number;
}

interface ApiFailureResponse {
  data: { message: string };
  success: false;
  status: number;
}

type ApiParams<T> = { params: T; config?: RequestInit };
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
declare type $TSFixMe = any;
