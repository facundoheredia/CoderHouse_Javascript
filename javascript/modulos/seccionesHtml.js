//=======================================================================
//                             IMPORTACIONES
//=======================================================================

/// MODULOS IMPORTADOS
import { modulos } from "./modulos.js";

//=======================================================================
//                                HTML
//=======================================================================

/// [INDEX SECCION MODULOS]
/// ARMADO DE LISTA MODULOS EN HTML
/// Se encargar de ingresar en el DOM la lista de modulos disponibles para armar la vivienda
function seccionHtmlModulos () {
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
            <div>
            <button type="button" class="btn btn-outline-light" id="botonEncargar-${modulo.id}">Encargar</button>
            </div>
        </div>
        </li>`;});
}

/// [PRESUPUESTO]
/// FUNCION ABRIR PESTAÑA PRESUPUESTO
/// Se encargar de ingresar en el DOM la lista de modulos seleccionados para presupuestar la vivienda
function abrirHtmlPresupuesto () {
    window.open(
        "./pages/presupuesto.html",
        "presupuesto"
      );
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

/// FUNCIONES EXPORTADAS
export { seccionHtmlModulos, abrirHtmlPresupuesto};