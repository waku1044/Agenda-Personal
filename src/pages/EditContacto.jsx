import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navegador from "../components/Navegador";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import {cambioDeSigno, fechaAlReves, cambio_de_signo} from "../components/ManejoDeFecha";
import { Formik, Form, Field, ErrorMessage } from "formik";

const EditarContacto = () => {
  const [contacto, setContacto] = useState({});
  const navegate = useNavigate();
  const id = useParams().id;
  const [verFecha, setVerFecha] = useState("");
  const [fechaMinima, setFechaMinima] = useState("");

  useEffect(() => {
    setFechaMinima(new Date().toISOString().split("T")[0]); // Obtiene la fecha de hoy en formato YYYY-MM-DD
  }, []);


 

 
  useEffect(() => {
    // console.log(`Este es el id que va a buscar ${id}`)
    axios
      .get(`https://back-agenda-fedra.vercel.app/api/clientes/`)
      .then(async (res) => {
        const result = await res.data;
        const clienteEncontrado = result.find((cliente) => cliente._id == id);
        if (clienteEncontrado) {
          
          setVerFecha(cambioDeSigno(clienteEncontrado.fecha));
          setContacto(clienteEncontrado);
          // setVerFecha(fechaAlReves(clienteEncontrado.fecha));
        } else {
          setContacto(null);
        }
      })
      .catch((err) => {
        console.log("Error , " + err);
      });
  }, []);

  return (
    <>
      <div className="bg-slate-700 flex items-center justify-center">
        <Formik
          initialValues={{
            nombre: "",
            telefono: "",
            descripcion: "",
            fecha: "",
          }}
          onSubmit={async (values) => {
            const { nombre, telefono, descripcion, fecha } = contacto;

            try {
              const res = await axios.put(
                `https://back-agenda-fedra.vercel.app/api/editarcontacto/${id}`,
                {
                  nombre,
                  telefono,
                  descripcion,
                  fecha: cambio_de_signo(fecha)
                }
              );

              Notify.success("Se editó correctamente");
              navegate("/clientes");
            } catch (err) {
              console.log(err);
              Notify.failure(
                err.response?.data?.messenger || "Error desconocido"
              );
            }
          }}
          validate={(values) => {
            const error = {};
            // Validación para el nombre

            if (
              typeof contacto.nombre !== "string" ||
              !/^[a-zA-Z\s]+$/.test(contacto.nombre)
            ) {
              error.nombre = "Solo se admite letras";
            }
            if (!contacto.nombre) {
              error.nombre = "El nombre es obligatorio";
            }

            // Validación para el teléfono
            if (!/^\d+$/.test(contacto.telefono)) {
              error.telefono = "El teléfono debe ser numérico";
            }
            if (!contacto.telefono) {
              error.telefono = "El telefono es obligatorio";
            }
            return error;
          }}
        >
          <Form className="flex flex-col gap-3 items-center justify-center p-10 h-[calc(100vh-3rem)]">
            <h2 className="text-xl font-bold text-green-500">
              Editar Contacto
            </h2>
            <Field
              name="nombre"
              type="text"
              placeholder="Nombre"
              className="p-1 ps-3 w-60 rounded-full border-2"
              value={contacto.nombre}
              onChange={(e) =>
                setContacto({ ...contacto, nombre: e.target.value })
              }
            />
            <p className="text-red-500">
              <ErrorMessage name="nombre" />
            </p>

            <Field
              name="telefono"
              type="number"
              placeholder="Telefono"
              className="p-1 ps-3 w-60 rounded-full border-2"
              value={contacto.telefono}
              onChange={(e) =>
                setContacto({ ...contacto, telefono: e.target.value })
              }
            />
            <p className="text-red-500">
              <ErrorMessage name="telefono" />
            </p>

            <Field
              name="fecha"
              type="date"
              className="p-1 ps-3 w-60 rounded-full border-2"
              value={verFecha}
              min={fechaMinima}
              
              onChange={(e) => {
                setContacto({ ...contacto, fecha: e.target.value }),
                  setVerFecha(e.target.value);
              }}
            />
            <p className="text-red-500">
              <ErrorMessage name="fecha" />
            </p>

            <Field
              type="textarea"
              name="descripcion"
              placeholder="Descripcion"
              className="p-1 ps-3 w-60 rounded-full border-2"
              value={contacto.descripcion}
              onChange={(e) =>
                setContacto({ ...contacto, descripcion: e.target.value })
              }
            />

            <button
              type="submit"
              className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md"
            >
              Guardar
            </button>
          </Form>
        </Formik>
      </div>
      <Navegador />
    </>
  );
};

export default EditarContacto;
