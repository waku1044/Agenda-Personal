export const cambioDeSigno =(fecha)=> {
    let fechaInicio = fecha.split("/");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${añoInicio}-${mesInicio}-${diaInicio}`;
    return fechaReves;
  }

  export const cambio_de_signo = (fecha)=>{
    let fechaInicio = fecha.split("-");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${añoInicio}/${mesInicio}/${diaInicio}`;
    return fechaReves;
  }

  export const fechaAlReves = (inicial)=> {
    
    let fechaInicio = inicial.split("-");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${diaInicio}/${mesInicio}/${añoInicio}`;
    return fechaReves;
  }

  
    export const siEstaEnRangoFecha = (fechaComparar, fecha1, fecha2) => {
      // Convierte las cadenas en formato YYYY-MM-DD directamente a objetos Date
      const date = new Date(fechaComparar);
      const start = new Date(fecha1);
      const end = new Date(fecha2);
  
      // Comprueba si está en el rango
      return date >= start && date <= end;
  }
  