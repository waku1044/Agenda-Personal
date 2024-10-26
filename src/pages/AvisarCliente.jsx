import Navegador from "../components/Navegador";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AvisarCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [avisar, setAvisar] = useState("");

  function fechaInicioMas14fechas(inicio) {
    let fechasASumar = 14;
    let fechaAviso = new Date(inicio);
    fechaAviso.setDate(fechaAviso.getDate() + fechasASumar);
    // Formatear la fecha para mostrarla
    let opciones = { year: "numeric", month: "long", day: "numeric" };
    let fechaFormateada = fechaAviso.toJSON("es-ES", opciones).split("T")[0];
    return fechaFormateada;
  }
  // resultado  2024/10/05

  function avisarCliente(inicio) {
    let hoy = new Date().toISOString().split("T")[0];
console.log(fechaInicioMas14fechas(inicio))
    return  hoy >=  fechaInicioMas14fechas(inicio);
  }
  // Prueba a ver si anda
  // avisarCliente('2024/10/10') // retorna un booleano

  const handleClick = (tel, nombre) => {
    const phoneNumber = tel;
    const message = `Hola, Como estas ${nombre} ? Pasaba para avisarte que ya es tiempo de hacer el retoque a tus pestañas! Avisame si es que vienes asi te reservo un lugar. Espero que estes muy bien, Saludos.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  function fechaInicialAlReves (inicial){
      
          let fechaInicio = inicial.split("/");
          let diaInicio = fechaInicio[0];
          let mesInicio = fechaInicio[1];
          let añoInicio = fechaInicio[2];
          let fechaAlReves = `${añoInicio}/${mesInicio}/${diaInicio}`;
          return fechaAlReves;

  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("http://localhost:3000/clientes")
      .then((res) => {
        setClientes(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <section
        className="h-[calc(100vh-76px)] flex flex-col gap-6 content-start overflow-auto sm:justify-normal sm:content-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,100,100,1) 100%)",
        }}
      >
        <h1 className="text-3xl text-center my-5 text-green-500 font-bold mx-auto">
          Avisar Cliente
        </h1>
        <table className="table table-success table-bordered border-primary text-center table-striped">
          
            <tr className="border bg-green-300">
              <th scope="col">Cliente</th>
              <th scope="col">Avisar</th>
              <th scope="col">Acción</th>
            </tr>
          
          <tbody className="">
            {clientes.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-3xl text-center text-green-500 font-bold "
                >
                  No hay Reservas
                </td>
              </tr>
            ) : (
              clientes.map((cliente, index) => {
                return (
                  <tr className="bg-lime-400 ">
                    <th key={index}>{cliente.nombre}</th>
                    <th className={avisarCliente(fechaInicialAlReves(cliente.fecha)) ? 'bg-green-400':''}>{avisarCliente(fechaInicialAlReves(cliente.fecha)) ? "Si" : "No"}</th>
                    <td>
                      <button
                        className={avisarCliente(fechaInicialAlReves(cliente.fecha)) ? "btn btn-success" : "btn btn-disable"}
                        to="#"
                        onClick={
                          avisarCliente(fechaInicialAlReves(cliente.fecha))
                            ? () => handleClick(cliente.telefono, cliente.nombre)
                            : null
                        }
                      >
                        {avisarCliente(fechaInicialAlReves(cliente.fecha)) ? "Avisar" : "No Avisar"}
                      </button>
                    </td>
                  </tr>)}))}
                   
            
            
          </tbody>
        </table>
      </section>
      <Navegador />
    </div>
  );
};

export default AvisarCliente;
