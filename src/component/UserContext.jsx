import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    //If data for user in local exists, use it : set to null.
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const handleSetUser = (userData) => {
    setUser(userData);
    if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        localStorage.removeItem('user');
    }
};

    return (
        <UserContext.Provider value={{ user, setUser : handleSetUser }}>
            {children}
        </UserContext.Provider>
    )

}


export function useUser(){
    return useContext(UserContext);
}
