/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Entry, SickLeave, Discharge, HealthCheckRating, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Gender, NewPatient } from './types';

// const assertNever = (value: never): never => {
//     throw new Error(
//         `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
// };

const isDate = (data: any): boolean => {
    return Boolean(Date.parse(data));
};

// const isNumber = (data: any): boolean => {
//     return Number.isInteger(data);
// };

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

const isArray = (array: any): array is Array<Entry> => {
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
    if (!entries || !isArray(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }

    return entries;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!(Number(healthCheckRating) in HealthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }

    return healthCheckRating;
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

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }

    return employerName;
};

const parseDischarge = (obj: any): Discharge => {
    if (!obj || !isObject(obj)) {
        throw new Error('Incorrect or missing discharge: ' + obj);
    }

    return obj;
};

const isObject = (data: any): boolean => {
    if (typeof data === 'object' && data instanceof Object && ('startDate' in data) && ('endDate' in data)) {
        if (isString(data.startDate) && isString(data.endDate)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const parseSickLeave = (obj: any): SickLeave => {
    console.log(obj);
    console.log(isObject(obj));
    console.log(('startDate' in obj));
    console.log(('endDate' in obj));
    console.log(isString(obj.startDate));
    console.log(isString(obj.endDate));
    if (!obj || !isObject(obj)) {
        if (!('startDate' in obj) || !('endDate' in obj)) {
            if (!isString(obj.startDate) || !isString(obj.endDate)) {
                throw new Error('Incorrect or missing sick leave: ' + obj);
            }
        }
    }
    return obj;
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

const toNewEntry = (object: any): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry => {
    if (object.type === 'HealthCheck') {
        return {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: 'HealthCheck',
            description: parseDescription(object.description),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    } else if (object.type === 'Hospital') {
        return {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: 'Hospital',
            description: parseDescription(object.description),
            discharge: parseDischarge(object.discharge)
        };
    } else {
        return {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: 'OccupationalHealthcare',
            description: parseDescription(object.description),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
        };
    }
    // switch (object.type) {
    //     case 'HealthCheck':
    //         return {
    //             date: parseDate(object.date),
    //             specialist: parseDate(object.specialist),
    //             type: 'HealthCheck',
    //             description: parseSsn(object.description),
    //             healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    //         };

    //     case 'Hospital':
    //         return {
    //             date: parseDate(object.date),
    //             specialist: parseDate(object.specialist),
    //             type: 'Hospital',
    //             description: parseSsn(object.description),
    //             discharge: parseHealthCheckRating(object.healthCheckRating)
    //         };

    //     case 'OccupationalHealthcare':
    //         return {
    //             date: parseDate(object.date),
    //             specialist: parseDate(object.specialist),
    //             type: 'OccupationalHealthcare',
    //             description: parseSsn(object.description),
    //             employerName: parseHealthCheckRating(object.healthCheckRating)
    //         };

    //     default:
    //         break;
    // }
};

export default { toNewPatient, toNewEntry };