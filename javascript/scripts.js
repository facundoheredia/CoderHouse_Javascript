//                              CLASES
//=======================================================================

class Vivienda {
    constructor (cocina,despensa,lavadero,toilete,cochera,estar,comedor,habitacionPrincipal,banioPrincipal,habitacionSecundaria,banioSecundario) {
        this.cocina = cocina;
        this.despensa = despensa;
        this.lavadero = lavadero;
        this.toilete = toilete;
        this.cochera = cochera;
        this.estar = estar;
        this.comedor = comedor;
        this.habitacionPrincipal = habitacionPrincipal;
        this.banioPrincipal = banioPrincipal;
        this.habitacionSecundaria = habitacionSecundaria;
        this.banioSecundario = banioSecundario;
    }

    // VERIFICAR MODELO CON USO DE BUCLE VALIDANDO TRUE O FALSE Y SWITCH CON VALORES DE CADA ESPACIO
    // PARA NO REPETIR EL USO DE IF
    montoVivienda () {
        let montoAcumulado = 0;

        if(this.cocina) {
            montoAcumulado += 25000;
        }
        if(this.despensa) {
            montoAcumulado += 2000;
        }
        if(this.lavadero) {
            montoAcumulado += 5000;
        }
        if(this.toilete) {
            montoAcumulado += 5000;
        }
        if(this.cochera) {
            montoAcumulado += 10000;
        }
        if(this.estar) {
            montoAcumulado += 10000;
        }
        if(this.comedor) {
            montoAcumulado += 10000;
        }
        if(this.habitacionPrincipal) {
           montoAcumulado += 15000; 
        }
        if(this.banioPrincipal) {
            montoAcumulado += 20000;
        }
        if(this.habitacionSecundaria) {
            montoAcumulado += 10000;
        }
        if(this.banioSecundario) {
            montoAcumulado += 15000;
        }

        return montoAcumulado;
    }
}

//                             FUNCIONES
//=======================================================================

/// Valida si el espacio de la vivienda existe (checkbox tildado o no)
/// Si esta seleccionada la opcion del form con el "id" del espacio devuelve TRUE caso contrario FALSE
function existeEspacio (idEspacio) {
    let espacio;
    let retornoEstado;

    espacio = document.querySelector(idEspacio);
    
    if (espacio.checked) {
        retornoEstado = true;
    } else {
        retornoEstado = false;
    }

    return retornoEstado;
}

/// Obtiene los datos del form checkBox
/// Crea un nuevo objeto vivienda con los espacios tomando los datos del form
///
/// VERIFICAR LA UTILIZACION DE OTRO OBJETO AUXILIAR (funciones getters y setters) como linkedList en C 
/// O UN ARRAY CON LOS ESPACIOS DE LA VIVIENDA Y LLAMADA DE FUNCION EN BUCLE DE CADA ESPACIO
/// return   Retorna el objeto Vivienda con sus espacios existenes o no
function espaciosVivienda () {
    const cocina = existeEspacio("#Cocina");
    const despensa = existeEspacio("#Despensa");
    const lavadero = existeEspacio("#Lavadero");
    const toilete = existeEspacio("#Toilete");
    const cochera = existeEspacio("#Cochera");
    const estar = existeEspacio("#Estar");
    const comedor = existeEspacio("#Comedor");
    const habitacionPrincipal = existeEspacio("#HabitacionPrincipal");
    const banioPrincipal = existeEspacio("#BanioPrincipal");
    const habitacionSecundaria = existeEspacio("#HabitacionSecundaria");
    const banioSecundario = existeEspacio("#BanioSecundario");
    
    const viviendaParaCotizar = new Vivienda (cocina,despensa,lavadero,toilete,cochera,estar,comedor,habitacionPrincipal,banioPrincipal,habitacionSecundaria,banioSecundario);

    return viviendaParaCotizar;
}

/// Pide el numero de cuotas
/// Retorna el numero de cuotas validado
function pedirNumeroDeCuotas (mensaje) {
    let numeroDeCuotas;

    numeroDeCuotas = parseInt(prompt(mensaje));

    while(isNaN(numeroDeCuotas) && (numeroDeCuotas !== 1 || numeroDeCuotas !== 3 || numeroDeCuotas !== 6 || numeroDeCuotas !== 12)) {
        numeroDeCuotas = parseInt(prompt("ERROR! Ingrese la cantidad de cuotas (1-3-6-12):"));
    }

    return numeroDeCuotas;
}


/// Calcula el interes segun las cuotas elegidas
/// Retorna el importe final con el interes
function calcularInteres (cantidadDeCuotas, montoVivienda) {
    let interes = 0;
    let importeInteres;
    let importeFinalConInteres;

    switch (cantidadDeCuotas) {
        case 3:
            interes = 5;
            break;
        case 6:
            interes = 10;
            break;
        case 12:
            interes = 20;
            break;
        default:
            break;
    }

    importeInteres = (montoVivienda*interes)/100;
    importeFinalConInteres = importeInteres + montoVivienda;

    return importeFinalConInteres;
}

/// Funcion principal que se llama al apretar el boton y llama a las demas funciones
/// Retorna por input a la pagina web con id "resultadoCotizacion" el valor final de la vivienda
///
/// viviendaParaCotizar  Llama la funcion "espaciosVivienda"
/// montoVivienda  Llama al metodo "montoVivienda" de la Clase Vivienda para sumar el valor de cada espacio pedido
function botonCotizar() {
    let nombreCliente;
    let viviendaParaCotizar;
    let montoVivienda;
    let numeroDeCuotas;
    let montoViviendaFinal;

    nombreCliente = prompt("Hola, por favor ingrese su nombre");
    viviendaParaCotizar = espaciosVivienda ()
    montoVivienda = viviendaParaCotizar.montoVivienda(viviendaParaCotizar.cocina, viviendaParaCotizar.despensa, viviendaParaCotizar.lavadero, 
                                                                viviendaParaCotizar.toilete, viviendaParaCotizar.cochera, viviendaParaCotizar.estar, 
                                                                viviendaParaCotizar.comedor, viviendaParaCotizar.habitacionPrincipal, viviendaParaCotizar.banioPrincipal, 
                                                                viviendaParaCotizar.habitacionSecundaria, viviendaParaCotizar.banioSecundario);    
    numeroDeCuotas = pedirNumeroDeCuotas("Ingrese la cantidad de cuotas (1-3-6-12):");

    montoViviendaFinal = calcularInteres(numeroDeCuotas, montoVivienda);

    alert(`Muchas gracias ${nombreCliente} por usar nuestro sistema de cotizacion. El monto final de la vivienda cotizada a pagar en ${numeroDeCuotas} cuotas es de U$D${montoViviendaFinal}`);
    document.getElementById("resultadoCotizacion").value = `U$D ${montoViviendaFinal}`;
}