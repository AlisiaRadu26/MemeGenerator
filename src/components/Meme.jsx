import React from "react";
import memesData from "../../memesData";

export default function Meme(){
    const [meme, setMeme]=React.useState({
        topText : "",
        bottomText : "",
        randomImage : "https:\/\/i.imgflip.com\/1otk96.jpg"
    });

    const [allMeme, setAllMeme]=React.useState([])

    React.useEffect(() =>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    }, [])

    console.log(allMeme)
    function handleChange(event){
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [event.target.name] : event.target.value
            }
        })
    }

    function getMeme(){
        const randomNumber=Math.floor(Math.random()*allMeme.length);
        setMeme(prevMeme =>{
            return {
                ...prevMeme,
                randomImage : allMeme[randomNumber].url
            }
        })
    }

    return (
        <main className="main-container">
            <div className="form-memegenerator">
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Top Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    ></input>
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Buttom Text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                ></input>
                <button 
                    className="form-button" 
                    onClick={getMeme}
                    >Get a new meme image</button>
                <div className="meme-container">
                    <img src={meme.randomImage} className="meme-image"></img>
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        </main>
    )
}