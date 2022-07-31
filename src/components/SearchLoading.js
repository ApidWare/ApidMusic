import React from 'react'
import '../styles/ExplorePage.css';

function Playerloading(props) {
  return (
    <section style={{margin: `${props.margin}`}} id="searchLoadingContainer">
        <div id="searchLoading"></div>
    </section>
  )
}

export default Playerloading