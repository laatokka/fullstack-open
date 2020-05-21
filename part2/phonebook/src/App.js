import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/RenderPersons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const hook = () => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
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

        const person = persons.find(p => p.name === newName)

        if (person) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                personService
                    .update(person.id, personObject)
                    .then(response => {
                        setPersons(
                            persons.map(p => p.id !== person.id
                                ? p
                                : response.data))
                    })
            }
            return
        }

        personService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)

        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deleteP(id).then(
                    setPersons(persons.filter(p => p.id !== id))
                )

        }
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
            <RenderPersons persons={persons} filter={filter} deletePerson={deletePerson} />

        </div >
    )
}

export default App