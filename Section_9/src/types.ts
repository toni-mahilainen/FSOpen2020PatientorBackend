export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}