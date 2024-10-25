import {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navegador from "../components/Navegador";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const AgregarReserva = () => {
  const navegate = useNavigate();
const [fechaMinima , setFechaMinima] = useState();



useEffect(()=>{
  
  setFechaMinima(new Date().toISOString().split("T")[0]); // Obtiene la fecha de hoy en formato YYYY-MM-DD

},[])

  return (
    <>
      <div className="h-[calc(100vh-76px)] bg-slate-700 flex items-center justify-center">
        <Formik
          initialValues={{
            nombre: "",
            telefono: "",
            servicio: "",
            dia: "",
            hora: "",
          }}
          onSubmit={async (values) => {
            console.log(
              values.nombre,
              values.telefono,
              values.dia,
              values.hora,
              values.servicio
            );
            const { nombre, telefono, dia, hora, servicio } = values;
            const data = JSON.parse(localStorage.getItem("data"));
            console.log(data.username);
            
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
            if (!values.correo) {
              error.correo = "El correo es requerido";
            }
            if (
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                values.correo
              )
            ) {
              error.correo = "El correo no es valido";
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
              requered
            />
            <ErrorMessage name="nombre" className="text-danger" />

            <Field
              name="telefono"
              placeholder="Telefono"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="telefono" className="text-danger" />

            <select
              name="estado"
              className="p-1 ps-3 w-60 rounded-full border-2"
            >
              <option value="" disabled selected>
                Servicio
              </option>
              <option value="Pendiente">Clasicas</option>
              <option value="Confirmada">Hawaianas</option>
              <option value="Cancelada">Rimel</option>
              <option value="Cancelada">Volumen</option>
              <option value="Cancelada">Wispy</option>
              <option value="Cancelada">MegaVolumen</option>
              <option value="Cancelada">Liffting</option>
              <option value="Cancelada">Diseño / Perfilado de cejas</option>
              <option value="Cancelada">
                Diseño / Perfilado / Laminado de cejas
              </option>
              <option value="Cancelada">Masajes Sedativos</option>
              <option value="Cancelada">Masajes Reductores</option>
              <option value="Cancelada">Depilación</option>
            </select>

            <Field name="fecha" type="date" min={fechaMinima} className="p-1 ps-3 w-60 rounded-full border-2" />

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
            <ErrorMessage name="seña" requered className="text-danger" style={'color:red'} />

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
