require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/


//metodo post PRODUCTOS
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE } = req.body;
    const sql = `INSERT INTO PROMOCIONES 
                (nombre, estado) 
                VALUES ( ?, ?`;
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PROMOCIONES agregado exitosamente');
    });
});


module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT 
                id_promociones, 
                nombre
                FROM PROMOCIONES`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


module.exports.actualizar = app.patch('/', (req, res) => {
    const { ID_PROMOCIONES, NOMBRE } = req.body;
    const sql = `UPDATE PROMOCIONES SET 
                NOMBRE = ?
                WHERE ID_PROMOCIONES = ?`;
    const values = [NOMBRE];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`PROMOCIONES con id ${ID_PROMOCIONES} actualizado correctamente`);
    });
});


module.exports.eliminar = app.put('/', (request, response) => {
    const { ID_PROMOCIONES } = request.body;
    const sql = `UPDATE PROMOCIONES 
                SET ESTADO = 0 
                WHERE ID_PROMOCIONES = ?`;
        connection.query(sql, ID_PROMOCIONES, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PROMOCIONES con id ${ID_PROMOCIONES} eliminado correctamente`);
      } else {
        response.status(404).send(`PROMOCIONES con id ${ID_PROMOCIONES} no encontrado`);
      }
    });
});