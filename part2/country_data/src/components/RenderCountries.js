import React from 'react'
import Country from './Country'

const RenderCountries = ({ countries, filter }) => {
    const countriesToRender = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    if (countriesToRender.length > 10) {
        return (
            <div>Too many countries to render</div>
        )
    } else if (countriesToRender.length > 1) {
        return (
            countriesToRender.map(c => <Country key={c.name} name={c.name} capital={c.capital} languages={c.languages} flag={c.flag} population={c.population} length={10} />
            )
        )
    }
    else if (countriesToRender.length === 1) {
        return (
            countriesToRender.map(c => <Country key={c.name} name={c.name} capital={c.capital} languages={c.languages} flag={c.flag} population={c.population} length={1} />)
        )
    }

    return (
        <div>
            Nothing to show
        </div>
    )
}

export default RenderCountries