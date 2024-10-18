import Navegador from "../components/Navegador";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AvisarCliente = () => {
  const [clientes, setClientes] = useState([]);

  const handleClick = (tel) => {
    const phoneNumber = tel;
    const message =
      "Hola, Como estas? Pasaba para avisarte que ya es tiempo de hacer el retoque a tus pestañas! Avisame si es que vienes asi te reservo un lugar. Espero que estes muy bien, Saludos.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("http://localhost:3000/clientes")
      .then((res) => {
        setClientes(res.data);
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
          <thead>
            <tr className="border bg-green-300 ">
              <th scope="col">Cliente</th>
              <th scope="col">Avisar</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clientes.map((cliente) => (
              <tr className="bg-lime-400" key={cliente.id}>
                <th>{cliente.nombre}</th>
                <th>{cliente.reserva ? "Si" : "No"}</th>
                <td>
                  <button
                    className={cliente.reserva ? 'btn btn-success' : 'btn btn-disable'}
                    to="#"
                    onClick={cliente.reserva ? () => handleClick(cliente.telefono) : null}  
                  >
                    {cliente.reserva ? 'Avisar' : 'No Avisar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Navegador />
    </div>
  );
};

export default AvisarCliente;