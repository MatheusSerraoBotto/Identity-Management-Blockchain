import { createIdentityTest, requestAccessTest, approveAccessTest, getIdentityTest } from './app/tests.spec.ts';

async function runTestsInOrder() {
    try {
        // await createIdentityTest();
        // console.log('createIdentityTest completado');

        // await requestAccessTest();
        // console.log('requestAccessTest completado');

        // await approveAccessTest();
        // console.log('approveAccessTest completado');

        await getIdentityTest();
        console.log('getIdentityTest completado');
    } catch (error) {
        console.error('Erro ao executar testes:', error);
    }
}

runTestsInOrder();
