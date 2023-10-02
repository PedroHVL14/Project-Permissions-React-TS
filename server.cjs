
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project01',
  password: '123',
  port: 5432
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  const { company, user } = req.body;

  try {
      const companyResult = await pool.query(
          'INSERT INTO companies (name, cnpj, segment) VALUES ($1, $2, $3) RETURNING id',
          [company.companyName, company.cnpj, company.segment]
      );

      const companyId = companyResult.rows[0].id;
      await pool.query(
          'INSERT INTO users (name, email, password, phone, is_manager, company_id) VALUES ($1, $2, $3, $4, TRUE, $5)',
          [user.userName, user.email, user.password, user.phone, companyId]
      );

      res.status(201).send({ message: 'Company and user registered successfully!' });

  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ message: `Error during registration: ${error.message}` });
  }
});

const PORT = 4000;

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).send({ message: 'Login bem-sucedido!', userDetails: result.rows[0] });
    } else {
      res.status(401).send({ message: `E-mail ou senha incorretos.${error.message}` });
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).send({ message: 'Erro ao tentar fazer login. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
