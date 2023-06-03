require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.port || 5500;

// configuración body parser para permitir json, y url encoded
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require('./config/config');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get("/api/test/",function(request,response){
	response.send("Bienvenido a API ");
});


// Se inicia servidor
app.listen(port, function (){
    console.log('Servidor esta corriendo! http://localhost:5500/');
	controladores();
});

const AdminProducto = require('./controllers/AdminProducto');
// const Donación = require('./controllers/Donación');
const Especie = require('./controllers/Especie');
const Promociones = require('./controllers/Promociones');
const roles = require('./controllers/roles');
// const Ventas = require('./controllers/Ventas');
const Despacho = require('./controllers/Despacho');
const Seguimiento = require('./controllers/Seguimiento');

//metodos
function controladores() {
    // rutas
    //Funcion de consultar AdminProducto
    app.use('/api/AdminProducto/', AdminProducto.agregar);
	app.use('/api/AdminProducto/', AdminProducto.buscar_todo);
    app.use('/api/AdminProducto/', AdminProducto.actualizar);
    app.use('/api/AdminProducto/', AdminProducto.eliminar);


        // rutas
    //Funcion de consultar Especie
    app.use('/api/Especie/', Especie.agregar);
	app.use('/api/Especie/', Especie.buscar_todoEspecies);
    app.use('/api/Especie/', Especie.actualizarEspecies);
    app.use('/api/Especie/', Especie.eliminar);


        // rutas
    //Funcion de consultar roles
    app.use('/api/roles/', roles.agregar);
	app.use('/api/roles/', roles.buscar_todo);
    app.use('/api/roles/', roles.actualizar);
    app.use('/api/roles/', roles.eliminar);
    app.use('/api/roles/', roles.eliminar_estado);

            // rutas
    //Funcion de consultar Promociones
    app.use('/api/Promociones/', Promociones.agregar);
	app.use('/api/Promociones/', Promociones.buscar_todo);
    app.use('/api/Promociones/', Promociones.actualizar);
    app.use('/api/Promociones/', Promociones.eliminar);


            // rutas
    //Funcion de consultar Despacho
    app.use('/api/Despacho/', Despacho.agregarDespacho);
	app.use('/api/Despacho/', Despacho.buscarTodosDespachos);
    app.use('/api/Despacho/', Despacho.actualizarDespacho);
    app.use('/api/Despacho/', Despacho.eliminarDespacho);
    app.use('/api/Despacho/', Despacho.eliminar_estado_Despacho);

            // rutas
    //Funcion de consultar Seguimiento
    app.use('/api/Seguimiento/', Seguimiento.agregarSeguimiento);
	app.use('/api/Seguimiento/', Seguimiento.buscarTodosSeguimientos);
    app.use('/api/Seguimiento/', Seguimiento.actualizarSeguimiento);
    app.use('/api/Seguimiento/', Seguimiento.eliminarSeguimiento);
    app.use('/api/Seguimiento/', Seguimiento.eliminar_estado_Seguimiento);

    
}