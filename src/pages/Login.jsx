import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import  eyeOpen  from "/eyeOpen.svg";
import eyeClose  from "/eyeClose.svg";
import logo from "/284301.png";
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import "../css/login.css";

const Login = () => {

const [showPassword, setShowPassword] = useState(false);
const [type, setType] = useState(false);

const navegate = useNavigate();
  return (
    <>
      <div
        className="container-fluid pt-5"
        
      >
        <div className="flex mx-auto justify-between items-center mt-20 mb-5 w-60">
          <picture className="logo">
            <img src={logo} alt="imagen" className="w-20" />
          </picture>
          <h1 className="text-3xl text-green-500 font-bold ms-3">PersonAgend</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={ (values) => 
            {
           
            Loading.dots('Cargando...');
            setTimeout(async () => {
              
              let {username, password} = values;
              
              const res = await axios.post('http://localhost:3900/api/login', {
                username,
                password
              }
              )
              .then((res) => {
                let dataUser = res.data;
                localStorage.setItem('data', JSON.stringify(dataUser));
                
                Loading.remove();
                Notify.success(`Bienvenid@ ${dataUser.username}`)
                navegate('/contactos')
              })
              .catch((err) => {
                Loading.remove(); 
                Notify.failure(err.response.data.messenger)
              })
            }, 2000)
          }}
          
          validate={(values) => {
            const error = {};
            if(!values.username){
              error.username = "El usuario es requerido";
            }
            if(!values.password){
              error.password = "La contraseña es requerida";
            }
            return error

          }}
        >
          <Form className=" bg-cyan-500 flex flex-col justify-center items-center py-10 gap-4 w-80 rounded mx-auto ">
            <div className=" input-group">
              <Field
                type="text"
                className="form-control p-1 ps-3 w-60 rounded-full" 
                name="username"
                placeholder="Usuario"
                autoComplete="off"
              />
              <p className="text-red-800"><ErrorMessage name="username" /></p> 
            </div>

            <div className="input-group relative">
              <Field
                type={type ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control p-1 ps-3 w-60 rounded-full  "
                autoComplete="off"
              />
              <img src={showPassword ? eyeOpen : eyeClose} 
              onClick={() => {
                setShowPassword(!showPassword)
                setType(!type)
              }} 
              alt="eye"
              className="absolute top-2 right-2  cursor-pointer"
              />

              <p className="text-red-800"><ErrorMessage name="password" /></p>
            </div>

            <button type="submit" className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md ">
              Entrar
            </button>
            <Link to="/registro" className="text-center bg-gradient-to-tl from-yellow-400 from-10%  to-pink-600 to-90% text-dark font-semibold tracking-wide rounded-md p-1 ps-3 w-60">
              Registrate
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
