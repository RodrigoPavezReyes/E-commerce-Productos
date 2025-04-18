let productos = [];

fetch("./js/productos.json")
    .then((response)=> response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                        </div>`
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
    

    
}





botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e)=>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");

        if(e.currentTarget.id !="todos"){
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

            const productoCategoria= productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre

            cargarProductos(productosBoton)
        }else{
            tituloPrincipal.innerHTML = " Todos los productos"
            cargarProductos(productos)
        }
        
    })
});




/* function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e)=>{
            const id = e.currentTarget.id
            const productoAgregado = productos.find(producto => producto.id === id)

            if (agregadoAlCarrito.some(producto => producto.id === productoAgregado.id)) {
                productoAgregado.cantidad ++
            }else{
                agregadoAlCarrito.push(productoAgregado)
                productoAgregado.cantidad = 1
            }
            
            console.log(agregadoAlCarrito)
        })
        
    });
}
 */
/**AMBOS CODIGOS DAN EL MISMO RESULTADO Y SON CORRECTOS */

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++

    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    console.log(productosEnCarrito);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius:"2rem",
        
        },
        onClick: function(){} // Callback after click
        }).showToast();

}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



