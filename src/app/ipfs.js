// const ipfs = require('ipfs-api')({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// export async function uploadData(data) {
//     const buffer = Buffer.from(data);
//     const result = await ipfs.add(buffer);
//     return result[0].hash;
// }

// export async function downloadData(hash) {
//     const result = await ipfs.get(hash);
//     return result[0].content.toString();
// }
import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

// Diretório para simular o armazenamento do IPFS
const simulatedIPFSDirectory = './.simulatedIPFS';

// Função para 'carregar' dados - Salvando no sistema de arquivos local
export async function uploadData(data) {
    // Garantindo que o diretório existe
    await fs.mkdir(simulatedIPFSDirectory, { recursive: true });

    // Criar um hash único para o conteúdo
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    // Caminho do arquivo onde os dados serão salvos
    const filePath = path.join(simulatedIPFSDirectory, hash);

    // Salvando os dados no arquivo
    await fs.writeFile(filePath, data);

    // Retornar o hash como identificador
    return hash;
}

// Função para 'baixar' dados - Lendo do sistema de arquivos local
export async function downloadData(hash) {
    // Caminho do arquivo para ler
    const filePath = path.join(simulatedIPFSDirectory, hash);

    // Ler o conteúdo do arquivo
    const data = await fs.readFile(filePath, 'utf8');

    return data;
}
