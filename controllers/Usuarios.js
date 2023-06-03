require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = 
    `SELECT
        ID_USUARIO,
        RUT, 
        DV, 
        NOMBRE,
        AP_PATERNO,
        AP_MATERNO, 
        ESTA_SUSCRITO, 
        ESTADO, 
        USUARIO_ROLES_ID_ROL 
    FROM 
        USUARIOS 
    WHERE 
        ESTADO = 1`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


//metodo post roles
module.exports.agregar = app.post('/', (req, res) => {
    const { rut, dv, nombre, ap_paterno, ap_materno, esta_suscrito, estado, usuario_roles_id_rol, id_usuarios } = req.body;
    const sql = 
    `INSERT 
        INTO USUARIOS 
        (RUT, 
        DV, 
        NOMBRE, 
        AP_PATERNO, 
        AP_MATERNO, 
        ESTA_SUSCRITO, 
        ESTADO, 
        USUARIO_ROLES_ID_ROL, 
        ID_USUARIO) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [rut, dv, nombre, ap_paterno, ap_materno, esta_suscrito, estado, usuario_roles_id_rol, id_usuarios, 1];

    connection.query(sql, values, (error, res) => {
        if (error) throw error;
        res.status(200).send('Usuario agregado exitosamente');
    });
});


module.exports.actualizar = app.patch('/', (req, res) => {
    const id_usuario = req.params.id
    const { id, rut, dv, nombre, ap_paterno, ap_materno, esta_suscrito, estado, usuario_roles_id_rol, id_usuarios } = req.body;
    const sql = "UPDATE USUARIOS SET RUT =?, DV =?, NOMBRE =?, AP_PATERNO =?, AP_MATERNO =?, ESTA_SUSCRITO=?, ESTADO=?, USUARIO_ROLES_ID_ROL=?, ID_USUARIO WHERE ID_USUARIO =?";
    const values = [id, rut, dv, nombre, ap_paterno, ap_materno, esta_suscrito, estado, usuario_roles_id_rol, id_usuarios];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Usuario con id ${id} actualizado correctamente`);
    });
});



module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "UPDATE USUARIOS SET ESTADO = 0 WHERE ID_USUARIO = ?";
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Usuario con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`Usuario con id ${id} no encontrado`);
      }
    });
});