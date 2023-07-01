require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Método POST para agregar una promoción
module.exports.agregar = app.post('/', (req, res) => {
    const { ID_PROMOCIONES, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO  } = req.body;
    const sql = `INSERT INTO PROMOCIONES 
                (ID_PROMOCIONES, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO) 
                VALUES (?, ?, ?, ?, ?)`;
    const values = [ID_PROMOCIONES, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Promoción agregada exitosamente');
    });
});

// Método GET para buscar todas las promociones
module.exports.buscar_todo = app.get('/', (request, response) => {
    const sql = `SELECT 
                ID_PROMOCIONES, 
                FECHA_INICIO,
                FECHA_FIN,
                DESCUENTO,
                ESTADO
                FROM PROMOCIONES`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });
});

// Método PATCH para actualizar una promoción
module.exports.actualizar = app.patch('/', (req, res) => {
    const { ID_PROMOCIONES, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO } = req.body;
    const sql = `UPDATE PROMOCIONES SET 
                FECHA_INICIO = ?,
                FECHA_FIN = ?,
                DESCUENTO = ?,
                ESTADO = ?
                WHERE ID_PROMOCIONES = ?`;
    const values = [FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PROMOCIONES];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Promoción con ID ${ID_PROMOCIONES} actualizada correctamente`);
    });
});

// Método PATCH para actualizar estado una promoción
module.exports.eliminar = app.patch('/', (request, response) => {
    const { ID_PROMOCIONES } = request.body;
    const sql = `UPDATE PROMOCIONES 
                SET ESTADO = 0 
                WHERE ID_PROMOCIONES = ?`;
    connection.query(sql, ID_PROMOCIONES, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Promoción con ID ${ID_PROMOCIONES} eliminada correctamente`);
        } else {
            response.status(404).send(`Promoción con ID ${ID_PROMOCIONES} no encontrada`);
        }
    });
});
