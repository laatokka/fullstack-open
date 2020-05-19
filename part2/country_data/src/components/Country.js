import React from 'react'

const Country = ({ name, capital, languages, flag, population }) => {
    if (name && !capital) {
        return (
            <div key={name}>
                {name}
            </div>
        )
    }
    return (
        <div key={name}>

            <h1>{name}</h1>

            <p>capital: {capital}</p>
            <p>population: {population}</p>

            <h2>languages</h2>
            <ul>
                {languages
                    .map(l => <li key={l.name}>{l.name}</li>)
                }
            </ul>

            <img src={flag} alt="flag" height="10%" width="10%" />

        </div>
    )
}
export default Country