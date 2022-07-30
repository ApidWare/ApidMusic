import React, { useState } from 'react'
import '../styles/ExplorePage.css'
import SearchLoading from './SearchLoading';
import TopResultsSongs from './SearchComponents/TopResultsSongs';
import TopResult from './SearchComponents/TopResult';
import TopResultsArtists from './SearchComponents/TopResultsArtists';
import TopResultsAlbums from './SearchComponents/TopResultsAlbums';

function ExplorePage(props) {
    function converter (value) {
        let val = Math.round(value);
        const h = Math.floor(val / 3600);
        const m = Math.floor(val % 3600 / 60);
        const s = Math.floor(val % 3600 % 60);
        const hours = h > 0 ? h + ':' : "";
        const minutes = m > 0 ? (m<10 ? '0'+m : m) + ':' : "00:";
        const seconds = s > 0 ? (s<10 ? '0'+s : s) : "00";
        let duration = hours + minutes + seconds
        return duration;
    }
    function playMusic(ID) {
        props.setMusic(ID);
    }
  return (
    <section id="explorePage">
            {props.searchLoadingState && <SearchLoading />}
            {!props.searchLoadingState && 
            <div id="explorePageContents">
                <div id="searchedTitle">
                    <div id="activeMusicTitle" class="searchedMusicTitle">
                        Top Results
                    </div>
                    <div class="searchedMusicTitle">
                        Songs
                    </div>
                    <div class="searchedMusicTitle">
                        Albums
                    </div>
                    <div class="searchedMusicTitle">
                        Artists
                    </div>
                </div>
                        <div id="results">
                            {/* {props.searchResult.results.topquery.data[0].title && 
                    <section className="topSearchResults" id="topResult">
                                    <TopResult
                                        songName={props.searchResult.results.topquery.data[0].title}
                                        songArtist={props.searchResult.results.topquery.data[0].music || props.searchResult.results.topquery.data[0].more_info.primary_artists}
                                        musicArt={props.searchResult.results.topquery.data[0].image}
                                        songID={props.searchResult.results.topquery.data[0].id}
                                        theme={props.theme}
                                        textColor={props.textColor}
                                        boxColor={props.boxColor}
                                        playMusic={playMusic}
                                    />
                    </section>} */}
                        <div className="topSearchTitle" id="songsTitle">Songs</div>
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
                                        playMusic={playMusic}
                                    />
                                )
                            })
                            }
                            <div id="seeMore">
                                See more results
                            </div>
                            <hr id="resultsHr" />
                    </section>
                        <div className="topSearchTitle" id="songsTitle">Albums</div>
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
                                        playMusic={playMusic}
                                    />
                                )
                            })
                            }
                            <div id="seeMore">
                                See more results
                            </div>
                            <hr id="resultsHr" />
                    </section>
                        <div className="topSearchTitle" id="songsTitle">Artists</div>
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
                                        playMusic={playMusic}
                                    />
                                )
                            })
                            }
                            <div id="seeMore">
                                See more results
                            </div>
                            <hr style={{width: '20%'}} id="resultsHr" />
                    </section>
                </div>
            </div>
            }
    </section>
  )
}

export default ExplorePage