import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import './styles/App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import play from './resources/play.png';
import pause from './resources/pause.png';
import defaultImg from './resources/default.png';
import TrendingPage from './components/TrendingPage';
import HomePage from './components/HomePage';
import hello from './resources/hello.png';
import themeOn from './resources/themeOn.png';
import themeOff from  './resources/themeOff.png';
import ExplorePage from './components/ExplorePage';
import './styles/Sidebar.css';
import icon from "./resources/icon.png";

let x = 0
let t = 0;
let interval;
export default function App() {



  useEffect(() => {
    // Update the document title using the browser API
    if (window.location.href.includes('explore')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="active";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
    }
    else if (window.location.href.includes('trending')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="active";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
    }
    else if (window.location.href.includes('topcharts')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="active";
      document.getElementsByClassName('navMenuItem')[4].id="";
    }
    else if (window.location.href.includes('mylibrary')) {
      document.getElementsByClassName('navMenuItem')[0].id="";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="active";
    }
    else {
      document.getElementsByClassName('navMenuItem')[0].id="active";
      document.getElementsByClassName('navMenuItem')[1].id="";
      document.getElementsByClassName('navMenuItem')[2].id="";
      document.getElementsByClassName('navMenuItem')[3].id="";
      document.getElementsByClassName('navMenuItem')[4].id="";
    }
  });




  const navigate = useNavigate();
  const [playState, setPlayState] = useState(play);
  const [seekValue, setSeekValue] = useState("0");
  const [musicQuality, setMusicQuality] = useState(3);
  const [qualityState, setQualityState] = useState("Quality - MD");
  const [musicState, setMusicState] = useState({
    musicArt: hello,
    musicLink: '',
    songTitle: '',
    songArtist: '',
    playerLoading: false,
    seekBar: false
  });
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const [themeState, setThemeState] = useState(themeOff);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchLoadingState, setSearchLoadingState] = useState(false);
  const [searchProgress, setSearchProgress] = useState(false)

  function dialogBox (message) {
    const dialog = document.getElementById("dialogBox");
    const dialogText = document.getElementById("dialogText");
    dialog.style.display = "block";
    dialogText.innerHTML = message;
    setTimeout(() => {
      dialog.style.display = "none";
    }, 3000);
  }

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
  function musicDuration() {
    let totalMusicDuration = document.getElementById("music").duration;
    setTotalDuration(converter(totalMusicDuration));
  }
  function currentMusicDuration () {
    const music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    let totalMusicDuration = document.getElementById("music").duration;
    seekBar.max = totalMusicDuration;
    interval = setInterval(() => {
      let currentDuration = document.getElementById("music").currentTime;
      setCurrentDuration(converter(currentDuration));
      setSeekValue(currentDuration);
      musicDuration();
      if ((currentDuration-10) >= totalMusicDuration) {
        music.pause();
        setPlayState(play);
        clearInterval(interval);
        console.log("End")
      }
    }, 500);
  }
  const fetchSong = async (songID) => {
    let url = `https://saavn.me/songs?id=${songID}`;
    setMusicState({
      musicArt: defaultImg,
      playerLoading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Code for displaying artists separately -
    // let artistArray = parsedData.results.artist.split(', ');
    // let artist = '';
    // for (let i = 0 ; i < parsedData.results.artist.length ; i++) {
    //   search += searchQuery[i] + '+'
    // }
    setMusicState({
      musicArt: parsedData.results.image[1].link,
      musicLink: parsedData.results.downloadUrl[musicQuality].link,
      songTitle: parsedData.results.name,
      songArtist: parsedData.results.artist,
      playerLoading: false,
      seekBar: true,
      duration: parsedData.results.duration
    });
    setPlayState(play);
    setTimeout(() => {
      music();
      x++;
      document.title = `${musicState.songArtist} - ${musicState.songTitle}`;
    }, 2000)

  }
  function updateSeek() {
    let music = document.getElementById("music");
    let seekBar = document.getElementById("seekBar");
    music.currentTime = seekBar.value;
  }

  function searchHandler() {
    let searchData = document.getElementById('searchBox').value;
    let searchQuery = searchData.split(' ');
    let search = '';
    for (let i = 0 ; i < searchQuery.length ; i++) {
      search += searchQuery[i] + '+'
    }
    setSearchQuery(search);
    fetchSearchResults(search);
    navigate('/explore/topresults');
    setSearchProgress(true);
  }
  while(document.title === '-') {
    if (musicState.songTitle) {
      document.title = `${musicState.songArtist} - ${musicState.songTitle}`;
    }
    else {
      document.title = "ApidMusic - Listen Freely";
    }
  }
  function music() {
    const music = document.getElementById("music");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    document.title = `${musicState.songArtist} - ${musicState.songTitle}`;
    if (x % 2 === 0) {
      music.play();
      setPlayState(pause);
      currentMusicDuration();
      prevButton.style.marginRight = "10px"
      nextButton.style.marginLeft = "10px"
    }
    else {
      music.pause();
      setPlayState(play);
      clearInterval(interval);
      prevButton.style.marginRight = "20px"
      nextButton.style.marginLeft = "20px"
    }
  }
  function handleSpace () {
    const searchBox = document.getElementById("searchBox");
    if (searchBox.value.length !== 0) {
      document.getElementById("clearBox").style.visibility = "visible";
    }
    else {
      document.getElementById("clearBox").style.visibility = "hidden";
    }
    window.onkeydown = function (code) {
    if (code.keyCode === 32) {
      }
    }
  }
  window.onkeydown = function (code) {
    if (code.keyCode === 32) {
      music();
      x++;
    }
    }

  function playPause() {
    music();
    x++;
  }
  function setQualityDataSaving () {
    setMusicQuality(1);
    setQualityState("Quality - Ds");
    dialogBox("The quality will be applied from the next song.")
  }
  function setQualityLow () {
    setMusicQuality(2);
    setQualityState("Quality - Lo");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityMedium () {
    setMusicQuality(3);
    setQualityState("Quality - Md");
    dialogBox("The quality will be applied from the next song.");
  }
  function setQualityHigh () {
    setMusicQuality(4);
    setQualityState("Quality - Hi");
    dialogBox("The quality will be applied from the next song.");
  }
  
  function buttonHandler () {
    dialogBox("Still in development!");
  }

  const dark = '#111';
  const light = '#fff';
  const [theme, setTheme] = useState(light);
  const [textColor, setTextColor] = useState(dark);
  const [searchBoxTheme, setSearchBoxTheme] = useState('#fff');
  const [bottomBarShadow, setBottomBarShadow] = useState('0 0 15px #999');
  const [bottomBarTheme, setBottomBarTheme] = useState('#dedede');
  const [seekBarTheme, setSeekBarTheme] = useState('#aaa');
  const [musicArtTheme, setMusicArtTheme] = useState('0 0 7px #000');
  const [searchResultTheme, setSearchResultTheme] = useState('#eee');
  // const [themePersistentState, setThemePersistentState] = useState(0);
  // let t = themePersistentState;
  // useEffect(() => {
  //   themeButton();
  // }, t)
  

  function themeButton() {
    const body = document.querySelector("body");
    if(t % 2 === 0) {
      setThemeState(themeOn);
      setTheme(dark);
      setTextColor(light);
      setSearchBoxTheme('#222');
      setSearchResultTheme('#222');
      setBottomBarTheme(dark);
      setBottomBarShadow('0 0 15px #333');
      setSeekBarTheme('#333');
      setMusicArtTheme('0 0 10px #333');
      body.style.background = dark;
      body.style.color = light;
    }
    else {
      setThemeState(themeOff);
      setTheme(light);
      setTextColor(dark);
      setSearchBoxTheme('#fff');
      setSearchResultTheme('#eee');
      setBottomBarTheme('#dedede');
      setBottomBarShadow('0 0 15px #999');
      setSeekBarTheme('#aaa');
      setMusicArtTheme('0 0 7px #000');
      body.style.background = light;
      body.style.color = dark;
    }
    t++;
    // setThemePersistentState(t++);
  }




  const [searchResult, setSearchResult] = useState({
    results: [{
        name: "Song Name",
        artist: "Song Artist",
        image:[{link: defaultImg}],
        duration: '00:00'
    }
    ]
  })
  async function fetchSearchResults(searchQuery) {
      // let url = `https://saavn.me/search/songs?query=love+yourself`;
      setSearchLoadingState(true);
      setSearchResult({
        results: [{
          image:[{link: defaultImg}]
        }]
      });
      let url = `https://saavn.me/search/all?query=${searchQuery}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setSearchResult({
          results: parsedData.results
      });
      setSearchLoadingState(false);
      setSearchProgress(true);
  }

  function handleArtist() {
    const artistQuery = musicState.songArtist;
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
    <>
      <div id="body">
        
        <Sidebar
          theme={theme}
          textColor={textColor}
        />

        <Topbar
          handleSpace={handleSpace}
          searchHandler={searchHandler}
          accountButtonHandler={buttonHandler}
          themeState={themeState}
          themeButton={themeButton}
          theme={theme}
          textColor={textColor}
          searchBoxTheme={searchBoxTheme}
        />
        <Bottombar
          playPause={playPause}
          playState={playState}
          musicArt={musicState.musicArt}
          musicLink={musicState.musicLink}
          songTitle={musicState.songTitle}
          songArtist={musicState.songArtist}
          playerLoading={musicState.playerLoading}
          seekBar={musicState.seekBar}
          currentDuration={currentDuration}
          totalDuration={totalDuration}
          updateSeek={updateSeek}
          seekValue={seekValue}
          setQualityDataSaving={setQualityDataSaving}
          setQualityLow={setQualityLow}
          setQualityMedium={setQualityMedium}
          setQualityHigh={setQualityHigh}
          qualityState={qualityState}
          theme={theme}
          textColor={textColor}
          bottomBarShadow={bottomBarShadow}
          seekBarTheme={seekBarTheme}
          musicArtTheme={musicArtTheme}
          bottomBarTheme={bottomBarTheme}
          handleArtist={handleArtist}
        />
        <Routes>
          <Route exact path="/" element={
              <HomePage
                theme={theme}
                textColor={textColor}
                boxColor={searchResultTheme}
                searchResult={searchResult}
                setMusic={fetchSong}
                searchLoadingState={searchLoadingState}
                searchProgress={searchProgress}
              />
          }>
          </Route>
          <Route path="/explore/*" element={
            searchProgress && 
              <ExplorePage
                theme={theme}
                textColor={textColor}
                boxColor={searchResultTheme}
                searchResult={searchResult}
                setMusic={fetchSong}
                searchLoadingState={searchLoadingState}
                searchProgress={searchProgress}
                searchQuery={searchQuery}
              />
          }>
          </Route>
        </Routes>
      </div>
    </>
  )
}