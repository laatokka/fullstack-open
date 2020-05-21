import React from 'react'
import Person from './Person'

const RenderPersons = ({ persons, filter, deletePerson }) => (
    
    persons
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map(p => <Person key={p.name} name={p.name} number={p.number} deletePerson={deletePerson} persons={persons} />
    )
)

export default RenderPersons