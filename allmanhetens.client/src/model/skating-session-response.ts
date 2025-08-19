export interface SkatingSessionResponse {
  id: number;
  rinkId: number;
  rinkName: string;
  rinkAddress: string;
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