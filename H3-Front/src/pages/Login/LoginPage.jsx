import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { MdAlternateEmail, MdKey } from "react-icons/md";
import './login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import AnimatedPages from '../AnimatedPages/AnimatedPages';
import { useNavigate } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'



function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm(); 

    const { login, isAuthenticated, errors: loginErrors} = useAuth();

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);



    const onSubmit = handleSubmit(async (data) => {
        try {
            await login(data)
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo ha salido mal, intentalo nuevamente.',
              })
        }        
    })

    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated]);

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
                    <button type="submit" className="btn btn-login">Ingresar</button>
                </form>
                <div className="register">
                { isAuthenticated && (
                    <Link to="/register" className="toRegister">Crear Usuario</Link>
                ) }
                </div>
            </div>
        </AnimatedPages>
    );
}

export default LoginPage;