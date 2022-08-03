import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import fav from '../../resources/fav.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function ArtistSearchResults(props) {
  return (
    <div style={{background: `${props.boxColor}`}} className="searchResults">
        {props.albumArt && 
            <img id="searchedMusicArt" src={props.albumArt} alt={defaultImg} />
        }
        {!props.albumArt && 
            <img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
        }
        <div id="searchedSongInfo">
            <div id="actualInfo">
                <div style={{color: props.textColor}} id="searchedSongTitle">{props.artistName}</div>
                <div id="searchedSongArtist">{props.artistDescription}</div>
            </div>
            <div id="searchedIcons">
            <div id="totalMusicDuration">
            </div>
            <img onClick={() => {}} id="searchedPlayButton" className="searchedIcons" src={play} alt="" />
            <img id="searchedFavButton" className="searchedIcons" src={unfav} alt="" />
            <img id="searchedOptionButton" className="searchedIcons" src={dots} alt="" />
        </div>
        </div>
    </div>
  )
}

export default ArtistSearchResults