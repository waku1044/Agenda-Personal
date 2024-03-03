import avatar from "/avatarContact.png";

const CardContactos = (props) => {
    const {nombre} = props;
    
   return (
      <div className="flex items-center justify-center gap-5 bg-slate-400 w-full md:w-1/2 p-3 mb-1 mt-1 cursor-pointer ">
        <img src={avatar} alt="" className="w-10" />

        <h1 className="text-xl font-semibold capitalize">{nombre}</h1>
        
      </div>
   )
}

export default CardContactos;