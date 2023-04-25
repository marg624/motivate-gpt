import React, {useState} from 'react'


function InfoOverlay(props) {

  function toggle() {
    props.toggleFunc(false)
  }

  return (
        <div className="flex justify-center bg-black bg-opacity-50" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>

           <div className="overflow-scroll bg-white shadow-2xl border-separate p-8 rounded-md" style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'left',
              width: '75%',
              height: '75%'
          }}>
            <div style={{position: 'absolute', top: 5, right: 15}} onClick={toggle} > 
              <h1 className="text-3xl mb-4 cursor-pointer text-slate-300">x</h1> 
            </div>
            <div className="flex items-center grid grid-cols-1 text-center justify-center justify-self-center mx-auto place-items-center">
            { props.created &&  
              <div>
                <div><h3 className="text-3xl md:text-5xl font-bold">"{props.created}"</h3></div>
                <div className="flex items-center place-items-center justify-center justify-self-center"><img src={props.aiImage} width="170px"/></div>
              </div>
            }   

            { props.result0 &&  
                <div>
                <h2 className="text-xl md:text-3xl font-bold"><br/><br/>Don't trust me? Here's some words from a fellow human...</h2>
                <br/>
                <a className="text-l md:text-xl font-bold" href={props.youtube}>{props.result0}</a>
                </div>
            }

            { props.youtubeEmb &&  
                <div>
                  <iframe width="400" height="300"
                      src={props.youtubeEmb} allowfullscreen>
                  </iframe>
                </div>
            }

            { props.result1 &&  
                <div className="col-span-2">{props.result1}</div>
            }

          

            </div>
          </div>
       </div>
  )
}

export default InfoOverlay