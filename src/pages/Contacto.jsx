import {useState, useEffect } from "react";
import {Link, useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import avatar from "/avatarContact.png";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  Navegador from "../components/Navegador";    


const Contacto  = () => {
    const navegate = useNavigate();
    const id = useParams().id;
    const [contacto, setContacto] = useState({});
        useEffect(() => {
            // console.log(id)
            const data = JSON.parse(localStorage.getItem("data"));
            axios.get("http://localhost:3900/api/contacto/" + id,{
                headers:{
                    Authorization: "Bearer " + data.token,
                }
            })
            .then((res)=>{
                setContacto(res.data.data)
            })
            .catch(err =>{
                Notify.warning(err)
            })
        },[]);

        const eliminarContacto = () =>{
            const data = JSON.parse(localStorage.getItem('data'));
            axios.delete('http://localhost:3900/api/delete/' + id,{
                headers:{
                    Authorization: "Bearer " + data.token,
                }
            })
            .then((res)=>{
                Notify.success('Contacto Eliminado Correctamente');
                setTimeout(()=>{
                    navegate('/contactos')
                },2000)
                
            })
            .catch(err =>{
                Notify.failure(err)
            })
        }
    
    return (
        <>
        
            <div className="container-full h-[calc(100vh-3rem)] flex flex-col gap-6 justify-center items-center bg-violet-500">
                <h1 className="text-3xl font-bold capitalize">{contacto.nombre}</h1>          
                <img src={avatar} alt="avatar" className="w-28" />
                <h3 className="text-3xl font-normal">{contacto.correo}</h3>
                <h4 className="text-3xl font-normal">{contacto.telefono}</h4>
                <h5 className="text-3xl font-normal">{contacto.descripcion}</h5>
                <div className="flex gap-3">
                    <Link to={`/editarcontacto/${contacto._id}`} className="bg-green-500 text-white p-2 rounded-md hover:scale-110">Editar</Link>
                    <button className="bg-red-500 text-white p-2 rounded-md hover:scale-110" onClick={eliminarContacto}>Eliminar</button>
                </div>
            </div>
                <Navegador/>
        </>
    )
}


export default Contacto;