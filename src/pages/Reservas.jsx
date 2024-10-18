import { useState, useEffect } from "react";
import CardContactos from "../components/CardContactos";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Header from "../components/Header";

import Navegador from "../components/Navegador";

const Reservas = () => {
  const [reservados, setReservados] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("http://localhost:3000/clientes")
      .then((res) => {
        setReservados(res.data);
        // console.log(res.data)
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
        <h1 className="text-3xl text-center my-5 text-green-500 font-bold mx-auto ">
          Reservas de esta Semana
        </h1>
        <table class="table table-success table-bordered border-primary text-center table-striped">
          
            <tr class="border bg-green-300 ">
              {/* <th scope="col">#</th> */}
              <th scope='col'>Fecha</th>
              <th scope='col'>Hora</th>
              <th scope="col">Lunes</th>
              <th scope="col">Martes</th>
              <th scope="col">Miercoles</th>
              <th scope="col">Jueves</th>
              <th scope="col">Viernes</th>
              <th scope="col">Sabado</th>
            </tr>
          
          <tbody class="table-group-divider">
            <tr>
              <th>walter <br/> 11:30 hs</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>walter</th>
              
            </tr>
            <tr>
              <th>walter</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>walter</th>
              
            </tr>
            <tr>
              <th>walter</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>fsdfsd</th>
              <th>walter</th>
              <th>walter</th>
              
            </tr>
          </tbody>
        </table>
        {/* {reservados.length == 0 ? (
          <h1 className="text-3xl text-center text-green-500 font-bold ">
            No hay Reservas
          </h1>
        ) : (
          reservados.map(
            (cliente, index) => (
              console.log(cliente.nombre),
              (<CardContactos key={index} cliente={cliente} />)
            )
          )
        )} */}
      </section>
      <Navegador />
    </div>
  );
};

export default Reservas;
