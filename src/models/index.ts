export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  insuranceId: string;
  insuranceCompany: string;
  phone: string;
  email: string;
  archived: boolean;
}

export interface Placement {
  id: string;
  patientId: string;
  patientName: string;
  departmentId: string;
  departmentName: string;
  roomId: string;
  roomNumber: string;
  admissionDate: string;
  notes: string;
}

export interface Room {
  id: string;
  number: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'closed';
}

export interface Department {
  id: string;
  name: string;
  rooms: Room[];
}
