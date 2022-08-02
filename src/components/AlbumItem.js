import React from 'react'

function AlbumItem() {
  return (
    <>
        <div style={{background: `${props.boxColor}`}} className="searchResults">
            {props.musicArt && 
                <img id="searchedMusicArt" src={props.musicArt} alt={defaultImg} />
            }
            {!props.musicArt && 
                <img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
            }
            <div id="searchedSongInfo">
                <div id="actualInfo">
                    <div id="searchedSongTitle">{props.songName}</div>
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
    </>
  )
}

export default AlbumItem