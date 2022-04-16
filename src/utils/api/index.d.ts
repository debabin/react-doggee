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

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
declare type $TSFixMe = any;
