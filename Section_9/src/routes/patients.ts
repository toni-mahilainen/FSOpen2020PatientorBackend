import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

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
        const newPatient = utils.toNewPatient(req.body);

        res.send(patientService.createPatient(newPatient));
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = utils.toNewEntry(req.body);

        if (newEntry) {
            res.send(patientService.createNewEntry(req.params.id, newEntry));
        } else {
            res.status(400).send('Invalid entry type.');
        }
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});

export default router;