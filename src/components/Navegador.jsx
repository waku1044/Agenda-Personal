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
      <button onClick={()=>{navigate('/reservas')}} className={classreservas}>
        {/* <h1 className="text-xl font-bold text-green-500 hover:text-purple-400 ">
          Reservas
        </h1> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fff"
          class="bi bi-journal-check"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
          />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
      </button>
      <button onClick={()=>navigate("/agregarreserva")} className={classagregarreserva}>
        {/* <h1 className="text-xl font-bold text-green-500 hover:text-purple-400   ">
          Agregar Reserva
        </h1> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fff"
          class="bi bi-person-plus"
          viewBox="0 0 16 16"
        >
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          <path
            fill-rule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
      </button>
      <button onClick={()=>navigate("/avisarcliente")} className={classavisarcliente}>
        {/* <h1 className="text-xl font-bold text-green-500 hover:text-purple-400   ">
          Avisar
        </h1> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fff"
          class="bi bi-envelope-arrow-up"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016" />
        </svg>
      </button>
      <button  onClick={()=>navigate("/clientes")} className={classclientes}>
        {/* <h1 className="text-xl font-bold text-green-500 hover:text-purple-400   ">
          Clientes
        </h1> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#fff"
          class="bi bi-person-rolodex"
          viewBox="0 0 16 16"
        >
          <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1z" />
        </svg>
      </button>
    </div>
  );
};

export default Navegador;
