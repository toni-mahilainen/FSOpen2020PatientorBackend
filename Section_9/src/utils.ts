/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Gender, NewPatient } from './types';
import { FinnishSSN } from 'finnish-ssn';

const isDate = (data: any): boolean => {
    return Boolean(Date.parse(data));
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing gender: ' + name);
    }

    return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isDate(dateOfBirth) || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing gender: ' + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSsn = (data: any): string => {
    if (!data || !isString(data) || !FinnishSSN.validate(data)) {
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
        throw new Error('Incorrect or missing gender: ' + occupation);
    }

    return occupation;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};

export default toNewPatient;