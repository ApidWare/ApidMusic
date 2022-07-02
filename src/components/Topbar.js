import React from 'react'
import '../styles/Topbar.css'

function Topbar(props) {
  return (
    <>
    <div id="topBar">
        <div id="searchBar">
            <input onChange={props.handleSpace} placeholder="Search for a song, album or artist" id="searchBox" type="text"/>
                    <button onClick={props.searchHandler} id="searchButton">
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
