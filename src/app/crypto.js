import crypto from 'crypto';
import { encrypt, decrypt } from 'eciesjs';

const constIv = Buffer.alloc(16, 0);

function adjustKey(key) {
    return crypto.createHash('sha256').update(key).digest();
}

export function encryptData(data, key) {
    const adjustedKey = adjustKey(key);
    const cipher = crypto.createCipheriv('aes-256-cbc', adjustedKey, constIv);

    // Convertendo o objeto JSON em uma string
    const dataString = JSON.stringify(data);

    let encryptedData = cipher.update(dataString, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

export function decryptData(encryptedData, key) {
    const adjustedKey = adjustKey(key);
    const decipher = crypto.createDecipheriv('aes-256-cbc', adjustedKey, constIv);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    // Convertendo a string descriptografada de volta para um objeto JSON
    return JSON.parse(decryptedData);
}

export function encryptNumber(number, pk) {
    const dataToEncrypt = Buffer.from(number);
    return encrypt(pk, dataToEncrypt).toString('hex')
}

export function decryptNumber(encryptedNumber, sk) {
    const encryptedNumberBuffer = Buffer.from(encryptedNumber, 'hex');
    return decrypt(sk, encryptedNumberBuffer).toString();
}

export function getPairNumbers(pk) {
    // Converta a chave privada hexadecimal em buffer.
    const chavePrivadaBuffer = Buffer.from(pk, 'hex');

    // Use a função de hash SHA-256 para obter um valor hash da chave privada.
    const hashChavePrivada = crypto.createHash('sha256').update(chavePrivadaBuffer).digest();

    // Divida o valor hash em duas partes de tamanho igual.
    const metadeTamanho = Math.floor(hashChavePrivada.length / 2);
    const parte1 = hashChavePrivada.slice(0, metadeTamanho);
    const parte2 = hashChavePrivada.slice(metadeTamanho);

    // Converta cada parte em um número inteiro.
    const numeroInteiro1 = BigInt('0x' + parte1.toString('hex')).toString();
    const numeroInteiro2 = BigInt('0x' + parte2.toString('hex')).toString();

    return [numeroInteiro1, numeroInteiro2];
}

export function getCryptographicKey(alpha, beta) {
    // Helper function to convert BigInt to a hex string with even length
    function toEvenLengthHexString(bigIntValue) {
        let hexString = bigIntValue.toString(16);
        if (hexString.length % 2 !== 0) {
            // Prepend '0' if the string length is odd
            hexString = '0' + hexString;
        }
        return hexString;
    }

    // Convert alpha and beta to hex strings with even length
    const alphaHex = toEvenLengthHexString(alpha);
    const betaHex = toEvenLengthHexString(beta);

    // Concatenate the integer values as buffers
    const dataToDerive = Buffer.concat([Buffer.from(alphaHex, 'hex'), Buffer.from(betaHex, 'hex')]);

    // Generate a new cryptographic key using HMAC
    const newCryptographicKey = crypto.createHmac('sha256', '').update(dataToDerive).digest('hex');

    return newCryptographicKey;
}