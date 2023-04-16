//=======================================================================
//                             SESSION TORAGE
//=======================================================================

/// FUNCION QUE GUARDA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function setClientSessionStorageData (datosCliente,viviendaEncargada) {
    sessionStorage.setItem('cliente',JSON.stringify(datosCliente));
    sessionStorage.setItem('vivienda',JSON.stringify(viviendaEncargada));
}

/// FUNCION QUE OBTIENE LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function getSessionStorageData () {
    const datosCliente = JSON.parse(sessionStorage.getItem('cliente'));
    const viviendaCliente = JSON.parse(sessionStorage.getItem('vivienda'));
    const presupuestoFinal = [datosCliente,viviendaCliente];

    return presupuestoFinal;
}

/// FUNCION QUE BORRA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function clearSessionStorageData () {
    sessionStorage.clear()
}

//=======================================================================
//                             MOCKAPI DATA
//=======================================================================
/// FUNCION SET NUEVO PRESUPUESTO
async function setCrearPresupuestoApi () {
    try {
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/`,{
          method:"POST",
          headers: {"content-type":"application/json"},
        });
    } catch (error) {
        console.log(error);
    }
}

/// FUNCION GET ID NUEVO PRESUPUESTO CREADO
async function getTodosLosPresupuestosApi () {
    try {
        const peticion = await fetch('https://6431d8523adb159651750c6f.mockapi.io/presupuestos/');
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

/// FUNCION SET API
/// @brief Funcion que guarda los datos del presupuesto obtenidos desde el sessionStorage
/// Guarda los datos con un ID unico para cada presupuesto en MOCKAPI
async function setDatosPresupuestoEnApi (presupuesto,idPresupuesto) {
    const datosCliente = presupuesto[0];
    const viviendaCliente = presupuesto[1];

    try {
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
          method:"PUT",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({datosCliente: datosCliente})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
            method:"PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({viviendaCliente: viviendaCliente})
        });
    } catch (error) {
        console.log(error);
    }
}

async function getPresupuestoSegunId (idPresupuesto) {
    try {
        const peticion = await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`);
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { setClientSessionStorageData, getSessionStorageData, clearSessionStorageData, setCrearPresupuestoApi, getTodosLosPresupuestosApi, setDatosPresupuestoEnApi, getPresupuestoSegunId};