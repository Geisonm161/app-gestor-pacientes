import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  

  const { setAuth, setCargando } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg rounded-xl bg-white px-5 py-10">
        {alerta.msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600  font-bold block">
              Email
            </label>
            <input
              type="email"
              placeholder=" Email registro"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
          </div>
          <div className="my-3">
            <label className="uppercase text-gray-600  font-bold block">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase mt-5 hover:cursor-pointer font-bold hover:bg-indigo-800 md:w-auto md:px-10"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500 hover:text-indigo-800 "
            to="/register"
          >
            ¿No tienes una cuenta? Registrate
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
}

export default Login;
