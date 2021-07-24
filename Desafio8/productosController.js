const express = require("express");
const Router = express.Router();
const Producto = require("./Producto");
const Archivo = require("./Archivo");

//Inicializaciones
let archivo = new Archivo("./productos.txt")


//Rutas

Router.get("/listar", async (req, res) => {
    try {
        let productos = await archivo.getProductos();
        if (productos) {
            res.json(productos);
        }
        else {
            res.send("Ocurrio un error")
        }
    } catch (error) {
        console.log("Error: " + error)
    }


});

Router.get("/listar/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let prod = await archivo.getProductosById(id)
        if (prod) {
            res.json(prod);
        }
        else {
            res.send("No se encontro el id")
        }
    } catch (error) {
        console.log("Error");
    }
})



Router.post("/guardar", async (req, res) => {
    try {
        let { title, price, thumbnail } = req.body;
        prod = new Producto(title, price, thumbnail);
        let resultado = await archivo.guardar(prod)
        if (resultado) {
            res.send(prod);
        }
        else {
            res.send("No se pudo guardar el producto")
        }
    } catch (error) {
        res.send("Error: " + error);
    }


});

module.exports = Router;