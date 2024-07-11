import {useState , createContext} from "react";


export const imageArrayContext = createContext();

export const ContextProvider =(props)=>{
    const [ photoArray , setPhotoArray ] = useState([]);
    const [ offset , setOffset ] = useState(0);
    const [btnState , setBtnState ] = useState({button:false,loading:false});
        return (
          <imageArrayContext.Provider value={{photoArray , setPhotoArray , offset , setOffset ,btnState , setBtnState}}>
                    {props.children}
            </imageArrayContext.Provider>
        )
}