//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS
import { presupuestarVivienda , encargarVivienda } from "./funciones.js";

//=======================================================================
//                            BOTONES
//=======================================================================
// BOTON PRESUPUESTAR PRESUPUESTAR
/// @brief Funcion que al apretar el boton "presupuestar" llama a la funcion presupuestarVivienda
function botonPrespuestar () {
    const botonPresupuestar = document.querySelector("#botonPresupuestar");
    botonPresupuestar.onclick = (evento) => {
        evento.preventDefault();
        presupuestarVivienda();
    }
}

// BOTON ENCARGAR VIVIENDA
/// @brief Funcion que deja apretar el boton "encargar vivienda" una vez que se crea el formulario 
/// y llama a la funcion encargarVivienda
function botonEncargar () {
    const formulario = document.querySelector("#seccionPedirDatos");
    formulario.addEventListener("change", function() {
        if(formulario.childElementCount != 0) {
            const botonEncargarVivienda = document.querySelector("#botonEncargarVivienda");
            botonEncargarVivienda.onclick = (evento) => {
                evento.preventDefault();
                encargarVivienda();
            }
        }
    })
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { botonPrespuestar , botonEncargar };