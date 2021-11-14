export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = "other"
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}