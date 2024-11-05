import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/img/avatarContact.png";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Navegador from "../components/Navegador";
import Header from "../components/Header";

const Cliente = () => {
  const navegate = useNavigate();
  const id = useParams().id;
  const [contacto, setContacto] = useState({});

  useEffect(() => {
    // console.log(`Este es el id que va a buscar ${id}`)
    axios
      .get(`http://localhost:3000/clientes/`)
      .then(async (res) => {
        const result = await res.data;
        const clienteEncontrado = result.find((cliente) => cliente.id == id);
        if (clienteEncontrado) {
          setContacto(clienteEncontrado);
        } else {
          setContacto(null);
        }
      })
      .catch((err) => {
        console.log("Error , " + err);
      });
  }, []);

  const eliminarContacto = (id) => {
    axios
      .delete("http://localhost:3900/api/delete/" + id, {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        Notify.success("Contacto Eliminado Correctamente");
        setTimeout(() => {
          navegate("/contactos");
        }, 2000);
      })
      .catch((err) => {
        Notify.failure(err);
      });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div
          className=" row card my-3 p-3 mx-auto bg-orange-200 flex justify-center items-center "
          style={{ maxWidth: "540px", height: "calc(100vh - 200px)" }}
        >
          <div className="flex flex-column flex-md-row items-center justify-center">
            <div className="col-md-4 flex mx-5 ">
              <img
                src={avatar}
                className="img-fluid rounded-start min-w-5"
                alt="avatar"
              />
            </div>
            <div className="">
              <div className="card-body text-center">
                <h1 className="card-title text-5xl capitalize">{contacto.nombre}</h1>
                <h3 className="text-3xl font-normal">{contacto.correo}</h3>
                <h4 className="text-3xl font-normal">{contacto.telefono}</h4>
                <h5 className="text-3xl font-normal">{contacto.descripcion}</h5>
                <div className="flex gap-3 my-3">
                  <Link
                    to={`/editarcontacto/${contacto.id}`}
                    className="bg-green-500 text-white p-2 rounded-md hover:scale-110"
                  >
                    Editar
                  </Link>
                  <button className="bg-red-500 text-white p-2 rounded-md hover:scale-110">
                    Eliminar
                  </button>
                </div>
                <Link
                  to={`https://wa.me/+599${contacto.telefono}?text=Hola,%20${contacto.nombre}%20como%20estás`}
                  target="_blank"
                  className="bg-pink-300 text-dark-800 font-bold text-xl p-2 rounded-md mt-3 hover:scale-110 mx-auto"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-full h-[calc(100vh-10rem)] flex flex-col gap-6 justify-center items-center bg-violet-500">
            <h1 className="text-3xl font-bold capitalize">{contacto.nombre}</h1>
            <img src={avatar} alt="avatar" className="w-28" />
            <h3 className="text-3xl font-normal">{contacto.correo}</h3>
            <h4 className="text-3xl font-normal">{contacto.telefono}</h4>
            <h5 className="text-3xl font-normal">{contacto.descripcion}</h5>
            <div className="flex gap-3">
            <Link
                to={`/editarcontacto/${contacto._id}`}
                className="bg-green-500 text-white p-2 rounded-md hover:scale-110"
            >
                Editar
            </Link>
            <button className="bg-red-500 text-white p-2 rounded-md hover:scale-110">
                Eliminar
            </button>
            </div>
            <Link
            to={`https://wa.me/+599${contacto.telefono}?text=Hola,%20como%20estás%20${contacto.nombre}`}
            target="_blank"
            className="bg-pink-300 text-sky-800 font-bold text-xl p-2 rounded-md hover:scale-110"
            >
            Contactar
            </Link>
        </div> */}
      <Navegador />
    </>
  );
};

export default Cliente;
