import { generateEncryptedBeta } from '../utils.js';
import { requestAccess } from '../api.js';

export async function requestAccessUsercase(addressOwnerIdentity, pkOwnerIdentity, skRequestingUser){
    const encryptedBeta = generateEncryptedBeta(pkOwnerIdentity, skRequestingUser);
    const tx = await requestAccess(addressOwnerIdentity, encryptedBeta, skRequestingUser);
    return tx;
}
