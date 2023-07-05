require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo post AdminVenta
module.exports.agregar = app.post('/', (req, res) => {
    const { ID_VENTA, FECHA, HORA, ESTADO,ID_PRODUCTO,USUARIOS_ID_USUARIO, CANTIDAD, TOTAL } = req.body;
    const sql = `INSERT INTO VENTAS ( 
                ID_VENTA, 
                FECHA,
                HORA,
                ESTADO,
                ID_PRODUCTO,
                USUARIOS_ID_USUARIO,
                CANTIDAD,
                TOTAL) 
                VALUES (?,?,?,1,?,1,1,?)`;
    const values = [ ID_VENTA, FECHA, HORA, 1, ID_PRODUCTO, 1, 1, TOTAL ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Venta agregado exitosamente');
    });
});

//metodo get AdminVenta
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
    SELECT
        VENT.ID_VENTA, 
        VENT.FECHA,
        VENT.HORA,
        VENT.ESTADO,
        VENT.ID_PRODUCTO,
        VENT.CANTIDAD,
        VENT.TOTAL,
        PROD.ID_PRODUCTOS AS ID_PRODUCTOS,
        PROD.NOMBRE AS PRODUCTO,
        PROD.VALOR 
        FROM VENTAS VENT
        JOIN PRODUCTOS PROD
             ON VENT.ID_PRODUCTO = PROD.ID_PRODUCTOS
            WHERE VENT.ESTADO = 1`;
     
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

// Actualizar una venta
module.exports.actualizar = app.patch('/', (req, res) => {
    const {  
     ID_VENTA,   
     FECHA,
     HORA, 
     ESTADO, 
     ID_PRODUCTO,
     CANTIDAD,
     TOTAL 
    } = req.body;
    
    const sql = `UPDATE VENTAS SET FECHA = ?,
                                    HORA = ?,
                                    ESTADO = ?,
                                    ID_PRODUCTO = ?,
                                    CANTIDAD = ?,
                                    TOTAL = ?,  
                                    WHERE 
                                    ID_VENTA = ?`;
    const values = [
        FECHA,
        HORA, 
        ESTADO, 
        ID_PRODUCTO,
        CANTIDAD,
        TOTAL, 
        ID_VENTA
    ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Venta con id ${ID_VENTA} actualizada correctamente`);
    });
});

// Método PATCH para borrado logico de Venta
module.exports.eliminar = app.delete('/:id', (request, response) => {
    const ID_VENTA  = request.params.id;
    const sql = `UPDATE VENTAS 
                    SET ESTADO = 0 
                WHERE ID_VENTA = ?`;
    connection.query(sql, ID_VENTA, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Venta con ID ${ID_VENTA} eliminada correctamente`);
        } else {
            response.status(404).send(`Venta con ID ${ID_VENTA} no encontrada`);
        }
    });
});

//metodo get una Venta
module.exports.buscar_uno = app.get('/:id', (request, response) => {  
    const ID_VENTA = request.params.id;
    const sql = `
    SELECT
        VENT.ID_VENTA, 
        VENT.FECHA,
        VENT.HORA,
        VENT.ESTADO,
        VENT.ID_PRODUCTO,
        VENT.CANTIDAD,
        VENT.TOTAL,
        PROD.ID_PRODUCTOS AS ID_PRODUCTOS,
        PROD.NOMBRE AS PRODUCTO,
        PROD.VALOR 
        FROM VENTAS VENT
        JOIN PRODUCTOS PROD
             ON VENT.ID_PRODUCTO = PROD.ID_PRODUCTOS
            WHERE VENT.ID_VENTA = ?`;
     
    connection.query(sql, ID_VENTA, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});