const { getIdentityHash, getAlpha, getEncryptedPoint } = require('../api.js');
const { downloadData } = require('../ipfs.js');
const { getPairNumbers, getCryptographicKey, decryptData } = require('../crypto.js');
const { revertPoint, decryptPoint } = require('../utils.js');

export async function getIdentityUsercase(addressOwnerIdentity, addressRequestingUser, skRequestingUser) {
    // TODO: If is owner user case, then else

    const hash = await getIdentityHash(addressOwnerIdentity, addressRequestingUser);
    const encryptedIdentity = await downloadData(hash);
    const alpha = await getAlpha(addressOwnerIdentity, addressRequestingUser);
    const encryptedPoint = await getEncryptedPoint(addressOwnerIdentity, addressRequestingUser);

    // decrypt point
    const point = decryptPoint(encryptedPoint, skRequestingUser);
    const [alphaRequestingUser, betaRequestingUser] = getPairNumbers(skRequestingUser);
    const betaOwner = revertPoint(point, betaRequestingUser);

    // decrypt identity
    const key = getCryptographicKey(alpha, betaOwner);
    const decryptedIdentity = decryptData(encryptedIdentity, key);
    return decryptedIdentity;
}