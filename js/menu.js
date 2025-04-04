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