import React from 'react'
import '../styles/Topbar.css'

function Topbar(props) {
  function handleClearBox () {
    document.getElementById("searchBox").value = '';
    document.getElementById("clearBox").style.visibility = "hidden";
  }
  return (
    <>
    <div id="dialogBox">
        <span id="infoLogo" class="material-symbols-outlined">info</span>
        <span id="dialogText">This is a test message.</span>
    </div>
    <div id="topBar">
        <div id="searchBar">
            <input onChange={props.handleSpace} placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
            <span onClick={handleClearBox} id="clearBox" className="material-symbols-outlined">close</span>
                    <button onClick={props.searchHandler} id="searchButton">
                        Search
                    </button>
        </div>
        <div id="userAccountPanel">
            <button onClick={props.accountButtonHandler} id="loginButton">Login</button>
            <button onClick={props.accountButtonHandler} id="signupButton">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default Topbar
