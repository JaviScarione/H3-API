import './AddClient.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useClient } from '../../context/ClientContext';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'


function AddClient () {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createClient} = useClient();

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();


    const onSubmit = handleSubmit (async(data) => {

        const fieldsToCheck = ['h320', 'h312', 'lgm', 'lgbs', 'soda', 'fc', 'cuit'];

        fieldsToCheck.forEach((fieldName) => {
            if (!data[fieldName]) {
            data[fieldName] = 0;
            }
        });
        try {
            await createClient(data)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El cliente se agregó con éxito!',
                    showConfirmButton: false,
                    timer: 2000
                  }) .then(() => {
                    navigate("/home");                     
                  })              
            })            
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo ha salido mal, intentalo nuevamente.',
              })
        }
    })
    const clearForm = (e) => {
        e.preventDefault()
        const form = document.querySelector('.addClientForm');
        const inputFields = form.querySelectorAll('input[type="text"], input[type="number"], select');
    
        inputFields.forEach((input) => {
          input.value = '';
          if (input.tagName === 'SELECT') {
            input.value = input.options[0].value;
          }
        });
      };
    return (
        <div className='addClient'>
            <Navbar />
                <AnimatedPages>
                    <h1><u>Agregar Cliente</u></h1>
                    <form className='addClientForm' onSubmit={onSubmit}>
                        <div>
                                <h2>Datos del Cliente</h2>
                            <div className="campos">
                                <div className='errorDiv'>
                                    { errors.name && (<p className='textError'>El nombre es requerido</p>) }
                                    <input className='campo'type="text" name="name" id="nombre" placeholder="Nombre Completo" autoFocus {...register('name', {required: true })} />
                                </div>
                                <div>
                                    { errors.address && (<p className='textError'>La dirección es requerida</p>) }
                                    <input className='campo' type="text" name="address" id="direccion" placeholder="Dirección" {...register('address', {required: true })}/>
                                </div>
                                <div>
                                    { errors.phone && (<p className='textError'>El teléfono es requerido</p>) }
                                    <input className='campo' type="number" name="phone" id="tel" placeholder="Teléfono" {...register('phone', {required: true, valueAsNumber: true })}/>
                                </div>
                                <input className='campo' type="number" name="cuit" id="cuit" placeholder="CUIT" {...register('cuit',{ valueAsNumber: true })}/>
                                <select className='campo' name='day' {...register('day')}>
                                    <option>Lunes</option>
                                    <option>Martes</option>
                                    <option>Miércoles</option>
                                    <option>Jueves</option>
                                    <option>Viernes</option>
                                </select>
                            </div>
                        </div>
                        <div className='envases'>
                                <h2>Envases</h2>
                            <div className="campos">
                                <input className='campo num' type="number" name="h320" id="h320" placeholder="H3 x 20" {...register('h320',{ valueAsNumber: true })}/>
                                <input className='campo num' type="number" name="h312" id="h312" placeholder="H3 x 12" {...register('h312',{ valueAsNumber: true })}/>
                                <input className='campo num' type="number" name="lgm" id="lgm" placeholder="La Gota Mineral" {...register('lgm',{ valueAsNumber: true })}/>
                                <input className='campo num' type="number" name="lgbs" id="lgbs" placeholder="La Gota Bajo Sodio" {...register('lgbs',{ valueAsNumber: true })}/>
                                <input className='campo num' type="number" name="soda" id="soda" placeholder="Soda" {...register('soda',{ valueAsNumber: true })}/>
                                <input className='campo num' type="number" name="fc" id="fc" placeholder="Frío / Calor" {...register('fc',{ valueAsNumber: true })}/>
                            </div>
                        </div> 
                        <button className='clearAddClientForm' onClick={clearForm}>Borrar Datos</button>         
                        <div className="actionButtonsAddClient">
                            <Link to='/home'><button className='cancelAddClient'>Cancelar</button></Link>
                            <button type='submit' className='aceptAddClient'>Aceptar</button>
                        </div>
                    </form>
                </AnimatedPages>
                <Footer />
        </div>
    );
}

export default AddClient;
