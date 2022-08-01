import React, { useEffect, useState } from 'react'
import '../styles/HomePage.css'
import HomePageCards from './HomePageCards'

function HomePage(props) {

  return (
    <section style={{background: `${props.theme}`, color: `${props.textColor}`}} id="homePage">
        <div id="content">
            <div id="greeting">
                {props.greeting}
            </div>
            {props.homeState.results.new_albums.map((element) => {
                return(
                <HomePageCards
                    homeCardImg={element.title}
                    homeCardTitle={element.image}
                />)
            })}
            <div id="sectionTitle">
                New Releases
            </div>
            <hr/>
        </div>
    </section>
  )
}

export default HomePage