import { ProfessionalType } from "./contract";

export type SlotStatus = 'OPEN' | 'FILLED' | 'CANCELED' | 'COMPLETED';

export interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  professionalName?: string;
  professionalType: ProfessionalType;
  sectorDescription: string;
}
