import {useState , createContext} from "react";


export const imageArrayContext = createContext();

export const ContextProvider =(props)=>{
    const [ photoArray , setPhotoArray ] = useState([]);
        return (

            <imageArrayContext.Provider value={{photoArray , setPhotoArray}}>
                    {props.children}
            </imageArrayContext.Provider>


        )


}