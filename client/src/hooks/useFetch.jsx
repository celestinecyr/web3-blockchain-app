//custom hook
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;             //gives us access to gifs api key variable

const useFetch = ({keyword}) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs= async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);                   //here we use `` template string to be able to use logic inside || limit=1 because we find just 1 gif
        
            //destructure the data from response
            const {data} = await response.json();

            //set the state of gif
            setGifUrl(data[0]?.images?.downsized_medium?.url)
        
        } catch(error) {
            setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284');
        }
    }

    //we will call fetchGifs function inside the useEffect
    useEffect(() => {
        //whenever if there is a keyword, useEffect changes
        if(keyword) fetchGifs();     // call fetchGifs function
    }, [keyword])                   //this keyword is coming through the props of fetchGifs

    return gifUrl;
}

export default useFetch;