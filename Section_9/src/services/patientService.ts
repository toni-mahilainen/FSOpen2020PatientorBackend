import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const createPatient = (newPatientData: NewPatient): Patient => {
    const random = Math.random().toString(36).substring(2, 5);
    const id = `d2773${random}-f723-11e9-8f0b-362b9e155667`;
    const newPatient: Patient = {
        id,
        ...newPatientData
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatientData,
    createPatient
};