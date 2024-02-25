import React from 'react';
import {Route, Routes,BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contactos from './pages/Contactos';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/registro' element={<Register/>}/>

          {/* Rutas de usuario solo editar / perfil */}
          
          {/* Rutas del crud de contactos */}

          
          <Route path='/contactos' element={<Contactos/>}/>
          <Route path='/editarcontacto:id' element={<h1>Editar Contacto</h1>}/>
          <Route path='/contacto:id' element={<h1>Ver Contacto</h1>}/>

        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
