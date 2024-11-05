import React from 'react';
import {Route, Routes,BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Reservas from './pages/Reservas';
// import Perfil from './pages/Perfil';
import Agregar from './pages/AgregarReserva';
// import  Cliente from './pages/Cliente';
import  Clientes from './pages/Clientes';
import Editar from './pages/EditContacto';
import Avisar from './pages/AvisarCliente';
import Contacto from './pages/Cliente';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          

          {/* Rutas de usuario solo editar / perfil */}
          
          {/* Rutas del crud de contactos */}

          
          <Route path='/reservas' element={<Reservas/>}/>
          <Route path='/editarcontacto/:id' element={<Editar/>}/>
          <Route path='/clientes' element={<Clientes/>}/>
          <Route path='/cliente/:id' element={<Contacto/>}/>
          <Route path='/avisarcliente' element={<Avisar/>}/>
          {/* <Route path='/cliente/:id' element={<Cliente/>}/> */}

          <Route path='/agregarreserva' element={<Agregar/>}/>
          {/* <Route path='/perfil/:id' element={<Perfil/>}/> */}

        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
