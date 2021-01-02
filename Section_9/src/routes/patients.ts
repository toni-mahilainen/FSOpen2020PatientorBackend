import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation }: NewPatient = req.body;

    try {
        const newPatient: NewPatient = {
            name, dateOfBirth, ssn, gender, occupation
        };

        res.send(patientService.createPatient(newPatient));
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }

});

export default router;