import React from 'react'
import Student from './Student'
import './css/StudentList.css'

export default function StudentsList({students}) {
    return (
            <div id ="studentsList">
                {students.map(student => {
                if(student.show === true) return <Student key={student.id} student={student}/>;
                })}
            </div>
    )
}
