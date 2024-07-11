import { useContext , useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { imageArrayContext } from "./Context"
import axios from "axios";

function Photo(){
    const [ item , setItem ] = useState();
    let { imageId } = useParams();
    imageId = Number(imageId);
    const { photoArray , setPhotoArray , offset , setOffset } = useContext(imageArrayContext);
    if(photoArray.length===0){  
        getImages( imageId );
        setOffset(imageId-20); 
    }
    useEffect(()=>{
        const item = photoArray.filter(data=>data.id===imageId);
    setItem(item[0]);
    },[photoArray])
    async function getImages(limit) {
        try {
          const response = await axios.get('https://api.slingacademy.com/v1/sample-data/photos',{
            params:{
                'limit': limit,
                'offset': 0,
            }
          });
          let array0 = [...photoArray];
          const array1 =  array0.concat(response.data.photos);
          setPhotoArray(array1);
         
        } catch (error) {
          alert(error.message);
        }
      }





    return(
        <>
        <div class="text-center mt-16 p-4 flex flex-col gap-4">
          <h1 class="text-white text-5xl">Witness the Beauty</h1>
          <p class="text-white text-basel">Click/Hover on image to know more</p>
        </div>
        <div class="group relative  mt-[50px] w-[90vw] md:w-[70vw]  lg:w-[50vw]  overflow-hidden  flex mx-auto  lg:h-[60vh]">
        <img class=" object-cover w-full h-full" src={item?.url} alt="random-image" />
        <div
            class="absolute bottom-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
            <h1 class="text-2xl p-4   text-center text-white">{item?.title}</h1>
        <p class="mt-5 p-4   text-white text-center duration-300">{item?.description}</p>
        <small class="  text-white">id:{item?.id}</small>
        <small class="  text-white">user:{item?.user}</small>
        </div>
    </div>

    <div class="fixed bottom-4 left-[50vw] translate-x-[-50%] flex mx-auto"><h2 class="text-center text-sm mt-2 text-white">Made with ❤️ by <span class="text-blue-400">Om Anand</span></h2></div>

      </>



    );


}


export default Photo;