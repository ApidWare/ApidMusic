import React from 'react'
import '../../styles/ExplorePage.css'
import defaultImg from '../../resources/default.png';
import TopResultsSongs from './TopResultsSongs';
import SearchResults from './SearchResults';
import SearchLoading from '../SearchLoading';
import AlbumSearchResults from './AlbumSearchResults';
import ArtistSearchResults from './ArtistSearchResults';

function ArtistResults(props) {
  return (
    <>
    {props.searchLoadingState &&
        <SearchLoading
            margin="25vh"
        />
    }
    {!props.searchLoadingState &&
        <section className="topSearchResults" id="topResultsSongs">
                    {props.searchResult.results.artists.data.map(element => {
                        return (
                            <ArtistSearchResults
                                artistName={element.title}
                                artistProfile={element.image}
                                artistDescription={element.description}
                                artistID={element.id}
                                theme={props.theme}
                                textColor={props.textColor}
                                boxColor={props.boxColor}
                                playMusic={props.playMusic}
                            />
                        )
                    })
                    }
            <hr style={{width: '15%'}} id="resultsHr" />
        </section>
    }
    </>
  )
}

export default ArtistResults