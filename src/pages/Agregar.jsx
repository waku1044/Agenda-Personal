import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const Agregar = ()=>{
    return (
      <div className='bg-slate-700 w-screen h-screen flex items-center justify-center'>
          <Formik 

            initialValues = {{
              name: "",
              telefono: "",
              email: ""
            }}

            onSubmit = {(values)=>{
              console.log(values)
            }}
            validate={(values) => {
              const error = {};
              if(!values.name){
                error.name = "El nombre es requerido";
              }
              if(!values.telefono){
                error.telefono = "El telefono es requerido";
              }
              if(!(/^\d+$/.test(values.telefono))){
                error.telefono = "El telefono debe ser numerico";
              }
              
              
              return error
            }}

            >
          <Form className='flex flex-col gap-3 items-center justify-center'>
            <h2 className='text-xl font-bold text-green-500'>Agregue un Nuevo Contacto</h2>
            <Field
            name="name"
            placeholder="Nombre"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="name" />

            <Field
            name="telefono"
            placeholder="Telefono"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="telefono" />
            
            <Field
            name="email"
            placeholder="Email"
            className="p-1 ps-3 w-60 rounded-full border-2"
            />
            <ErrorMessage name="email" />

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
    );
}

export default Agregar;