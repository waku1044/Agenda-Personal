import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/img/avatarContact.png";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Navegador from "../components/Navegador";
import Header from "../components/Header";
import ItemContacto from "../components/ItemContacto";

const Clientes = () => {
  const navegate = useNavigate();
  const [reservados, setReservados] = useState([]);
  const id = useParams().id;
  const [contacto, setContacto] = useState({});
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
    <>
    <Header />  
      <div>
        <section
          className=" flex-column  h-[calc(100vh-76px)] flex-wrap  justify-around items-center content-start overflow-auto sm:justify-normal sm:content-none bg-slate-600"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          }}
        >
          <h1 className="text-3xl text-center my-5 text-green-500 font-bold mx-auto ">
            Lista de Clientes
          </h1>

          <div className="flex flex-column flex-wrap gap-2 h-[100%]  ">
            {reservados.length == 0 ? (
              <h1 className="text-3xl text-slate-200 text-center font-bold mx-auto ">
                No hay Clientes
              </h1>
            ) : (
              reservados.map((cliente, index) => (
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
