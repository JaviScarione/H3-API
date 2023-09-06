import { useForm } from 'react-hook-form';

import { MdAlternateEmail, MdKey } from "react-icons/md";
import './login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import AnimatedPages from '../AnimatedPages/AnimatedPages';

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm(); 

    const {login, errors: loginErrors} = useAuth();

    const onSubmit = handleSubmit(data => {
        login(data)
    })

    return (
        <AnimatedPages>
            <div className="loginContainer">
                <div className="text-center title">
                    Bienvenido!
                </div>
                <div className="text-center credentials">
                    Ingresa tus credenciales
                </div>

                {loginErrors.length > 0 && (
                    <div className='loginError'>
                        {loginErrors[0]}
                    </div>
                )}
                <form className="loginForm" onSubmit={onSubmit} >
                        { errors.email && (<p className='textError'>El email es requerido</p>) }
                    <div className="form-field">
                        <MdAlternateEmail />
                        <input type="email" placeholder="Email" {...register("email", {required: true })} />
                    </div>
                        { errors.password && (<p className='textError'>La contraseña es requerida</p>) }
                    <div className="form-field">
                        <MdKey />
                        <input type="password" placeholder="Contraseña" {...register("password", {required: true })} />
                    </div>
                    <button type="submit" className="btn btn-login bg-[#0077aa]">Ingresar</button>
                </form>
                <div className="register">
                    <Link to="/register" className="toRegister">Crear Usuario</Link>
                </div>
            </div>
        </AnimatedPages>
    );
}

export default LoginPage;