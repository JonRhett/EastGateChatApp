export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role?: string;
  email_confirmed_at?: string | null;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  isEmailVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar?: boolean;
}