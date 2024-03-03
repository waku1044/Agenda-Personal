import { useState } from "react";



const Buscador = () => {

    const [search, setSearch] = useState("");
    return (
        <>
        
        <input
            type="search"
            placeholder="Buscar contacto"
            className="p-2 ps-4 rounded-full w-40 md:w-80 border-2 border-green-500"value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                console.log(e.target.value);
              }}}
        />
    
        </>)

}

export default Buscador;