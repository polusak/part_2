import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import './App.css'

function App() {
  const [countryNames, setCountryNames] = useState([])
  const [filteredNames, setFilteredNames] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(result => {
        const nameObjects = result.map(countryObject => countryObject.name)
        setCountryNames(nameObjects)
        setFilteredNames(nameObjects)
      })
  }, [])

  const handleChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    const upperCaseFilter = newFilter.toUpperCase()
    const filteredCountries = countryNames.filter(
      c => c.common.toUpperCase().includes(upperCaseFilter))
    setFilteredNames(filteredCountries)
  }

  return (
    <>
      find countries {' '}
      <input 
        value ={filter}
        onChange = {handleChange}
      />
      <Countries 
        filter={filter}
        countries={filteredNames}
      />
    </>
  )
}

export default App
