import { Link, useNavigate } from "react-router-dom";



const Navegador = () => {

    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4 bg-slate-600">
            <h2 className="text-xs  md:text-xl font-bold text-green-500">Agenda Personal</h2>
            <Link to="/agregar"><h1 className="text-xs  md:text-xl font-bold text-green-500">Agregar</h1></Link>
            <Link to="/perfil"><h1 className="text-xs  md:text-xl font-bold text-green-500">Perfil</h1></Link>

        </div>
    )

}

export default Navegador;