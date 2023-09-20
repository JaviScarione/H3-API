import './ListClients.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import { useClient } from '../../context/ClientContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEditSquare } from "react-icons/md";




function ListClients () {

    const { getClients, clients } = useClient();

    useEffect(() => {
        getClients()
    }, []);


    return (
        <div className='listClients'>
            <Navbar />
                <AnimatedPages>
                    <h1><u>Consultar Clientes</u></h1>
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
                        </tr>
                        </thead>
                        <tbody>
                        { clients.map( item => {
                            const client = item.client;
                            console.log(item.client);
                            return (
                                <tr key={client._id}>
                                    <td><Link to={`/modifyclient`} className='editClient'><MdEditSquare /></Link></td>
                                    <td>{client.name}</td>
                                    <td>{client.address}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.cuit}</td>
                                    <td>{client.day}</td>
                                    <td>{item.h320}</td>                                    
                                    <td>{item.h312}</td>                                    
                                    <td>{item.lgm}</td>                                    
                                    <td>{item.lgbs}</td>                                    
                                    <td>{item.soda}</td>                                    
                                    <td>{item.fc}</td>                                    
                                </tr>
                            )
                        })                        
                        }                        
                        </tbody>
                    </table>
                    </div>
                    <Link to='/home'><button className='cancelConsultClients'>Volver</button></Link>
                </AnimatedPages>
            <Footer />
        </div>
    );
}

export default ListClients;