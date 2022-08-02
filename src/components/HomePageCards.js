import React from 'react'
import '../styles/HomePage.css'

function HomePageCards(props) {
  return (
            <div className="homeCard">
                <img id="homeCardImg" src={props.homeCardImg} alt='Card'/>
                <div id="homeCardTitle">{props.homeCardTitle}</div>
            </div>
  )
}

export default HomePageCards