import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState} from "react";
import "../css/login.css";
import eyeClose from '/eyeClose.svg';
import eyeOpen from '/eyeOpen.svg';
import axios from "axios";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState(false);
  
  
 
  
  const handleShowPassword = ()=> {
    setShowPassword(!showPassword);
    setType(!type);
  }
  
  return (
    <>
      <div
        className="container-fluid pt-2"
        
        >
        <div className="flex mx-auto justify-between items-center mt-24 mb-5 w-60">
          <picture className="logo">
            <img src={logo} alt="imagen" className="imgLogo" />
          </picture>
          <h1 className="text-3xl text-green-500 font-bold">MyAgend</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => 
          {
            let {username, email, password} = values;
            console.log(username, email, password);
           const res = await fetch('http://localhost:3900/api/register', {
              method: 'POST',
              body: JSON.stringify({username, email, password}),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = await res.json();
            console.log(data);
                
                
              }}
              validate = {(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = 'Requerido';
                } else if (values.username.length < 4 || values.username.length > 10) {
                  errors.username = 'Debe tener entre 4 y 10 caracteres';
                }

                if (!(values.password == values.repeatpassword)) {
                  errors.password = 'Las contraseñas no coinciden';
                  
                }
              
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Email invalido';
                }
              
                return errors;
              }}
        >
          <Form className=" bg-cyan-500 flex flex-col justify-center items-center py-5 gap-4 w-80 rounded mx-auto ">
            <div className=" input-group">
              <Field
                type="text"
                className="form-control p-1 ps-3 w-60 rounded-full"
                name="username"
                placeholder="Crea tu usuario"
                autoComplete="off"
                required
              />
              <p className="text-red-800"><ErrorMessage name="username" /></p>
            </div>

            <div className=" input-group">
              <Field
                type="text"
                className="form-control p-1 ps-3 w-60 rounded-full"
                name="email"
                placeholder="Email"
                autoComplete="off"
                required
              />
              <p className="text-red-800"><ErrorMessage name="email"  /></p>
              
            </div>

            <div className="input-group relative">
              <Field
                type={type ? "text" : "password"}
                name="password"
                placeholder="Crea tu contraseña"
                className="form-control p-1 ps-3 w-60 rounded-full "
                autoComplete="off"
                required
                
              />
              
              <img 
              src={showPassword ? eyeOpen : eyeClose} 
              alt="eye" 
              className="absolute top-2 right-2" 
              onClick={handleShowPassword} />

              <p className="text-red-800"><ErrorMessage name="password" className="error"/></p>
            </div>

            <div className="input-group ">
              <Field
                type={type ? "text" : "password"}
                name="repeatpassword"
                placeholder="Repite tu contraseña"
                className="form-control p-1 ps-3 w-60 rounded-full"
                autoComplete="off"
              />
              <p className="text-red-800"><ErrorMessage name="password" /></p>
              
            </div>

            <button type="submit" className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md ">
              Registrarse
            </button>
            <Link to="/" className="text-center text-dark link-underline link-underline-opacity-0  border-0">
              Ya tengo cuenta
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
