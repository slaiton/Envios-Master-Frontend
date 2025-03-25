import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { authenticateUser } from "../../../application/usecases/authUseCase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  // const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage("");

    try {
      data.id_rol = 2;
      data.id_client = 1;  // Para una segunda fase el cliente podra regisrar mas personalizadamente
      const result = await authenticateUser(data, isLogin);
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("client", result.user.id_client);
      localStorage.setItem("profile", result.user.id_rol);
      window.location.href = "/";
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-screen flex flex-wrap items-center justify-center bg-gray-900">
    {/* Sección Izquierda - Imagen */}
    <div
      className="w-full md:w-1/2 h-64 md:h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/envios.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-black bg-opacity-50 p-6 md:p-8 rounded-lg text-white text-center max-w-sm md:max-w-md"
      >
        <h1 className="text-2xl md:text-4xl font-bold">¡Bienvenido!</h1>
        <p className="mt-2 text-base md:text-lg">
          Gestiona tus envíos de manera rápida y segura.
        </p>
      </motion.div>
    </div>

    {/* Sección Derecha - Formulario */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 md:p-8 space-y-6 bg-gray-800 shadow-lg rounded-xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {errorMessage && <p className="text-red-400 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-white">Nombre</label>
              <input
                type="text"
                {...register("name", { required: !isLogin })}
                className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-400">El nombre es obligatorio</p>}
            </div>
          )}

          <div>
            <label className="text-white">Correo Electrónico</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-400">El correo es obligatorio</p>}
          </div>

          <div>
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 4 })}
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-400">Mínimo 4 caracteres</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-3 font-bold text-black bg-blue-500 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-400">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-blue-400 hover:underline"
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </motion.div>
    </div>
  </div>
  );
};

export default Auth;