import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const { token } = useParams();
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "El password debe ser minimo 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `veterinarios/forget-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlert({ msg: data.msg, error: false });
      setPasswordModificado(true);
      console.log(data);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
      console.log(alert);
    }
  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`veterinarios/forget-password/${token}`);
        setAlert({ msg: "Coloca tu nuevo password", error: false });
        setTokenValido(true);
      } catch (error) {
        setAlert({ msg: "Hubo un error con el enlace", error: true });
      }
    };
    ("");
    comprobarToken();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu Password y no Pierdas Acceso a
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg rounded-xl bg-white px-5 py-10">
        {alert.msg && <Alerta alerta={alert} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600  font-bold block">
                New Password
              </label>
              <input
                type="password"
                placeholder="You New Password"
                className="border w-full p-3 mt-3 rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>

            <input
              type="submit"
              value="Save New Password"
              className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase mt-5 hover:cursor-pointer font-bold hover:bg-indigo-800 md:w-auto md:px-10"
            />
          </form>
        )}
        {passwordModificado && (
          <Link
            className="block text-center my-5 text-gray-500 hover:text-indigo-800 "
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
}

export default NewPassword;
