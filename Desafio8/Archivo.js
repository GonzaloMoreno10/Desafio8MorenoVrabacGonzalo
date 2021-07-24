const fs = require("fs/promises");

//Clase archivo
class Archivo {
    //Constructor
    constructor(name) {
        this.name = name;
    };

    //Metodo para leer la info del archivo productos.txt
    async getProductos() {
        let array = [];
        try {
            let data = await fs.readFile(this.name, "utf-8")
            array = data.split("\n");
            let array2 = array.filter(data => data != "");
            if (array2.length > 0) {
                let productos = array2.map(data => JSON.parse(data))
                return productos;
            }
            else {
                return array2
            }
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    };

    getProductosById = async (id) => {
        let array = [];
        try {
            let data = await fs.readFile(this.name, "utf-8");
            if (data) {
                array = data.split("\n");
                for (let i in array) {
                    array[i] = JSON.parse(array[i]);
                    if (array[i].id == id) {
                        return array[i];
                    }
                }
            }
            return null;
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    //Metodo utilizado para guardar un objeto producto
    async guardar(producto) {
        let id = await this.generarId();
        producto.id = id;
        try {
            await fs.appendFile(this.name, "\n" + JSON.stringify(producto));
            return 1
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    };

    //Metodo utilizado para generar el id
    async generarId() {
        let array = []
        let data = await fs.readFile(this.name, "utf-8")
        array = data.split("\n");
        return array.length;

    };

    //Metodo utilizado para borrar el archivo
    async borrar() {
        try {
            await fs.unlink(this.name)
            console.log('Archivo eliminado')
        } catch (err) {
            console.error('ocurrio un error ', err)
        }
    };
}

module.exports = Archivo;