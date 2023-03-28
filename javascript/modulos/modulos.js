//=======================================================================
//                             IMPORTACIONES
//=======================================================================
// MODULOS IMPORTADOS
import { ModuloVivienda } from "./clases.js";

//=======================================================================
//                              MODULOS
//=======================================================================
/// @brief Array encargada de crear los modulos con sus datos
// ID - Nombre Modulo - Descripccion Modulo - Precio Modulo - Cantidad Modulo - Icono Modulo - Tipo de espacio
const modulos = [
  new ModuloVivienda(
    "CocinaToilete",
    "COCINA Y TOILETE",
    "MODULO DE COCINA COMPLETO CON ALACENA, BAJO MESADA, PILETA DOBLE, HELADERA Y BAÑO DE INVITADOS",
    25000,
    0,
    "./assets/icons/modulos/cocina.png",
    "Servicio"
  ),
  new ModuloVivienda(
    "DespensaLavadero",
    "DESPENSA Y LAVADERO",
    "ESPACIO DE GUARDADO EXTRA PARA COCINA Y MESADA CON PILETA, LAVARROPAS Y SECARROPAS",
    2000,
    0,
    "./assets/icons/modulos/lavadero.png",
    "Servicio"
  ),
  new ModuloVivienda(
    "Cochera",
    "COCHERA",
    "ESPACIO PARA EL GUARDADO DE UN VEHICULO",
    10000,
    0,
    "./assets/icons/modulos/garaje.png",
    "Servicio"
  ),
  new ModuloVivienda(
    "Estar",
    "ESTAR",
    "ESPACIO EQUIPADO CON SILLON DE 3 PLAZAS, MESA RATONA, ALFOMBRA, MUEBLE DE TV, ETC",
    10000,
    0,
    "./assets/icons/modulos/sala-de-estar.png",
    "Social"
  ),
  new ModuloVivienda(
    "Comedor",
    "COMEDOR",
    "ESPACIO EQUIPADO CON MESA PARA 6 PERSONAS",
    10000,
    0,
    "./assets/icons/modulos/mesa-del-comedor.png",
    "Social"
  ),
  new ModuloVivienda(
    "HabitacionPrincipal",
    "HABITACION PRINCIPAL",
    "ESPACIO PRINCIPAL CON CAMA MATRIMONIAL, PLACARD, MESAS DE LUZ Y MUEBLE CON TV",
    15000,
    0,
    "./assets/icons/modulos/bano-publico.png",
    "Social"
  ),
  new ModuloVivienda(
    "BanioCompletoEnSuite",
    "BAÑO COMPLETO EN SUITE",
    "ESPACIO DE SERVICIO CON EL EQUIPAMIENTO COMPLETO PARA UN BAÑO COMUNICADO DIRECTAMENTE CON LA HABITACION",
    20000,
    0,
    "./assets/icons/modulos/bano-publico.png",
    "Servicio"
  ),
  new ModuloVivienda(
    "HabitacionSimple",
    "HABITACION SIMPLE",
    "ESPACIO ARMADO CON CAMA SIMPLE O DOBLE CAMA SIMPLE, PLACARD, MESAS DE APOYO Y TV",
    10000,
    0,
    "./assets/icons/modulos/cama-individual.png",
    "Social"
  ),
  new ModuloVivienda(
    "BanioCompleto",
    "BAÑO COMPLETO",
    "ESPACIO DE SERVICIO CON EL EQUIPAMIENTO COMPLETO PARA UN BAÑO COMPLETO",
    15000,
    0,
    "./assets/icons/modulos/bano-publico.png",
    "Servicio"
  ),
  new ModuloVivienda(
    "Estudio",
    "ESTUDIO",
    "ESPACIO PARA TU PROPIO AREA DE TRABAJO CON LUGAR PARA 2 PERSONAS",
    5000,
    0,
    "./assets/icons/modulos/escritorio.png",
    "Social"
  ),
];

//=======================================================================
//                             EXPORTACIONES
//=======================================================================

// FUNCIONES EXPORTADAS
export { modulos };