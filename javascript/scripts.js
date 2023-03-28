//=======================================================================
//                            IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS 
import { presupuestarVivienda } from "./modulos/funciones.js";
import { modulos } from "./modulos/modulos.js";

//=======================================================================
//                                HTML
//=======================================================================
// [SECCION MODULOS]
// ARMADO DE LISTA MODULOS EN HTML
/// Se encargar de ingresar en el DOM la lista de modulos disponibles para armar la vivienda
const listaModuloshtml = document.querySelector("#listaElementosModulos");

modulos.forEach(modulo=>{listaModuloshtml.innerHTML += 
    `<li class="d-flex flex-row" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-easing="linear" data-aos-delay="500" data-aos-duration="800">
    <div class="d-flex justify-content-center align-items-center">
        <img src=${modulo.icono} height="64px" width="64px" alt=${modulo.nombre}>
    </div>
    <div class="d-flex flex-column">
        <div>
            <p class="fw-bold fs-6">${modulo.nombre}</p>
            <p class="fs-6">${modulo.descripcion}</p>
        </div>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id=${modulo.id}>
            <label class="form-check-label" for=${modulo.id}>Encargar</label>
        </div>
    </div>
    </li>`;});

//=======================================================================
//                  INICIALIZADOR ANIMACIONES AOS
//=======================================================================
AOS.init();

//=======================================================================
//                         BOTON PRESUPUESTAR
//=======================================================================
// FUNCION PRINCIPAL DEL BOTON PRESUPUESTAR
/// @brief Funcion principal que al apretar el boton llama a la funcion para presupuestar
/// Se puede utilizar una vez que la pantalla halla cargado por completo
window.onload = function () {
    const botonPresupuestar = document.querySelector("#botonPresupuestar");
    botonPresupuestar.onclick = presupuestarVivienda;
}