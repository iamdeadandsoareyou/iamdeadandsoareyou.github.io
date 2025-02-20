import './App.css'
import {Slider} from "@mui/material";
import FloatingMenu from "./floating_menu.jsx";
import {useEffect, useRef, useState} from "react";

function VolumeSlider ({volume, setVolume}) {

    //global volume slider for looks and for easy ability to control volume of elements that are hidden
    return(
        <div className="volume-slider">
            <Slider
                value={volume}
                size="medium"
                defaultValue={70}
                aria-label="Small"
                valueLabelDisplay="auto"
                orientation="vertical"
                color="secondary"
                onChange={(e, newValue) => setVolume(newValue)}
            />
        </div>

    );
}
function App() {
    const [ volume, setVolume ] = useState(70);

    //initialization of ref for later assignment
    const audioRef = useRef(null);

    //need synchronnization hook not scalable only controls a single elemnt at a time right now
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    return (
        <>
            <div className="App" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <VolumeSlider volume={volume} setVolume={setVolume}/>
                <div className={"bottom-image"} style={{zIndex: "0", marginTop: "-25vh"}}>
                    <audio ref={audioRef} id="kms" autoPlay loop>
                        <source
                            src="https://files.catbox.moe/p37mz9.mp3"
                            type="audio/mp3"/>
                    </audio>
                    <img src={'/img/swims_presents.png'} alt={"swim logo"} className="top-image"
                         style={{width: "25%", height: "25%", alignSelf: "center"}}/>
                    <h2>I am dead.</h2>
                    <h3>and so are you.</h3>
                    <h4>This is no attempt at survival</h4>
                    <h4>this is a fascination with death. </h4>
                    <div className={"fMenu"} style={{height: "140vh", width: "150vw"}}>
                        <FloatingMenu/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App