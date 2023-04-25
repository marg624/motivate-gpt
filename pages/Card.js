import React from 'react';
import greenCheck from "../public/green-check.png";
import empty from "../public/empty.png";

function Card(props) {

  const selectedStyle0 = props.isClicked ?  "flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg bg-gray-300 w-96" : "flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg w-96";

  return (
<div>
    <div className={selectedStyle0}>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" ></div>
        <img className="relative w-40" src={props.image} alt=""/>
      </div>
      <div className="relative text-black px-6 pb-6 mt-6">
        <div className="flex justify-between">
          <div className="block text-md">{props.text}</div>
          { props.isClicked &&
              <div className="block rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center">
                <img className="relative w-6" src={greenCheck.src} alt=""/>
              </div>
          }
          { !props.isClicked &&
              <div className="block rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center">
                <img className="relative w-6" src={empty.src} alt="" />
              </div>
          }
        </div>
      </div>
    </div>
    
  </div>
  );

}

export default Card;
