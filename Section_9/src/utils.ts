/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Gender, NewPatient } from './types';

const isDate = (data: any): boolean => {
    return Boolean(Date.parse(data));
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

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
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