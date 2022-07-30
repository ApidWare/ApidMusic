import React, { useState } from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import fav from '../../resources/fav.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function SearchResults(props) {
    const [musicArt, setMusicArt] = useState(defaultImg);
    const [songState, setSongState] = useState('');
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt && 
            <img id="searchedMusicArt" src={props.musicArt} alt={defaultImg} />
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
            <div id="totalMusicDuration">
                {props.duration}
            </div>
            <img onClick={() => {props.playMusic(props.songID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
            <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
            <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
        </div>
        </div>
    </div>
  )
}

export default SearchResults