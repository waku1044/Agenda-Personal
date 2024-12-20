import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/img/avatarContact.png";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Navegador from "../components/Navegador";
import Header from "../components/Header";
import ItemContacto from "../components/ItemContacto";
import Buscador from "../components/Buscador"; // Importamos el componente de búsqueda

const Clientes = () => {
  const navigate = useNavigate();
  const [reservados, setReservados] = useState([]); // Lista completa de clientes
  const [resultado, setResultado] = useState([]); // Resultados filtrados
  const [busqueda, setBusqueda] = useState(""); // Estado para el valor de búsqueda

  // Obtener datos de clientes desde la API (o almacenamiento local si es necesario)
  useEffect(() => {
    axios
      .get("https://back-agenda-fedra.vercel.app/api/clientes") // Cambia la URL según tu API
      .then((res) => { 
         setReservados(res.data); // Guardamos todos los clientes
         setResultado(res.data); // Inicialmente mostramos todos los clientes
      })
      .catch((err) => {
        console.error(err);
        Notify.failure("Error al cargar los clientes.");
      });
  }, []);

  // Manejar la búsqueda y filtrar los clientes
  const manejarBusqueda = (query) => {
    setBusqueda(query); // Actualizamos el valor de búsqueda

    if (query === "") {
      setResultado(reservados); // Si no hay búsqueda, mostramos todos los clientes
    } else {
      const filteredClients = reservados.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(query.toLowerCase()) // Filtramos por nombre
      );
      setResultado(filteredClients); // Actualizamos los resultados con los clientes filtrados
    }
  };
  
  return (
    <>
      <Header onSearch={manejarBusqueda}/> {/* Aquí puedes integrar el Buscador en Header, o pasar la función de búsqueda al Header */}
    {/* Componente Buscador que maneja el input y filtra */}
    {/* <Buscador onSearch={manejarBusqueda} /> */}
      
      <div>
        <section
          className="flex-column h-[calc(80vh-53px)] flex-wrap justify-around items-center content-start overflow-auto sm:justify-normal sm:content-none bg-slate-600"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          }}
        >
          <h1 className="text-3xl text-center my-5 text-green-500 font-bold mx-auto ">
            Lista de Clientes
          </h1>


          <div className="flex flex-col items-center justify-center gap-2 md:flex-wrap md:flex-row w-75 mx-auto md:gap-4">
            {resultado.length === 0 ? (
              <h1 className="text-3xl text-slate-200 text-center font-bold mx-auto ">
                No hay clientes que coincidan con la búsqueda.
              </h1>
            ) : (
              resultado.map((cliente, index) => (
                <ItemContacto key={index} cliente={cliente} />
              ))
            )}
          </div>
        </section>
        <Navegador />
      </div>
    </>
  );
};

export default Clientes;
