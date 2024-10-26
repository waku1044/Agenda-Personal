import { useState, useEffect } from "react";
import CardContactos from "../components/CardContactos";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Header from "../components/Header";

import Navegador from "../components/Navegador";

const Reservas = () => {
  const [reservados, setReservados] = useState([]);
  const [inicioSemana, setInicioSemana] = useState();
  const [finSemana, setFinSemana] = useState();

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

  useEffect(() => {
    let hoy = new Date();
    let actual = hoy.getDay();
    let empiezaSemana;

    // Ajustar para que el lunes sea el primer día de la semana
    let lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - (actual === 0 ? 6 : actual - 1)); // Si hoy es domingo, retrocede 6 días

    let domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6); // Calcula el domingo de la misma semana

    setInicioSemana(lunes.toLocaleDateString());
    setFinSemana(domingo.toLocaleDateString());
  }, []);

  function diaDeSemana(fechaNumero) {
    let diasDeSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    let dia = fechaNumero.split("/")[0];
    let mes = fechaNumero.split("/")[1];
    let año = fechaNumero.split("/")[2];
    let fechaAlReves = `${año}/${mes}/${dia}`;
    let actual = new Date(fechaAlReves);
    return diasDeSemana[actual.getDay()];
  }

  return (
    <div>
      <section
        className="h-[calc(100vh-76px)] flex flex-col gap-6 content-start overflow-auto sm:justify-normal sm:content-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,100,100,1) 100%)",
        }}
      >
        <h1 className="text-3xl text-center mt-5 text-green-500 font-bold mx-auto ">
          Reservas de esta Semana
        </h1>
        <p className="text-center  fs-5 font-bold text-pink-400">
          {inicioSemana} ___ {finSemana}{" "}
        </p>
        <div className="overflow-auto">
          <table className="table table-success table-bordered border-primary text-center table-striped">
            <thead className="border bg-green-300 ">
              
                {/* <th scope="col">#</th> */}
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Lunes</th>
                <th scope="col">Martes</th>
                <th scope="col">Miercoles</th>
                <th scope="col">Jueves</th>
                <th scope="col">Viernes</th>
                <th scope="col">Sabado</th>
              
            </thead>

            <tbody className="table-group-divider">
              {reservados.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-3xl text-center text-green-500 font-bold "
                  >
                    No hay Reservas
                  </td>
                </tr>
              ) : (
                reservados.map((cliente, index) => (
                  // console.log(cliente),
                  <tr key={index} className="border bg-green-300">
                    <th scope="row">{cliente.dia}</th>
                    <td>{cliente.hora}</td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Lunes"
                        ? cliente.nombre
                        : ""}
                    </td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Martes"
                        ? cliente.nombre
                        : ""}
                    </td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Miércoles"
                        ? cliente.nombre
                        : ""}
                    </td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Jueves"
                        ? cliente.nombre
                        : ""}
                    </td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Viernes"
                        ? cliente.nombre
                        : ""}
                    </td>
                    <td>
                      {diaDeSemana(cliente.dia) === "Sábado"
                        ? cliente.nombre
                        : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Navegador />
    </div>
  );
};

export default Reservas;
