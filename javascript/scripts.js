//=======================================================================
//                            IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS 
import { botonPrespuestar , botonEncargar } from "./modulos/botones.js";
import { seccionHtmlModulos }from "./modulos/seccionesHtml.js";

//=======================================================================
//                                HTML
//=======================================================================
// [SECCION MODULOS]
// ARMADO DE LISTA MODULOS EN HTML
/// Se encargar de ingresar en el DOM la lista de modulos disponibles para armar la vivienda
seccionHtmlModulos();

//=======================================================================
//                  INICIALIZADOR ANIMACIONES AOS
//=======================================================================
AOS.init();

//=======================================================================
//                            BOTONES
//=======================================================================
window.onload = function () {
    botonPrespuestar()
    botonEncargar();
}