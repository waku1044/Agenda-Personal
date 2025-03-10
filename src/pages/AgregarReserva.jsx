import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navegador from "../components/Navegador";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Header from "../components/Header";
import {cambioDeSigno, fechaAlReves, cambio_de_signo} from "../components/ManejoDeFecha";

const AgregarReserva = () => {
  const navegate = useNavigate();
  const [fechaMinima, setFechaMinima] = useState();

  useEffect(() => {
    setFechaMinima(new Date().toISOString().split("T")[0]); // Obtiene la fecha de hoy en formato YYYY-MM-DD
  }, []);

  return (
    <>
      <Header />
      <div className="h-[calc(80vh-53px)] bg-slate-700 flex-colum items-center justify-center overflow-auto">
        <h2 className="text-3xl text-center font-bold text-green-500">
          Agregar Reserva
        </h2>
        <Formik
          initialValues={{
            nombre: "",
            telefono: "",
            servicio: "",
            fecha: "",
            hora: "",
            seña: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              values.nombre,
              values.telefono,
              values.servicio,
              values.fecha,
              values.hora,
              values.seña
            );
            // const { nombre, telefono, fecha, hora, servicio, seña } = values;
            // console.log('Primera ',values.fecha);
            // values.fecha = values.fecha.split("-");
            // let año = values.fecha[0];
            // let mes = values.fecha[1];
            // let dia = values.fecha[2];
            // values.fecha = `${año}/${mes}/${dia}`;
            // console.log('Segunda ',values.fecha);
            cambio_de_signo(values.fecha);
            axios
              .post("https://back-agenda-fedra.vercel.app/api/agregarcontacto", values)
              .then((response) => {
                Notify.success("Reserva agregada con éxito");
                console.log(response.data);
                console.log(values);
                navegate("/reservas");
                resetForm();
              })
              .catch((error) => {
                console.error("Error al agregar la reserva:", error);
                Notify.failure("Error al agregar la reserva");
              });
          }}
          validate={(values) => {
            const error = {};

            if (!values.nombre) {
              error.nombre = "El nombre es requerido";
            }
            if (!values.telefono) {
              error.telefono = "El telefono es requerido";
            }

            return error;
          }}
        >
          {/* flex flex-col gap-3 items-center justify-center p-10 mt-0 */}
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-3  w-3/4 mx-auto p-4 rounded-lg  sm:mt-16">
            <div className="flex flex-column items-center justify-center">
              <Field
                name="nombre"
                placeholder="Nombre"
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              />
              {<ErrorMessage name="nombre" /> && (
                <p className="text-danger text-center">
                  <ErrorMessage name="nombre" />
                </p>
              )}
            </div>

            <div className="flex flex-column items-center  justify-center">
              <Field
                name="telefono"
                placeholder="Telefono"
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              />
              {<ErrorMessage name="telefono" /> && (
                <p className="text-danger text-center">
                  <ErrorMessage name="telefono" />
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Field
                as="select"
                name="servicio"
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              >
                <option disabled value="">
                  Servicio
                </option>
                <option value="Clasicas">Clasicas</option>
                <option value="Hawaianas">Hawaianas</option>
                <option value="Rimel">Rimel</option>
                <option value="Volumen">Volumen</option>
                <option value="Wispy">Wispy</option>
                <option value="MegaVolumen">MegaVolumen</option>
                <option value="Liffting">Liffting</option>
                <option value="Diseño / Perfilado de cejas">
                  Diseño / Perfilado de cejas
                </option>
                <option value="Diseño / Perfilado / Laminado de cejas">
                  Diseño / Perfilado / Laminado de cejas
                </option>
                <option value="Masajes Sedativos">Masajes Sedativos</option>
                <option value="Masajes Reductores">Masajes Reductores</option>
                <option value="Depilación">Depilación</option>
              </Field>
            </div>

            <div className="flex justify-center">
              <Field
                name="fecha"
                type="date"
                placeholder="Fecha"
                min={fechaMinima}
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              />
            </div>

            <div className="flex justify-center">
              <Field
                name="hora"
                type="time"
                placerholder="Hora"
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              />
            </div>

            <div className="flex flex-column items-center justify-center">
              <Field
                name="seña"
                type="number"
                placeholder="Seña"
                className="p-1 ps-3 w-60 rounded-full border-2"
                required
              />
              {<ErrorMessage name="seña" /> && (
                <p className="text-danger text-center">
                  <ErrorMessage name="seña" />
                </p>
              )}
            </div>

            <div className="flex justify-center sm:col-span-2 overflow-auto">
              <Field
                name="descripcion"
                component="textarea"
                placeholder="Descripción"
                className="p-1 ps-3  border-5 border-zinc-950 w-75  overflow-auto"
              />
            </div>

            <div className="flex justify-center sm:col-span-2">
              <button
                type="submit"
                className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md"
              >
                Agregar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Navegador />
    </>
  );
};

export default AgregarReserva;
