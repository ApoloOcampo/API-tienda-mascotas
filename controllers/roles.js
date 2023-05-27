require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo get roles
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT id_rol, 
                        nombre, 
                        estado 
                        FROM USUARIO_ROLES 
                        WHERE estado = 1`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

//metodo patch roles
module.exports.actualizar = app.patch('/', (req, res) => {
    const { ID_ROL, NOMBRE, ESTADO } = req.body;
    const sql = `UPDATE USUARIO_ROLES 
                  SET nombre  = ?, 
                  estado = ? 
                  WHERE id_rol = ?`;
    const values = [NOMBRE,ESTADO , ID_ROL];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Rol con id ${ID_ROL} actualizado correctamente`);
    });
});

//metodo post roles
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE } = req.body;
    const sql = `INSERT INTO USUARIO_ROLES 
                  (nombre, estado) 
                  VALUES ( ?, ?)`;
    const values = [NOMBRE, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Rol agregado exitosamente');
    });
});

//metodo delete roles
module.exports.eliminar = app.delete('/', (request, response) => {
    const { ID_ROL } = request.body;
    const sql = `DELETE FROM USUARIO_ROLES 
                 WHERE id_rol = ?`;
    connection.query(sql, ID_ROL, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Rol con id ${ID_ROL} eliminado correctamente`);
      } else {
        response.status(404).send(`Rol con id ${ID_ROL} no encontrado`);
      }
    });
});

//metodo put roles
module.exports.eliminar_estado = app.put('/', (request, response) => {
    const { ID_ROL } = request.body;
    const sql = `UPDATE USUARIO_ROLES 
                 SET estado = 0 
                 WHERE id_rol = ?`;
    connection.query(sql, ID_ROL, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Rol con id ${ID_ROL} eliminado correctamente`);
      } else {
        response.status(404).send(`Rol con id ${ID_ROL} no encontrado`);
      }
    });
});