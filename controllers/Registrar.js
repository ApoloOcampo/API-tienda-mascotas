require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo post roles
module.exports.agregar = app.post('/', (req, res) => {
    const { rut, primer_nombre,segundo_nombre, ap_paterno, ap_materno, esta_suscrito, usuario_roles_id_rol, correo, contraseña, comuna, direccion,estado, id_usuarios } = req.body;
    const sql = 
    `INSERT 
        INTO USUARIOS 
        RUT,  
        PRIMER_NOMBRE,
        SEGUNDO_NOMBRE, 
        AP_PATERNO, 
        AP_MATERNO, 
        ESTA_SUSCRITO,  
        CORREO,
        CONTRASEÑA,
        COMUNA,
        DIRECCION, 
        ESTADO 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [rut, primer_nombre,segundo_nombre, ap_paterno, ap_materno, esta_suscrito, usuario_roles_id_rol, correo, contraseña, comuna, direccion,estado, id_usuarios, 1];

    connection.query(sql, values, (error, res) => {
        if (error) throw error;
        res.status(200).send('Usuario agregado exitosamente');
    });
});