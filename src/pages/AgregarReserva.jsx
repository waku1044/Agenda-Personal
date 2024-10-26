import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navegador from "../components/Navegador";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const AgregarReserva = () => {
  const navegate = useNavigate();
  const [fechaMinima, setFechaMinima] = useState();

  useEffect(() => {
    setFechaMinima(new Date().toISOString().split("T")[0]); // Obtiene la fecha de hoy en formato YYYY-MM-DD
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-76px)] bg-slate-700 flex items-center justify-center">
        <Formik
          initialValues={{
            nombre: "",
            telefono: "",
            servicio: "",
            fecha: "",
            hora: "",
            seña: "",
          }}
          onSubmit={(values) => {
            console.log(
              values.nombre,
              values.telefono,
              values.fecha,
              values.hora,
              values.servicio,
              values.seña
            );
            const { nombre, telefono, fecha, hora, servicio, seña } = values;

            console.log(nombre, telefono, fecha, hora, servicio, seña);
            console.log("este es el servicio " + servicio.value);
          }}
          validate={(values) => {
            const error = {};

            if (!values.nombre) {
              error.nombre = "El nombre es requerido";
            }
            if (!values.telefono) {
              error.telefono = "El telefono es requerido";
            }
            if (!/^\d+$/.test(values.telefono)) {
              error.telefono = "El telefono debe ser numerico";
            }

            return error;
          }}
        >
          <Form className="flex flex-col gap-3 items-center justify-center p-10 ">
            <h2 className="text-xl font-bold text-green-500">
              Agregar Reserva
            </h2>
            <Field
              name="nombre"
              placeholder="Nombre"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="nombre" className="text-danger" />

            <Field
              name="telefono"
              placeholder="Telefono"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="telefono" className="text-danger" />

            <Field
              as="select"
              name="servicio"
              className="p-1 ps-3 w-60 rounded-full border-2"
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

            <Field
              name="fecha"
              type="date"
              min={fechaMinima}
              className="p-1 ps-3 w-60 rounded-full border-2"
            />

            <Field
              name="hora"
              type="time"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />

            <Field
              name="seña"
              type="number"
              placeholder="Seña"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage
              name="seña"
              requered
              className="text-danger"
              style={"color:red"}
            />

            <button
              type="submit"
              className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md"
            >
              Agregar
            </button>
          </Form>
        </Formik>
      </div>
      <Navegador />
    </>
  );
};

export default AgregarReserva;
