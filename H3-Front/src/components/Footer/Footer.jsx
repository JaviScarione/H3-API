import { RxExit } from "react-icons/rx"
import { FiUserPlus } from "react-icons/fi"
import './Footer.css';
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link, useNavigate } from "react-router-dom";




function Footer () {

    const { logout, isAdmin } = useAuth();
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const exit = () =>{
        MySwal.fire({
            title: 'Seguro deseas salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            cancelButtonText: 'Volver',
            confirmButtonText: 'Salir'
          }).then((result) => {
            if (result.isConfirmed) {        
                logout();
                navigate("/")
            }
          })
    }

    return (
        <div className="footer">
            {
                isAdmin && <Link to='/register'><h5><FiUserPlus className="iconFooter"/></h5></Link>
            }
            <button className="exit" onClick={exit}><h5><RxExit className="iconFooter"/></h5></button>
        </div>
    );
}

export default Footer;
