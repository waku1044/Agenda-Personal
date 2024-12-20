import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


import eyeOpen from "../assets/img/eyeOpen.svg";
import eyeClose from "../assets/img/eyeClose.svg";
import Logo from "../assets/img/logo.png";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import "../css/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState(false);

  const navegate = useNavigate();
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="flex mx-auto justify-between items-center mt-20 mb-5 w-60">
          <picture className="logo mx-auto">
            <img src={Logo} alt="imagen" className="rounded-full w-48 " />
          </picture>
          {/* <h1 className="text-3xl text-green-500 font-bold ms-3">Fedra Lashing</h1> */}
        </div>
        <Formik
          className="mx-auto"
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            let { username, password } = values;
            console.log(username, password);
            // mongodb://127.0.0.1:27017/
            console.log(username, password);
            Loading.dots("Cargando...");
            axios.post("https://back-agenda-fedra.vercel.app/api/login/", {
              username,
              password,
            })
            .then((res) => {
                
                console.log(res);
                setTimeout(() => {
                    Loading.remove();
                    Notify.success(`Bienvenida ${username.toUpperCase()}`);
                    navegate("/reservas");
                }, 3000);

            }).catch((err) => {
              setTimeout(() => {
                Loading.remove();
                Notify.failure('Usuario o contraseña incorrectos');
                
              }, 2000);
                

            })
            // axios.post("http://localhost:5000/api/login", {
            //     username,
            //     password,
            //   })
            //   .then((res) => {
            //     Loading.remove();
            //     console.log(res);

              
            // })
            // .catch((err) => {
            //   Loading.remove();
            //   console.log(username, password);
            //   Notify.failure(err.response.data.error);
              
            // });
            // if (username == "Fedra" && password == "Fedra10") {
            //   setTimeout(() => {
            //     Loading.remove();
            //     Notify.success(`Bienvenida ${username.toUpperCase()}`);
            //     navegate("/reservas");
            //   }, 3000);
            // } else {
            //   setTimeout(() => {
            //   Loading.remove();
            //   Notify.failure("Usuario o contraseña incorrectos");
            // }, 3000);
            // }
          }}
          validate={(values) => {
            const error = {};
            // console.log(values.username);
            if (!values.username) {
              error.username = "El usuario es requerido";
            }
            if (!values.password) {
              error.password = "La contraseña es requerida";
            }
            return error;
          }}
        >
          <Form className=" bg-cyan-500 flex flex-col justify-center items-center py-10 gap-2 w-80 rounded mx-auto px-10 ">
            <div className=" input-group">
              <Field
                type="text"
                className="form-control p-1 ps-3 w-60 rounded-full"
                name="username"
                placeholder="Usuario"
                autoComplete="off"
              />
            </div>
            <p className="text-red-600">
              <ErrorMessage name="username" />
            </p>

            <div className="input-group relative pb-0">
              <Field
                type={type ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control p-1 ps-3 w-60 rounded-full "
                autoComplete="off"
              />
              <img
                src={showPassword ? eyeOpen : eyeClose}
                onClick={() => {
                  setShowPassword(!showPassword);
                  setType(!type);
                }}
                alt="eye"
                className="absolute top-2 right-2  cursor-pointer"
              />
            </div>
            <p className="text-red-600">
              <ErrorMessage name="password" />
            </p>

            <button
              type="submit"
              className="bg-gradient-to-tr from-green-400 from-10% via-green-500 via-30% to-blue-600 to-90%  shadow-inherit	 text-dark font-semibold tracking-wide border-0 p-1 ps-3 w-60 rounded-md "
            >
              Entrar
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
