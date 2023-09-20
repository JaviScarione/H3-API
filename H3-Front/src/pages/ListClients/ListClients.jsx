import './ListClients.css';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import { useClient } from '../../context/ClientContext';
import { useEffect } from 'react';



function ListClients () {

    const { getClients } = useClient();

    useEffect(() => {
        getClients()
    }, []);

    

    return (
        <div className='listClients'>
            <Navbar />
                <AnimatedPages>
                    <h1><u>Consultar Clientes</u></h1>
                    <table>
                        <thead>
                        <tr>
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
                        <tr>
                            <td>Dato 1</td>
                            <td>Dato 2</td>
                            <td>Dato 3</td>
                        </tr>
                        <tr>
                            <td>Dato 4</td>
                            <td>Dato 5</td>
                            <td>Dato 6</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </AnimatedPages>
            <Footer />
        </div>
    );
}

export default ListClients;