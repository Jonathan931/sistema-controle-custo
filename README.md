# sistema-controle-custo
Sistema de controle de custo cadastro de departamento, usuário, funcionários e de movimentações

# Configurações
 --SERVER
1) Instale o PostgreSql recomendo o comando do docker: docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

2) No server em src/config/database.js
Configure os dados relacionado ao seu banco.
  module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'controlecusto',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };

3) No terminal dentro da pasta server utilize o yarn install ou npm install;

4) No terminal dentro da pasta server execute o comando yarn sequelize db:migrate;

5) yarn dev ou npm dev;

--CLIENT

1) Na pasta client execute o comando yarn install ou npm install;

2) execute o comando  yarn start ou npm start;

--Criação do primeiro usuário

1) Baixe o Insomia e importe o JSON que contém a criação de usuário
