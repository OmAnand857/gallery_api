import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function GoTop(props){

    
        return (
            <>
              <div className={props.showGoTop} onClick={props.scrollUp}>
                <button className="goTop__text  ">
                  <KeyboardArrowUpIcon className="arrow " />
                </button>
              </div>
            </>
          
    );

}

export default GoTop;