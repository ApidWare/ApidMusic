import React from 'react'
import '../styles/HomePage.css'
import HomePageCards from './HomePageCards'

function HomePage(props) {

    const homeState = {
        greeting: "Hi there.",
        loading: false,
        results: [],
        homeCardTitle: "Sample title",
        homeCardImg: "https://dummyimage.com/150x150"
    };

  return (
    <section id="homePage">
        <div id="content">
            <div id="greeting">
                {homeState.greeting}
            </div>
                <HomePageCards
                homeCardImg={homeState.homeCardImg}
                homeCardTitle={homeState.homeCardTitle}
                />
            <div id="sectionTitle">
                New Releases
            </div>
            <hr/>
        </div>
    </section>
  )
}

export default HomePage