import { createContext, ReactNode, useContext, useState } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./Appwrite";



interface User {
    $id: string,
    name: string
    email: string,
    avatar: string,
}

interface globalContextType {
    isLoggedIn: boolean,
    user: User | null,
    loading: boolean,
    // refetch: (newParams?: Record<string, string | number> ) => Promise<void>
    refetch: () => void
}

const GlobalContext = createContext< globalContextType | undefined>(undefined)

export const GlobalProvider = ({children} : {children: ReactNode}) => {
    
    const {data: user, loading, refetch} = useAppwrite ({fn : getCurrentUser});
  
    const isLoggedIn = !!user;

    console.log(JSON.stringify(user, null, 2))

    return(
        <GlobalContext.Provider value={{isLoggedIn, user, loading, refetch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () : globalContextType => {
    const context = useContext(GlobalContext);

    if(!context) {
        throw new Error ("useGLobalCOntext must be used within a GlobalProvider ");
    }

    return context ;
}

export default GlobalProvider;