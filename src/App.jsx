import React from 'react';
import {Route, Routes,BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<h1>Registro</h1>}/>
          <Route path='/contactos' element={<h1>Lista de Contacto</h1>}/>
          <Route path='/contactEdit:id' element={<h1>Editar Contacto</h1>}/>
          <Route path='/contacto:id' element={<h1>Ver Contacto</h1>}/>
        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
