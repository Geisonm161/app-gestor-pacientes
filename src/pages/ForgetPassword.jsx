import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/forget-password",
        { email }
      );
      setAlerta({msg:data.msg, error:false})
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas
          <span className="text-black"> tus Pacientes</span>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
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
            to="/register"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
}

export default ForgetPassword;
