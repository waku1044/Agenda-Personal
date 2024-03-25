import {useState, useEffect} from "react";
import {Link, useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import Navegador from "../components/Navegador";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Formik, Form, Field, ErrorMessage } from 'formik';



const Contacto  = () => {
  const [contacto, setContacto] = useState({});
  const navegate = useNavigate();
    const id = useParams().id;
    useEffect( () => {
        // console.log(id)
        const data = JSON.parse(localStorage.getItem("data"));
        axios.get("http://localhost:3900/api/contacto/" + id,{
            headers:{
                Authorization: "Bearer " + data.token,
            }
        })
        .then(async (res)=>{
          let data = await res.data.data;
            setContacto(data)
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

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

            onSubmit = { async (values)=>{
              
                const {nombre, telefono, correo, descripcion} = contacto;
                const data = JSON.parse(localStorage.getItem('data'));
                const res = await axios.put(`http://localhost:3900/api/contactEdit/${id}`, {  
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
                  Notify.success(res.data.messenger)
                  navegate('/contactos')

                })
                .catch((err)=>{
                  console.log(err)
                  Notify.failure(err.response.data.messenger)
                })
            }}
            validate={(values) => {
              const error = {};
              
              if(contacto.telefono){
                  if(!(/^\d+$/.test(contacto.telefono))){
                    error.telefono = "El telefono debe ser numerico";
                  }
                  
              }
              if(contacto.correo){
                  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contacto.correo))){
                    error.correo = "El correo no es valido";
                  }
                  
              }
              
              
              return error
            }}

            >
          <Form className='flex flex-col gap-3 items-center justify-center p-10 h-[calc(100vh-3rem)]'>
            <h2 className='text-xl font-bold text-green-500'>Editar Contacto</h2>
            <Field
            name="nombre"
            placeholder="Nombre"
            className="p-1 ps-3 w-60 rounded-full border-2"
            value={contacto.nombre}
            onChange={(e) => setContacto({...contacto, nombre: e.target.value})} 
            
            
            />
            <ErrorMessage name="nombre" />

            <Field
            name="telefono"
            placeholder="Telefono"
            className="p-1 ps-3 w-60 rounded-full border-2"
            value={contacto.telefono}
            onChange={(e) => setContacto({...contacto, telefono: e.target.value})}
            />
            <ErrorMessage name="telefono" />
            
            <Field
            name="correo"
            placeholder="Email"
            className="p-1 ps-3 w-60 rounded-full border-2"
            value={contacto.correo}
            onChange={(e) => setContacto({...contacto, correo: e.target.value})}
            />
            <ErrorMessage name="correo" />

            <Field 
              type='textarea'
              name="descripcion"
              placeholder="Descripcion"
              className="p-1 ps-3 w-60 rounded-full border-2"
              value={contacto.descripcion}
              onChange={(e) => setContacto({...contacto, descripcion: e.target.value})}
            />

            <button type="submit" className='bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md'>Guardar</button>
          </Form>

          </Formik>
      </div>  
          <Navegador/>
      </>
    );


}


export default Contacto;