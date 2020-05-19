import React, { useState, useEffect } from 'react';
import RenderCountries from './components/RenderCountries'
import Filter from './components/Filter'

import axios from 'axios'

require('dotenv').config()

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countriesHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(countriesHook, [])

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
