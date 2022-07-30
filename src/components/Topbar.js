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
<<<<<<< HEAD
    <div style={{background: `${props.theme}`, color: `${props.textColor}`}} id="topBar">
      <div id="theme">
        <img id="themeButton" onClick={props.themeButton} src={props.themeState} alt="Theme Button" />
      </div>
        <div id="searchBar">

            <input style={{background: `${props.searchBoxTheme}`, color: `${props.textColor}`}} onChange={props.handleSpace} placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
=======
    <div id="topBar">
        <div id="searchBar">
            <input onChange={props.handleSpace} placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
>>>>>>> b91038813f1398ca33bcdd09a545c549f011dc47
            <span onClick={handleClearBox} id="clearBox" className="material-symbols-outlined">close</span>
                    <button onClick={props.searchHandler} id="searchButton">
                        Search
                    </button>
        </div>
        <div id="userAccountPanel">
<<<<<<< HEAD
            <button style={{color: `${props.textColor}`}} onClick={props.accountButtonHandler} id="loginButton">Login</button>
=======
            <button onClick={props.accountButtonHandler} id="loginButton">Login</button>
>>>>>>> b91038813f1398ca33bcdd09a545c549f011dc47
            <button onClick={props.accountButtonHandler} id="signupButton">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default Topbar
