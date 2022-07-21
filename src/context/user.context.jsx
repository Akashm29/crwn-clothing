import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListner } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => { }
});


export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        });
        return unsubscribe
    }, []);
    const value = { currentUser, setCurrentUser }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}