import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navegador from '../components/Navegador';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const Agregar = ()=>{

  const navegate = useNavigate();
    return (
      <>
      <div className='bg-slate-700 flex items-center justify-center'>
          <Formik 

            initialValues = {{
              nombre: "",
              telefono: "",
              correo: "",
              descripcion: ""
            }}

            onSubmit = {async (values)=>{
              console.log(values.nombre, values.telefono, values.correo, values.descripcion)
              const {nombre, telefono, correo, descripcion} = values;
              const data = JSON.parse(localStorage.getItem('data'));
              console.log(data.username)
              const res = await axios.post('http://localhost:3900/api/agregar', {
                nombre,
                telefono,
                correo,
                descripcion
                
              }, {
                headers: {
                  'Authorization': 'Bearer ' + data.token
  
                }
              })
              .then((res)=>{
                console.log(res)
                Notify.success(res.data.messenger);
                setTimeout(()=>{
                  navegate('/contactos')
                }, 2000)
                

              })
              .catch((err)=>{
                console.log(err)
                Notify.failure(err.response.data.messenger)
              })
            }}
            validate={(values) => {
              const error = {};

              if(!values.nombre){
                error.nombre = "El nombre es requerido";
              }
              if(!values.telefono){
                error.telefono = "El telefono es requerido";
              }
              if(!(/^\d+$/.test(values.telefono))){
                error.telefono = "El telefono debe ser numerico";
              }
              if(!values.correo){
                error.correo = "El correo es requerido";
              }
              if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.correo))){
                error.correo = "El correo no es valido";
              }
              
              
              return error
            }}

            >
          <Form className='flex flex-col gap-3 items-center justify-center p-10 h-[calc(100vh-3rem)]'>
            <h2 className='text-xl font-bold text-green-500'>Agregue un Nuevo Contacto</h2>
            <Field
            name="nombre"
            placeholder="Nombre"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="nombre" />

            <Field
            name="telefono"
            placeholder="Telefono"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="telefono" />
            
            <Field
            name="correo"
            placeholder="Email"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="correo" />

            <Field 
              type='textarea'
              name="descripcion"
              placeholder="Descripcion"
              className="p-1 ps-3 w-60 rounded-full border-2"
            />

            <button type="submit" className='bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md'>Agregar</button>
          </Form>

          </Formik>
      </div>  
          <Navegador/>
      </>
    );
}

export default Agregar;