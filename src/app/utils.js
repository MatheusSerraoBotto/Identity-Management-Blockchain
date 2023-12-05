import { encryptNumber, decryptNumber, getPairNumbers } from './crypto.js';

export function generateEncryptedBeta(pkOwnerIdentity, skRequestingUser) {
    const [alpha, beta] = getPairNumbers(skRequestingUser);
    return encryptNumber(beta, pkOwnerIdentity);
}

export function decryptBeta(encryptedBeta, skOwnerIdentity) {
    return decryptNumber(encryptedBeta, skOwnerIdentity);
}

export function generateEncryptedPoint(beta, betaProvided, pk) {
    const point = calcNewPoint(beta, betaProvided);
    return encryptNumber(point, pk);
}

export function decryptPoint(encryptedPoint, sk) {
    return decryptNumber(encryptedPoint, sk);
}

export function calcNewPoint(number1, number2) {
    const bigNumber1 = BigInt(number1);
    const bigNumber2 = BigInt(number2);

    return (bigNumber1 * bigNumber2).toString();
}


export function revertPoint(number1, number2) {
    const bigNumber1 = BigInt(number1);
    const bigNumber2 = BigInt(number2);

    return (bigNumber1 / bigNumber2).toString();
}

