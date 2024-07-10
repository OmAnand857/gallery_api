
import { useNavigate } from "react-router-dom";



function Gallery({url , title , id , description , user ,key }){

    const dynamicUrl = "/photos/" + id;
    const Navigate = useNavigate();
    function handleClick(){
        Navigate(dynamicUrl);
    }

                return(


                    <div onClick={handleClick} className="w-[100%]  md:w-[40%] lg:w-[30%] my-4 flex flex-col gap-4 border-[#00C4F4] rounded border-2 text-white ">
                        
                        <img  loading="lazy" className=" w-full" src={url} onerror="this.onerror=null; this.src='./fallback.png';" alt=""></img>
                        <p className="font-bold text-xl px-4">{title}</p>
                        <p className=" px-4">{description}</p>
                        <div className="w-full  px-4 my-2 items-center flex gap-4 ">
                            <small>id:{id}</small>
                            <small>user:{user}</small>
                        </div>
        
                    </div>


                );






}


export default Gallery;