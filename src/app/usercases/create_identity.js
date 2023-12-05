import { encryptData, getPairNumbers, getCryptographicKey } from '../crypto.js';
import { uploadData } from '../ipfs.js';
import { registerIdentity } from '../api.js';
import { BigNumber } from 'ethers';

export async function createIdentityUsercase(data, skOwnerIdentity) {
    const [alpha, beta] = getPairNumbers(skOwnerIdentity);
    const key = getCryptographicKey(alpha, beta);
    const encryptedData = encryptData(data, key);
    const hash = await uploadData(encryptedData);
    const alphaBigNumber = BigNumber.from(alpha);
    const tx = await registerIdentity(hash, alphaBigNumber.toString(), skOwnerIdentity);
    return tx;
}