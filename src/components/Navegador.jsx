import { Link, useNavigate } from "react-router-dom";



const Navegador = () => {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("data"));
    // console.log(user.id)

    return (
        <div className="flex justify-between items-center p-4 bg-slate-600">
            
            <Link to="/contactos"><h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400 ">Contactos</h1></Link>
            <Link to="/agregar"><h1 className="text-xs  md:text-xl font-bold text-green-500 hover:text-purple-400   ">Agregar</h1></Link>
            <Link to={`/perfil/${user.id}`}	><h1 className="text-xs  md:text-xl font-bold text-green-500  hover:text-purple-400 ">Perfil</h1></Link>

        </div>
    )

}

export default Navegador;