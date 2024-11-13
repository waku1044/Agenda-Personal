import Logo from "../assets/img/logo.png";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Buscador from "../components/Buscador";


const Header = ({onSearch}) => {

    
    const [buscador, setBuscador ] = useState(false);
    const location = useLocation();
    const url = location.pathname;

    const intermedioario = (query) => {   
        onSearch(query);
    }
    

    useEffect(()=>{
        (url === '/clientes')? setBuscador(true):setBuscador(false)
    },[url])
    return (
        <header className="flex justify-center sm:justify-around gap-14 items-center p-4 bg-fuchsia-300">
        <img src={Logo} alt="Logo" className="w-14 md:w-20 rounded-full" />

        {buscador ? <Buscador onSearch={intermedioario} />: ''}

        
      </header>
)}

export default Header;