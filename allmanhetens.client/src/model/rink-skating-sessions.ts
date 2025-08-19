import { SkatingSessionDisplay } from "./skating-session-display";

export interface RinkSkatingSessions {
  id: number;
  name: string|null;
  address: string;
  longitude: number | null;
  latitude: number | null;
  sessions: SkatingSessionDisplay[];
};