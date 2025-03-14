import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const check = persons.filter(p => p.name === newName)
    if (check.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newList = persons.concat(personObject)
      setPersons(newList)
      const up = nameFilter.toUpperCase()
      const fp = newList.filter(p => p.name.toUpperCase().includes(up))
      setFilteredPersons(fp)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setNameFilter(newFilter)
    const up = newFilter.toUpperCase()
    const fp = persons.filter(p => p.name.toUpperCase().includes(up))
    setFilteredPersons(fp)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter}
        onChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameInput={newName}
        nameChange={handleNameChange}
        numberInput={newNumber}
        numberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons
        personList={filteredPersons}
      />
    </div>
  )

}

export default App
