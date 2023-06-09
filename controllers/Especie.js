require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo post ESPECIES
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = `INSERT INTO ESPECIES
                        (nombre, estado)
                        VALUES (?, ?)`;
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('ESPECIE agregado exitosamente');
    });
});


//metodo GET ESPECIES
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT
                id_especies,
                nombre, 
                estado 
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
    const { id_especies, nombre } = req.body;
    const sql = `UPDATE ESPECIES SET 
                        nombre = ?
                        WHERE id_especies = `;
    const values = [nombre];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`ESPECIES con id ${id_especies} actualizado correctamente`);
    });
});


//metodo PUT ESPECIES
module.exports.eliminar = app.put('/', (request, response) => {
    const { id_especies } = request.body;
    const sql = `UPDATE ESPECIES 
                SET ESTADO = 0 
                WHERE id_especies = ?`;
    connection.query(sql, id_especies, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`ESPECIES con id ${id_especies} eliminado correctamente`);
      } else {
        response.status(404).send(`ESPECIES con id ${id_especies} no encontrado`);
      }
    });
});