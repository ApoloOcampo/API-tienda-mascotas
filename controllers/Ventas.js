require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Agregar una nueva venta
module.exports.agregar = app.post('/', (req, res) => {
    const {  FECHA, HORA, MONTO_TOTAL_VENTA, FECHA_DESPACHO,FECHA_ENTREGA } = req.body;
    const sql = `INSERT INTO VENTAS ( 
        FECHA, 
        ESTADO,
        HORA,
        MONTO_TOTAL_VENTA) 
        VALUES (?, 1, ?, ?)
        `;
    const values = [ FECHA, HORA, MONTO_TOTAL_VENTA];
    let ID_VENTA = 0;
    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        ID_VENTA = results.insertId;
        res.status(200).send(`Venta agregada exitosamente con id ${results.insertId}`);
    });
    let sql_despacho = `
    INSERT INTO DESPACHOS (
        FECHA_DESPACHO, 
        FECHA_ENTREGA, 
        ID_SEGUIMIENTO,
         ID_VENTA)
         VALUES (?,?,1,?)`;
         
    let values_despacho = [ FECHA_DESPACHO, FECHA_ENTREGA, ID_VENTA]
    connection.query(sql_despacho, values_despacho,(error,results) => {
        if (error) throw error;

        response.status(200).send(`Despacho registrado correctamente con id ${results.insertId}`);
});
});



// Obtener todas las ventas
module.exports.buscar_todo = app.patch('/', (request, response) => {
    const sql = `SELECT 
                ID_VENTA,
                FECHA,
                ESTADO,
                HORA,
                MONTO_TOTAL_VENTA
                FROM VENTAS`;
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
    const { ID_VENTA, FECHA, ESTADO, HORA, MONTO_TOTAL_VENTA } = req.body;
    const sql = `UPDATE VENTAS SET FECHA = ?,
                                    ESTADO = ?,
                                    HORA = ?,
                                    MONTO_TOTAL_VENTA = ?,  
                                    WHERE 
                                    ID_VENTA = ?`;
    const values = [FECHA, ESTADO, HORA, MONTO_TOTAL_VENTA, ID_VENTA];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Venta con id ${ID_VENTA} actualizada correctamente`);
    });
});

// Eliminar una venta
module.exports.eliminar = app.delete('/', (request, response) => {
    const { ID_VENTA } = request.body;
    const sql = `UPDATE FROM VENTAS 
                SET ESTADO = 0 
                WHERE ID_VENTA = ?`;
    connection.query(sql, ID_VENTA, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Venta con id ${ID_VENTA} eliminada correctamente`);
        } else {
            response.status(404).send(`Venta con id ${ID_VENTA} no encontrada`);
        }
    });
});