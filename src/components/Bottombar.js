import React, { useState } from 'react'
import '../styles/Bottombar.css'
import Playerloading from './Playerloading';
import next from '../resources/next.png';
import prev from '../resources/prev.png';
import dots from '../resources/dots.png';
import volume from '../resources/volume.png';
import volume2 from '../resources/volume2.png';
import fav from '../resources/fav.png';
import unfav from '../resources/unfav.png';

let v = 0;
let f = 0;
let m = 0;
function Bottombar(props) {
    const [volumeButton, setVolumeButton] = useState(volume);
    const [favButton, setFavButton] = useState(unfav);
    function showSlider () {
        const sliderContainer = document.getElementById("sliderContainer");
        if (v%2 === 0) {
            sliderContainer.style.display = "block";
            v++;
            setVolumeButton(volume2);
        }
        else {
            sliderContainer.style.display = "none";
            v++;
            setVolumeButton(volume);
        }
    }
    function updateVolume (defaultValue) {
        document.getElementById("music").volume = defaultValue.target.value;
    }
    function favoriteHandler () {
        if (f%2 === 0) {
            setFavButton(fav);
            f++;
        }
        else {
            setFavButton(unfav);
            f++;
        }
    }
    function bottomMenuHandler () {
        if (m % 2 === 0) {
            document.getElementById("qualityMenu").style.display = "block";
            m++;
        }
        else {
            document.getElementById("qualityMenu").style.display = "none";
            m++;
        }
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
            <div id="totalSeek">
                <input
                id="seekBar"
                value={props.seekValue}
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={props.updateSeek}
                />
            </div>
            <div id="musicDuration">
                <div id="duration"><span id="currentDuration">{props.currentDuration}</span>/<span id="totalDuration">{props.totalDuration}</span></div>
                <div style={{display: "none"}} id="bottomMenuBox">
                    <div id="qualityButton" className="bottomMenuItem">
                        <span id="chevronLeft" className="material-symbols-outlined">chevron_left</span>
                        <span id="qualityText">Quality</span>
                        <div style={{display: "none"}} id="qualityMenu">
                            <div className="qualityMenuItem">
                            <span style={{display: "none"}} id="qualitySet" class="material-symbols-outlined">done</span>
                                <span id="qualitySetting">Data Saving <span id="qualityOption">{` (48kbps)`}</span> </span>
                            </div>
                            <div className="qualityMenuItem">
                            <span style={{display: "none"}} id="qualitySet" class="material-symbols-outlined">done</span>
                                <span id="qualitySetting">Low <span id="qualityOption">{` (96kbps)`}</span> </span>
                            </div>
                            <div id="selectedQuality" className="qualityMenuItem">
                            <span style={{display: "block"}} id="qualitySet" class="material-symbols-outlined">done</span>
                                <span id="qualitySetting">Medium <span id="qualityOption">{` (160kbps)`}</span> </span>
                            </div>
                            <div className="qualityMenuItem">
                            <span style={{display: "none"}} id="qualitySet" class="material-symbols-outlined">done</span>
                                <span id="qualitySetting">High <span id="qualityOption">{` (320kbps)`}</span> </span>
                            </div>
                        </div>
                    </div>
                    <div id="playlistButton" className="bottomMenuItem">Add to playlist</div>
                    <div id="playlistButton" className="bottomMenuItem">Share</div>
                </div>
                <div id="bottomIcons">
                    <img onClick={favoriteHandler} id="favButton" src={favButton} alt="" />
                    <img id="bottomMenu" onClick={bottomMenuHandler} src={dots} alt="" />
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
