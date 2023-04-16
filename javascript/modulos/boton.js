//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS
import { encargarVivienda, subirPresupuestoApi } from "./funcionesIndex.js";
import { abrirHtmlPresupuesto } from "./seccionesHtml.js";
import { mensajeImprimiendoArchivo } from "./mensajes.js";

//=======================================================================
//                              BOTON
//=======================================================================
// BOTON ENCARGAR VIVIENDA
/// @brief Funcion que deja apretar el boton "encargar vivienda" una vez que se crea el formulario 
/// y llama a la funcion encargarVivienda
function botonEncargar () {
    const formulario = document.querySelector("#seccionPresupuestar_Formulario");
    formulario.addEventListener("change", function() {
        if(formulario.childElementCount != 0) {
            const botonEncargarVivienda = document.querySelector("#botonEncargarVivienda");
            botonEncargarVivienda.onclick = async (evento) => {
                evento.preventDefault();
                encargarVivienda();
                await subirPresupuestoApi();
                abrirHtmlPresupuesto();
            }
        }
    })
}

function botonImprimir () {
    const botonImprimir = document.querySelector("#boton_Imprimir");
    botonImprimir.addEventListener("click", event => {
            event.preventDefault();
            mensajeImprimiendoArchivo();
    });
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { botonEncargar, botonImprimir };