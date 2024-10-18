import avatar from "../assets/img/avatarContact.png";
import { useNavigate } from "react-router-dom";
const CardContactos = (cliente) => {
    const {nombre} = cliente.cliente;
    const navegator = useNavigate();
   //  console.log(props)
   function enviando(){
      
      navegator(`/clientes`)
   }
   return (
      <div className="flex justify-around items-center px-3 py-1 w-56 mt-2  bg-slate-400 hover:bg-amber-300 hover:text-purple-500 cursor-pointer rounded-full " onClick={enviando}>
        <img src={avatar} alt="" className="w-10 me-5" />

        <h1 className="text-xl font-semibold capitalize">{nombre}</h1>
        
      </div>
   )
}

export default CardContactos;