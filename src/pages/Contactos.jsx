import Logo from "/284301.png";
import { useState, useEffect } from "react";
import CardContactos from "../components/CardContactos";
import axios from "axios";
import Buscador from "../components/Buscador";
import Navegador from "../components/Navegador";

const Contactos = () => {

const [contactos, setContactos] = useState([]);


useEffect(() => {
    axios.get("http://localhost:3900/api/contactos",{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((res) => {
        setContactos(res.data.data);
        console.log(contactos.length)
        
       })
    .catch((err) => {
        console.log('Este es el error de la peticion',err)
    })
},[])

  return (
    <div className="container-full h-full">
      <header className="flex justify-center sm:justify-around gap-14 items-center p-4 bg-slate-600">
        <img src={Logo} alt="Logo" className="w-10 md:w-14" />
        
        <Buscador/>
        <h1 className="text-3xl text-green-500 font-bold hidden md:inline-block">MyAgend</h1>
      </header>
      <section className="flex flex-col sm:justify-around sm:items-start sm:flex-row gap-1 h-[calc(100vh-7rem)] " style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
          
         
         {contactos.length  > 0 ? contactos.map((contacto)=> <CardContactos key={contacto._id} props={contacto}/>) : <h1>No hay contactos</h1>}
          
      
      </section>
      <Navegador/>
    </div>
  );
};

export default Contactos;
