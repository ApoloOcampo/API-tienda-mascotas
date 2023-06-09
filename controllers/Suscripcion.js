require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Método POST para agregar una suscripción
module.exports.agregar = app.post('/', (req, res) => {
  const { ID_SUSCRIPTOR, FECHA_INICIO, ESTADO, FECHA_TERMINO, ID_USUARIO, MONTO } = req.body;
  const sql = `INSERT INTO SUSCRIPCION 
              (ID_SUSCRIPTOR, FECHA_INICIO, ESTADO, FECHA_TERMINO, ID_USUARIO, MONTO) 
              VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [ID_SUSCRIPTOR, FECHA_INICIO, ESTADO, FECHA_TERMINO, ID_USUARIO, MONTO];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    res.status(200).send('Suscripción agregada exitosamente');
  });
});

// Método GET para buscar todas las suscripciones
module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `SELECT 
              ID_SUSCRIPTOR, 
              FECHA_INICIO,
              ESTADO,
              FECHA_TERMINO,
              ID_USUARIO,
              MONTO
              FROM SUSCRIPCION`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

// Método PATCH para actualizar una suscripción
module.exports.actualizar = app.patch('/:idSuscripcion', (req, res) => {
  const { ID_SUSCRIPTOR, FECHA_INICIO, ESTADO, FECHA_TERMINO, ID_USUARIO, MONTO } = req.body;
  const sql = `UPDATE SUSCRIPCION SET 
              FECHA_INICIO = ?,
              ESTADO = ?,
              FECHA_TERMINO = ?,
              ID_USUARIO = ?,
              MONTO = ?
              WHERE ID_SUSCRIPTOR = ?`;
  const values = [FECHA_INICIO, ESTADO, FECHA_TERMINO, ID_USUARIO, MONTO, ID_SUSCRIPTOR];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    res.send(`Suscripción con ID ${ID_SUSCRIPTOR} actualizada correctamente`);
  });
});

// Método PATCH para actualizar estado de una suscripción
module.exports.eliminar = app.patch('/:idSuscripcion', (request, response) => {
  const { ID_SUSCRIPTOR } = request.body;
  const sql = `UPDATE SUSCRIPCION 
               SET ESTADO = 0 
               WHERE ID_SUSCRIPTOR = ?`;
  connection.query(sql, ID_SUSCRIPTOR, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Suscripción con ID ${ID_SUSCRIPTOR} eliminada correctamente`);
    } else {
      response.status(404).send(`Suscripción con ID ${ID_SUSCRIPTOR} no encontrada`);
    }
  });
});