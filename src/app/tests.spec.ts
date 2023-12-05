import { getAccount } from './config/accounts.js';
import { createIdentityUsercase } from './usercases/create_identity.js';
import { requestAccessUsercase } from './usercases/request_access.js';
import { approveAccessUsercase } from './usercases/approve_access.js';
import { getIdentityUsercase } from './usercases/get_identity.js';

const addressOwnerIdentity = getAccount(0).address;
const skOwnerIdentity = getAccount(0).privateKey;
const pkOwnerIdentity = getAccount(0).publicKey;

const addressRequestingUser = getAccount(1).address;
const skRequestingUser = getAccount(1).privateKey;
const pkRequestingUser = getAccount(1).publicKey;

export async function createIdentityTest() {
    // Setup
    const data = { name: 'John Doe', age: 30 };
    
    // Call the createIdentity function
    const result = await createIdentityUsercase(data, skOwnerIdentity);

    // Assertions
    console.log(result); 
}

export async function requestAccessTest(){
    // Call the createIdentity function
    const result = await requestAccessUsercase(addressOwnerIdentity, pkOwnerIdentity, skRequestingUser);

    // Assertions
    console.log(result); 
}

export async function approveAccessTest(){
    // Call the createIdentity function
    const result = await approveAccessUsercase(addressRequestingUser, addressOwnerIdentity, pkRequestingUser, skOwnerIdentity);

    // Assertions
    console.log(result); 
}

export async function getIdentityTest(){
    // Call the createIdentity function
    const result = await getIdentityUsercase(addressOwnerIdentity, addressRequestingUser, skRequestingUser);

    // Assertions
    console.log(result); 
}
