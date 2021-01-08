import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientWithId(req.params.id);
    if (patient) {
        res.send(patient);    
    } else {
        res.status(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        res.send(patientService.createPatient(newPatient));
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }

});

export default router;