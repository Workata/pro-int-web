import React from 'react'
import './css/CandidatesCounter.css'

export default function GroupsCounter({groups}) {
    return (
        <div id="numberOfCandidatesContainer">
            Found <span id="numberOfCandidates">{groups.filter(group => group.show).length}</span> groups, check them out:
        </div>
    )
}
