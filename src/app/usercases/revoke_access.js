import { revokeAccess } from "../api";

export async function revokeAccess(pkRequestingUser) {
    const tx = await revokeAccess(pkRequestingUser);
    return tx;
}