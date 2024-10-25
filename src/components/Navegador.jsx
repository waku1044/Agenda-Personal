import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navegador = () => {
  const [classreservas, setClassreservas] = useState("");
  const [classagregarreserva, setClassagregarreserva] = useState("");
  const [classclientes, setClassclientes] = useState("");
  const [classavisarcliente, setAvisarcliente] = useState("");
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("data"));
  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case "/reservas":
        setClassreservas("bg-yellow-900 px-3 py-2 rounded-full");
        break;
      case "/agregarreserva":
        setClassagregarreserva("bg-yellow-900 px-3 py-2 rounded-full");
        break;
      case "/clientes":
        setClassclientes("bg-yellow-900 px-3 py-2 rounded-full");
        break;
      case "/avisarcliente":
        setAvisarcliente("bg-yellow-900 px-3 py-2 rounded-full");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-between items-center p-4 bg-slate-600">
      <Link to="/reservas" className={classreservas}>
        <h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400 ">
          Reservas
        </h1>
      </Link>
      <Link to="/agregarreserva" className={classagregarreserva}>
        <h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400   ">
          Agregar Reserva
        </h1>
      </Link>
      <Link to="/avisarcliente" className={classavisarcliente}>
        <h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400   ">
          Avisar
        </h1>
      </Link>
      <Link to="/clientes" className={classclientes}>
        <h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400   ">
          Clientes
        </h1>
      </Link>
    </div>
  );
};

export default Navegador;
