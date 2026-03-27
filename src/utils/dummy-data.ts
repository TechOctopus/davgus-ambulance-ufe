import { Patient, Placement } from '../models';

const initialPatients: Patient[] = [
    {
        id: 'p1',
        name: 'Ján Novák',
        birthDate: '1985-03-15',
        insuranceId: '8503150001',
        insuranceCompany: 'VšZP',
        phone: '+421901234567',
        email: 'jan.novak@email.sk',
        archived: false,
    },
    {
        id: 'p2',
        name: 'Mária Kováčová',
        birthDate: '1990-07-22',
        insuranceId: '9007220002',
        insuranceCompany: 'Dôvera',
        phone: '+421902345678',
        email: 'maria.kovacova@email.sk',
        archived: false,
    },
    {
        id: 'p3',
        name: 'Peter Horváth',
        birthDate: '1978-11-03',
        insuranceId: '7811030003',
        insuranceCompany: 'Union',
        phone: '+421903456789',
        email: 'peter.horvath@email.sk',
        archived: false,
    },
];

const initialPlacements: Placement[] = [
    {
        id: 'pl1',
        patientId: 'p1',
        patientName: 'Ján Novák',
        departmentId: 'd1',
        departmentName: 'Kardiológia',
        roomId: 'r1',
        roomNumber: '101',
        admissionDate: '2024-01-15',
        notes: 'Plánovaná hospitalizácia',
    },
    {
        id: 'pl2',
        patientId: 'p2',
        patientName: 'Mária Kováčová',
        departmentId: 'd2',
        departmentName: 'Chirurgia',
        roomId: 'r4',
        roomNumber: '201',
        admissionDate: '2024-02-01',
        notes: 'Po operácii',
    },
];

let placements: Placement[] = deepCopy(initialPlacements);

let nextId = 100;

function generateId(): string {
    return `id-${nextId++}`;
}

function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

let patients: Patient[] = deepCopy(initialPatients);

export function resetDummyData(): void {
    patients = deepCopy(initialPatients);
}

export function getPatients(): Patient[] {
    return patients.filter(p => !p.archived);
}

export function getPatient(id: string): Patient | undefined {
    return patients.find(p => p.id === id);
}

export function createPatient(patient: Patient): Patient {
    const newPatient = { ...patient, id: generateId() };
    patients.push(newPatient);
    return newPatient;
}

export function updatePatient(patient: Patient): Patient {
    const index = patients.findIndex(p => p.id === patient.id);
    if (index >= 0) {
        patients[index] = { ...patient };
        placements.forEach(pl => {
            if (pl.patientId === patient.id) {
                pl.patientName = patient.name;
            }
        });
        return patients[index];
    }
    return undefined;
}

export function deletePatient(id: string): boolean {
    const index = patients.findIndex(p => p.id === id);
    if (index >= 0) {
        patients[index].archived = true;
        placements = placements.filter(pl => pl.patientId !== id);
        return true;
    }
    return false;
}