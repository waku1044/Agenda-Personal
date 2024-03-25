import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import avatar from "/avatarContact.png";
import Navegador from "../components/Navegador";



const Perfil  = () => {
    const id = useParams().id;
    const [perfil, setPerfil] = useState({});
    const [fecha, setFecha] = useState();
        useEffect(() => {
            // console.log(id)
            const data = JSON.parse(localStorage.getItem("data"));
            
            axios.get("http://localhost:3900/api/perfil/" + id,{
                headers:{
                    Authorization: "Bearer " + data.token,
                }
            })
            .then((res)=>{
                setPerfil(res.data.data)
                setFecha(res.data.data.date.slice(0,10))  
                
            })
            .catch(err =>{
                console.log(err)
            })
        },[]);

    return (
        <>
        <div className="container-full h-[calc(100vh-3rem)] flex flex-col gap-6 justify-center items-center bg-violet-500">
            <h1 className="text-3xl font-bold capitalize">{perfil.username}</h1>          
            <img src={avatar} alt="avatar" className="w-28" />
            <h3 className="text-3xl font-normal">{perfil.email}</h3>
            <h4 className="text-2xl font-normal text-center">Usuario desde <br></br>{fecha}</h4>
            
            <div className="flex gap-3">
                <Link to='/' className="bg-green-500 text-white p-2 rounded-md hover:scale-110">Cerrar Sesion</Link>   
            </div>
        </div>
            <Navegador/>
        
        </>
    )
}


export default Perfil;