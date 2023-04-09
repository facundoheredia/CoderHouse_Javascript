//=======================================================================
//                             STORAGE
//=======================================================================
// FUNCION QUE GUARDA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function setClientSessionStorageData (nombreCliente,apellidoCliente,cuotasCliente) {
    sessionStorage.setItem('nombre',nombreCliente);
    sessionStorage.setItem('apellido',apellidoCliente);
    sessionStorage.setItem('cuotas',cuotasCliente);
}

// FUNCION QUE OBTIENE LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function getSessionStorageData () {
    const nombreCliente = sessionStorage.getItem('nombre');
    const apellidoCliente = sessionStorage.getItem('apellido');
    const cuotasCliente = sessionStorage.getItem('cuotas');
    const viviendaCliente = JSON.parse(sessionStorage.getItem('vivienda'));
    const presupuestoFinal = [nombreCliente,apellidoCliente,cuotasCliente,viviendaCliente];

    return presupuestoFinal;
}

// FUNCION QUE BORRA LA INFORMACION DEL PRESUPUESTO EN EL SESSION STORAGE
function clearSessionStorageData () {
    sessionStorage.clear()
}


//----------------------------------------------------------------------------------------------------------------
//PRUEBA SET API
async function setApiClientData (presupuesto) {
    const idPresupuesto = 1;
    const nombreCliente = presupuesto[0];
    const apellidoCliente = presupuesto[1];
    const cantidadCuotas = presupuesto[2];
    const montoVivienda = presupuesto[3].presupuesto;
    //const cantidadModulosVivienda = presupuesto[3].cantidadModulos;

    try {
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/`,{
          method:"POST",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({id: idPresupuesto})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
          method:"PUT",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({nombre: nombreCliente})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
            method:"PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({apellido: apellidoCliente})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
            method:"PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({cuotas: cantidadCuotas})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
            method:"PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({vivienda: presupuesto[3]})
        });
        await fetch(`https://6431d8523adb159651750c6f.mockapi.io/presupuestos/${idPresupuesto}`,{
            method:"PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({presupuesto: montoVivienda})
        });
    } catch (error) {
        console.log(error);
    }
}

//PRUEBA GET API
async function getApiClientData () {
    try {
        const respuesta = await fetch('https://6431d8523adb159651750c6f.mockapi.io/presupuestos');
        const datos = await respuesta.json();
        alert("Por consola se mostrara la obtencion de los datos del presupuesto");
        console.log(datos);
    } catch(error) {
        console.log(error);
    }
}

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { setClientSessionStorageData, getSessionStorageData, clearSessionStorageData, setApiClientData, getApiClientData};