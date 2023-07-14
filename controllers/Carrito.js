require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//Metodo GET

module.exports.buscar_todo = app.get('/', (request, response)=> {
    const sql = `
    SELECT 
    CARRITO.ID_CARRITO,
    CARRITO.IMAGEN,
    CARRITO.CANTIDAD,
    CARRITO.PRECIO,
    (CARRITO.CANTIDAD * CARRITO.PRECIO) AS SUBTOTAL,
    CARRITO.ESTADO,
    PRODUCTOS.ID_PRODUCTOS,
    PRODUCTOS.NOMBRE AS PRODUCTO
FROM CARRITO 
JOIN PRODUCTOS 
    ON CARRITO.ID_PRODUCTOS = PRODUCTOS.ID_PRODUCTOS
WHERE CARRITO.ESTADO = 1;
     `;
        
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if(results.length > 0){
            response.status(200).send(results);
        }
        else{
            response.status(204).send("Sin resultado");
        }
    });
});

//Metodo GET por ID

module.exports.buscar_id = app.get('/:id', (request, response) => {  
    const id_carrito = request.params.id;
    const sql = `
    SELECT 
        ID_CARRITO,
        IMAGEN, 
        CANTIDAD,
        PRECIO,
        SUBTOTAL,
        SUM(SUBTOTAL) AS SUBTOTALRESUMEN,
        ESTADO
    FROM CARRITO 
    WHERE ID_CARRITO = ?
     `;
    connection.query(sql, id_carrito, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });               
});



module.exports.sumarSubtotales = app.get('/subtotal', (request, response) => {
    const sql = `
      SELECT 
        SUM(SUBTOTAL) AS SUBTOTALRESUMEN
      FROM CARRITO
    `;
    
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta', error);
        response.status(500).send('Error al obtener la suma de los subtotales');
        return;
      }
      
      const totalSubtotal = results[0].total_subtotal;
      response.status(200).json({ subtotal: totalSubtotal });
    });
  });
  




//Metodo PATCH
module.exports.actualizar = app.patch('/', (request, response) =>{
    const {
        CANTIDAD,
        ID_CARRITO
    } = request.body;


    const sql = `
        UPDATE CARRITO
        SET CANTIDAD = ? 
        WHERE ID_CARRITO = ?
    `;

    const values = [
        
        CANTIDAD,
        ID_CARRITO
    ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        response.send(`Producto con id ${ID_CARRITO} actualizado correctamente`)
    });   
});

//Metodo POST
module.exports.agregar = app.post('/', (request, response) => {
    const {
        
        IMAGEN,
        NOMBRE,
        ID_PRODUCTOS,
        CANTIDAD,
        PRECIO,
        SUBTOTAL
    } = request.body;

    const sql = `
        INSERT INTO CARRITO (IMAGEN, NOMBRE, ID_PRODUCTOS, CANTIDAD, PRECIO, SUBTOTAL)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        
        IMAGEN,
        NOMBRE,
        ID_PRODUCTOS,
        CANTIDAD,
        PRECIO,
        SUBTOTAL
    ];

    connection.query(sql, values,(error, results) => {
        if (error) throw error;
        response.status(200).send(`Compra ingresada correctamente`)
    });
});


//Metodo DELETE
module.exports.eliminar = app.delete('/:id', (request, response) => {
    const ID_CARRITO = request.params.id;

    const sql = `DELETE FROM CARRITO
                      WHERE ID_CARRITO = ?

    `;
    connection.query(sql, ID_CARRITO, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0){
            response.status(200).send(`Venta con id ${ID_CARRITO} a sido eliminado correctamente`);    
        }
        else{
            response.status(400).send(`Venta con id ${ID_CARRITO} no encontrada` )
        }
    });
});

module.exports.eliminar = app.delete('', (request, response) => {
    const sql = `
    DELETE FROM CARRITO WHERE 1;
    `;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send('Todos los registros de la tabla carrito han sido eliminados correctamente');
        } else {
            response.status(400).send('No se encontraron registros en la tabla carrito');
        }
    });
});
