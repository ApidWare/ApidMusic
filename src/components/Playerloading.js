import React from 'react'
import '../styles/Bottombar.css';
import loading from "../resources/player-loading.gif";

function Playerloading() {
  return (
    <>
        <img id="playerLoading" src={loading} alt="Loading..." />
    </>
  )
}

export default Playerloading