import './AddClient.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useClient } from '../../context/ClientContext';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useEffect } from 'react';


function AddClient () {

    const {setValue, register, handleSubmit, formState: {errors}} = useForm();
    const {createClient, getClient, updateClient} = useClient();

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const params = useParams();


    

    useEffect(() => {
        async function loadClient () {
            if (params.id) {
                const client = await getClient(params.id);
                setValue('name', client.name)
                setValue('address', client.address)
                setValue('phone', client.phone)
                setValue('cuit', client.cuit)
                setValue('day', client.day)
                setValue('h320', client.h320)
                setValue('h312', client.h312)
                setValue('lgm', client.lgm)
                setValue('lgbs', client.lgbs)
                setValue('soda', client.soda)
                setValue('fc', client.fc)
           } else {
            clearForm();
           }
        }
        loadClient()
    }, [params.id]);
    


    const onSubmit = handleSubmit (async(data) => {

        const fieldsToCheck = ['h320', 'h312', 'lgm', 'lgbs', 'soda', 'fc', 'cuit'];

        fieldsToCheck.forEach((fieldName) => {
            if (!data[fieldName]) {
            data[fieldName] = 0;
            }
        });
        if (params.id) {
            try {
                updateClient(params.id, data)
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El cliente se actualizó con éxito!',
                        showConfirmButton: false,
                        timer: 1500
                      }) .then(() => {
                        navigate("/listClients");                     
                      })              
                })            
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ha salido mal, intentalo nuevamente.',
                  })
            }
        } else {
            try {
                await createClient(data)
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El cliente se agregó con éxito!',
                        showConfirmButton: false,
                        timer: 1500
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
        }
    })
   
    const clearForm = (e) => {
        if (e) e.preventDefault()
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
            {
                !params.id ? (<h1><u>Agregar Cliente</u></h1>) : (<h1><u>Editar Cliente</u></h1>)
            }
                <AnimatedPages>
                    <form className='addClientForm' onSubmit={onSubmit}>
                        <div>
                                <h2>Datos del Cliente</h2>
                            <div className="campos">
                                <div className='errorDiv'>
                                    { errors.name && (<p className='textError'>El nombre es requerido</p>) }
                                    <input className='campo'type="text" name="name" id="nombre" placeholder="Nombre Completo" {...register('name', {required: true })} />
                                </div>
                                <div>
                                    { errors.address && (<p className='textError'>La dirección es requerida</p>) }
                                    <input className='campo' type="text" name="address" id="direccion" placeholder="Dirección" {...register('address', {required: true })}/>
                                </div>
                                <div>
                                    { errors.phone && (<p className='textError'>El teléfono es requerido</p>) }
                                    <input className='campo num' type="number" name="phone" id="tel" placeholder="Teléfono" {...register('phone', {required: true, valueAsNumber: true })}/>
                                </div>
                                <input className='campo num' type="number" name="cuit" id="cuit" placeholder="CUIT" {...register('cuit',{ valueAsNumber: true })}/>
                                <select className='campo' name='day' {...register('day')}>
                                    <option>Lunes</option>
                                    <option>Martes</option>
                                    <option>Miércoles</option>
                                    <option>Jueves</option>
                                    <option>Viernes</option>
                                    <option>Por Pedido</option>
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
