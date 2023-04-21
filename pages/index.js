import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import imagesToTypes from "../public/types.js";
import { MutatingDots } from 'react-loader-spinner';

export default function Home() {
  const [thing1Input, setThing1Input] = useState("");

  const [typeInput, setTypeInput] = useState("");

  //const [personType, setPersonTypeInput] = useState("");
  const [youtube, setYouTube] = useState(null);
  const [youtubeEmb, setYouTubeEmb] = useState(null);
  const [result0, setResult0] = useState(null);
  const [result1, setResult1] = useState();

  const [inProgress, setInProgress] = useState(false);

  const imagePaths = {};
  let images = require.context('../public/', false, /\.(png|jpg)$/);
  images.keys().forEach((imagePath, index) => {
      imagePaths[index] = images(imagePath).default.src;
  });

  const clicked = styles.clicked
  const unclicked = styles.unclicked
  const [imgClicked, setImgClicked] = useState({0: unclicked, 1: unclicked, 2: unclicked, 3: unclicked, 4: unclicked,
                                                5: unclicked, 6: unclicked, 7: unclicked, 8: unclicked, 9: unclicked,
                                                10: unclicked, 11: unclicked, 12: unclicked});

  async function onSubmit(event) {
    setInProgress(true)
    event.preventDefault();
    let types = imagesToTypes.personToClassification

    let personType = ""
    for (let [key, value] of Object.entries(imgClicked)) {
      if (value === clicked) {
            personType = personType + " " + types[key]
      }
    }


    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personType: personType }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

    setResult0(data.first);
    setResult1(data.result);
    setYouTube(data.youtube);
    setYouTubeEmb(data.youtubeEmbed);
      
     // setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    setInProgress(false)
  }

  function toggle(num) {
    let arr = {
        ...imgClicked
    };
    if (imgClicked[num] === clicked) {
      arr[num] = unclicked
    } else {
      arr[num] = clicked
    }
    setImgClicked(arr)
  }

  const Loading = () => (
    <div className="flex justify-center items-center ">
      <MutatingDots 
        height="100"
        width="100"
        color="#5A5A5A"
        secondaryColor= '#5A5A5A'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}/>
    </div>
  );


  return (
    <div>
      <Head>
        <title>MotivateGPT</title>
      </Head>

      <main className={styles.main}>
        <h1>MotivateGPT: Your Personal AI Motivational Content Finder</h1>
        <strong>Sometimes you need to consume a little content to get you through the day. But let's try to make it a great day! Click on the kinds of people you most admire, then hit Motivate me!</strong>
     
          <div className={styles.row} >
            <div className={styles.column}>
              <img src={imagePaths[0]} className={imgClicked[0]} onClick={(e) => {toggle(0);}} /> 
              <img src={imagePaths[1]} className={imgClicked[1]} onClick={(e) => {toggle(1);}} />
              <img src={imagePaths[2]} className={imgClicked[2]} onClick={(e) => {toggle(2);}} />
              <img src={imagePaths[3]} className={imgClicked[3]} onClick={(e) => {toggle(3);}} />
            </div>
            <div className={styles.column}>
              <img src={imagePaths[4]} className={imgClicked[4]}  onClick={(e) => {toggle(4);}} />
              <img src={imagePaths[5]} className={imgClicked[5]}  onClick={(e) => {toggle(5);}} />
              <img src={imagePaths[6]} className={imgClicked[6]}  onClick={(e) => {toggle(6);}} />
              <img src={imagePaths[7]} className={imgClicked[7]}  onClick={(e) => {toggle(7);}} />
              <img src={imagePaths[8]} className={imgClicked[8]}  onClick={(e) => {toggle(8);}} />
            </div>
            <div className={styles.column}>
              <img src={imagePaths[9]} className={imgClicked[9]}  onClick={(e) => {toggle(9);}} />
              <img src={imagePaths[10]} className={imgClicked[10]}  onClick={(e) => {toggle(10);}} />
              <img src={imagePaths[11]} className={imgClicked[11]}  onClick={(e) => {toggle(11);}} /> 
              <img src={imagePaths[12]} className={imgClicked[12]}  onClick={(e) => {toggle(12);}} />   
            </div>
          </div>

          <br/>
          { inProgress && <Loading />}

          { !inProgress && <form onSubmit={onSubmit}>
                <input type="submit" value="Motivate me!" />
             </form>}

          { !inProgress &&  
              <div className={styles.center}>
              <h3><div className={styles.result}><a href={youtube}>{result0}</a></div></h3>
              </div>
          }

          { (!inProgress && youtubeEmb) &&  
              <div className={styles.center}>
                <iframe width="420" height="315"
                    src={youtubeEmb}>
                </iframe>
              </div>
          }

          { !inProgress &&  
              <div className={styles.center}>
              <div className={styles.result}>{result1}</div>
              </div>
          }
        
      </main>
    </div>
  );
}
