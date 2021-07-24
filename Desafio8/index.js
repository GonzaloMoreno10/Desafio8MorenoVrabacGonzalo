const express = require("express");

//Inicializaciones
const app = express();


//Middlewares

app.use(express.json());//Tiene que estar arriba de las rutas
app.use("/api/productos",require("./productosController"));


//Listen
app.listen(8080,(req,res)=>{
    console.log("Servidor escuchando en el puerto 8080");
})