import { useState, useEffect } from 'react';
import axios from "axios";


const Filter = ({onChangeFunc, filterString}) => {
  return(
    <div>filter shown with <input onChange={onChangeFunc} value={filterString}/></div>
  )
}

const Form = (props) =>{
  return (
    <form onSubmit = {props.onSubmitFunc}>
        <div>name: <input onChange={props.handleAddPersonOnChange} value={props.newName}/></div>
        <div>number: <input onChange={props.handleAddNumberOnChange} value={props.newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({name, number}) =>{
  return <p>{name} {number}</p>
}

const Display = ({persons, filterString}) =>{
  return(
    <div>
      {
      persons
      .filter(person => person.name.toLowerCase().startsWith(filterString))
      .map((person,index) => <Person key={index} name={person.name} number={person.number}/>)
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const hook = () =>{
    axios
    .get("http://localhost:3001/persons")
    .then(response =>{
      console.log(response.data)
      setPersons(response.data)
    })
  }
  useEffect(hook,[])


  const handleAddPerson = (event) =>{
    event.preventDefault()
    var newPerson = {name: newName, number: newNumber}
    if(persons.filter(person => person.name === newName).length){
      alert(`${newName} is already added to phonebook`)
    }
    else if(persons.filter(person => person.number === newNumber).length){
      alert(`${newNumber} is already added to phonebook`)
    }
    else if(!newName && !newNumber){
      alert(`Name and Number are required fields`)
    }
    else if(!newName){
      alert(`Name is a required field`)
    }
    else if(!newNumber){
      alert(`Number is a required field`)
    }
    else{
      setPersons(persons.concat(newPerson))
    }
  }

  const handleAddPersonOnChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleAddNumberOnChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterOnChange = (event) =>{
    setFilterString(event.target.value.toLowerCase())
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeFunc={handleFilterOnChange} filterString={filterString}/>
      <Form onSubmitFunc={handleAddPerson} handleAddPersonOnChange={handleAddPersonOnChange} handleAddNumberOnChange={handleAddNumberOnChange}
      newName = {newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Display persons={persons} filterString={filterString}/>
    </div>
  )
}

export default App