require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo get AdminProducto
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT id_productos, 
                 nombre,
                 valor,
                 stock,
                 imagen, 
                 promociones_id_promociones, 
                 especies_id_especies 
                FROM PRODUCTOS`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

//metodo patch AdminProducto
module.exports.actualizar = app.patch('/', (req, res) => {
    const {ID_PRODUCTOS, NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES } = req.body;
    const sql = `UPDATE PRODUCTOS SET nombre = ?, 
                valor = ?, 
                stock = ?, 
                imagen = ?, 
                promociones_id_promociones = ?, 
                id_especie = ? 
                WHERE id_productos = ?`;
    const values = [ NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES, ID_PRODUCTOS ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`PRODUCTO con id ${ID_PRODUCTOS} actualizado correctamente`);
    });
});

//metodo post AdminProducto
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES } = req.body;
    const sql = `INSERT INTO PRODUCTOS ( 
                nombre, 
                valor, 
                stock, 
                imagen, 
                promociones_id_promociones, 
                especies_id_especies) 
                VALUES (?,?,?,?,?,?)`;
    const values = [ NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PRODUCTOS agregado exitosamente');
    });
});

//metodo delete AdminProducto
module.exports.eliminar = app.delete('/', (request, response) => {
    const { ID_PRODUCTOS } = request.body;
    const sql = `DELETE FROM PRODUCTOS 
                WHERE id_productos = ?`;
    connection.query(sql, ID_PRODUCTOS, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PRODUCTO con id ${ID_PRODUCTOS} eliminado correctamente`);
      } else {
        response.status(404).send(`PRODUCTO con id ${ID_PRODUCTOS} no encontrado`);
      }
    });
});