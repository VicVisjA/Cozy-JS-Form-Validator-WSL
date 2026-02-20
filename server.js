const express = require('express');
const mysql = require('mysql2'); // Changed to mysql2 for MySQL
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configuración de conexión para MySQL
const config = {
    host: 'localhost',
    user: 'app',
    password: '',
    database: 'CozyDB'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Conectar y manejar la ruta
app.post('/submit', (req, res) => {
    const { name, email, phone, password, message } = req.body;

    connection.query('INSERT INTO submissions (name, email, phone, password, message) VALUES (?, ?, ?, ?, ?)', [name, email, phone, password, message], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error saving to database' });
        } else {
            res.status(200).json({ success: true, message: '¡Guardado en MySQL!' });
        }
    });
});

app.get('/test', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => console.log('Servidor Cozy corriendo en el puerto 8000 ☕'));