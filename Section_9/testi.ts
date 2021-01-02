/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FinnishSSN } from 'finnish-ssn';

// const isString = (text: any): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const isSsn = (data: any): string => {
//     console.log('data', data);
//     console.log(FinnishSSN.validate(data.toString()));

//     if (!data || !isString(data)) {
//         throw new Error('Incorrect or missing ssn: ' + data);
//     }

//     return data;
// };

// isSsn('240987-126H');
console.log(FinnishSSN.validate(String('010190-123A')));