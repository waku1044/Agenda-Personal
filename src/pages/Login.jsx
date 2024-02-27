import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";
import  eyeOpen  from "/eyeOpen.svg";
import eyeClose  from "/eyeClose.svg";
import axios from "axios";
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
            <img src={logo} alt="imagen" className="imgLogo" />
          </picture>
          <h1 className="text-3xl text-green-500 font-bold">MyAgend</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={ async (values) => 
          {
            let {username, password} = values;
            const res = await axios.post('http://localhost:3900/api/login', {
              username,
              password
            })
            .then((res) => {
              console.log(res.data)
              localStorage.setItem('token', res.data.token)
              navegate('/contactos')
              alert(res.data.messeger);
            })
            .catch((err) => {
              console.log(err.response.data.messenger)
            })
            
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
