export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};