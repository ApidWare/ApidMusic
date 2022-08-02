import React, { useState } from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import fav from '../../resources/fav.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';
import download from '../../resources/download.png';

function TopResults(props) {
    const [musicArt, setMusicArt] = useState(defaultImg);
    const [songState, setSongState] = useState('');
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt && 
            <img id="searchedMusicArt" src={props.musicArt} alt='Failed to load' />
        }
        {!props.musicArt && 
            <img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div id="searchedSongTitle">{props.songName.replace(/&quot;/g,'"')}</div>
                <div id="searchedSongArtist">{props.songArtist}</div>
            </div>
        <div id="searchedIcons">
            <img draggable={false} onClick={() => {props.playMusic(props.songID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
            <img draggable={false} id="downloadSearchButton" className="searchedIcons" src={download} alt="" />
            <img draggable={false} id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
            <img draggable={false} id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
        </div>
        </div>
    </div>
  )
}

export default TopResults