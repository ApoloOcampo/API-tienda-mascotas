require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Método POST para agregar una promoción
module.exports.agregar = app.post('/', (req, res) => {
    const { ID_PROMOCION, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PRODUCTO } = req.body;
    const sql = `INSERT INTO PROMOCION 
                (ID_PROMOCION, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PRODUCTO) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [ID_PROMOCION, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PRODUCTO];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Promoción agregada exitosamente');
    });
});

// Método GET para buscar todas las promociones
module.exports.buscar_todo = app.get('/', (request, response) => {
    const sql = `SELECT 
                ID_PROMOCION, 
                FECHA_INICIO,
                FECHA_FIN,
                DESCUENTO,
                ESTADO,
                ID_PRODUCTO
                FROM PROMOCION`;
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
    const { ID_PROMOCION, FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PRODUCTO } = req.body;
    const sql = `UPDATE PROMOCION SET 
                FECHA_INICIO = ?,
                FECHA_FIN = ?,
                DESCUENTO = ?,
                ESTADO = ?,
                ID_PRODUCTO = ?
                WHERE ID_PROMOCION = ?`;
    const values = [FECHA_INICIO, FECHA_FIN, DESCUENTO, ESTADO, ID_PRODUCTO, ID_PROMOCION];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Promoción con ID ${ID_PROMOCION} actualizada correctamente`);
    });
});

// Método PATCH para actualizar estado una promoción
module.exports.eliminar = app.patch('/', (request, response) => {
    const { ID_PROMOCION } = request.body;
    const sql = `UPDATE PROMOCION 
                SET ESTADO = 0 
                WHERE ID_PROMOCION = ?`;
    connection.query(sql, ID_PROMOCION, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Promoción con ID ${ID_PROMOCION} eliminada correctamente`);
        } else {
            response.status(404).send(`Promoción con ID ${ID_PROMOCION} no encontrada`);
        }
    });
});
