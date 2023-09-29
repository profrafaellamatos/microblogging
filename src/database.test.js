const mysql = require('mysql2/promise');

describe('Teste de Conexão com o Banco de Dados', () => {
  let db;

  beforeAll(async () => {
    // Configuração da conexão com o banco de dados de teste
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'microblogging_db',
    });
  });

  afterAll(async () => {
    // Fechar a conexão após os testes
    await db.end();
  });

  test('deve se conectar ao banco de dados sem erros', async () => {
    try {
      await db.query('SELECT 1');
    } catch (error) {
      // Se houver algum erro, falhe o teste
      fail(`Erro na conexão com o banco de dados: ${error.message}`);
    }
  });
});