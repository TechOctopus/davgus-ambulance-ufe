import { Patient } from '../models';

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
