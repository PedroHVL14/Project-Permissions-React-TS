
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
      res.status(200).send({ message: 'Login bem-sucedido!', userDetails: result.rows[0], userId: result.rows[0].id });
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

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT users.*, companies.name AS company_name, companies.cnpj, companies.segment 
       FROM users 
       LEFT JOIN companies ON users.company_id = companies.id 
       WHERE users.id = $1`,
      [userId]
    );

    if (result.rows.length > 0) {
      res.status(200).send(result.rows[0]);
    } else {
      res.status(404).send({ message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    res.status(500).send({ message: 'Erro ao buscar informações do usuário. Tente novamente mais tarde.' });
  }
});

app.get('/company/:id', async (req, res) => {
  const companyId = req.params.id;

  try {
    const companyResult = await pool.query(
      'SELECT * FROM companies WHERE id = $1',
      [companyId]
    );

    if (companyResult.rows.length > 0) {
      const companyDetail = companyResult.rows[0];
      const usersResult = await pool.query(
        'SELECT id, name, email, phone FROM users WHERE company_id = $1',
        [companyId]
      );
      companyDetail.users = usersResult.rows;

      res.status(200).send(companyDetail);
    } else {
      res.status(404).send({ message: 'Empresa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao buscar informações da empresa:', error);
    res.status(500).send({ message: 'Erro ao buscar informações da empresa. Tente novamente mais tarde.' });
  }
});

app.post('/login-history', async (req, res) => {
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO login_history (user_id) VALUES ($1) RETURNING id',
      [user_id]
    );

    res.status(201).send({ message: 'Horário de login registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar horário de login:', error);
    res.status(500).send({ message: 'Erro ao registrar horário de login. Tente novamente mais tarde.' });
  }
});

app.get('/login-history/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query(
      'SELECT login_time::date, count(*) FROM login_history e WHERE user_id = $1 GROUP BY login_time::date order by login_time::date',
      [userId]
    );

    if (result.rows.length > 0) {
      res.status(200).send(result.rows);
    } else {
      res.status(404).send({ message: 'Histórico de login não encontrado para o usuário informado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar histórico de login:', error);
    res.status(500).send({ message: 'Erro ao buscar histórico de login. Tente novamente mais tarde.' });
  }
});

app.post('/update-user', async (req, res) => {
  const { userId, name, phone, currentPassword, newPassword } = req.body;

  try {
      const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);

      if (userResult.rows.length === 0) {
          return res.status(404).send({ message: 'Usuário não encontrado.' });
      }

      const storedPassword = userResult.rows[0].password;

      if (storedPassword !== currentPassword) {
        return res.status(401).send({ message: 'Senha atual incorreta.', reason: 'wrong-password' });
    }
    
      await pool.query(
          'UPDATE users SET name = $1, phone = $2, password = $3 WHERE id = $4',
          [name, phone, newPassword, userId]
      );

      res.status(200).send({ message: 'Detalhes do usuário atualizados com sucesso!' });
  } catch (error) {
      console.error('Erro ao atualizar detalhes do usuário:', error);
      res.status(500).send({ message: 'Erro ao atualizar detalhes do usuário. Tente novamente mais tarde.' });
  }
});
