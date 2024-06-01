export interface FormData {
  username: string;
  password: string;
}
export interface SignInResponse {
  expired: number;
  message: string;
  success: boolean;
  token: string;
  uid: string;
}
