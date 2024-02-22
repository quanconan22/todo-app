import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/apiClient";
const { createContext, useState, useContext } = require("react");

//1: Create a  Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2:Share the created context with other components
export default function AuthProvider({children}){

    //Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    async function login(username, password){
        try {
            const baToken = "Basic " + window.btoa(username + ":" + password)

            const response = await executeBasicAuthenticationService(baToken)
       
            if(response.status === 200){
                setAuthenticated(true);
                setUsername(username);
                setToken(baToken);

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("Intercepting and adding a token")
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                return true;
            }else{
                logout()
                return false;
            }    
        } catch (error) {
            logout()
            return false;
        }
    }

    function logout(){
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}