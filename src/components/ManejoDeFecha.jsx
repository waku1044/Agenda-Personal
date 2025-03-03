import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español correctamente
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.locale("es"); // Configura el idioma español

dayjs.extend(localeData);



export const cambioDeSigno =(fecha)=> {
    let fechaInicio = fecha.split("/");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${añoInicio}-${mesInicio}-${diaInicio}`;
    return fechaReves;
  }

  export const cambio_de_signo = (fecha)=>{
    let fechaInicio = fecha.split("/");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${añoInicio}-${diaInicio}-${mesInicio}`;
    return fechaReves;
  }

  export const fechaAlReves = (inicial)=> {
    // console.log('Al reves ',inicial);
    let fechaReves = inicial.split("/").reverse().join("/");
    return fechaReves;
  }

  export const fecha_Al_Reves = (inicial)=> {
    // console.log('Al reves ',inicial);
    let fechaReves = inicial.split("-").reverse().join("-");
    return fechaReves;

  }

  
    export const siEstaEnRangoFecha = (fechaComparar, fecha1, fecha2) => {
      const date = dayjs(fechaComparar);
      const start = dayjs(fecha1);
      const end = dayjs(fecha2);
      // console.log(date, start, end);
      // Comprueba si está en el rango
      return date >= start && date <= end;

      // const date = new Date(fechaComparar);
      // const start = new Date(fecha1);
      // const end = new Date(fecha2);
  
      // // Comprueba si está en el rango
      // return date >= start && date <= end;
  }
  