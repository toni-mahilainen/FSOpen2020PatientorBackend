/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Entry,
    SickLeave,
    Discharge,
    Gender,
    NewPatient,
    NewEntry,
    Diagnosis,
    NewOccupationalHealthcareEntry
} from './types';

const isDate = (data: any): boolean => {
    return Boolean(Date.parse(data));
};

const isNumber = (data: any): boolean => {
    return typeof data === 'number' || data instanceof Number;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isSsnValid = (ssn: any): boolean => {
    const regex = RegExp('^[0-9]{6}[-+A][0-9]{3}[0-9a-zA-Z]$');
    return regex.test(ssn);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isEntryArray = (array: any): array is Array<Entry> => {
    return Array.isArray(array) || array instanceof Array;
};

const isDiagnosisArray = (array: any): array is Array<Diagnosis['code']> => {
    return Array.isArray(array) || array instanceof Array;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDate = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isDate(dateOfBirth) || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSsn = (data: any): string => {
    if (!data || !isString(data) || !isSsnValid(data)) {
        throw new Error('Incorrect or missing ssn: ' + data);
    }

    return data;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const parseEntries = (entries: any): Array<Entry> => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    return entries;
};

const parseHealthCheckRating = (healthCheckRating: any): number => {
    if (!healthCheckRating || !isNumber(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    } else {
        const rating: number = parseInt(healthCheckRating);

        if (rating < 0 || rating > 3) {
            throw new Error('Incorrect health check rating: ' + healthCheckRating);
        }

        return rating;
    }
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + name);
    }

    return specialist;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }

    return description;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
    if (!isDiagnosisArray(diagnosisCodes)) {
        throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
    }

    return diagnosisCodes;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }

    return employerName;
};

const parseDischarge = (obj: any): Discharge => {
    if (!obj || !Object.keys(obj).includes('date') || !Object.keys(obj).includes('criteria')) {
        throw new Error('Missing discharge: ' + obj);
    } else {
        const date: unknown = obj.date;
        const criteria: unknown = obj.criteria;

        if (!isString(date) || !isString(criteria)) {
            throw new Error('Incorrect discharge: ' + obj);
        }

        if (!isDate(date)) {
            throw new Error('Incorrect discharge: ' + obj);
        }

        return {
            date,
            criteria
        };
    }
};

const parseSickLeave = (obj: any): SickLeave => {
    if (!obj || !Object.keys(obj).includes('startDate') || !Object.keys(obj).includes('endDate')) {
        throw new Error('Missing sick leave: ' + obj);
    } else {
        const startDate: unknown = obj.startDate;
        const endDate: unknown = obj.endDate;

        if (!isString(startDate) || !isString(endDate)) {
            throw new Error('Incorrect sick leave: ' + obj);
        }

        if (!isDate(startDate) || !isDate(endDate)) {
            throw new Error('Incorrect sick leave: ' + obj);
        }

        return {
            startDate,
            endDate
        };
    }
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};

const toNewEntry = (object: any): NewEntry | undefined => {
    const baseEntry = {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description),
    };
    const fianlBaseEntry = object.diagnosisCodes ? { ...baseEntry, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) } : baseEntry;

    switch (object.type) {
        case 'HealthCheck':
            return {
                type: 'HealthCheck',
                ...fianlBaseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };

        case 'Hospital':
            return {
                type: 'Hospital',
                ...fianlBaseEntry,
                discharge: parseDischarge(object.discharge)
            };

        case 'OccupationalHealthcare':
            const entry: NewOccupationalHealthcareEntry = {
                type: 'OccupationalHealthcare',
                ...fianlBaseEntry,
                employerName: parseEmployerName(object.employerName)
            };

            const entryToReturn = object.sickLeave ? { ...entry, sickLeave: parseSickLeave(object.sickLeave) } : entry;

            return entryToReturn;

        default:
            return undefined;
    }
};

export default {
    toNewPatient,
    toNewEntry
};