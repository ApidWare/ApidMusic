import React, { useState } from 'react'
import './styles/App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import play from './resources/play.png';
import pause from './resources/pause.png';
import defaultImg from './resources/default.png';
import HomePage from './components/HomePage';
import hello from './resources/hello.png';

let x = 0
let interval;
export default function App() {
  
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
    let seekBar = document.getElementById("seekBar");
    let totalMusicDuration = document.getElementById("music").duration;
    seekBar.max = totalMusicDuration;
    interval = setInterval(() => {
      let currentDuration = document.getElementById("music").currentTime;
      setCurrentDuration(converter(currentDuration));
      setSeekValue(currentDuration);
      musicDuration();
    }, 500);
  }
  const fetchSong = async (searchQuery) => {
    let url = `https://saavn.me/search/songs?query=${searchQuery}&page=1&limit=1`;
    setMusicState({
      musicArt: defaultImg,
      playerLoading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    setMusicState({
      musicArt: parsedData.results[0].image[1].link,
      musicLink: parsedData.results[0].downloadUrl[musicQuality].link,
      songTitle: parsedData.results[0].name,
      songArtist: parsedData.results[0].artist,
      playerLoading: false,
      seekBar: true
    });
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
    setPlayState(play);
    setTimeout(() => {
        music();
        x++;
      }, 3000);
      fetchSong(search);
  }

  function music() {
    const music = document.getElementById("music");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
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

  return (
    <>
      <div id="body">
        <Topbar
          handleSpace={handleSpace}
          searchHandler={searchHandler}
          accountButtonHandler={buttonHandler}
        />
        <Sidebar
          tabsHandler={buttonHandler}
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
        />

        <HomePage />
      </div>
    </>
  )
}