import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/RenderPersons'
import Filter from './components/Filter'

import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios
        .get('http://localhost:3001/persons')
        .then(res => {
            setPersons(res.data)
        })
    }

    useEffect(hook, [])

    const handleNewPerson = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newPhoneNumber,
        }

        if (persons.find((p) => p.name === newName)) {
            return alert(`${newName} is already added to phonebook`)
        }

        setPersons(persons.concat(personObject))
        setNewName(newName)
        setNewNumber(newPhoneNumber)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <PersonForm submit={addPerson} name={newName}
                handleNewPerson={handleNewPerson} number={newPhoneNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <RenderPersons persons={persons} filter={filter} />

        </div >
    )
}

export default App