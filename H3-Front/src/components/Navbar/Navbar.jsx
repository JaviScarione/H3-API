import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
 
function Navbar () {

    const { isAdmin } = useAuth();

    const [dropdowns, setDropdowns] = useState({
        clientes: false,
        productos: false,
        repartos: false,
        informes: false,
    });

    const abrirCerrarDropdown = (dropdown) => {
        setDropdowns((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };

    const adminMenu = (
        <>
          {isAdmin && (
            <>
                <Link to='/cashclosingsearch' className='link'><DropdownItem className='dropdownItem'>Cierres de Caja</DropdownItem></Link>
                <Link to='/saleslist' className='link'><DropdownItem className='dropdownItem'>Listar Ventas</DropdownItem></Link>
                <Link to='/costs' className='link'><DropdownItem className='dropdownItem'>Gastos</DropdownItem></Link>
                <Link to='/moneyflow' className='link'><DropdownItem className='dropdownItem'>Movimientos</DropdownItem></Link>
            </>
          )}
        </>
      );

    return (
        <header>
            <nav>
                <Dropdown isOpen={dropdowns.clientes} toggle={() => abrirCerrarDropdown('clientes')}>
                    <DropdownToggle className='dropdown'>
                        Clientes
                    </DropdownToggle>

                    <DropdownMenu className='dropdownMenu'>
                        <Link to='/clients' className='link'><DropdownItem className='dropdownItem'>Agregar Cliente</DropdownItem></Link>
                        <Link to='/listclients' className='link'><DropdownItem className='dropdownItem'>Consultar Clientes</DropdownItem></Link>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={dropdowns.productos} toggle={() => abrirCerrarDropdown('productos')}>
                    <DropdownToggle className='dropdown'>
                        Productos
                    </DropdownToggle>

                    <DropdownMenu className='dropdownMenu'>
                    { isAdmin && (
                        <Link to='/addproduct' className='link'><DropdownItem className='dropdownItem'>Agregar Producto</DropdownItem></Link>
                    ) }
                        <Link to='/listproducts' className='link'><DropdownItem className='dropdownItem'>Consultar Productos</DropdownItem></Link>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={dropdowns.repartos} toggle={() => abrirCerrarDropdown('repartos')}>
                    <DropdownToggle className='dropdown'>
                        Repartos
                    </DropdownToggle>

                    <DropdownMenu className='dropdownMenu'>
                    <Link to='/distributionday' className='link'><DropdownItem className='dropdownItem'>Lunes</DropdownItem></Link>
                    <Link to='/distributionday' className='link'><DropdownItem className='dropdownItem'>Martes</DropdownItem></Link>
                    <Link to='/distributionday' className='link'><DropdownItem className='dropdownItem'>Miercoles</DropdownItem></Link>
                    <Link to='/distributionday' className='link'><DropdownItem className='dropdownItem'>Jueves</DropdownItem></Link>
                    <Link to='/distributionday' className='link'><DropdownItem className='dropdownItem'>Viernes</DropdownItem></Link>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={dropdowns.informes} toggle={() => abrirCerrarDropdown('informes')}>
                    <DropdownToggle className='dropdown'>
                        Informes
                    </DropdownToggle>

                    <DropdownMenu className='dropdownMenu'>


                   
                    <Link to='/cashclosing' className='link'><DropdownItem className='dropdownItem'>Cerrar Caja</DropdownItem></Link>
                    <Link to='/payment' className='link'><DropdownItem className='dropdownItem'>Registrar Pago</DropdownItem></Link>
                    <Link to='/currentaccounts' className='link'><DropdownItem className='dropdownItem'>Cuentas Corrientes</DropdownItem></Link>
                    {adminMenu}
                    <Link to='/stock' className='link'><DropdownItem className='dropdownItem'>Stock</DropdownItem></Link>
                    </DropdownMenu>
                </Dropdown>
            </nav>
        </header>
    );
}

export default Navbar;
