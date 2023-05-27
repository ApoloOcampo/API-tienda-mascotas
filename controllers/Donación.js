require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Obtener todas las donaciones
module.exports.buscar_todo = app.patch('/', (request, response) => {
    const sql = "SELECT id_donacion, fecha, monto, id_usuario FROM DONACIONES";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });
});

// Actualizar una donación
module.exports.actualizar = app.patch('/', (req, res) => {
    const { id_donacion, fecha, monto, id_usuario } = req.body;
    const sql = "UPDATE DONACIONES SET fecha = ?, monto = ?, id_usuario = ? WHERE id_donacion = ?";
    const values = [fecha, monto, id_usuario, id_donacion];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Donación con id_donacion ${id_donacion} actualizada correctamente`);
    });
});

// Agregar una nueva donación
module.exports.agregar = app.post('/', (req, res) => {
    const { id_donacion, fecha, monto, id_usuario } = req.body;
    const sql = "INSERT INTO DONACIONES (id_donacion, fecha, monto, id_usuario) VALUES (?, ?, ?, ?)";
    const values = [id_donacion, fecha, monto, id_usuario];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Donación agregada exitosamente');
    });
});

// Eliminar una donación
module.exports.agregar = app.delete('/', (request, response) => {
    const { id_donacion } = request.body;
    const sql = "DELETE FROM DONACIONES WHERE id_donacion = ?";
    connection.query(sql, id_donacion, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Donación con id ${id_donacion} eliminada correctamente`);
        } else {
            response.status(404).send(`Donación con id ${id_donacion} no encontrada`);
        }
    });
});