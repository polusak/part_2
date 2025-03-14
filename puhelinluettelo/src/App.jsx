import { useState, useEffect } from 'react'
import personService from './services/persons'
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
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
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(returnedPersons => {
          const newList = persons.concat(returnedPersons)
          setPersons(newList)
          const upperCaseFilter = nameFilter.toUpperCase()
          const filteredPersonList = newList.filter(
            p => p.name.toUpperCase().includes(upperCaseFilter)
          )
          setFilteredPersons(filteredPersonList)
          setNewName('')
          setNewNumber('')
        }
      )

    }
  }

  const deleteId = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
          setFilteredPersons(
            filteredPersons.filter(p => p.id !== deletedPerson.id)
          )
        })
    }
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
        idRemoval={deleteId}
        personList={filteredPersons}
      />
    </div>
  )

}

export default App
