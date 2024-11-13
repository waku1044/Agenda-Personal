import { useState, useEffect } from "react";

const Buscador = ({ onSearch }) => {
  const [buscador, setBuscador] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(buscador); // Pasa el valor de búsqueda al componente que lo maneja
    }
  };

  useEffect(() => {
    onSearch(buscador); // Pasa el valor de búsqueda al componente que lo maneja
  }, [buscador]);

  return (
    <input
      type="text"
      placeholder="Buscar Cliente"
      className="p-2 ps-4 rounded-full w-40 md:w-80 border-2 border-green-500"
      value={buscador}
      onKeyDown={handleSearch} // Ejecuta la búsqueda al presionar Enter
      onChange={(e) => setBuscador(e.target.value)} // Actualiza el valor de búsqueda
    />
  );
};

export default Buscador;
