import React, { useState } from 'react'
import '../styles/ExplorePage.css'
import SearchLoading from './SearchLoading';
import TopResult from './SearchComponents/TopResult';
import defaultImg from '../resources/default.png';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import SongResults from './SearchComponents/SongResults';
import TopSearches from './SearchComponents/TopSearches';
import AlbumResults from './SearchComponents/AlbumResults';
import ArtistResults from './SearchComponents/ArtistResults';

function ExplorePage(props) {
    const [searchLoadingState, setSearchLoadingState] = useState(false);
    const [searchProgress, setSearchProgress] = useState(false);
    const [searchResult, setSearchResult] = useState({
      results: [{
          name: "Song Name",
          artist: "Song Artist",
          image:[{link: defaultImg}],
          duration: '00:00'
      }
      ]
    })


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
    function songResults() {
        fetchSongResults(props.searchQuery);
    }
    async function fetchSongResults(searchQuery) {
        setSearchLoadingState(true);
        setSearchResult({
        results: [{
            image:[{link: defaultImg}]
        }]
        });
        let url = `https://saavn.me/search/songs?query=${searchQuery}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setSearchResult({
            results: parsedData.results
        });
        setSearchLoadingState(false);
        setSearchProgress(true);
        console.log(searchQuery)
    }
    function albumResults() {
        fetchAlbumResults(props.searchQuery);
    }
    async function fetchAlbumResults(searchQuery) {
        setSearchLoadingState(true);
        setSearchResult({
        results: [{
            image:[{link: defaultImg}]
        }]
        });
        let url = `https://saavn.me/search/albums?query=${searchQuery}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setSearchResult({
            results: parsedData.results
        });
        setSearchLoadingState(false);
        setSearchProgress(true);
        console.log(searchQuery)
    }
    const searchAlbum = () => {
        alert("Album was searched");
    }



    function handleArtist() {
        const artistQuery = props.musicState.songArtist;
        let artist = ''
        artistQuery.split(' ').forEach((element) => {
        artist += element + '+';
        })
        window.open(
        "https://duckduckgo.com/?q=" + artist,
        '_blank'
        );
    }

  return (
    <section id="explorePage">
            {props.searchLoadingState && <SearchLoading />}
            {!props.searchLoadingState && 
            <div id="explorePageContents">
                <div id="results">
                    <Routes>
                        <Route path='/' element={
                            <div id="topSearchesContainer">
                                <div id="topSearchesText">Top Searches
                                <img id="topSearchesIcon" src="https://c.tenor.com/S8dOItPNscgAAAAi/loop-loading.gif" alt="" /></div>
                                
                                {props.results.new_trending.map((element) => {
                                    return(
                                        <TopSearches
                                            title={element.title}
                                            handleTopSearch={props.handleTopSearch}
                                        />
                                    )
                                })}
                            </div>
                        }></Route>
                        <Route path='/topresults' element={
                            <>
                                <div id="searchedTitle">
                                    <div style={{color: `${props.textColor}`}} id="activeMusicTitle" class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <TopResult
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={props.searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={props.searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    playMusic={playMusic}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/songs' element={
                            <>
                                <div id="searchedTitle">
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} id="activeMusicTitle" class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <SongResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    playMusic={playMusic}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/albums' element={
                            <>
                                <div id="searchedTitle">
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} id="activeMusicTitle" class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <AlbumResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    searchAlbum={searchAlbum}
                                />
                            </>
                            }>
                        </Route>
                        <Route path='/artists' element={
                            <>
                                <div id="searchedTitle">
                                    <div style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/topresults">Top Results</Link>
                                    </div>
                                    <div onClick={songResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/songs">Songs</Link>
                                    </div>
                                    <div onClick={albumResults} style={{color: `${props.textColor}`}} class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/albums">Albums</Link>
                                    </div>
                                    <div style={{color: `${props.textColor}`}} id="activeMusicTitle" class="searchedMusicTitle">
                                        <Link style={{color: `${props.textColor}`}} to="/explore/artists">Artists</Link>
                                    </div>
                                </div>
                                <ArtistResults
                                    theme={props.theme}
                                    textColor={props.textColor}
                                    boxColor={props.boxColor}
                                    searchResult={props.searchResult}
                                    setMusic={props.setMusic}
                                    searchLoadingState={searchLoadingState}
                                    searchProgress={props.searchProgress}
                                    searchAlbum={searchAlbum}
                                />
                            </>
                            }>
                        </Route>
                    </Routes>
                </div>
                </div>
            }
            </section>
  )
}

export default ExplorePage