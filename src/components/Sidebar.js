import React from 'react'
import '../styles/Sidebar.css'
import icon from "../resources/icon.png"
import { Link, Router } from 'react-router-dom'
// import home from "../resources/home.png"
// import trending from "../resources/trending.png"
// import top from "../resources/top.png"
// import library from "../resources/library.png"

function Sidebar(props) {
  return (
    <nav style={{background: `${props.theme}`, color: `${props.textColor}`}}>
        <div id="barTitle">
            <img id="icon" src={icon} alt="ApidMusic icon"/> <span id="barTitleText">ApidMusic</span>
        </div>
        <div id="navMenu">
            <div id="active" className="navMenuItem">
                <Link style={{color: `${props.textColor}`}} to="/">
                    {/* <img className="navMenuIcon" src={home} alt="Home icon"/> */}
                    <span id="navMenuIcon" class="material-symbols-outlined">home</span>
                        <span className="navMenuText">
                            Home
                        </span>
                </Link>
            </div>
            <div className="navMenuItem">
                <Link style={{color: `${props.textColor}`}} to="/explore">
                    {/* <img className="navMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">explore</span>
                        <span className="navMenuText">
                            Explore
                        </span>
                </Link>
            </div>
            <div className="navMenuItem">
                <Link style={{color: `${props.textColor}`}} to="/trending">
                    {/* <img className="navMenuIcon" src={trending} alt="Trending icon"/> */}
                    <span id="navMenuIcon" class="material-symbols-outlined">local_fire_department</span>
                        <span className="navMenuText">
                            Trending
                        </span>
                </Link>
            </div>
            <div className="navMenuItem">
                <Link style={{color: `${props.textColor}`}} to="/topcharts">
                    {/* <img className="navMenuIcon" src={top} alt="Top Charts icon"/> */}
                    <span id="navMenuIcon" class="material-symbols-outlined">whatshot</span>
                        <span className="navMenuText">
                            Top Charts
                        </span>
                </Link>
            </div>
            <div className="navMenuItem">
                <Link style={{color: `${props.textColor}`}} to="/mylibrary">
                    {/* <img className="navMenuIcon" src={library} alt="Your Library icon"/> */}
                    <span id="navMenuIcon" className="material-symbols-outlined">library_music</span>
                        <span className="navMenuText">
                            My Library
                        </span>
                </Link>
            </div>
        </div>
        <div id="playQueue">
            <div id="playQueueTitle">
                Your Queue
            </div>
            <div id="emptyQueue">
                <button style={{color: `${props.textColor}`}} id="createQueueButton">
                    Create a queue +
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Sidebar
