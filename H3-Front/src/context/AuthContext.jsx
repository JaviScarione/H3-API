import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import Cookies from "js-cookie";


export const AuthContext = createContext()


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
       try {
        const res = await registerRequest(user);        
        setUser(res.data)
        setIsAuthenticated(true);
       } catch (error) {
        setErrors(error.response.data);
       }
    }

    const login = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)            
            if (res.data.admin == true) {
                setIsAdmin(true);
            }
        } catch (error) {
            setErrors(error.response.data.error);
        }
    }

    const logout = async () => {
        try {
            await logoutRequest(user)
            Cookies.remove("token");
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
        } catch (error) {
            setErrors(error.response.data);            
        }
        
    }

    useEffect(() => {
       if (errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([])
        }, 5000)
        return () => clearTimeout(timer)
       }
    }, [errors]);

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookie.get()
            

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            } 

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true)
                setUser(res.data)
                if (res.data.admin == true) {
                    setIsAdmin(true);
                }
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false);

            }
        }
        checkLogin();
    }, [isAdmin]);

    return (
        <AuthContext.Provider value={{signup, login, logout, loading, user, isAuthenticated, isAdmin, errors}}>
            {children}
        </AuthContext.Provider>
    )

}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};