export interface UserState {
  id: number;
  email: string;
  access_token: string;
  loading: boolean;
  error: any;
}

export interface User {
  id: number;
  email: string;
  access_token: string;
}


export interface UserResponse {
  status: string;
  data?: User;
}
