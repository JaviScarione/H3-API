import { useAuth } from "../../context/AuthContext";
import AnimatedPages from "../AnimatedPages/AnimatedPages";
function HomePage() {

    const {user} = useAuth()

    return (
        <AnimatedPages>
            <div>
                <h1>Bienvenido {user.name}</h1>
            </div>
        </AnimatedPages>
    );
}

export default HomePage;