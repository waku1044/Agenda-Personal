import Logo from "../assets/img/logo.png";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";


const Header = () => {

    const [busqueda, setBusqueda ] = useState(null);
    const [buscador, setBuscador ] = useState(false);
    const location = useLocation();
    const url = location.pathname;
    

    useEffect(()=>{
        (url === '/clientes')? setBuscador(true):setBuscador(false)
    },[url])
    return (
        <header className="flex justify-center sm:justify-around gap-14 items-center p-4 bg-fuchsia-300">
        <img src={Logo} alt="Logo" className="w-14 md:w-20 rounded-full" />

        {buscador ? <input
            type="search"
            placeholder="Buscar Cliente"
            className="p-2 ps-4 rounded-full w-40 md:w-80 border-2 border-green-500" 
            
         />: ''}

        
      </header>
)}

export default Header;