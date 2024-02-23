import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  return (
    <>
      <div
        className="container-fluid pt-5"
        
      >
        <div className="d-flex justify-content-between align-items-center mx-auto mt-5 px-3 marca">
          <picture className="logo">
            <img src="/src/assets/logo.svg" alt="imagen" className="imgLogo" />
          </picture>
          <h1 className="text-center py-5 text-white agency">MyAgend</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="form">
            <div className=" input-group">
              <Field
                type="text"
                className="form-control  border-2"
                name="username"
                placeholder="Username"
                autoComplete="off"
              />
              <ErrorMessage name="username" />
            </div>

            <div className="input-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-control border-2"
                autoComplete="off"
              />
              <ErrorMessage name="password" />
            </div>

            <button type="submit" className="btn btn-login border-0 ">
              Entrar
            </button>
            <Link to="/register" className="text-center btn btn-registro border-0">
              Registrate
            </Link>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
