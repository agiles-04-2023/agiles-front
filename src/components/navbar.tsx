import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import DefaultAvatar from "./DefaultAvatar";

const Navbar = () => {
    const { authState, signOut, } = useContext(AuthContext);
    return (
        <header className='bg-[#5a5c75] px-2 text-center text-[#d1b68d] gap-4 flex items-center justify-between flex-wrap'>
            <Link to='/' className='text-2xl px-10 font-bold font-sans title-form'>AHORCADO</Link>
            <nav className="left-Navbar flex items-center justify-center gap-4">
                <Link to="/game" className="title-form hover:text-[#d1b68d] duration-300 text-xl">JUGAR</Link>
                {authState.token ? (
                    <div className="flex flex-wrap items-center gap-4">
                        <Link to="/dashboard" className="text-[#d1b68d] hover:text-[#d1b68d] duration-300">Dashboard</Link>
                        <span className="text-[#d1b68d] flex items-center group relative bg-blue-400s py-4 px-4">
                            {authState.user?.photo ? (<img className="w-8 h-8 rounded-full shadow border border-slate-700 object-cover" src={authState.user?.photo} alt="" />) : (<DefaultAvatar />)}
                            <span className="ml-2 font-medium">{authState.user?.fullName}</span>
                            <div className="absolute top-[60px] w-[200px]  flex-col justify-start shadow-md   bg-slate-800 right-0 w-full group-hover:flex hidden">
                                <button className=" text-left  text-red-400 p-2 hover:text-white hover:bg-red-400 duration-400" onClick={() => signOut()}>Cerrar sesión</button>
                            </div>
                        </span>
                    </div>
                ) : (
                    <div className="p-4">
                        <Link to="/sign-in" className="btn btn-primary gradient !rounded-full">Inicia Sesión</Link>
                        <Link to="/sign-up" className="btn !bg-transparent !text-[#d1b68d]">Crear Cuenta</Link>
                    </div>
                )
                }
            </nav>
        </header>

    )
}

export default Navbar