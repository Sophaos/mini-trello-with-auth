export interface ValidateUserDTO {
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  name: string;
  id: number;
}

export interface SignUpDTO {
  email: string;
  name: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
