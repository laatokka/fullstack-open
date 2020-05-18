import React from 'react'
const PersonForm = ({ submit, name, handleNewPerson, number, handleNewNumber }) => (
    <form onSubmit={submit}>
        <div>
            name: <input
                value={name}
                onChange={handleNewPerson} 
                    
                />
        </div>
        <div>
            number: <input
                value={number}
                onChange={handleNewNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm