import React, { useState } from 'react'
import Weather from './Weather'


const Country = ({ name, capital, languages, flag, population, length }) => {
    const [showCountry, setShowCountry] = useState(false)

    if (length === 10) {
        if (showCountry) {
            return (
                <>
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
                </>
            )
        }
        return (
            < div key={name} >
                {name} < button onClick={() => setShowCountry(true)}> show</button >
            </div >
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
            <Weather country={name} />


        </div>
    )
}
export default Country