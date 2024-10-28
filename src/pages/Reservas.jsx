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
    let hoy = new Date();
    let actual = hoy.getDay();

    // console.log(actual); // 0
    // Ajustar para que el lunes sea el primer día de la semana
    let lunes = new Date(hoy);
    if (lunes.getDay() === 0) {
      lunes.setDate(hoy.getDate() + 1);
    } else {
      lunes.setDate(hoy.getDate() - (actual === 0 ? 6 : actual - 1)); // Si hoy es domingo, retrocede 6 días
      console.log(lunes);
    }
    let sabado = new Date(lunes);
    sabado.setDate(lunes.getDate() + 5); // Calcula el domingo de la misma semana

    setInicioSemana(lunes.toLocaleDateString());
    setFinSemana(sabado.toLocaleDateString());
  }, []);

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("http://localhost:3000/clientes")
      .then((res) => {
        setReservados(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function entraEnLaSemana(fechainicio) {
    // console.log(inicioSemana, finSemana)
    return (
      fechainicio >= fechaInicialAlReves(inicioSemana) &&
      fechainicio <= fechaInicialAlReves(finSemana)
    );
  }

  function fechaDeSemana(fechaNumero) {
    console.log(fechaNumero)
    let diasDeSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    // let fecha = fechaNumero.split("/")[0];
    // let mes = fechaNumero.split("/")[1];
    // let año = fechaNumero.split("/")[2];
    // let fechaAlReves = `${año}/${mes}/${fecha}`;
    let actual = new Date(fechaNumero);
    return diasDeSemana[actual.getDay()];
  }

  function fechaAlReves(inicial) {
    let fechaInicio = inicial.split("/");
    let diaInicio = fechaInicio[0];
    let mesInicio = fechaInicio[1];
    let añoInicio = fechaInicio[2];
    let fechaReves = `${añoInicio}/${mesInicio}/${diaInicio}`;
    return fechaReves;
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
              {reservados.map((cliente, index) => {
                console.log(cliente.fecha)
                if (
                  cliente.fecha >= fechaAlReves(inicioSemana) &&
                  cliente.fecha <= fechaAlReves(finSemana)
                ) {
                  console.log(cliente.nombre)
                  return (
                    <tr className="border bg-green-300" key={index}>
                      <th scope="row">{cliente.fecha}</th>
                      <td>{cliente.hora}</td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Lunes"
                          ? cliente.nombre
                          : ""}
                      </td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Martes"
                          ? cliente.nombre
                          : ""}
                      </td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Miércoles"
                          ? cliente.nombre
                          : ""}
                      </td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Jueves"
                          ? cliente.nombre
                          : ""}
                      </td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Viernes"
                          ? cliente.nombre
                          : ""}
                      </td>
                      <td>
                        {fechaDeSemana(cliente.fecha) === "Sábado"
                          ? cliente.nombre
                          : ""}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </section>
      <Navegador />
    </div>
  );
};

export default Reservas;
