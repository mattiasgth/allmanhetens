import { SkatingSessionDisplay } from "./skating-session-display";

export interface RinkSkatingSessions {
  id: number;
  name: string;
  address: string;
  longitude: number | null;
  latitude: number | null;
  sessions: SkatingSessionDisplay[];
};