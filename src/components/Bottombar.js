import React from 'react'
import '../styles/Bottombar.css'
import next from './next.png';
import Playerloading from './Playerloading';
import prev from './prev.png';

function Bottombar(props) {
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
    </div>
    </>
  )
}

export default Bottombar
