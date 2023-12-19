/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import http from "./../../api/axios";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/authContext";
import Box from "../../components/Box";
import CustomInput from "../../components/CustomInput";
import FormError from "../../components/FormError";
import InlineDots from "../../components/loadings/Inlinedots";
import { validateForm } from "../../helpers/form";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { signIn, message } = useContext(AuthContext);
  const { values, handleInputChange, reset } = useForm({
    email: "",
    password: "",
  });


  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, ok } = validateForm({ ...values })
    setErrors(error)
    if (!ok) return false
    setLoading(true);
    try {
      const r = await http.get(`/users?email=${values.email}&password=${values.password}`);
      if (r.data[0]) {
        signIn({
          user: r.data[0]
        })
        reset();
        setLoading(false);
      } else {
        setLoginError(r.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        setLoginError(error.response.data.message);
        setTimeout(() => {
          setLoginError(null);
        }, 8000);
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex h-screen w-screen bg-[#492d49] items-center justify-center">
      <Box className=" w-full max-w-[420px] mx-3 sm:mx-0 sm:w-96 font-sans">
        <form
          onSubmit={handleSubmitLogin}
          className="flex items-center justify-between flex-col "
        >

          <h3 className="title-form self-start mb-4 !text-xl sm:!text-3xl">Inicia Sesión</h3>
          {
            message && (
              <div className="bg-red-100 border my-2 border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{message}</strong>
              </div>
            )
          }
          {loginError && <FormError text={loginError} />}
          <CustomInput
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={(val) => handleInputChange(val, "email")}
            hasError={errors?.email}
            className="test-email font-sans"
            required
            label="EMAIL"
            errorText="Email obligatorio y válido."
          />

          <CustomInput
            type="password"
            name="password"
            placeholder=".lk8Tx9W/"
            onChange={(val) => handleInputChange(val, "password")}
            required
            label="CONTRASEÑA"
            className="test-password"
            hasError={errors?.password}
            errorText="Contraseña obligatoria."
          />

          <fieldset>
            <button
              id="sign-in"
              disabled={loading}
              className="btn gradient" type="submit"
              //! onClick={() => navigate('/')}
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <span>Espere</span>
                  <InlineDots />
                </div>
              ) : (
                  <span>Inicia Sesión</span>
                )}
            </button>
          </fieldset>

          <div className="register-section text-sx my-2">
            <span className="text-sm">
              <Link
                to="/forget-password"
                className="text-[#d1b68d] ml-1 hover:underline font-bold p-1"
              >
                ¿Olvidaste tu contraseña ?
              </Link>
            </span>
          </div>
          <div className="register-section text-sx my-2">
            <span> ¿Soy nuevo? </span>
            <span className="text-sm">
              <Link
                to="/sign-up"
                className="text-white font-bold bg-[#ffb13d] rounded-md ml-1 p-1 estiloAnimado"
              >
                CREAR CUENTA
              </Link>
            </span>
          </div>
          <Link to='/' className='mt-2 border border-gray-600 w-full text-center px-2 py-1 border-dashed text-[#ffb13d] shadow-2xl transition-all duration-300  hover:bg-[#ffb13d] hover:text-white hover:shadow-[#51445f]'>&#8592; Volver al inicio</Link>

        </form>
      </Box>
    </div>
  );
};

export default SignIn;
