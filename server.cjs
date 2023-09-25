
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

app.post('/signup/company', async (req, res) => {
  const { companyName, cnpj, segment } = req.body;
  console.log('Dados recebidos:', req.body); // log the received data

  try {
    const result = await pool.query(
      'INSERT INTO companies (name, cnpj, segment) VALUES ($1, $2, $3) RETURNING id',
      [companyName, cnpj, segment]
    );
    console.log('Resultado da inserção:', result.rows[0].id); // log the inserted company ID

    res.status(201).send({ message: 'Empresa cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar empresa:', error);
    res.status(500).send({ message: `Erro ao cadastrar empresa: ${error.message}` });
  }
});

app.post('/signup/user', async (req, res) => {
  const { userName, email, password, phone, company_id } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (name, email, password, phone, is_manager, company_id) VALUES ($1, $2, $3, $4, TRUE, $5)',
      [userName, email, password, phone, company_id]
    );

    res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).send({ message: `Erro ao cadastrar usuário: ${error.message}` });
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
            // User found with matching email and password
            res.status(200).send({ message: 'Login bem-sucedido!', userDetails: result.rows[0] });
        } else {
            // No user found with matching email and password
            res.status(401).send({ message: 'E-mail ou senha incorretos.' });
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        res.status(500).send({ message: 'Erro ao tentar fazer login. Tente novamente mais tarde.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/user/details", async (req, res) => {
    const email = req.query.email;
    
    if (!email) {
      return res.status(400).json({ error: "E-mail é necessário." });
    }
  
    try {
      const userResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (userResult.rowCount === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      const user = userResult.rows[0];
      
      const companyResult = await pool.query(
        "SELECT * FROM companies WHERE id = $1",
        [user.company_id]
      );
  
      if (companyResult.rowCount === 0) {
        return res.status(404).json({ error: "Empresa não encontrada." });
      }
  
      const company = companyResult.rows[0];
  
      res.status(200).json({ user, company });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar detalhes." });
    }
  });
  