import './ListClients.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import { useClient } from '../../context/ClientContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEditSquare, MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';




function ListClients () {

    const MySwal = withReactContent(Swal);

    const { getClients, clients, deleteClient } = useClient();



    useEffect(() => {
        getClients()
    }, []);

    const eliminarClient = (id) => {
        MySwal.fire({
            title: 'Seguro quieres eliminar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteClient(id)
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cliente eliminado con éxito!',
                        showConfirmButton: false,
                        timer: 1500
                      })           
                })                   
            }
          })
    }


    return (
        <div className='listClients'>
            <Navbar />
                <h1><u>Consultar Clientes</u></h1>
                <AnimatedPages>
                    <div className="tableContainer">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>CUIT</th>
                            <th>Día</th>
                            <th>H3x20</th>
                            <th>H3x12</th>
                            <th>LGM</th>
                            <th>LGBS</th>
                            <th>Soda</th>
                            <th>F/C</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { clients.map( item => {
                            const client = item.client;
                            return (
                                <tr key={client._id}>
                                    <td><Link to={`/clients/${client._id}`} className='editClient'><MdEditSquare /></Link></td>
                                    <td>{client.name}</td>
                                    <td>{client.address}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.cuit === 0 ? '': client.cuit}</td>
                                    <td>{client.day}</td>
                                    <td>{item.h320 === 0 ? '': item.h320}</td>                                    
                                    <td>{item.h312 === 0 ? '': item.h312}</td>                                    
                                    <td>{item.lgm === 0 ? '': item.lgm}</td>                                    
                                    <td>{item.lgbs === 0 ? '': item.lgbs}</td>                                    
                                    <td>{item.soda === 0 ? '': item.soda}</td>                                    
                                    <td>{item.fc === 0 ? '': item.fc}</td>  
                                    <td>
                                        <button className='deleteClient' onClick={() => eliminarClient(client._id)}><MdDelete /></button></td>
                                </tr>
                            )
                        })                        
                        }                        
                        </tbody>
                    </table>
                    </div>
                    <div className="actionButtonsListClients">
                        <Link to='/home'><button className='cancelConsultClients'>Cancelar</button></Link>
                        <Link to='/clients'><button className='addConsultClients'>Agregar</button></Link>
                    </div>
                </AnimatedPages>
            <Footer />
        </div>
    );
}

export default ListClients;