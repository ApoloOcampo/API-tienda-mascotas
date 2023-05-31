require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = 
    `SELECT
        ID_PRODUCTOSVENTAS, 
        VALOR_TOTALVENTA, 
        ESTADO, 
        PRODUCTOS_ID_PRODUCTOS, 
        VENTAS_ID_VENTA  
    FROM 
        PRODUCTOSVENTAS 
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

//metodo post producrtosventa
module.exports.agregar = app.post('/', (req, res) => {
    const { valor_totalventa, estado, productos_id_productos, ventas_id_venta, id_productosventas} = req.body;
    const sql = 
    `INSERT 
    INTO PRODUCTOSVENTAS 
        (VALOR_TOTALVENTA, 
        ESTADO, 
        PRODUCTOS_ID_PRODUCTOS, 
        VENTAS_ID_VENTA, 
        ID_PRODUCTOSVENTAS) 
    VALUES 
    (?, ?, ?, ?, ?)`;
    const values = [valor_totalventa, estado, productos_id_productos, ventas_id_venta, id_productosventas,  1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Venta del producto  agregado exitosamente');
    });
});

module.exports.actualizar = app.patch('/', (req, res) => {
    //const id_productosventas = req.params.id
    const { id, valor_totalventa, estado, productos_id_productos, ventas_id_venta, id_productosventas } = req.body;
    const sql = 
    `UPDATE 
    PRODUCTOSVENTAS 
    SET 
    VALOR_TOTALVENTA =?, 
    ESTADO =?, 
    PRODUCTOS_ID_PRODUCTOS =?, 
    VENTAS_ID_VENTA=? 
    WHERE ID_PRODUCTOSVENTAS =?`;
    const values = [id, valor_totalventa, estado, productos_id_productos, ventas_id_venta,id_productosventas ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Venta de productos con id ${id} actualizado correctamente`);
    });
});



module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = 
    `UPDATE 
    PRODUCTOSVENTAS 
    SET 
    ESTADO = 0 
    WHERE 
    ID_PRODUCTOSVENTAS = ?`;
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Venta de prodcutos  con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`Venta de prodcutos con id ${id} no encontrado`);
      }
    });
});