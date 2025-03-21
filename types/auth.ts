export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  firstName: string;
  lastName: string;
} 