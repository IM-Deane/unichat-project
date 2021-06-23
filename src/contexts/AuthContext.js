import React, {useContext, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {auth} from "../firebase";

const AuthContext = React.createContext();


export const useAuth = () => useContext(AuthContext);

// Children renders all JSX passed to provider
export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Get user from Firebase
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            // Redirect user to chats once logged in
           if (user) history.push("/chats");
        })
    }, [user, history]);

    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {/* Show children when app is finished loading */}
            {!loading && children}
        </AuthContext.Provider>
    )
}