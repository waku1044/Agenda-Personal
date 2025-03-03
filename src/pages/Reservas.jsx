import { useState, useEffect } from "react";
import CardContactos from "../components/ItemContacto";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Header from "../components/Header";
import {
  cambioDeSigno,
  fechaAlReves,
  fecha_Al_Reves,
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
    // console.log('Linea 32' ,hoy)

    // Calcular el primer día de la semana (lunes)
    let lunes = hoy.startOf("week"); // Esto ajusta la fecha al lunes de la semana actual

    // Si hoy es domingo, dayjs retornará el lunes del día anterior, así que ajustamos:
    if (hoy.day() === 0) {
      lunes = lunes.add(0, "days"); // Ajusta el lunes al siguiente día si es domingo
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

  function fechaDeSemana(fechaNumero) {
    const diaDeLaSemana = dayjs(fechaAlReves(fechaNumero), "DD-MM-YYYY").format("dddd");
    return diaDeLaSemana;
  }
  
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
        <p className="text-center fs-5 font-bold text-pink-400">
          {inicioSemana} ___ {finSemana}
        </p>
        <div className="overflow-auto">
          <table className="table table-success table-bordered border-primary text-center table-striped">
            <thead className="border bg-green-300 ">
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Lunes</th>
              <th scope="col">Martes</th>
              <th scope="col">Miércoles</th>
              <th scope="col">Jueves</th>
              <th scope="col">Viernes</th>
              <th scope="col">Sábado</th>
            </thead>
  
            <tbody className="table-group-divider">
              {reservados.map((cliente, index) => {
                
                const diaDeLaSemana = fechaDeSemana(cliente.fecha, cliente.nombre); // Llamamos una vez a la función y la almacenamos en una variable.
                if (
                  siEstaEnRangoFecha(
                    fecha_Al_Reves(cliente.fecha),
                    inicioSemana,
                    finSemana
                  )
                  
                ) {
                  
                  return (
                    <tr className="border bg-green-300" key={index}>
                      <th scope="row">{fecha_Al_Reves(cliente.fecha)} </th>
                      <td className="font-bold">{cliente.hora}</td>
                      <td className="capitalize">
                        {diaDeLaSemana === "lunes" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        )}
                      </td>
                      <td className="capitalize">
                        {diaDeLaSemana === "martes" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        )}
                      </td>
                      <td className="capitalize">
                        {diaDeLaSemana === "miércoles" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        )}
                      </td>
                      <td className="capitalize">
                        {diaDeLaSemana === "jueves" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        )}
                      </td>
                      <td className="capitalize">
                        {diaDeLaSemana === "viernes" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
                        )}
                      </td>
                      <td className="capitalize">
                        {diaDeLaSemana === "sábado" && (
                          <>
                            <span>{cliente.nombre}</span>
                            <br />
                            <span>{cliente.servicio}</span>
                            <br />
                            <span>{cliente.seña}</span>
                          </>
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
            }

export default Reservas;
