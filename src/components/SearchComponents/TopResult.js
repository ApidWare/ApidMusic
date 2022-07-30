import React, { useState } from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import fav from '../../resources/fav.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function TopResults(props) {
    const [musicArt, setMusicArt] = useState(defaultImg);
    const [songState, setSongState] = useState('');
  return (
    <div style={{background: `${props.boxColor}`}} className="topSearchResult">
        {props.musicArt && 
            <img id="topMusicArt" src={props.musicArt} alt={defaultImg} />
        }
        {!props.musicArt && 
            <img id="topMusicArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="topSongInfo">
            <div id="topSongTitle">{props.songName}</div>
            <div id="topSongArtist">{props.songArtist}</div>
        </div>
        <div id="topIcons">
            <img onClick={() => {props.playMusic(props.songID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
            <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
            <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
        </div>
    </div>
  )
}

export default TopResults