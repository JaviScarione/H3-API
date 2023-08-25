import { useForm } from 'react-hook-form';
import { MdAlternateEmail, MdKey } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './register.css';

import { registerRequest } from '../../api/auth';


function RegisterPage() {

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit(async (values) => {
        const res = await registerRequest(values);        
        console.log(res);
    });

    return (
        <div className="registerContainer">
            <h2 className="title">
                Registro
            </h2>
            <h4 className="credentials">
                Ingresa tus datos
            </h4>
            <form className="registerForm" onSubmit={onSubmit} >
                <div className="form-field">
                    <BsPersonVcard />
                    <input type="text" placeholder="Nombre" {...register("name", {required: true })} required/>
                </div>
                <div className="form-field">
                    <BsPersonVcard />
                    <input type="text" placeholder="Apellido" {...register("lastname", {required: true })} required />
                </div>
                <div className="form-field">
                    <MdAlternateEmail />
                    <input type="email" placeholder="Email" {...register("email", {required: true })} required />
                </div>
                <div className="form-field">
                    <MdKey />
                    <input type="password" placeholder="Contraseña" {...register("password", {required: true })} required />
                </div>
                <button type="submit" className="btn btn-register bg-[#0077aa]">Registrar</button>
            </form>
            <div className="logIn">
                <Link to="/login" className="toLogin">Iniciar Sesión</Link>
            </div>
        </div>
    );
}

export default RegisterPage;