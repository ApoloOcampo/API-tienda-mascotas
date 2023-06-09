require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/


//metodo post AdminProducto
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE, VALOR, STOCK, IMAGEN, ESTADO, ESPECIES_ID_ESPECIES, PROMOCIONES_ID_PROMOCIONES } = req.body;
    const sql = `INSERT INTO PRODUCTOS ( 
                NOMBRE, 
                VALOR,
                STOCK,
                IMAGEN,
                ESTADO,
                ESPECIES_ID_ESPECIES,
                PROMOCIONES_ID_PROMOCIONES) 
                VALUES (?,?,?,?,?,?,?)`;
    const values = [ NOMBRE, VALOR, STOCK, IMAGEN, 1, ESPECIES_ID_ESPECIES, PROMOCIONES_ID_PROMOCIONES ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PRODUCTOS agregado exitosamente');
    });
});


//metodo get AdminProducto
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `SELECT PROD.ID_PRODUCTOS, 
                PROD.NOMBRE,
                PROD.VALOR,
                PROD.STOCK,
                PROD.IMAGEN, 
                PROD.PROMOCIONES_ID_PROMOCIONES, 
                PROD.ESPECIES_ID_ESPECIES,
                ESPE.NOMBRE AS NOMBRE_ESPECIE,
                PROM.NOMBRE AS NOMBRE_PROMOCION
                FROM PRODUCTOS PROD
                JOIN ESPECIES ESPE
                    ON PROD.ESPECIES_ID_ESPECIES = ESPE.ID_ESPECIES
                LEFT JOIN PROMOCIONES PROM
                    ON PROD.PROMOCIONES_ID_PROMOCIONES = PROM.ID_PROMOCIONES
                    WHERE PROD.ESTADO = 1`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


module.exports.actualizar = app.patch('/', (request, response) => {  
    const {
        ID_PRODUCTOS,
        NOMBRE,
        VALOR,
        STOCK,
        IMAGEN,
        PROMOCIONES_ID_PROMOCIONES,
        ESPECIES_ID_ESPECIES
    } = request.body;
    
    const sql = `
        UPDATE PRODUCTOS
        SET NOMBRE = ?,
            VALOR = ?,
            STOCK = ?,
            IMAGEN = ?,
            PROMOCIONES_ID_PROMOCIONES = ?,
            ESPECIES_ID_ESPECIES = ?
        WHERE ID_PRODUCTOS = ?
    `;

    const values = [
        NOMBRE,
        VALOR,
        STOCK,
        IMAGEN,
        PROMOCIONES_ID_PROMOCIONES,
        ESPECIES_ID_ESPECIES,
        ID_PRODUCTOS
    ];
    
    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        response.send(`Producto con id ${ID_PRODUCTOS} actualizado correctamente`);
    });               
});


//metodo delete AdminProducto
module.exports.eliminar = app.delete('/', (request, response) => {
    const { ID_PRODUCTOS } = request.body;
    const sql = `DELETE FROM PRODUCTOS 
                WHERE ID_PRODUCTOS = ?`;
    connection.query(sql, ID_PRODUCTOS, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PRODUCTO con id ${ID_PRODUCTOS} eliminado correctamente`);
      } else {
        response.status(404).send(`PRODUCTO con id ${ID_PRODUCTOS} no encontrado`);
      }
    });
});


//metodo get AdminProducto todo perro
module.exports.buscar_perro = app.get('/buscar_perro', (request, response) => {  
    const sql = `SELECT PROD.ID_PRODUCTOS, 
                PROD.NOMBRE,
                PROD.VALOR,
                PROD.STOCK,
                PROD.IMAGEN, 
                PROD.PROMOCIONES_ID_PROMOCIONES, 
                PROD.ESPECIES_ID_ESPECIES,
                ESPE.NOMBRE AS NOMBRE_ESPECIE,
                PROM.NOMBRE AS NOMBRE_PROMOCION
                FROM PRODUCTOS PROD
                LEFT JOIN ESPECIES ESPE
                    ON PROD.ESPECIES_ID_ESPECIES = ESPE.ID_ESPECIES
                LEFT JOIN PROMOCIONES PROM
                    ON PROD.PROMOCIONES_ID_PROMOCIONES = PROM.ID_PROMOCIONES
                WHERE PROD.ESTADO = 1 AND PROD.ESPECIES_ID_ESPECIES = 1`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


//metodo get AdminProducto todo gato
module.exports.buscar_gato = app.get('/buscar_gato', (request, response) => {  
    const sql = `SELECT PROD.ID_PRODUCTOS, 
                PROD.NOMBRE,
                PROD.VALOR,
                PROD.STOCK,
                PROD.IMAGEN, 
                PROD.PROMOCIONES_ID_PROMOCIONES, 
                PROD.ESPECIES_ID_ESPECIES,
                ESPE.NOMBRE AS NOMBRE_ESPECIE,
                PROM.NOMBRE AS NOMBRE_PROMOCION
                FROM PRODUCTOS PROD
                LEFT JOIN ESPECIES ESPE
                    ON PROD.ESPECIES_ID_ESPECIES = ESPE.ID_ESPECIES
                LEFT JOIN PROMOCIONES PROM
                    ON PROD.PROMOCIONES_ID_PROMOCIONES = PROM.ID_PROMOCIONES
                WHERE PROD.ESTADO = 1 AND PROD.ESPECIES_ID_ESPECIES = 2`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


//metodo get AdminProducto otros (OTRAS ESPECIES)
module.exports.buscar_otros = app.get('/buscar_otros', (request, response) => {  
    const sql = `SELECT PROD.ID_PRODUCTOS, 
                PROD.NOMBRE,
                PROD.VALOR,
                PROD.STOCK,
                PROD.IMAGEN, 
                PROD.PROMOCIONES_ID_PROMOCIONES, 
                PROD.ESPECIES_ID_ESPECIES,
                ESPE.NOMBRE AS NOMBRE_ESPECIE,
                PROM.NOMBRE AS NOMBRE_PROMOCION
                FROM PRODUCTOS PROD
                LEFT JOIN ESPECIES ESPE
                    ON PROD.ESPECIES_ID_ESPECIES = ESPE.ID_ESPECIES
                LEFT JOIN PROMOCIONES PROM
                    ON PROD.PROMOCIONES_ID_PROMOCIONES = PROM.ID_PROMOCIONES
                WHERE PROD.ESTADO = 1 AND PROD.ESPECIES_ID_ESPECIES = 3`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});


///metodo get Un Producto
module.exports.buscar_uno = app.get('/:id', (request, response) => {
    const ID_PRODUCTOS = request.params.id;
    const sql = `SELECT PROD.ID_PRODUCTOS, 
                    PROD.NOMBRE,
                    PROD.VALOR,
                    PROD.STOCK,
                    PROD.IMAGEN, 
                    PROD.PROMOCIONES_ID_PROMOCIONES, 
                    PROD.ESPECIES_ID_ESPECIES,
                    ESPE.NOMBRE AS NOMBRE_ESPECIE,
                    PROM.NOMBRE AS NOMBRE_PROMOCION
                    FROM PRODUCTOS PROD
                    LEFT JOIN ESPECIES ESPE
                        ON PROD.ESPECIES_ID_ESPECIES = ESPE.ID_ESPECIES
                    LEFT JOIN PROMOCIONES PROM
                        ON PROD.PROMOCIONES_ID_PROMOCIONES = PROM.ID_PROMOCIONES
                    WHERE ID_PRODUCTOS = ?
    `;
    connection.query(sql, ID_PRODUCTOS, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        response.status(200).send(results[0]);
      } else {
        response.status(204).send('Sin resultado');
      }
    });
  });