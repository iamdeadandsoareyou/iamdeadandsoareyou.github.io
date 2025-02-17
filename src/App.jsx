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
            <div className="App" style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "center"}}>
                <div className="top-image">
                    <img src={'/img/swims_presents.png'} alt={"swim logo"} style={{width: "35%", height: "35%", alignSelf: "center"}}/>
                    <h2>I am dead.</h2>
                    <h3>and so are you.</h3>
                    <h4>This is no attempt at survival</h4>
                    <h4>this is a fascination with death. </h4>
                </div>
                <VolumeSlider volume={volume} setVolume={setVolume} />
                <audio ref={audioRef} id="kms" autoPlay loop>
                    <source
                        src="https://files.catbox.moe/p37mz9.mp3"
                        type="audio/mp3"/>
                </audio>
                <div style={{height: "120vh", width: "120vw", overflow: "hidden"}}>
                    <div style={{zIndex: "1", height: "120vh", width: "120vw", paddingTop: "15vh"}}>
                        <FloatingMenu/>
                    </div>
                </div>

                <h5>
                    [built by swim]
                </h5>

            </div>

        </>
    )
}

export default App