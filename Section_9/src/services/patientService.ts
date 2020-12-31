import patients from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getNonSensitivePatientData
};