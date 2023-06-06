require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo post ESPECIES
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE } = req.body;
    const sql = `INSERT INTO ESPECIES
                        (NOMBRE, ESTADO)
                        VALUES (?, ?)`;
    const values = [NOMBRE, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('ESPECIE agregado exitosamente');
    });
});


//metodo GET ESPECIES
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT
                ID_ESPECIES,
                NOMBRE, 
                ESTADO 
                FROM ESPECIES`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


//metodo PATCH ESPECIES
module.exports.actualizar = app.patch('/', (req, res) => {
    const { ID_ESPECIES, NOMBRE } = req.body;
    const sql = `UPDATE ESPECIES SET 
                        NOMBRE = ?
                        WHERE ID_ESPECIES = `;
    const values = [NOMBRE];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`ESPECIES con id ${ID_ESPECIES} actualizado correctamente`);
    });
});


//metodo PUT ESPECIES
module.exports.eliminar = app.put('/', (request, response) => {
    const { ID_ESPECIES } = request.body;
    const sql = `UPDATE ESPECIES 
                SET ESTADO = 0 
                WHERE ID_ESPECIES = ?`;
    connection.query(sql, id_especies, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`ESPECIES con id ${ID_ESPECIES} eliminado correctamente`);
      } else {
        response.status(404).send(`ESPECIES con id ${ID_ESPECIES} no encontrado`);
      }
    });
});