import { useAuth } from "../../context/AuthContext";
import AnimatedPages from "../AnimatedPages/AnimatedPages";
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function HomePage() {

    const {user} = useAuth()

    return (
        <div className="background">
        <Navbar/>
            <AnimatedPages>
                <div className="home">
                    <div className="homeTitle">
                        <h1>Bienvenido de nuevo</h1>
                        <h1 className="name">{user.name}!</h1>
                    </div>
                    <img src="../../../public/h3.png" alt="H3 Logo" className="imgHome"/>
                    <div className="buttons">
                        <Link to='/sale' className="homeLink"><button className="homeButton">Vender</button></Link>
                        <Link to='/payment' className="homeLink"><button className="homeButton">Cobrar</button></Link>
                    </div>
                </div>
            </AnimatedPages>
        <Footer />
        </div>
        
    );
}

export default HomePage;