
let productosEnCarrito= JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
    
            div.classList.add("carrito-producto")
    
            div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`
            
            contenedorCarritoProductos.append(div)
        });
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();



function actualizarBotonesEliminar() {

    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado",
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

    const idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex( producto => producto.id === idBoton);

    console.log(productosEnCarrito)

    productosEnCarrito.splice(index, 1)

    console.log(productosEnCarrito)

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {   

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se eliminaran ${productosEnCarrito.reduce((acc,producto)=> acc+producto.cantidad, 0)} productos del carrito.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      });
   
}



function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto)=> acc + (producto.cantidad * producto.precio) , 0);
    contenedorTotal.innerText = `$ ${totalCalculado}`   
    
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {   
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}