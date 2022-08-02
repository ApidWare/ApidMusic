import React from 'react'

function TopSearches(props) {
  return (
    <>
    <div onClick={() => props.handleTopSearch(props.title)} id="topSearches">
        <span id="topSearchesIcon" class="material-symbols-outlined">
            trending_up
        </span>
        <div id="topSearch">
            {props.title}
        </div>
     </div>
    </>
  )
}

export default TopSearches