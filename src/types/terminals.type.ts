export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "SUPER_ADMIN";
  image: string | null;
}

export interface Review {
  id: string;
  rating: number;
  createdAt: string;
  user: User;
}

export interface UserReview {
  id: string;
  userId: string;
  terminalId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Terminal {
  id: string;
  userId: string;
  terminalName: string;
  fareRange: string;
  vendorName: string;
  city: string;
  location: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  transportationType: string;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}
