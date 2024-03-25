import React from 'react';
import {Route, Routes,BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contactos from './pages/Contactos';
import Perfil from './pages/Perfil';
import Agregar from './pages/Agregar';
import  Contacto from './pages/Contacto';
import Editar from './pages/EditContacto';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/registro' element={<Register/>}/>

          {/* Rutas de usuario solo editar / perfil */}
          
          {/* Rutas del crud de contactos */}

          
          <Route path='/contactos' element={<Contactos/>}/>
          <Route path='/editarcontacto/:id' element={<Editar/>}/>
          <Route path='/contacto/:id' element={<Contacto/>}/>

          <Route path='/agregar' element={<Agregar/>}/>
          <Route path='/perfil/:id' element={<Perfil/>}/>

        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
