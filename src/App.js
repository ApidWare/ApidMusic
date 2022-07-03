import React, { useState } from 'react'
import './styles/App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import play from './components/play.png';
import pause from './components/pause.png';
import defaultImg from './components/default.png';

let x = 0


export default function App() {
  
  const [playState, setPlayState] = useState(play);
  const [musicState, setMusicState] = useState({
    musicArt: defaultImg,
    musicLink: '',
    songTitle: '',
    songArtist: '',
    playerLoading: false,
    seekBar: false
  });
  const [seekLength, setSeekLength] = useState(0);
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");

  function coverter (value) {
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

  function musicDuration () {
      let totalDuration = document.getElementById("music").duration;
      setTotalDuration(coverter(totalDuration)); 
  }

  function currentMusicDuration () {
    let duration = 0;
    let totalMusicDuration = Math.round(document.getElementById("music").duration);
    while (duration < totalMusicDuration) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        setCurrentDuration(coverter(duration));
        duration ++;
      }, 1000);
    }
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
    setTimeout(() => {
      musicDuration();
    }, 2000);
  }


  
  function seekBar() {
    let totalDuration = document.getElementById("music").duration;
    let currentDuration = totalDuration/100;
    let finalDuration = 0;
    let z = parseFloat(currentDuration.toFixed(3))*1000;
      if (playState === play) {
        const intervalID = setInterval(() => {
        setSeekLength(finalDuration);
        finalDuration += 1;
        if (finalDuration > 99) {
          clearInterval(intervalID);
          setSeekLength(0);
        }
        console.log(finalDuration);
      },z);
    }

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
  }

  function music() {
    const music = document.getElementById("music");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    if (x % 2 === 0) {
      music.play();
      setPlayState(pause);
      // seekBar();
      // musicDuration();
      // currentMusicDuration();
      prevButton.style.marginRight = "10px"
      nextButton.style.marginLeft = "10px"
    }
    else {
      music.pause();
      setPlayState(play);
      setSeekLength(0);
      // setCurrentDuration("00:00");
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
          // seekBar={musicState.seekBar}
          // seekLength={seekLength}
          // currentDuration={currentDuration}
          // totalDuration={totalDuration}
        />
      </div>
    </>
  )
}