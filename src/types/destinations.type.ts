export interface Destination {
  id: number;
  userId: number;
  destinationName: string;
  location: string;
  image: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}
