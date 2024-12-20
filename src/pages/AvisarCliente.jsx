import Navegador from "../components/Navegador";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/Header'

const AvisarCliente = () => {
  const [clientes, setClientes] = useState([]);

  function fechaInicioMas14dias(inicio) {
    const fechaInicio = new Date(inicio);
    fechaInicio.setDate(fechaInicio.getDate() + 14);
    return fechaInicio; // Devuelve la fecha como objeto Date
  }

  function avisarCliente(fecha, nombre) {
    const fechaAviso = new Date(fechaInicioMas14dias(fecha));
    const hoy = new Date();
    
    return hoy >= fechaAviso; // Retorna true si hoy es mayor o igual a la fecha de aviso
  }

  const handleClick = (tel, nombre) => {
    const phoneNumber = tel;
    const message = `Hola, Como estas ${nombre} ? Pasaba para avisarte que ya es tiempo de hacer el retoque a tus pestañas! Avisame si es que vienes asi te reservo un lugar. Espero que estes muy bien, Saludos.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    axios
      .get("https://back-agenda-fedra.vercel.app/api/clientes")
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <section className="h-[calc(80vh-53px)] flex flex-col gap-6 content-start overflow-auto sm:justify-normal sm:content-none" style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,100,100,1) 100%)"
        }}>
        <h1 className="text-3xl text-center my-5 text-green-500 font-bold mx-auto">
          Avisar Cliente
        </h1>
        <table className="table table-success table-bordered border-primary text-center table-striped">
          <thead className="border bg-green-300 py-3">
              <th scope="col">Cliente</th>
              <th scope="col">Avisar</th>
              <th scope="col">Acción</th>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-3xl text-center text-green-500 font-bold">
                  No hay Reservas
                </td>
              </tr>
            ) : (
              clientes.map((cliente, index) => (
                <tr className="bg-lime-400" key={index}>
                  <td className="capitalize">{cliente.nombre}</td>
                  <td className={avisarCliente(cliente.fecha, cliente.nombre) ? 'bg-green-400' : ''}>
                    {avisarCliente(cliente.fecha, cliente.nombre) ? "Si" : "No"}
                  </td>
                  <td>
                    <button
                      className={avisarCliente(cliente.fecha, cliente.nombre) ? "btn btn-success" : "btn btn-disable"}
                      onClick={
                        avisarCliente(cliente.fecha, cliente.nombre)
                          ? () => handleClick(cliente.telefono, cliente.nombre)
                          : null
                      }
                    >
                      {avisarCliente(cliente.fecha, cliente.nombre) ? "Avisar" : "No Avisar"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <Navegador />
    </div>
  );
};

export default AvisarCliente;
