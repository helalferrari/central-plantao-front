import { Client } from "./client";

export type ScheduleType = 
  | 'SHIFT_12X36' 
  | 'SHIFT_24X48' 
  | 'SHIFT_6X1' 
  | 'SHIFT_5X2' 
  | 'SHIFT_4X3';

export type ProfessionalType = 
  | 'PEDIATRICIAN' 
  | 'OBSTETRICIAN_GYNECOLOGIST' 
  | 'GENERAL_PRACTITIONER' 
  | 'NURSE' 
  | 'NURSING_TECHNICIAN';

export type Workload = 'W8' | 'W12' | 'W24';

export interface ContractedShift {
  id?: number;
  sectorDescription: string;
  slotQuantity: number;
  workload: Workload;
  scheduleType: ScheduleType;
  professionalType: ProfessionalType;
}

export interface Contract {
  id?: number;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  clientId?: number;
  client?: Client;
  contractedShifts: ContractedShift[];
}
