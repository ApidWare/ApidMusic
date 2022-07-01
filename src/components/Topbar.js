import React from 'react'

function Topbar() {
  return (
    <>
    <div id="topBar">
        <div id="searchBar">
            <input placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
                <button id="searchButton">
                    Search
                </button>
        </div>
        <div id="userAccountPanel">
            <button id="loginButton">Login</button>
            <button id="signupButton">Sign Up</button>
        </div>
    </div>
    </>
  )
}

export default Topbar
