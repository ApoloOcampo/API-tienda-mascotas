require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//Metodo POST
module.exports.agregar = app.post('/', (req, res) => {
    const { RUT, PRIMER_NOMBRE, SEGUNDO_NOMBRE, AP_PATERNO, AP_MATERNO, ESTA_SUSCRITO, ESTADO, USUARIO_ROLES_ID_ROL, CORREO, CONTRASEÑA, COMUNA, DIRECCION} = req.body;
    const sql = 
    `INSERT 
        INTO USUARIOS (
        RUT,  
        PRIMER_NOMBRE,
        SEGUNDO_NOMBRE, 
        AP_PATERNO, 
        AP_MATERNO, 
        ESTA_SUSCRITO,
        ESTADO,
        USUARIO_ROLES_ID_ROL,  
        CORREO,
        CONTRASEÑA,
        COMUNA,
        DIRECCION 
        )
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [RUT, PRIMER_NOMBRE, SEGUNDO_NOMBRE, AP_PATERNO, AP_MATERNO, ESTA_SUSCRITO, 1, 2, CORREO, CONTRASEÑA, COMUNA, DIRECCION];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Usuario agregado exitosamente');
    });
});


//Metodo GET
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = 
    `SELECT
        ID_USUARIO,
        RUT,  
        PRIMER_NOMBRE,
        SEGUNDO_NOMBRE, 
        AP_PATERNO, 
        AP_MATERNO, 
        ESTA_SUSCRITO, 
        ESTADO, 
        USUARIO_ROLES_ID_ROL,
        CORREO,
        CONTRASEÑA,
        COMUNA,
        DIRECCION 
    FROM USUARIOS 
    WHERE ESTADO = 1`;
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
    console.log("entramos")
    const {
        RUT,
        PRIMER_NOMBRE ,
        SEGUNDO_NOMBRE,
        AP_PATERNO,
        AP_MATERNO,
        CORREO,
        CONTRASEÑA,
        COMUNA,
        DIRECCION,
        ID_USUARIO
    } = req.body;
    const sql = `
      UPDATE
        USUARIOS
        SET
        PRIMER_NOMBRE = ?,
        SEGUNDO_NOMBRE = ?,
        AP_PATERNO = ?,
        AP_MATERNO = ?,
        CORREO = ?,
        CONTRASEÑA = ?,
        COMUNA = ?,
        DIRECCION = ?,
        RUT = ?
      WHERE
        ID_USUARIO = ?
    `;
    const values = [
        RUT,
        PRIMER_NOMBRE ,
        SEGUNDO_NOMBRE,
        AP_PATERNO,
        AP_MATERNO,
        CORREO,
        CONTRASEÑA,
        COMUNA,
        DIRECCION,
        ID_USUARIO
    ];
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Usuario con id ${ID_USUARIO} actualizado correctamente`);
    });
  });
  





//Metodo DELETE
module.exports.eliminar = app.delete('/:id', (request, response) => {
    const ID_USUARIO = request.params.id;

    const sql = `UPDATE USUARIOS 
                    SET ESTADO = 0
                 WHERE ID_USUARIO = ?`;
    connection.query(sql, ID_USUARIO, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`USUARIOS con id ${ID_USUARIO} eliminado correctamente`);
      } else {
        response.status(404).send(`USUARIOS con id ${ID_USUARIO} no encontrado`);
      }
    });
});


// module.exports.eliminar = app.delete('/', (request, response) => {
//     const { ID_USUARIO } = request.body;
//     const sql = `DELETE FROM USUARIOS
//                  WHERE ID_USUARIO = ?`;
//     connection.query(sql, ID_USUARIO, (error, results) => {
//       if (error) throw error;
//       if (results.affectedRows > 0) {
//         response.status(200).send(`USUARIO con id ${ID_USUARIO} eliminado correctamente`);
//       } else {
//         response.status(404).send(`USUARIO con id ${ID_USUARIO} no encontrado`);
//       }
//     });
// });