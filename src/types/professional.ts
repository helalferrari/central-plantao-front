import { ProfessionalType } from "./contract";

export interface Professional {
  id?: number;
  fullName: string;
  document: string;
  registrationNumber: string;
  professionalType: ProfessionalType;
  clientId: number;
  clientName?: string;
  active: boolean;
}
