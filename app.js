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
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
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
const AdminUsuario = require('./controllers/AdminUsuario');
const Despacho = require('./controllers/Despacho');
const Donacion = require('./controllers/Donacion');
const Especie = require('./controllers/Especie');
const ProductosVentas = require('./controllers/ProductosVentas');
const Promociones = require('./controllers/Promociones');
const roles = require('./controllers/roles');
const Seguimiento = require('./controllers/Seguimiento');
const Usuarios = require('./controllers/Usuarios');
const Ventas = require('./controllers/Ventas');
const Carrito = require('./controllers/Carrito');
const Registrar = require('./controllers/Registrar');



//metodos
function controladores() {
    // // rutas
    //Funcion de consultar AdminProducto
    app.use('/api/AdminProducto/', AdminProducto.agregar);
	app.use('/api/AdminProducto/', AdminProducto.buscar_todo);
    app.use('/api/AdminProducto/', AdminProducto.actualizar);
    app.use('/api/AdminProducto/', AdminProducto.eliminar);
    app.use('/api/AdminProducto/', AdminProducto.buscar_gato);
    app.use('/api/AdminProducto/', AdminProducto.buscar_perro);
    app.use('/api/AdminProducto/', AdminProducto.buscar_otros);


    //Funcion de consultar Despacho
    app.use('/api/Despacho/', Despacho.agregarDespacho);
	app.use('/api/Despacho/', Despacho.buscarTodosDespachos);
    app.use('/api/Despacho/', Despacho.actualizarDespacho);
    app.use('/api/Despacho/', Despacho.eliminarDespacho);
    app.use('/api/Despacho/', Despacho.eliminar_estado_Despacho);

    
    // //Funcion de consultar Donacion
    app.use('/api/Donacion/', Donacion.agregar);
	app.use('/api/Donacion/', Donacion.buscar_todo);
    app.use('/api/Donacion/', Donacion.actualizar);
    app.use('/api/Donacion/', Donacion.eliminar);


    // //Funcion de consultar Especie
    app.use('/api/Especie/', Especie.agregar);
	app.use('/api/Especie/', Especie.buscar_todo);
    app.use('/api/Especie/', Especie.actualizar);
    app.use('/api/Especie/', Especie.eliminar);


     //Funcion de consultar ProductosVentas
    app.use('/api/ProductosVentas/', ProductosVentas.agregar);
	app.use('/api/ProductosVentas/', ProductosVentas.buscar_todo);
    app.use('/api/ProductosVentas/', ProductosVentas.actualizar);
    app.use('/api/ProductosVentas/', ProductosVentas.eliminar);


    //Funcion de consultar Promociones
    app.use('/api/Promociones/', Promociones.agregar);
	app.use('/api/Promociones/', Promociones.buscar_todo);
    app.use('/api/Promociones/', Promociones.actualizar);
    app.use('/api/Promociones/', Promociones.eliminar);


    //Funcion de consultar roles
    app.use('/api/roles/', roles.agregar);
	app.use('/api/roles/', roles.buscar_todo);
    app.use('/api/roles/', roles.actualizar);
    app.use('/api/roles/', roles.eliminar);
    app.use('/api/roles/', roles.eliminar_estado);


    // //Funcion de consultar Seguimiento
    app.use('/api/Seguimiento/', Seguimiento.agregarSeguimiento);
	app.use('/api/Seguimiento/', Seguimiento.buscarTodosSeguimientos);
    app.use('/api/Seguimiento/', Seguimiento.actualizarSeguimiento);
    app.use('/api/Seguimiento/', Seguimiento.eliminarSeguimiento);
    app.use('/api/Seguimiento/', Seguimiento.eliminar_estado_Seguimiento);


    // //Funcion de consultar Usuarios
    app.use('/api/AdminUsuario/', AdminUsuario.agregar);
	app.use('/api/AdminUsuario/', AdminUsuario.buscar_todo);
    app.use('/api/AdminUsuario/', AdminUsuario.actualizar);
    app.use('/api/AdminUsuario/', AdminUsuario.eliminar);


    // //Funcion de consultar Ventas
    app.use('/api/AdminVentas/', AdminVentas.agregar);
	app.use('/api/AdminVentas/', AdminVentas.buscar_todo);
    app.use('/api/AdminVentas/', AdminVentas.actualizar);
    app.use('/api/AdminVentas/', AdminVentas.eliminar);

    //Funcion de consultar Suscripcion
    app.use('/api/Suscripcion/', Suscripcion.agregar);
    app.use('/api/Suscripcion/', Suscripcion.buscar_todo);
    app.use('/api/Suscripcion/', Suscripcion.actualizar);
    app.use('/api/Suscripcion/', Suscripcion.eliminar);

        //Funcion de consultar Registro
    app.use('/api/Registrar/', Registrar.agregar);
	app.use('/api/Registrar/', Registrar.buscar_todo);
    //app.use('/api/Registrar/', Registrar.actualizar);
    //app.use('/api/Registrar/', Registrar.eliminar);

        //Funcion de consultar Carrito
    app.use('/api/Carrito/', Carrito.agregar);
    app.use('/api/Carrito/', Carrito.buscar_todo);
    app.use('/api/Carrito/', Carrito.actualizar);
    app.use('/api/Carrito/', Carrito.eliminar);


}