import React from 'react'
import '../styles/AlbumPage.css'

import AlbumItem from './AlbumItem'

function AlbumPage() {
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
                    <AlbumItem
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

export default AlbumPage