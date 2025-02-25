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
      .get(`https://back-agenda-fedra.vercel.app/api/clientes`)
      .then(async (res) => {
        const result = await res.data;
        const clienteEncontrado = result.find((cliente) => cliente._id == id);
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
      .delete(`https://back-agenda-fedra.vercel.app/api/eliminarcontacto/${id}`)
      .then(async (res) => {
        Notify.success("Contacto Eliminado Correctamente");
        navegate("/clientes");
      })
      .catch((err) => {
        Notify.danger("Contacto No fue eliminado");
        console.log("Error , " + err);
      });
  };

  return (
    <>
      <Header />

      <div
        className=" row my-3 p-4 gap-3 flex justify-center overflow-auto"
        style={{ maxWidth: "100%" }}
      >
        <div className="flex flex-column col-10 col-md-5 items-center justify-center  bg-orange-200 border-5  border-green-500">
          <div className=" flex justify-center py-3 ">
            <img
              src={avatar}
              className="img-fluid rounded-start w-1/2 "
              alt="avatar"
            />
          </div>
          <div className="">
            <div className="card-body text-center">
              <h1 className="card-title text-3xl font-bold capitalize">
                {contacto.nombre}
              </h1>
              <h3 className="text-3xl font-normal">{contacto.correo}</h3>
              <h4 className="text-3xl font-normal">{contacto.telefono}</h4>

              <div className="flex gap-3 my-3 justify-center mb-4">
                <button
                  onClick={() => navegate(`/editarcontacto/${contacto._id}`)}
                  className="bg-green-500 text-white p-2 rounded-md hover:scale-110"
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:scale-110"
                  onClick={() => {
                    eliminarContacto(contacto._id);
                  }}
                >
                  Eliminar
                </button>
              </div>
              <Link
                to={`https://wa.me/+549${contacto.telefono}?text=Hola%20${contacto.nombre},%20como%20estás?`}
                target="_blank"
                className="bg-pink-300 text-dark-800 font-bold text-xl p-2 rounded-md mt-3 hover:scale-110 mx-auto"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-column col-10 col-md-5 py-5 bg-orange-200 border-5  border-green-500">
          <p className="text-3xl font-bold ">Fecha: </p>
          <p className="text-3xl font-normal text-center mb-5">{contacto.fecha}</p>
          <p className="text-3xl font-bold mb-2">Descripcion:</p>
          {contacto.descripcion ? (
            <h5 className="text-3xl font-normal text-center capitalize">
              {contacto.descripcion}
            </h5>
          ) : (
            ""
          )}
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
