import React from 'react'
import Group from './Group'
import './css/StudentList.css'

export default function GroupsList({groups}) {
    return (
            <div id ="studentsList">
                {groups.map(group => {
                if(group.show === true) return <Group key={group.id} group={group}/>;
                })}
            </div>
    )
}
