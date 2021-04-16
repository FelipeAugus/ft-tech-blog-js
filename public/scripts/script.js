window.onresize = ()=>{
    const MenuResponsivo = document.getElementById("links-responsivo");

    if(window.innerWidth > 800 && MenuResponsivo.style.display != "none"){
        MenuResponsivo.style.display = "none";
    }
};


function menu(x) {
    x.classList.toggle("change"); 
}

function Menu(){
    const MenuResponsivo = document.getElementById("links-responsivo");

    MenuResponsivo.style.display == "block" ?
    MenuResponsivo.style.display = "none":
    MenuResponsivo.style.display = "block";
}
