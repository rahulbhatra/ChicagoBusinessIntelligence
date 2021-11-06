const router = require('express').Router();
const { Pool, Client } = require("pg");

const credentials = {
    user: "postgres",
    host: "localhost",
    database: "chicago_business_intelligence",
    password: "root",
    port: 5432,
  };

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}



router.post('/signUp', (req, res) => {
    
    res.send('signUp');
});

router.get('/signIn', (req, res) => {
    
    res.send('signIn');
});


module.exports = router;