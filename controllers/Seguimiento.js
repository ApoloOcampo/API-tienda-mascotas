require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/


module.exports.buscarTodosSeguimientos = app.get('/', (req, res) => {
  const sql = `SELECT id_seguimiento FROM SEGUIMIENTOS`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(204).send('Sin resultados');
    }
  });
});

module.exports.agregarSeguimiento = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = `INSERT INTO SEGUIMIENTOS (nombre) VALUES (?)`;
    const values = [nombre];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).send('Seguimiento agregado exitosamente');
    });
  });
  
  module.exports.actualizarSeguimiento = app.patch('/:id', (req, res) => {
    const id_seguimiento = req.params.id;
    const { nombre } = req.body;
    const sql = `UPDATE SEGUIMIENTOS SET nombre = ? WHERE id_seguimiento = ?`;
    const values = [nombre, id_seguimiento];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Seguimiento con ID ${id_seguimiento} actualizado correctamente`);
    });
  });
  
  module.exports.eliminarSeguimiento = app.delete('/:id', (req, res) => {
    const id_seguimiento = req.params.id;
    const sql = `DELETE FROM SEGUIMIENTOS WHERE id_seguimiento = ?`;
    
    connection.query(sql, id_seguimiento, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send(`Seguimiento con ID ${id_seguimiento} eliminado correctamente`);
      } else {
        res.status(404).send(`Seguimiento con ID ${id_seguimiento} no encontrado`);
      }
    });
  });

  module.exports.eliminar_estado_Seguimiento = app.put('/', (request, response) => {
    const { id_seguimiento } = request.body;
    const sql = "UPDATE SEGUIMIENTOS SET ESTADO = 0 WHERE id_seguimiento = ?";
    connection.query(sql, id_seguimiento, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Seguimiento con id ${id_seguimiento} eliminado correctamente`);
      } else {
        response.status(404).send(`Seguimiento con ID ${id_seguimiento} no encontrado`);
      }
    });
});
  