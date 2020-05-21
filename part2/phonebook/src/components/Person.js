import React from 'react'

const Person = ({ name, number, deletePerson, persons }) => {
    const person = persons.find(p => p.name === name)
    
    return (
        <li key={name}>
            {name} {number} 
            <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
    )
}
export default Person