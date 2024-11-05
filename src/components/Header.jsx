import Logo from "../assets/img/logo.png";
import { useState, useEffect } from 'react';


const Header = () => {

    const [busqueda, setBusqueda ] = useState(null);

    return (
        <header className="flex justify-center sm:justify-around gap-14 items-center p-4 bg-slate-600">
        <img src={Logo} alt="Logo" className="w-14 md:w-20 rounded-full" />

        <input
            type="search"
            placeholder="Buscar Cliente"
            className="p-2 ps-4 rounded-full w-40 md:w-80 border-2 border-green-500" 
            
         />

        
      </header>
)}

export default Header;