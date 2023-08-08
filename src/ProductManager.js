import { promises as fs } from "fs";

export class ProductManager {
  constructor() {
    this.patch = './src/products.txt'
    this.products = [];
  }

  static id = 0;

  addProduct = async (titulo, descripcion, precio, imagen, codigo, stock) => {
    ProductManager.id++;

    let newProduct = {
      titulo,
      descripcion,
      precio,
      imagen,
      codigo,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    const resp = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(resp);
  };

  getProducts = async () => {
    const respuesta = await this.readProducts();
    return respuesta;
  };

  getProductById = async (id) => {
    const respuesta = await this.readProducts();

    if (!respuesta.find((product) => product.id === id)) {
      return "Producto no encontrado";
    } else {
      return respuesta;
    }
  };

  /*deleteProductsById = async (id) => {
    const respuesta = await this.readProducts();
    const productFilter = respuesta.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto eliminado");
  };

  updateProducts = async (id, ...producto) => {
    await this.deleteProductsById(id);
    const produOld = await this.readProducts();
    const prodcutsModif = [{ ...producto, id }, ...produOld];
    await fs.writeFile(this.patch, JSON.stringify(prodcutsModif));
  };*/
}

const productos = new ProductManager();
//  productos.addProduct("mochila1", "utiles1",10000, "imagen1", "abc123", 10);
//  productos.addProduct("mochila2", "utiles2", 10000, "imagen2", "abc124", 5);

//  productos.getProducts()

productos.getProductById(2);
//  productos.deleteProductsById(2)
/*productos.updateProducts({
  titulo: "mochila1",
  descripcion: "utiles1",
  precio: 20000,
  imagen: "imagen1",
  codigo: "abc123",
  stock: 10,
  id: 1,
});*/
