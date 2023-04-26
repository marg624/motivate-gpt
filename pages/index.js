import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import imagesToTypes from "../public/types.js";
import { MutatingDots } from 'react-loader-spinner';
import ai1 from "../public/ai1.png";
import ai2 from "../public/ai2.png";
import ai3 from "../public/ai3.png";
import Card from "./Card";
import InfoOverlay from "./InfoOverlay"

export default function Home() {
  const [useImages, setUseImages] = useState(false);

  const [thing1Input, setThing1Input] = useState("");

  const [showResults, setShowResults] = useState(false);

  //const [personType, setPersonTypeInput] = useState("");
  const [youtube, setYouTube] = useState(null);
  const [youtubeEmb, setYouTubeEmb] = useState(null);
  const [result0, setResult0] = useState(null);
  const [result1, setResult1] = useState();
  const [created, setCreated] = useState();
  const [aiImage, setAiImage] = useState(ai1.src);

  const [inProgress, setInProgress] = useState(false);

  const imagePaths = {};
  let images = require.context('../public/images/', false, /\.(png|jpg)$/);
  images.keys().forEach((imagePath, index) => {
      imagePaths[index] = images(imagePath).default.src;
  });

  const unclicked = false
  const clicked = true

  const [imgClicked, setImgClicked] = useState({0: unclicked, 1: unclicked, 2: unclicked, 3: unclicked, 4: unclicked,
                                                5: unclicked, 6: unclicked, 7: unclicked, 8: unclicked, 9: unclicked,
                                                10: unclicked, 11: unclicked, 12: unclicked});

  const submitButtonDisabled = "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
  const submitButtonEnabled = "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50";


  async function onSubmit(event) {
    setInProgress(true)

    event.preventDefault();
    let randomNum = Math.floor(Math.random() * 3) + 1;
    if (randomNum == 2) {
      setAiImage(ai2.src);
    } else if (randomNum == 3) {
      setAiImage(ai3.src);
    } else {
      setAiImage(ai1.src);
    }

    let types = imagesToTypes.personToClassification

    let personType = ""
    for (let [key, value] of Object.entries(imgClicked)) {
      if (value === clicked) {
            personType = personType + " " + types[key].replaceAll("#", "")
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
      setCreated(data.created);
      setShowResults(true);
        
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


  return (<>
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`A collection of games to play with friends.`}
      />
      <meta property="og:image" content="https://wordle-with-friends.s3.us-west-2.amazonaws.com/motivate.png" />
      </Head>

    <div className="min-h-screen">
        <div className="border-b bg-neutral-50 border-neutral-200">
          <div className="container mx-auto px-5">
            <div className="py-2 text-center text-sm">
              <strong><a href="https://with-friends-collection.vercel.app/">w/ friends </a> </strong> A collection of games you can play with friends.
            </div>
          </div>
        </div>

      <main>
      <Head>
        <title>MotivateGPT</title>
      </Head>
      <div className="container mx-auto px-5">
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
            <a href="https://motivate-gpt.vercel.app/">
            MotivateGPT
            </a>
          </h1>
          <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
            Your Personal AI Motivational Content Creator & Finder
          </h4>
        </section>
        <strong>Sometimes you need to consume a little content to get you through the day. But let's try to make it a great day! Click as many types of people that you find inspiring, then hit Motivate Me!</strong>

         <div className="p-18 flex flex-wrap items-center justify-center">
              <span onClick={(e) => {toggle(0);}}><Card image={imagePaths[0]} text={imagesToTypes.personToClassification[0]} isClicked={imgClicked[0]} /> </span>  
              <span onClick={(e) => {toggle(1);}}><Card image={imagePaths[1]} text={imagesToTypes.personToClassification[1]} isClicked={imgClicked[1]} /> </span> 
              <span onClick={(e) => {toggle(2);}}><Card image={imagePaths[2]} text={imagesToTypes.personToClassification[2]} isClicked={imgClicked[2]} /> </span>   
              <span onClick={(e) => {toggle(3);}}><Card image={imagePaths[3]} text={imagesToTypes.personToClassification[3]} isClicked={imgClicked[3]} /> </span>  
              <span onClick={(e) => {toggle(4);}}><Card image={imagePaths[4]} text={imagesToTypes.personToClassification[4]} isClicked={imgClicked[4]} /> </span>   
              <span onClick={(e) => {toggle(5);}}><Card image={imagePaths[5]} text={imagesToTypes.personToClassification[5]} isClicked={imgClicked[5]} /> </span> 
          </div>
       
        
          <br/>
          { inProgress && <Loading />}

          { !inProgress && 
            <div className="flex flex-wrap items-center justify-center">
               <button onClick={onSubmit} className="bg-blue-500 text-white font-bold py-4 px-6 rounded">
                  Motivate Me!
                </button>
              </div>
          }

          { (!inProgress && created && showResults) &&  
              <InfoOverlay toggleFunc={setShowResults} aiImage={aiImage} created={created} youtube={youtube} result0={result0} result1={result1} youtubeEmb={youtubeEmb}/>
          }   

          <br/>
        </div>
      </main>
    </div> 

    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Games for fun.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://github.com/marg624/"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read Documentation
            </a>
            <a
              href={`https://github.com/marg624/`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>

    </>
  );
}
