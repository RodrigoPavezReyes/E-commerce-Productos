const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
const main = document.querySelector("main");
const botonesCategoria = document.querySelectorAll(".boton-categoria")

console.log(botonesCategoria)


openMenu.addEventListener("click",()=>{
    aside.classList.add("aside-visible");
})


closeMenu.addEventListener("click",()=>{
    aside.classList.remove("aside-visible");
})

main.addEventListener("click", ()=>{
    aside.classList.remove("aside-visible");
})

botonesCategoria.forEach(boton => {
    boton.addEventListener("click",(e)=>{
        aside.classList.remove("aside-visible");
    })
});


function alertaToastify() {
    Toastify({
        text: "This is a toast",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}