const { createContext, useState, useContext } = require("react");

//1: Create a  Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2:Share the created context with other components
export default function AuthProvider({children}){

    //Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password){
        if(username === 'test' && password === '123'){
            setAuthenticated(true);
            return true;
        }else{
            setAuthenticated(false);
            return false;
        }
    }

    function logout(){
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}