import React from 'react'
import loading from "./player-loading.gif";
import '../styles/Bottombar.css';

function Playerloading() {
  return (
    <>
        <img id="playerLoading" src={loading} alt="Loading..." />
    </>
  )
}

export default Playerloading