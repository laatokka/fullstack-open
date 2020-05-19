import React, { useState, useEffect } from 'react';
import RenderCountries from './components/RenderCountries'
import Filter from './components/Filter'

import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(hook, [])
  console.log(countries)

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>find countries:
      <Filter filter={filter} handleFilter={handleFilter} />
      <RenderCountries countries={countries} filter={filter} />
    </div>
  )
}
export default App;
