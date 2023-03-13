//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS 
import {Modulo,Vivienda} from "./clases.js";

//=======================================================================
//                             FUNCIONES
//=======================================================================
// FUNCION VERIFICAR MODULOS
/// @brief Funcion que verifica si el modulo (tarjetas de modulos) esta seleccionado
///
/// modulosVivienda -> array que contiene el id de los diferentes modulos
/// espacio         -> variable que guarda en cada iteracion el id del array 
/// modulosPedidos  -> array donde se guardan las id de los modulos seleccionados
/// return          -> la funcion devuelve la vivienda con las id de los modulos seleccionados
function verificarModulos() {
                    //ARMAR DE MANERA DINAMICA LA FORMACION DEL ARRAY TOMANDO LOS ID
    const modulosVivienda = ["#CocinaToilete","#DespensaLavadero","#Cochera","#Estar","#Comedor","#HabitacionPrincipal","#BanioPrincipal","#HabitacionSecundaria","#BanioSecundario"];
    let espacio;
    const modulosPedidos = [];

    for (let i=0; i<modulosVivienda.length;i++) {
        espacio = document.querySelector(modulosVivienda[i]);

        if (espacio.checked) {
            modulosPedidos.push(modulosVivienda[i]);
        }
    }
    return modulosPedidos;
}

// FUNCION VIVIENDA ARMADA
/// @brief Funcion que construye los modulos pedidos con los datos alojados
///
/// viviendaArmada  -> array que guarda las clases de cada modulo pedido con sus datos
/// nombre          -> nombre del modulo segun su id
/// precio          -> precio del modulo
/// cantidad        -> cantidad de los modulos del mismo tipo pedido
function armadoVivienda (modulosPedidos) {
    const viviendaArmada = [];
    let nombre;
    let precio;
    let cantidad;

    for (let i=0; i<modulosPedidos.length; i++) {
        switch (modulosPedidos[i]) {
            case "#CocinaToilete":
                    nombre = "Cocina y Toilete";
                    precio = 25000;
                    cantidad = 1;
                break;
            case "#DespensaLavadero":
                    nombre = "Despensa y Lavadero";
                    precio = 2000;
                    cantidad = 1;
                break;
            case "#Cochera":
                    nombre = "Cochera";
                    precio = 10000;
                    cantidad = 1;
                break;
            case "#Estar":
                    nombre = "Estar";
                    precio = 10000;
                    cantidad = 1;
                break;
            case "#Comedor":
                    nombre = "Comedor";
                    precio = 10000;
                    cantidad = 1;
                break;
            case "#HabitacionPrincipal":
                    nombre = "Habitacion Principal";
                    precio = 15000;
                    cantidad = 1;
                break;
            case "#BanioPrincipal":
                    nombre = "Baño Principal";
                    precio = 20000;
                    cantidad = 1;
                break;
            case "#HabitacionSecundaria":
                    nombre = "Habitacion Secundaria";
                    precio = 10000;
                    cantidad = 1;
                break;
            case "#BanioSecundario":
                    nombre = "Baño Secundario";
                    precio = 15000;
                    cantidad = 1;
                break;
            default:
                    nombre = "Sin Modulo";
                    precio = 0;
                    cantidad = 0;
                break;
        }
        viviendaArmada.push(new Modulo(nombre,precio,cantidad));
    }
    return viviendaArmada;
}

// FUNCION DE PRESUPUESTO FINAL
/// @brief Funcion que obtiene los datos finales del a vivienda
///
/// montoFinal      -> se guarda el monto final con la suma de todos los modulos
/// cantidadModulos -> se guarda la suma de la cantidad final de los modulos pedidos
/// modulos         -> array donde se guardan cada modulo por separado con sus datos
function presupuestoFinal (viviendaArmada) {
    let montoFinal = 0;
    let cantidadModulos = 0;
    let modulos = [];

    for(let i = 0;i<viviendaArmada.length;i++) {
        montoFinal += viviendaArmada[i].precio;
        cantidadModulos += viviendaArmada[i].cantidad;
        modulos = viviendaArmada[i];
    }

    const viviendaFinal = new Vivienda(montoFinal,cantidadModulos,modulos);

    return viviendaFinal;
}

// FUNCION MOSTRAR PRESUPUESTO
///@brief Funcion que se encarga de mostar insertando en el DOM los datos de la vivienda presupuestada
function mostrarPresupuesto (viviendaFinal) {
    const montoVivienda = document.querySelector("#montoVivienda");
    const cantidadModulos = document.querySelector("#cantidadModulos");
    const detalleModulos = document.querySelector("#detalleModulos");

    //DEJAR ASI O HACER UN ENVI
    montoVivienda.innerText = ` ${viviendaFinal.presupuesto}`;
    cantidadModulos.innerText = ` ${viviendaFinal.cantidadModulos}`;
    //VERIFICAR ESTA SALIDA
    detalleModulos.innerText = viviendaFinal.modulos;
    console.log(`SE DETALLAN CADA UNO DE LOS MODULOS: ${viviendaFinal.modulos}`);
}

// FUNCION PRESUPUESTAR VIVIENDA
/// @brief Funcion principal que se llama al apretar el boton
/// 
/// modulosPedidosDeVivienda    -> array que guarda los datos de cada modulo pedido
/// viviendaArmada              -> array que guarda los datos finales de la vivienda completa
/// return
function presupuestarVivienda() {
    const modulosPedidos = verificarModulos();
    const viviendaArmada = armadoVivienda(modulosPedidos);
    const viviendaFinal = presupuestoFinal(viviendaArmada);

    mostrarPresupuesto(viviendaFinal);
}


//=======================================================================
//                             IMPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS 
export {presupuestarVivienda};