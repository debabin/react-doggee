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

type ApiParams<T = null> = { params: T; config?: RequestInit };
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
declare type $TSFixMe = any;

type BaseUrl = string;
interface InterceptorResponseResult {
  ok: Response['ok'];
  status: Response['status'];
  statusText: Response['statusText'];
  body: any;
}

type SuccessResponseFun = (res: InterceptorResponseResult) => InterceptorResponseResult['body'];
type SuccessRequestFun = (options: RequestInit) => RequestInit;
type FailureFun = (e: Error) => InterceptorResponseResult['body'];

type Interceptors = {
  request?: Array<{
    onSuccess: SuccessRequestFun;
    onFailure?: FailureFun;
  }>;
  response?: Array<{
    onSuccess: SuccessResponseFun;
    onFailure?: FailureFun;
  }>;
};
