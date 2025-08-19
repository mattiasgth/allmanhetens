export interface SkatingSessionResponse {
  id: number;
  rinkId: number;
  distance: string;
  startTime: string;
  endTime: string;
  sessionTypeName: string;
  sessionTypeId: number;
  date: string;
  distanceKm: number;
  priceCents: number;
  capacity: number;
  booked: number;
};