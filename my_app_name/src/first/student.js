import React from 'react';

function Student({student}) {
    return <li>Student ID: {student.id}, Name: {student.name}, Class: {student.class}, Location: {student.location}, Role: {student.role} </li>
}

export default Student