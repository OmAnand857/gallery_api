import React,{ useState , useEffect , useContext, useRef } from "react";
import Gallery from "./Gallery";
import axios from "axios";
import { imageArrayContext } from "./Context";
import GoTop from "./GoTop";

function App(){
   const [scrollPosition, setSrollPosition] = useState(0);
   const [showGoTop, setshowGoTop] = useState("goTopHidden");
   const refScrollUp = useRef();
   const { photoArray , setPhotoArray , offset ,setOffset , btnState , setBtnState } = useContext( imageArrayContext );

  //btn color change and disable for too many request i.e multiple click logic
 
 const btn = document.getElementById("mybtn1");
  if(btnState.button){
    btn?.classList.remove("bg-[#00C4F4]")
    btn?.classList.add("bg-[#131842]");
  }
  else{
    btn?.classList.remove("bg-[#131842]")
    btn?.classList.add("bg-[#00C4F4]");
  }


   useEffect(()=>{
          // images end 
        if(offset>120){
          alert("No more images to display");
          setBtnState( {loading:false,button:true})
        }

        //logic for preventing Redundant call on navigating as useffect fires on re-renders + dependency changes

        else if(offset===photoArray.length){
          
           getImages();
        }
        
  },[offset]);



    async function getImages() {
        try {
          const response = await axios.get('https://api.slingacademy.com/v1/sample-data/photos',{
            params:{
                'limit':20,
                'offset': offset,
            }
          });
          if(response){
            //respopnse hai to can make another call
            setBtnState({loading:false,button:false})
          }
          const array0 = [...photoArray];
          const array1 =  array0.concat(response.data.photos);
          setPhotoArray(array1);
         
        } catch (error) {
          alert(error," We are facing an unprecedented issue Please try again or After some time");
          //to make another request iin case of error disabled = false
          setBtnState({loading:false,button:false})
        }
      }


      function handleMore(){

        setOffset(a=> a+20); 
        setBtnState({loading:true,button:true})
      }
    

      var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
      const handleVisibleButton = () => {
        const position = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        setSrollPosition(position);
    
        if (scrollPosition > 1000) {
          return setshowGoTop("goTop");
        } else if (scrollPosition < 1000) {
          return setshowGoTop("goTopHidden");
        }
      };

    useEffect(() => {
      window.addEventListener("scroll", handleVisibleButton);
    },[scrollPos]);

  const handleScrollUp = () => {
      refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    };


    return(
        <div class="relative">
            
                <div  ref={refScrollUp} class="w-full h-[70vh] ">
                            <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                                 <h1 className="capitalize tracking-widest font-bold text-white text-5xl md:text-6xl">
                                hi there 👋
                            </h1>
                            <p className="text-base md:text-xl tracking-wide text-white">Welcome to a captivating experience</p>
                            <h2 className="capitalize font-semibold  tracking-wide text-[#00C4F4] text-3xl">the gallery</h2>

                            </div>
                          
                </div>
                <div className="w-full p-8 flex flex-col md:flex-row justify-around items-center flex-wrap gap-4 ">

                {
                    photoArray?.map((item , index)=>{
                          return  <Gallery key={index} id={item.id} title={item.title} url={item.url} description={item.description} user={item.user} />
                    })
                }



                </div>

                <button id="mybtn1" onClick={handleMore} disabled={btnState.button} className="mx-auto flex bg-[#00C4F4] h-[40px] w-[120px] items-center  justify-center rounded my-4 text-white">{btnState.loading?"Loading":"Load More"}</button>
               <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp}/>
        </div>
    );
}
//  {btnState.loading?"Loading":"Load More"}
export default App;