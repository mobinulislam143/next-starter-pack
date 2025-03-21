export interface MyUser {
  id: string;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  phone: string;
  image: string | null;
  status: "ACTIVE" | "INACTIVE";
  location: string;
  isVerified: boolean;
}
