import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const getNonSensitivePatientData = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientWithId = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);

    return patient;
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
    getPatientWithId,
    createPatient
};