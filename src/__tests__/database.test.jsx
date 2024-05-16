import { dbConnect, dbDisconnect } from '../app/utils/database';
import { connect, connection } from 'mongoose';

jest.setTimeout(60000); // Establecer el tiempo límite de las pruebas a 60 segundos

describe('Conexión con la base de datos MongoDB', () => {
  beforeAll(async () => {
    // Asegurarse de que no estamos conectados antes de ejecutar las pruebas
    await dbDisconnect();
  });

  afterAll(async () => {
    // Asegurarse de que estamos desconectados después de ejecutar todas las pruebas
    await dbDisconnect();
  });

  it('debería conectarse correctamente a la base de datos', async () => {
    // Llamar a la función de conexión
    await dbConnect();

    // Verificar que ahora estamos conectados
    expect(connection.readyState).toBe(1); // 1 indica que la conexión está abierta
  });

  it('debería desconectarse correctamente de la base de datos', async () => {
    // Asegurarse de que estamos conectados antes de desconectarnos
    await dbConnect();

    // Llamar a la función de desconexión
    await dbDisconnect();

    // Verificar que ahora estamos desconectados
    expect(connection.readyState).toBe(0); // 0 indica que no hay conexión
  });
});