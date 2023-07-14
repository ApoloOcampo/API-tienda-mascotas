require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Agregar una nueva donación
module.exports.agregar = app.post('/', (req, res) => {
    const { ID_DONACION, FECHA, MONTO, ID_USUARIO, ESTADO } = req.body;
    const sql = `INSERT INTO DONACIONES 
                (ID_DONACION, 
                FECHA, MONTO,
                ID_USUARIO, 
                ESTADO) 
                VALUES (?, ?, ?, ?, ?)`;
    const values = [ID_DONACION, FECHA, MONTO, ID_USUARIO, ESTADO];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).send('Donación agregada exitosamente');
    });
  });


// Obtener todas las donaciones
module.exports.buscar_todo = app.patch('/', (request, response) => {
    const sql = `SELECT 
            ID_DONACION,
            FECHA, 
            MONTO,
            ID_USUARIO, 
            ESTADO 
            FROM DONACIONES`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        response.status(200).send(results);
      } else {
        response.status(204).send('Sin resultado');
      }
    });
  });


// Actualizar una donación
module.exports.actualizar = app.patch('/', (req, res) => {
    const { ID_DONACION, FECHA, MONTO, ID_USUARIO, ESTADO } = req.body;
    const sql = `UPDATE DONACIONES
                SET FECHA = ?,
                MONTO = ?,
                ID_USUARIO = ?,
                ESTADO = ?
                WHERE ID_DONACION = ?`;
    const values = [FECHA, MONTO, ID_USUARIO, ESTADO, ID_DONACION];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Donación con ID_DONACION ${ID_DONACION} actualizada correctamente`);
    });
  });


// Eliminar una donación
module.exports.eliminar = app.patch('/', (request, response) => {
    const { ID_DONACION } = request.body;
    const sql = `UPDATE 
                DONACIONES 
                SET ESTADO = 0 
                WHERE ID_DONACION = ?`;
    connection.query(sql, ID_DONACION, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Donación con ID ${ID_DONACION} eliminada correctamente`);
      } else {
        response.status(404).send(`Donación con ID ${ID_DONACION} no encontrada`);
      }
    });
  });