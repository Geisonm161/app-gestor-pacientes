import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({ msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    //Crear el usuario en la api

    try {
      await clienteAxios.post("/veterinarios", { name, email, password });
      setAlerta({ msg: "Creado Correctamente", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg rounded-xl bg-white px-5 py-10">
        {alerta.msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600  font-bold block">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600  font-bold block">
              Email
            </label>
            <input
              type="email"
              placeholder=" Email registro"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600  font-bold block">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600  font-bold block">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder=" Repite tu Password"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange={(e) => {
                setRepetirPassword(e.target.value);
              }}
            ></input>
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase mt-5 hover:cursor-pointer font-bold hover:bg-indigo-800 md:w-auto md:px-10"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500 hover:text-indigo-800 "
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500 hover:text-indigo-800 "
            to="/forget-password"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
