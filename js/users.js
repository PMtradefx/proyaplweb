const mysql = require('mysql2/promise');

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PMservices22',
  database: 'AWEBS'
});

const query = 'INSERT INTO usuarios SET ?';
const userData = {
  username: 'new_user',
  password: 'new_password',
  rol: 'estudiante'
};

db.query(query, userData)
  .then((results) => {
    console.log('User added successfully');
  })
  .catch((error) => {
    console.error('Error adding user:', error);
  })
  .finally(() => {
    db.end()
      .then(() => {
        console.log('Database connection closed');
      })
      .catch((error) => {
        console.error('Error closing database connection:', error);
      });
  });