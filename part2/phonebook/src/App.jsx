import { useState, useEffect } from 'react';
import personServices from './services/persons';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personServices 
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const isPersonExists = (name) => {
    return persons.some((person) => person.name.toLowerCase() === name.toLowerCase())
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const renderNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (isPersonExists(newName)) {
      const person = persons.find(person => person.name === newName)
      updatePerson(person.id)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personServices 
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          const message = `Added ${newName}`
          setError(false)
          renderNotification(message)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: newNumber }
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personServices 
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          const message = `Changed the number of ${person.name}`
          setError(false)
          renderNotification(message)
        })
        .catch(error => {
          const message = `Information of ${person.name} has already been removed from server`
          setError(true)
          renderNotification(message)
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personServices.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      const message = `Deleted ${person.name}`
      setError(false)
      renderNotification(message)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error} />
      <Filter filter={newFilter} filterChangeHandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameChangeHandler={handleNameChange}
        numberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} onButtonClick={deletePerson} />
    </div>
  )
}

export default App