import  moment from "moment";
import 'moment/locale/es';

export function traduceOption(valor) {
    const estados = {
      1: 'Habilitado',
      0: 'Deshabilitado'
    };  
    return estados[valor] || 'Estado desconocido'; 
  }

  export function traduceDate(fecha) {
    moment.locale('es');    
    return moment(fecha).format('DD-MM-YYYY HH:mm');
  }
  