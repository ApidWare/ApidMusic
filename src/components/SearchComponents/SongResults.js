import React, { useState } from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import TopResultsSongs from './TopResultsSongs';
import SearchResults from './SearchResults';
import SearchLoading from '../SearchLoading';

function SongResults(props) {



  return (
    <>
    {props.searchLoadingState &&
        <SearchLoading
            margin="25vh"
        />
    }
    {!props.searchLoadingState &&
        <section className="topSearchResults" id="topResultsSongs">
            {props.searchResult.results.map(element => {
                return (
                    <SearchResults
                        songName={element.name}
                        songArtist={element.artist}
                        musicArt={element.image[0].link}
                        songID={element.id}
                        theme={props.theme}
                        textColor={props.textColor}
                        boxColor={props.boxColor}
                        playMusic={props.playMusic}
                    />
                )
            })
            }
            <div id="seeMore">
                See more results
            </div>
            <hr style={{width: '15%'}} id="resultsHr" />
        </section>
    }
    </>
  )
}

export default SongResults