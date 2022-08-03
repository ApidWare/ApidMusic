import React, { useState } from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import TopResultsSongs from './TopResultsSongs';
import TopResultsArtists from './TopResultsArtists';
import TopResultsAlbums from './TopResultsAlbums';
import fav from '../../resources/fav.png';
import unfav from '../../resources/unfav.png';
import dots from '../../resources/dots.png';
import play from '../../resources/play.png';

function TopResults(props) {
    const [musicArt, setMusicArt] = useState(defaultImg);
    const [songState, setSongState] = useState('');
  return (
    <>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Songs</div>
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results.songs.data.map(element => {
                return (
                    <TopResultsSongs
                        songName={element.title}
                        songArtist={element.more_info.primary_artists}
                        musicArt={element.image}
                        songID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            })
            }
            <hr id="resultsHr" />
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Albums</div>
        <section className="topSearchResults" id="topResultsAlbums">
            {props.searchResult.results.albums.data.map(element => {
                return (
                    <TopResultsAlbums
                        songName={element.title}
                        songArtist={element.music}
                        musicArt={element.image}
                        songID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            })
            }
            <hr id="resultsHr" />
        </section>
        <div style={{color: props.textColor}} className="topSearchTitle" id="songsTitle">Artists</div>
        <section className="topSearchResults" id="topResultsArtists">
            {props.searchResult.results.artists.data.map(element => {
                return (
                    <TopResultsArtists
                        artistName={element.title}
                        artistProfile={element.image}
                        artistDescription={element.description}
                        artistID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            })
            }
            <hr style={{width: '25%'}} id="resultsHr" />
        </section>
    </>
  )
}

export default TopResults