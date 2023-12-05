import Web3 from 'web3';
import fs from 'fs';

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
const web3 = new Web3(provider);

const contractPath = 'build/contracts/IdentityManagement.json';
const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const contractABI = contractJson.abi;
const contractAddress = '0x2Cc9BBd09411E7bEC641569c640BC180D835B492'; 

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function getIdentityHash(ownerAddress, addressRequestingUser) {
    try {
        const identityHash = await contract.methods.getIdentity(ownerAddress).call({ from: addressRequestingUser });
        return identityHash;
    } catch (error) {
        console.error("Error fetching identity:", error);
    }
}

export async function getAlpha(ownerAddress, addressRequestingUser) {
    try {
        const alpha = await contract.methods.getAlpha(ownerAddress).call({ from: addressRequestingUser });
        return alpha;
    } catch (error) {
        console.error("Error fetching alpha:", error);
    }
}

export async function getEncryptedPoint(ownerAddress, addressRequestingUser) {
    try {
        const encryptedPoint = await contract.methods.getEncryptedPoint(ownerAddress).call({ from: addressRequestingUser });
        return encryptedPoint;
    } catch (error) {
        console.error("Error fetching encrypted point:", error);
    }   
}

export async function getEncryptedBeta(addressRequestingUser, addressOwnerIdentity) {
    try {
        const encryptedBeta = await contract.methods.getEncryptedBeta(addressRequestingUser).call({ from: addressOwnerIdentity });
        return encryptedBeta;
    } catch (error) {
        console.error("Error fetching encrypted beta:", error);
    }
}

export async function registerIdentity(hash, alpha, privateKey) {
    try {
        const data = contract.methods.registerIdentity(hash, alpha).encodeABI();

        const transaction = {
            to: contractAddress,
            data: data,
            gas: 2000000, // Defina um limite de gás adequado
            // gasPrice é opcional, depende das condições atuais da rede
        };

        // Assinar a transação
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

        // Enviar a transação assinada para a rede Ethereum
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        console.log("Transação enviada com sucesso. Hash da transação:", receipt.transactionHash);
        return receipt;
    } catch (error) {
        console.error("Erro ao registrar identidade:", error);
        throw error; // Relança o erro para ser tratado por quem chama a função
    }
}


export async function requestAccess(addressOwnerIdentity, encryptedBeta, privateKey) {
    try {
        const data = contract.methods.requestAccess(addressOwnerIdentity, encryptedBeta).encodeABI();

        const transaction = {
            to: contractAddress,
            data: data,
            gas: 2000000, // Defina um limite de gás adequado
            // gasPrice é opcional, depende das condições atuais da rede
        };

        // Assinar a transação
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

        // Enviar a transação assinada para a rede Ethereum
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log("Transação enviada com sucesso. Hash da transação:", receipt.transactionHash);
        return receipt;
    } catch (error) {
        console.error("Error requesting access:", error);
        throw error; // Relança o erro para ser tratado por quem chama a função
    }
}

export async function grantAccess(addressRequestingUser, encryptedPoint, privateKey) {
    try {
        const data = contract.methods.grantAccess(addressRequestingUser, encryptedPoint).encodeABI();

        const transaction = {
            to: contractAddress,
            data: data,
            gas: 2000000, // Defina um limite de gás adequado
            // gasPrice é opcional, depende das condições atuais da rede
        };

        // Assinar a transação
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

        // Enviar a transação assinada para a rede Ethereum
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (error) {
        console.error("Error granting access:", error);
        throw error; // Relança o erro para ser tratado por quem chama a função
    }
}

export async function denyAccess(pkRequestingUser, account) {
    try {
        const tx = await contract.methods.denyAccess(pkRequestingUser).send({ from: account });
        return tx;
    } catch (error) {
        console.error("Error denying access:", error);
    }
}

export async function revokeAccess(pkRequestingUser, account) {
    try {
        const tx = await contract.methods.revokeAccess(pkRequestingUser).send({ from: account });
        return tx;
    } catch (error) {
        console.error("Error revoking access:", error);
    }
}