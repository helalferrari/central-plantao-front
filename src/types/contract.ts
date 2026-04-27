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

export type Workload = 'W12' | 'W24';

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
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  contractedShifts: ContractedShift[];
}
