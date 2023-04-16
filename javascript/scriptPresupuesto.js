//=======================================================================
//                            IMPORTACIONES
//=======================================================================

/// MODULOS IMPORTADOS 
import { presupuestoEncargado, insertarDatosPresupuesto } from "./modulos/funcionesPresupuesto.js";
import { botonImprimir } from "./modulos/boton.js";

//=======================================================================
//                                HTML
//=======================================================================
/// [SECCION PRESUPUESTO LISTA MODULOS]
/// ARMADO DE PRESUPUESTO
/// Se encargar de ingresar en el DOM del presupuesto los datos obtenidos desde la API
const presupuesto = await presupuestoEncargado();
await insertarDatosPresupuesto(presupuesto);
botonImprimir();