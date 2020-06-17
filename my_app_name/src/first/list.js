import React from 'react';

import Student from './student'

function StudentList({list}) {
    return (
    <ul>
        {list.map(student => <Student student={student}/>)}
    </ul>
    )
}

export default StudentList