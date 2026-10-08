const productos = [
    {id: 1, nombre: "Cuna", descripcion: "Cuna blanca moderna", imagen: "cuna.jpg", precio: 340.00},
    {id: 2, nombre: "Dormitorio", descripcion: "Dormitorio individual", imagen: "dormitorio.jpg", precio: 640.00},
    {id: 3, nombre: "Escritorio", descripcion: "Escritorio juvenil", imagen: "escritorio.jpg", precio: 220.00},
    {id: 4, nombre: "Mesa", descripcion: "Mesa baja aparador", imagen: "mesita.jpg", precio: 140.00},
    {id: 5, nombre: "Sofá", descripcion: "Sofá diseño exclusivo", imagen: "sofa.jpg", precio: 890.00},
    {id: 6, nombre: "Sofá", descripcion: "Sofá 3 plazas", imagen: "sofaGrande.jpg", precio: 1340.00}
]

//Elementos del DOM - Document Object Model
const productosContainer = document.getElementById('products') //contenedor donde se van a mostrar los productos
const itemsCarrito = document.getElementById('cart-items') //contenedor donde se van a mostrar las líneas del carrito
const mostrarCarrito = document.getElementById('toggle-cart') //icono para mostrar u ocultar el carrito
const carrito = document.getElementById('cart') //contenedor del carrito 
const totalCarrito = document.getElementById('cart-total') //total del carrito, inicialmente a 0
const contador = document.getElementById('contador') //para mostrar cuantos artículos hay en el carrito

//array para guardar los productos del carrito
let carritoProductos = []

//funcion para mostrar los productos
function mostrarProductos(){
    productosContainer.innerHTML = productos.map((producto) => 
        `
        <div class="product-card">
            <img src="../img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>${producto.precio} €</p>
            <button class="addProducto" data-id="${producto.id}">Añadir al carrito</button>
        </div>
        `
    ).join('')
    const btnAddCarrito = document.querySelectorAll('.addProducto')
    btnAddCarrito.forEach(btn => {
        btn.addEventListener('click', addCarrito)
    })
}

function addCarrito(e){
    const productoId = parseFloat(e.target.getAttribute('data-id')) 
    const productoComprado = productos.find(producto => producto.id === productoId)

    //comprobar si ya hay un producto igual en el carrito
const lineaCarrito = carritoProductos.find(producto => producto.id === productoComprado.id)

    // si ya tenemos un producto igual en el carrito le añadimos cantidad

if(lineaCarrito){
    lineaCarrito.cantidad = lineaCarrito.cantidad + 1 
}else{
    const productoCarrito = productoComprado
    productoCarrito.cantidad = 1 //si no existe lo añadimos 
    carritoProductos.push(productoCarrito)
}
    console.log(carritoProductos)
    

    actualizarCarrito()
}

function actualizarCarrito(){
    itemsCarrito.innerHTML = carritoProductos.map((item) =>
        `
            <div class="cart-item">
                <button class = "restarProducto" data-id="${item.id}">-</button>
                <p>${item.cantidad}</p>

                <button class="sumarProducto" data-id="${item.id}">+</button>
                <p>${item.nombre}</p>
                <p>${item.precio.toFixed(2)} €</p>
                <p>${(item.precio * item.cantidad).toFixed(2)} €</p>
            </div>
        `
    ).join("")

    //crear evento de sumar y restar es para que sirva
    const botonesSumar = document.querySelectorAll(".sumarProducto")
    botonesSumar.forEach(btn =>{
        btn.addEventListener("click", sumarProducto)
    })

   //crear evebto para restar producto

   const botonesRestar = document.querySelectorAll(".restarProducto")
    botonesRestar.forEach(btn =>{
        btn.addEventListener("click", restarProducto)
    })


// calcular el total y mostrar en pantalla
// reduce es la funcion que devuelve la suma de todos loa valores de la propiedad precio por la cantidad , con valor inicial 0.
const total = carritoProductos.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
totalCarrito.textContent = " Total: " + total.toFixed(2) + "€"
}
// esta funcion es para sumar el articulo repetido
function sumarProducto(e){
    const productoId =parseFloat(e.target.getAttribute("data-id"))
    //buscar la linea del carrito correspondiente
    const lineaCarrito = carritoProductos.find(producto => producto.id === productoId)

    lineaCarrito.cantidad = lineaCarrito.cantidad + 1
    actualizarCarrito()
}

function restarProducto(e){
    const productoId =parseFloat(e.target.getAttribute("data-id"))
    //buscar la linea del carrito correspondiente
    const lineaCarrito = carritoProductos.find(producto => producto.id === productoId)
//si la camtidad es igual a 1 eliminamos la linea

if(lineaCarrito.cantidad === 1){
carritoProductos = carritoProductos.filter(producto => producto.id !== productoId)
}else{
    lineaCarrito.cantidad = lineaCarrito.cantidad - 1 
}
   
    actualizarCarrito()
}



mostrarProductos()