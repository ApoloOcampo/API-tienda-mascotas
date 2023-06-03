require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Agregar una nueva venta
module.exports.agregar = app.post('/', (req, res) => {
    const { id_ventas, fecha, estado, hora, id_usuario } = req.body;
    const sql = "INSERT INTO VENTAS (id_venta, fecha, estado, hora, id_usuario) VALUES (?, ?, ?, ?, ?)";
    const values = [id_ventas, fecha, estado, hora, id_usuario];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Venta agregada exitosamente');
    });
});


// Obtener todas las ventas
module.exports.buscar_todo = app.patch('/', (request, response) => {
    const sql = "SELECT id_venta, fecha, estado, hora, id_usuario FROM VENTAS";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });
});


// Actualizar una venta
module.exports.actualizar = app.patch('/', (req, res) => {
    const { id_ventas, fecha, estado, hora, id_usuario } = req.body;
    const sql = "UPDATE VENTAS SET fecha = ?, estado = ?, hora = ?, id_usuario = ? WHERE id_venta = ?";
    const values = [fecha, estado, hora, id_usuario, id_ventas];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Venta con id ${id_ventas} actualizada correctamente`);
    });
});


// Eliminar una venta
module.exports.eliminar = app.delete('/', (request, response) => {
    const { id_ventas } = request.body;
    const sql = "DELETE FROM VENTAS WHERE id_venta = ?";
    connection.query(sql, id_ventas, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Venta con id ${id_ventas} eliminada correctamente`);
        } else {
            response.status(404).send(`Venta con id ${id_ventas} no encontrada`);
        }
    });
});