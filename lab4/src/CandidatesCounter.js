import React from 'react'
import './css/CandidatesCounter.css'

export default function CandidatesCounter({students}) {
    return (
        <div id="numberOfCandidatesContainer">
            Found <span id="numberOfCandidates">{students.filter(student => student.show).length}</span> candidates, check them out:
        </div>
    )
}
