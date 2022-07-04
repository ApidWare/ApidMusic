import React, { useState } from 'react'
import './styles/App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import play from './resources/play.png';
import pause from './resources/pause.png';
import defaultImg from './resources/default.png';

let x = 0
let interval;

export default function App() {
  
  const [playState, setPlayState] = useState(play);
  const [seekValue, setSeekValue] = useState("0");
  const [musicState, setMusicState] = useState({
    musicArt: defaultImg,
    musicLink: '',
    songTitle: '',
    songArtist: '',
    playerLoading: false,
    seekBar: false
  });
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");

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
      musicLink: parsedData.results[0].downloadUrl[2].link,
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
    fetchSong(search);
      setTimeout(() => {
        music();
        x++;
      }, 3000);
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
  return (
    <>
      <div id="body">
        <Topbar handleSpace={handleSpace} searchHandler={searchHandler} />
        <Sidebar />
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
        />
      </div>
    </>
  )
}