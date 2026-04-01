import { DepartmentsApi, PatientsApi, PlacementsApi } from './ambulance-wl/apis';
import { Configuration, ResponseError } from './ambulance-wl/runtime';
import type { Department as ApiDepartment, Patient as ApiPatient, Placement as ApiPlacement, Room as ApiRoom } from './ambulance-wl/models';
import type { Department, Patient, Placement, Room } from '../models';

function getConfig(apiBase: string): Configuration {
  return new Configuration({ basePath: apiBase });
}

function isNotFound(error: unknown): boolean {
  return error instanceof ResponseError && error.response.status === 404;
}

function toLocalPatient(patient: ApiPatient): Patient {
  return {
    id: patient.id,
    name: patient.name,
    birthDate: patient.birthDate.toISOString().slice(0, 10),
    insuranceId: patient.insuranceId,
    insuranceCompany: patient.insuranceCompany,
    phone: patient.phone,
    email: patient.email,
    archived: patient.archived,
  };
}

function toApiPatient(patient: Patient): ApiPatient {
  return {
    id: patient.id,
    name: patient.name,
    birthDate: new Date(patient.birthDate),
    insuranceId: patient.insuranceId,
    insuranceCompany: patient.insuranceCompany,
    phone: patient.phone,
    email: patient.email,
    archived: patient.archived,
  };
}

function toLocalRoom(room: ApiRoom): Room {
  return {
    id: room.id,
    number: room.number,
    capacity: room.capacity,
    status: room.status,
  };
}

function toApiRoom(room: Room): ApiRoom {
  return {
    id: room.id,
    number: room.number,
    capacity: room.capacity,
    status: room.status,
  };
}

function toLocalDepartment(department: ApiDepartment): Department {
  return {
    id: department.id,
    name: department.name,
    rooms: department.rooms.map(toLocalRoom),
  };
}

function toApiDepartment(department: Department): ApiDepartment {
  return {
    id: department.id,
    name: department.name,
    rooms: department.rooms.map(toApiRoom),
  };
}

function toLocalPlacement(placement: ApiPlacement): Placement {
  return {
    id: placement.id,
    patientId: placement.patientId,
    patientName: placement.patientName,
    departmentId: placement.departmentId,
    departmentName: placement.departmentName,
    roomId: placement.roomId,
    roomNumber: placement.roomNumber,
    admissionDate: placement.admissionDate.toISOString().slice(0, 10),
    notes: placement.notes,
  };
}

function toApiPlacement(placement: Placement): ApiPlacement {
  return {
    id: placement.id,
    patientId: placement.patientId,
    patientName: placement.patientName,
    departmentId: placement.departmentId,
    departmentName: placement.departmentName,
    roomId: placement.roomId,
    roomNumber: placement.roomNumber,
    admissionDate: new Date(placement.admissionDate),
    notes: placement.notes,
  };
}

function toApiPatientCreate(patient: Patient): Omit<ApiPatient, 'id'> {
  return {
    name: patient.name,
    birthDate: new Date(patient.birthDate),
    insuranceId: patient.insuranceId,
    insuranceCompany: patient.insuranceCompany,
    phone: patient.phone,
    email: patient.email,
    archived: patient.archived,
  };
}

function toApiPlacementCreate(placement: Placement): Omit<ApiPlacement, 'id'> {
  return {
    patientId: placement.patientId,
    patientName: placement.patientName,
    departmentId: placement.departmentId,
    departmentName: placement.departmentName,
    roomId: placement.roomId,
    roomNumber: placement.roomNumber,
    admissionDate: new Date(placement.admissionDate),
    notes: placement.notes,
  };
}

export async function getPatients(apiBase: string): Promise<Patient[]> {
  const api = new PatientsApi(getConfig(apiBase));
  const patients = await api.getPatients();
  return patients.map(toLocalPatient);
}

export async function getPatient(patientId: string, apiBase: string): Promise<Patient | undefined> {
  const api = new PatientsApi(getConfig(apiBase));
  try {
    return toLocalPatient(await api.getPatient({ patientId }));
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function createPatient(patient: Patient, apiBase: string): Promise<Patient> {
  const api = new PatientsApi(getConfig(apiBase));
  const created = await api.createPatient({ patientCreateRequest: toApiPatientCreate(patient) });
  return toLocalPatient(created);
}

export async function updatePatient(patient: Patient, apiBase: string): Promise<Patient | undefined> {
  const api = new PatientsApi(getConfig(apiBase));
  try {
    const updated = await api.updatePatient({
      patientId: patient.id,
      patient: toApiPatient(patient),
    });
    return toLocalPatient(updated);
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function deletePatient(patientId: string, apiBase: string): Promise<boolean> {
  const api = new PatientsApi(getConfig(apiBase));
  try {
    await api.deletePatient({ patientId });
    return true;
  } catch (error) {
    if (isNotFound(error)) {
      return false;
    }
    throw error;
  }
}

export async function getDepartments(apiBase: string): Promise<Department[]> {
  const api = new DepartmentsApi(getConfig(apiBase));
  const departments = await api.getDepartments();
  return departments.map(toLocalDepartment);
}

export async function getDepartment(departmentId: string, apiBase: string): Promise<Department | undefined> {
  const api = new DepartmentsApi(getConfig(apiBase));
  try {
    return toLocalDepartment(await api.getDepartment({ departmentId }));
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function updateDepartment(department: Department, apiBase: string): Promise<Department | undefined> {
  const api = new DepartmentsApi(getConfig(apiBase));
  try {
    const updated = await api.updateDepartment({
      departmentId: department.id,
      department: toApiDepartment(department),
    });
    return toLocalDepartment(updated);
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function getPlacements(apiBase: string): Promise<Placement[]> {
  const api = new PlacementsApi(getConfig(apiBase));
  const placements = await api.getPlacements();
  return placements.map(toLocalPlacement);
}

export async function getPlacement(placementId: string, apiBase: string): Promise<Placement | undefined> {
  const api = new PlacementsApi(getConfig(apiBase));
  try {
    return toLocalPlacement(await api.getPlacement({ placementId }));
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function getPlacementForPatient(patientId: string, apiBase: string): Promise<Placement | undefined> {
  const api = new PlacementsApi(getConfig(apiBase));
  try {
    return toLocalPlacement(await api.getPlacementForPatient({ patientId }));
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function createPlacement(placement: Placement, apiBase: string): Promise<Placement> {
  const api = new PlacementsApi(getConfig(apiBase));
  const created = await api.createPlacement({ placementCreateRequest: toApiPlacementCreate(placement) });
  return toLocalPlacement(created);
}

export async function updatePlacement(placement: Placement, apiBase: string): Promise<Placement | undefined> {
  const api = new PlacementsApi(getConfig(apiBase));
  try {
    const updated = await api.updatePlacement({
      placementId: placement.id,
      placement: toApiPlacement(placement),
    });
    return toLocalPlacement(updated);
  } catch (error) {
    if (isNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

export async function deletePlacement(placementId: string, apiBase: string): Promise<boolean> {
  const api = new PlacementsApi(getConfig(apiBase));
  try {
    await api.deletePlacement({ placementId });
    return true;
  } catch (error) {
    if (isNotFound(error)) {
      return false;
    }
    throw error;
  }
}
