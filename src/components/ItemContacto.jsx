import avatar from "../assets/img/avatarContact.png";
import { useNavigate } from "react-router-dom";
const ItemContacto = (cliente) => {
    const {nombre, _id} = cliente.cliente;
    const navegator = useNavigate();
   //  console.log(props)
   function enviando(){
      
      navegator(`/cliente/${_id}`)
   }
   return (
      <div className="flex justify-around items-center px-3 py-1 mt-2  bg-slate-400 hover:bg-amber-300 hover:text-purple-500 cursor-pointer rounded-full " onClick={enviando} style={{width:'15rem'}}>
        <img src={avatar} alt="" className="w-10 me-3" />

        <h1 className="text-xl font-semibold capitalize">{nombre}</h1>
        
      </div>
   )
}

export default ItemContacto;