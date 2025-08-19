export interface RinkResponse {
  id: number;
  name: string;
  address: string | null;
  longitude: number | null;
  latitude: number | null;
  imageUrl: string | null;
  iceType: string | null;
  status: string | null;
  infoUrl: string | null;
}