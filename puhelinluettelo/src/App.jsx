import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
      <input 
        value ={nameFilter}
        onChange = {handleFilterChange}
      />

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
            <input 
              value ={newName}
              onChange = {handleNameChange}
            />
        </div>
        <div>
          number: 
            <input 
              value ={newNumber}
              onChange = {handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {filteredPersons.map(p => <p key={p.name}> {p.name} {p.number}</p>)}
    </div>
  )

}

export default App
