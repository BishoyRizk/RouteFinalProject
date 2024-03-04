import { createContext, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props){
    
    const [UserToken, setUserToken] = useState(null)
    return <UserContext.Provider value={{UserToken,setUserToken}}>
        {props.children}
    </UserContext.Provider>

}