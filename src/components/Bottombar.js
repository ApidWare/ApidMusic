import React, { useState } from 'react'
import '../styles/Bottombar.css'
import next from './next.png';
import Playerloading from './Playerloading';
import prev from './prev.png';
import dots from './dots.png';
import volume from './volume.png';
import volume2 from './volume2.png';
// import 

let x = 0;
function Bottombar(props) {
const [volumeButton, setVolumeButton] = useState(volume);
function showSlider () {
    const sliderContainer = document.getElementById("sliderContainer");
    if (x%2 === 0) {
        sliderContainer.style.display = "block";
        x++;
        setVolumeButton(volume2);
    }
    else {
        sliderContainer.style.display = "none";
        x++;
        setVolumeButton(volume);
    }
}
function updateVolume (defaultValue) {
    document.getElementById("music").volume = defaultValue.target.value;
}

  return (
    <>
    <div id="bottomBar">
        {(!props.playerLoading) &&
        <div id="musicControls">
            <audio id="music" src={props.musicLink} />
            <div id="musicComponent">
                <img id="prevButton" src={prev} alt="Previous" />
                <img id="playPause" src={props.playState} onClick={props.playPause} alt="Play/Pause Button" />
                <img id="nextButton" src={next} alt="Next" />
            </div>
        </div>
        }
        {(props.playerLoading) &&
            <Playerloading />
        }
        <div id="musicInfo">
            <img id="musicArt" src={props.musicArt} alt="Music art" />
            <div id="songInfo">
                <div id="songTitle">{props.songTitle}</div>
                <div id="songArtist"><a href="/">{props.songArtist}</a></div>
            </div>
        </div>
        {(props.seekBar) &&
        <>
            {/* <div id="totalSeek">
                <div id="seekBar" style={{width: props.seekLength+'%'}}></div>
            </div> */}
            <div id="musicDuration">
                <div id="duration"><span id="currentDuration">{props.currentDuration}</span>/<span id="totalDuration">{props.totalDuration}</span></div>
                <div id="bottomIcons">
                    <img id="bottomMenu" src={dots} alt="" />
                    <img onClick={showSlider} id="volumeButton" src={volumeButton} alt="" />
                    <div style={{display: "none"}} id="sliderContainer">
                    <input
                        id="volumeSlider"
                        type="range"
                        min="0.0"
                        max="1.0"
                        step="0.1"
                        onChange={updateVolume}
                    />
                    </div>
                </div>
            </div>
        </>
        }
    </div>
    </>
  )
}

export default Bottombar
