import React, { useEffect, useState } from 'react'
import '../styles/HomePage.css'
import { Link } from "react-router-dom";
import HomePageCards from './HomePageCards'

function HomePage(props) {

  return (
    <section style={{background: `${props.theme}`, color: `${props.textColor}`}} id="homePage">
        <div id="content">
            <div id="greeting">
                {props.results.greeting}
                {props.results.greeting.includes('Hi') &&
                    <img id="handWaveEmoji" src="https://c.tenor.com/Wx9IEmZZXSoAAAAi/hi.gif" alt="" />
                }
                {props.results.greeting.includes('Dream') &&
                    <img id="handWaveEmoji" src="https://c.tenor.com/wNzoikuVQDUAAAAi/sleeping-face-joypixels.gif" alt="" />
                }
                {props.results.greeting.includes('Night') &&
                    <img id="handWaveEmoji" src="https://c.tenor.com/wNzoikuVQDUAAAAi/sleeping-face-joypixels.gif" alt="" />
                }
                {props.results.greeting.includes('Rise') &&
                    <img style={{marginLeft: '5px'}} id="handWaveEmoji" src="https://c.tenor.com/0l3zCp-KLX4AAAAi/pictia-nft.gif" alt="" />
                }
            </div>
            <div id="homePageTitleContainer">
                <div id="homePageTitle">
                    Most Popular <img id="fireEmoji" src="https://c.tenor.com/8McIGu0Tf_QAAAAi/fire-joypixels.gif" alt=""/>
                </div>
            </div>
        <div id="homeCardContainer">
            {props.results.new_albums.map((element) => {
                return(
                <HomePageCards
                    homeCardImg={element.image}
                    homeCardTitle={element.title}
                    id={element.id}
                />)
            })}
        </div>
        <hr width="30%"/>
            <Link style={{color: props.textColor}} id="exploreMoreHomeContainer" to="/explore">
                <div id="exploreMoreHome">
                    Explore more music
                </div>
            </Link>
        </div>
    </section>
  )
}

export default HomePage