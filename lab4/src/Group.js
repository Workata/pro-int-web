import React from 'react'
import './css/Student.css'

export default function Group({group}) {
    return (
        <>
        <div className="student-container">
            <span className="data-desc">Group name:</span> {group.name} <br></br>
            <span className="data-desc">Group description:</span> {group.description}<br></br>
            <span className="data-desc">Group E-mail:</span> {group.email}<br></br>
            <span className="data-desc">Tags:</span> {group.tags}
        </div>
        </>
    )
}
