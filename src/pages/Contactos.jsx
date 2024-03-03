import Logo from "/284301.png";
import { useState, useEffect } from "react";
import CardContactos from "../components/CardContactos";
import axios from "axios";
import Navegador from "../components/Navegador";

const Contactos = () => {

const [contactos, setContactos] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
    axios.get("http://localhost:3900/api/contactos",{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((res) => {
        setContactos(res.data.data);
        
       })
    .catch((err) => {
        console.log('Este es el error de la peticion',err)
    })
},[])

  return (
    <div className="container-full">
      <header className="flex justify-around gap-14 items-center p-4 bg-slate-600">
        <img src={Logo} alt="Logo" className="w-14" />
        <input
          type="search"
          placeholder="Buscar contacto"
          className="p-2 ps-4 rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              console.log(e.target.value);
            }
          }}
        />
        <h1 className="text-3xl text-green-500 font-bold hidden md:inline-block">MyAgend</h1>
      </header>
      <section className="flex justify-around items-start gap-2 h-[calc(100vh-88px)] " style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
          
         
         {/* {contactos.length  > 0 ? contactos.map((contacto)=> <CardContactos key={contacto._id} props={...contacto}/>) : <h1>No hay contactos</h1>} */}
          
      
      </section>
      <Navegador/>
    </div>
  );
};

export default Contactos;
