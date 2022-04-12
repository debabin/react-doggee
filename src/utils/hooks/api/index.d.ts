interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}

interface ApiFailureResponse {
  data: { message: string };
  success: false;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
