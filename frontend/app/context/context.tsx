'use client'

import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for your user context
interface UserContextType {
    username: ContextData;
    updateUsername: (newUsername: React.SetStateAction<ContextData>) => void; // Update the type here
}

interface ContextData {
    username: String;
    name: String;
    contactID: String;
}

// Create the initial context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom provider to handle the context state
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = React.useState<ContextData>({
        name: '',
        username: '',
        contactID: '',
    });

    const updateUsername = (newUser: React.SetStateAction<ContextData>) => {
        setUsername(newUser);
    };

    return (
        <UserContext.Provider value={{ username, updateUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the context values
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
