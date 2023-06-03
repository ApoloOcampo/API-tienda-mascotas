require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscarTodosDespachos = app.get('/', (req, res) => {
    const sql = `SELECT
                id_despacho, 
                id_venta 
                FROM DESPACHOS`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(204).send('Sin resultados');
      }
    });
  });


  module.exports.agregarDespacho = app.post('/', (req, res) => {
    const { fecha_despacho, fecha_entrega, id_seguimiento, id_venta } = req.body;
    const sql = `INSERT INTO DESPACHOS 
                (fecha_despacho,
                fecha_entrega,
                id_seguimiento, 
                id_venta) 
                VALUES (?, ?, ?, ?)`; 
    const values = [fecha_despacho, fecha_entrega, id_seguimiento, id_venta];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).send('Despacho agregado exitosamente');
    });
  });

  module.exports.actualizarDespacho = app.patch('/:id', (req, res) => {
    const id_despacho = req.params.id;
    const { fecha_despacho, fecha_entrega, id_seguimiento, id_venta } = req.body;
    const sql = `UPDATE DESPACHOS SET 
                fecha_despacho= ?, 
                fecha_entrega = ?, 
                id_seguimiento = ?, 
                id_venta = ?
                WHERE id_despacho = ?`;
    const values = [fecha_despacho, fecha_entrega, id_seguimiento, id_venta, id_despacho];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Despacho con ID ${id_despacho} actualizado correctamente`);
    });
  });

  

  module.exports.eliminarDespacho = app.delete('/:id', (req, res) => {
    const id_despacho = req.params.id;
    const sql = `DELETE FROM DESPACHOS
                 WHERE id_despacho = ?`;
    connection.query(sql, id_despacho, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send(`Despacho con ID ${id_despacho} eliminado correctamente`);
      } else {
        res.status(404).send(`Despacho con ID ${id_despacho} no encontrado`);
      }
    });
  });
  
  module.exports.eliminar_estado_Despacho = app.put('/', (request, response) => {
    const { id_despacho } = request.body;
    const sql = `UPDATE DESPACHOS SET ESTADO = 0
                 WHERE id_despacho = ?`;
    connection.query(sql, id_despacho, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Despacho con ID ${id_despacho} eliminado correctamente`);
      } else {
        response.status(404).send(`Despacho con ID ${id_despacho} no encontrado`);
      }
    });
});
  
  