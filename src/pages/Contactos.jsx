import Logo from "/284301.png";
import { useState, useEffect } from "react";
import CardContactos from "../components/CardContactos";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';  

import Navegador from "../components/Navegador";

const Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState('');

 
  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    axios
      .get("http://localhost:3900/api/contactos", {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        setUser(data.username);
        setContactos(res.data.data);
      })
      .catch((err) => {
        console.log("Este es el error de la peticion", err);
      });
  }, []);

  return (
    <div className="h-[calc(100vh-3rem)]">
      <header className="flex justify-center sm:justify-around gap-14 items-center p-4 bg-slate-600">
        <img src={Logo} alt="Logo" className="w-10 md:w-14" />

        <input
            type="search"
            placeholder="Buscar contacto"
            className="p-2 ps-4 rounded-full w-40 md:w-80 border-2 border-green-500" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                let data = JSON.parse(localStorage.getItem("data"));
                if(search == ""){
                  axios
                    .get("http://localhost:3900/api/contactos", {
                      headers: {
                        Authorization: "Bearer " + data.token,
                      },
                    })
                    .then((res) => {
                      // console.log(contactos)
                      setContactos(res.data.data);
                    })
                    .catch((err) => {
                      console.log("Este es el error de la peticion", err);
                    });
                }if( search != ""){
                  
                  axios.get(`http://localhost:3900/api/search/${search}`,{
                    headers:{
                      Authorization: "Bearer " + data.token,
                    }
                  })
                  .then( async (res)=>{
                    let user = JSON.parse(localStorage.getItem("data"));
                    let contacto = await res.data.response.filter(contacto => contacto.iduser == user.id)
                    setContactos(contacto)
                    
                  })
                  .catch((err)=>{
                    Notify.failure("No se encontro el usuario");
                  })
                }
              }
              }}
               />

        <h1 className="text-3xl text-green-500 font-bold hidden md:inline-block capitalize">
          {user}
        </h1>
      </header>
      <section
        className="flex gap-1 h-[calc(100vh-9rem)] flex-wrap justify-around items-center content-start overflow-auto sm:justify-normal sm:content-none bg-slate-600"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
                {contactos.length == 0 ? <h1 className="text-3xl text-green-500 font-bold mx-auto mt-[40vh]">No hay contactos</h1> : contactos.map((contacto) => (
                  <CardContactos key={contacto._id} props={contacto} />
                ))}
          
          
          
        
      </section>
      <Navegador />
    </div>
  );
};

export default Contactos;
