import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { MdAlternateEmail, MdKey } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './register.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPages from '../AnimatedPages/AnimatedPages';



function RegisterPage() {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) navigate("/home");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <AnimatedPages>
            <div className="registerContainer">
                <h2 className="title">
                    Registro
                </h2>
                <h4 className="credentials">
                    Ingresa tus datos
                </h4>

                { 
                registerErrors.map((error, i) => (
                    <div className='userExist' key={i}>
                        {error}
                    </div>
                ))
                }

                <form className="registerForm" onSubmit={onSubmit} >
                        { errors.name && (<p className='textError'>El nombre es requerido</p>) }
                    <div className="form-field">
                        <BsPersonVcard />
                        <input type="text" placeholder="Nombre" {...register("name", {required: true })}/>
                    </div>
                        { errors.lastname && (<p className='textError'>El apellido es requerido</p>) }
                    <div className="form-field">
                        <BsPersonVcard />
                        <input type="text" placeholder="Apellido" {...register("lastname", {required: true })} />
                    </div>
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
                    <button type="submit" className="btn btn-register bg-[#0077aa]">Registrar</button>
                </form>
                <div className="logIn">
                    <Link to="/" className="toLogin">Iniciar Sesión</Link>
                </div>
            </div>
        </AnimatedPages>
    );
}

export default RegisterPage;