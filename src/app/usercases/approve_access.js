import { generateEncryptedPoint, decryptBeta } from '../utils.js';
import { getPairNumbers } from '../crypto.js';
import { grantAccess, getEncryptedBeta } from '../api.js';

export async function approveAccessUsercase(addressRequestingUser, addressOwnerIdentity, pkRequestingUser, skOwnerIdentity) {
    const encryptedBeta = await getEncryptedBeta(addressRequestingUser, addressOwnerIdentity);
    const [alphaOwner, betaOwner] = getPairNumbers(skOwnerIdentity);
    const betaRequestingUser = decryptBeta(encryptedBeta, skOwnerIdentity);
    const encryptedPoint = generateEncryptedPoint(betaOwner, betaRequestingUser, pkRequestingUser);
    const tx = await grantAccess(addressRequestingUser, encryptedPoint, skOwnerIdentity);
    return tx; 
}
