//=======================================================================
//                            IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS 
import { seccionHtmlModulos }from "./modulos/seccionesHtml.js";
import { botonEncargar } from "./modulos/boton.js";
import { agregarModuloSeleccionado, eliminarModuloSeleccionado } from "./modulos/funcionesIndex.js";

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
//                            PRESUPUESTO
//=======================================================================

/// FUNCION AGREGAR MODULOS A LA TABLA
agregarModuloSeleccionado();
/// FUNCION ELIMINAR MODULOS DE LA TABLA
eliminarModuloSeleccionado();
/// FUNCION BOTON ENCARGAR
botonEncargar();