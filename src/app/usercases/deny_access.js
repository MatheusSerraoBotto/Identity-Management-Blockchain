import { denyAccess } from "../api";
export async function denyAcess(pk) {
    const tx = await denyAccess(pk);
    return tx;
}
