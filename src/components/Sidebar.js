import React from 'react'
import icon from "./icon.png"
import home from "./home.png"
import trending from "./trending.png"
import top from "./top.png"
import library from "./library.png"
import '../styles/Sidebar.css'

function Sidebar() {
  return (
    <>
    <nav>
        <div id="barTitle">
            <img id="icon" src={icon} alt="ApidMusic icon"/> <span id="barTitleText">ApidMusic</span>
        </div>
        <hr/>
        <div id="navMenu">
            <div id="active" className="navMenuItem">
                <a href="/">
                    <img className="navMenuIcon" src={home} alt="Home icon"/>
                        <span className="navMenuText">
                            Home
                        </span>
                </a>
            </div>
            <div className="navMenuItem">
                <a href="/">
                    <img className="navMenuIcon" src={trending} alt="Trending icon"/>
                        <span className="navMenuText">
                            Trending
                        </span>
                </a>
            </div>
            <div className="navMenuItem">
                <a href="/">
                    <img className="navMenuIcon" src={top} alt="Top Charts icon"/>
                        <span className="navMenuText">
                            Top Charts
                        </span>
                </a>
            </div>
            <div className="navMenuItem">
                <a href="/">
                    <img className="navMenuIcon" src={library} alt="Your Library icon"/>
                        <span className="navMenuText">
                            My Library
                        </span>
                </a>
            </div>
        </div>
        <hr/>
        <div id="playQueue">
            <div id="playQueueTitle">
                Your Queue
            </div>
            <div id="emptyQueue">
                <button id="createQueueButton">
                    Create a queue +
                </button>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Sidebar
