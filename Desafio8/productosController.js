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
            if (productos.length > 0) {
                res.status(200).json({productos:productos});
            }
            else {
                res.send({ error: "No hay produtos cargados" })
            }
        }
    } catch (error) {
        console.log(error);
    }


});

Router.get("/listar/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let prod = await archivo.getProductosById(id)
        if (prod) {
            res.status(200).json({producto:prod});
        }
        else {
            res.status(400).json({ error: "No existe el producto" })
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
            res.status(200).json({data:prod});
        }
        else {
            res.status(400).json({error:"No se pudo guardar el producto"})
        }
    } catch (error) {
        console.log(error);
    }
});


module.exports = Router;