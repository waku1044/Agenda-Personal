import { useState, useEffect } from "react";
import CardContactos from "../components/ItemContacto";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Header from "../components/Header";
import {
  cambioDeSigno,
  fechaAlReves,
  cambio_de_signo,
  siEstaEnRangoFecha,
} from "../components/ManejoDeFecha";
import Navegador from "../components/Navegador";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español correctamente
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.locale("es"); // Configura el idioma español

dayjs.extend(localeData);

const Reservas = () => {
  const [reservados, setReservados] = useState([]);
  const [inicioSemana, setInicioSemana] = useState();
  const [finSemana, setFinSemana] = useState();

  dayjs.locale("es");

  useEffect(() => {
    // Obtener la fecha de hoy
    let hoy = dayjs();
    console.log('Linea 32' ,hoy)

    // Calcular el primer día de la semana (lunes)
    let lunes = hoy.startOf("week"); // Esto ajusta la fecha al lunes de la semana actual

    // Si hoy es domingo, dayjs retornará el lunes del día anterior, así que ajustamos:
    if (hoy.day() === 0) {
      lunes = lunes.add(1, "day"); // Ajusta el lunes al siguiente día si es domingo
    }

    // Calcular el último día de la semana (sábado)
    let sabado = lunes.add(5, "days"); // El sábado es 5 días después del lunes

    // Establecer los valores de inicio y fin de la semana en el formato deseado
    setInicioSemana(lunes.format("DD-MM-YYYY"));
    setFinSemana(sabado.format("DD-MM-YYYY"));
  }, []);

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("https://back-agenda-fedra.vercel.app/api/clientes")
      .then((res) => {
        setReservados(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function entraEnLaSemana(fechainicio) {
  //   // console.log(inicioSemana, finSemana)
  //   console.log(
  //     fechainicio >= fechaInicialAlReves(inicioSemana) &&
  //     fechainicio <= fechaInicialAlReves(finSemana)
  //   );
  // };

  function fechaDeSemana(fechaNumero) {
    // const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    // let actual = new Date(fechaNumero);

    // console.log(actual,dias[actual.getDay()]);
    // return dias[actual.getDay()] || "desconocido";
    // Usamos dayjs para parsear la fecha con el formato correcto
    console.log(fechaNumero);
    const fechaFormateada = dayjs(fechaNumero, "DD-MM-YYYY");

    // Obtener el día de la semana en formato largo (por ejemplo: 'Lunes', 'Martes', etc.)
    const diaDeLaSemana = fechaFormateada.format("dddd");
    console.log(diaDeLaSemana);
  }

  // let fecha = fechaNumero.split("-")[0];
  // let mes = fechaNumero.split("-")[1];
  // let año = fechaNumero.split("-")[2];
  // let fechaAlReves = `${año}/${mes}/${fecha}`;
  // console.log('fechaNumero',fechaAlReves);
  // console.log('actual',actual);
  // console.log('diasDeSemana',diasDeSemana[actual.getDay()]);

  // return diasDeSemana[actual.getDay()];

  // entraEnLaSemana(fechaAlReves(inicioSemana));
  return (
    <div>
      <Header />
      <section
        className="h-[calc(80vh-53px)] flex flex-col gap-6 content-start overflow-auto sm:justify-normal sm:content-none"
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
                console.log(cliente.fecha);
                console.log(inicioSemana, finSemana);
                if (
                  siEstaEnRangoFecha(
                    console.log(cliente.fecha, cliente.nombre),
                    cambioDeSigno(cliente.fecha),
                    console.log(cliente.fecha),
                    fechaAlReves(cambioDeSigno(inicioSemana)),
                    cambioDeSigno(finSemana)
                  )
                ) {
                  return (
                    <tr className="border bg-green-300" key={index}>
                      <th scope="row">{cliente.fecha} </th>
                      <td>{cliente.hora}</td>
                      <td className="capitalize">
                        {console.log(cliente.fecha)}
                        {fechaDeSemana(cliente.fecha) === "lunes" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="capitalize">
                        {fechaDeSemana(cliente.fecha) === "martes" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="capitalize">
                        {fechaDeSemana(cliente.fecha) === "miércoles" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="capitalize">
                        {fechaDeSemana(cliente.fecha) === "jueves" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="capitalize">
                        {fechaDeSemana(cliente.fecha) === "viernes" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="capitalize">
                        {fechaDeSemana(cliente.fecha) === "sábado" ? (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        ) : (
                          ""
                        )}
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
