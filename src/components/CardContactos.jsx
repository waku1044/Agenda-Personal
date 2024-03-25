import avatar from "/avatarContact.png";
import { useNavigate } from "react-router-dom";
const CardContactos = (props) => {
    const {nombre} = props.props;
    const {_id} = props.props;
    const navegator = useNavigate();
   //  console.log(nombre)
   function enviando(){
      
      navegator(`/contacto/${_id}`)
   }
   return (
      <div className="flex justify-around items-center px-3 py-1 w-40 mt-2  bg-slate-400 hover:bg-amber-300 hover:text-purple-500 cursor-pointer rounded-full " onClick={enviando}>
        <img src={avatar} alt="" className="w-10 me-5" />

        <h1 className="text-xl font-semibold capitalize">{nombre}</h1>
        
      </div>
   )
}

export default CardContactos;