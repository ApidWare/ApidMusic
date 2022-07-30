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
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.musicArt && 
            <img id="searchedMusicArt" src={props.artistProfile} alt={defaultImg} />
        }
        {!props.musicArt && 
            <img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div id="searchedSongTitle">{props.artistName}</div>
                <div id="searchedSongArtist">{props.artistDescription}</div>
            </div>
            <div id="searchedIcons">
                <img onClick={() => {props.playMusic(props.artistID)}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
                <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
                <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
            </div>
        </div>
    </div>
  )
}

export default TopResults