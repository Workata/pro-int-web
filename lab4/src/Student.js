import React from 'react'
import './css/Student.css'

export default function Student({student}) {
    return (
        <>
        <div className="student-container">
            <span className="data-desc">Name:</span> {student.name} <br></br>
            <span className="data-desc">Description:</span> {student.description}<br></br>
            <span className="data-desc">E-mail:</span> {student.email}<br></br>
            <span className="data-desc">Tags:</span> {student.tags}
        </div>
        </>
    )
}
