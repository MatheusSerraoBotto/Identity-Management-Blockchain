import secp256k1 from 'secp256k1';

export const privateKeys = [
    '14db4ad1b45e78aad487e5f6ef2f961d97e1f6c5cc531c8cc90e12a3c2ca5de0',
    'de76bd2b0fac1fb30bbd89c82ebacd162202ddb737b9f1ecbbf22ba37637bc1f',
    '04dad35b41349ef8cf85700a2b427814425210379e960bd474d9c50ba5c19a39',
    'eeda0ff31ccc0205546f000375e3c6e19b4ca62ca1cdd37f37ddaeaae4cd0508',
    '563ec625943a8965d59aa3cfc6c152a37be8990599800676e69ec7cb1a0425fc',
    '8d34c3808db19fe636b0938146ec536c2deb74b00f06d13ddd531d9506ad62fb',
    '9793a2a3749b08defba9619b5091b661a951b350b4b72058ee68da81c017288a',
    '3233eee11d759a9e30910798d6e0a8239805e31ea9ea81053ba9edb8aab946c5',
    '7c8ca307df8c1cdad5d83af0c7994b7703f879e4d8902e0296e1250ed659804f',
    'ed5fa8e377386736f7c036d11569ab5a8d9ff2df3b3c10bf9de8a08c05154187'
]

export const address = [
    '0x129A9AB88E259D7C0B5311C811A6DAc42D760b0c',
    '0x70B0fcaeFb92f3eBb70A5aDcE58bf79a530a8574',
    '0xDd5d7Ec695a20EB91EBdb9dF586a83b0Fd60D917',
    '0x67e8434eCbC0C18EDcb4372FCac63fe278FcbF4F',
    '0x2779cb3E295d300c3fCced5D40f3eAF0Db5b01C8',
    '0x1dac465fd14ef3587F16bA34800367F98d9E73Cb',
    '0x48CC75FCB9B671f300584e256949ec90CBdDFd1B',
    '0x7a56463f9F5FB91B951326f7EB0F451D073D0281',
    '0x5b3DA8e25E40026b22498eAdF94aB9E030b84Be4',
    '0x0f3Ee57295cbabd21B3e84B3dFfF50055076fDa1',
]

export const publicKeys = []

privateKeys.forEach(privateKeyHex => {
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
    const publicKeyHex = Array.from(publicKey).map(byte => byte.toString(16).padStart(2, '0')).join('');
    publicKeys.push(publicKeyHex);
});

export function getAccount(index) {
    return {
        address: address[index],
        privateKey: privateKeys[index],
        publicKey: publicKeys[index]
    }
}
