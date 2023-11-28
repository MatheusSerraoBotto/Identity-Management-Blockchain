const Web3 = require('web3');

// Conecte-se ao provedor da MetaMask
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    try {
        // Solicitar acesso à conta se necessário
        await window.ethereum.enable();
    } catch (error) {
        console.error("Usuário negou acesso à conta");
    }
} else {
    console.error("MetaMask não está disponível");
}

const contractABI = /* ABI do seu contrato */;
const contractAddress = /* Endereço do seu contrato */;
const contract = new web3.eth.Contract(contractABI, contractAddress);

