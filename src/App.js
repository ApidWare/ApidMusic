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
    playerLoading: false
  });


  const fetchSong = async (searchQuery) => {
    let url = `https://saavn.me/search/songs?query=${searchQuery}&page=1&limit=1`;
    setMusicState({
      musicArt: defaultImg,
      playerLoading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setMusicState({
      musicArt: parsedData.results[0].image[1].link,
      musicLink: parsedData.results[0].downloadUrl[2].link,
      songTitle: parsedData.results[0].name,
      songArtist: parsedData.results[0].artist,
      playerLoading: false
    });
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
      prevButton.style.marginRight = "10px"
      nextButton.style.marginLeft = "10px"
    }
    else {
      music.pause();
      setPlayState(play);
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
        />
      </div>
    </>
  )
}
