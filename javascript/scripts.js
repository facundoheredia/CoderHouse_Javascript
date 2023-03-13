//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS 
import {presupuestarVivienda} from "./modulos/funciones.js";

//=======================================================================
//                             FUNCIONES
//=======================================================================
// FUNCION PRINCIPAL DEL BOTON PRESUPUESTAR
/// @brief Funcion principal que al apretar el boton llama a la funcion para presupuestar
/// se puede utilizar una vez que la pantalla alla cargado por completo
window.onload = function () {
    const botonPresupuestar = document.querySelector("#botonPresupuestar");
    botonPresupuestar.onclick = presupuestarVivienda;
}
