import { useState, useEffect } from "react";
import phoneService from "./services/phonebook";

const Filter = ({ onChangeFunc, filterString }) => {
  return (
    <div>
      filter shown with <input onChange={onChangeFunc} value={filterString} />
    </div>
  );
};

const Form = (props) => {
  return (
    <div>
    <h2>add a new</h2>
    <form onSubmit={props.onSubmitFunc}>
      <div>
        name:{" "}
        <input onChange={props.handleAddPersonOnChange} value={props.newName} />
      </div>
      <div>
        number:{" "}
        <input
          onChange={props.handleAddNumberOnChange}
          value={props.newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  );
};

const Person = ({ name, number, onDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={onDelete}>delete</button>
    </div>
  );
};

const Display = ({ persons, filterString, onDelete}) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().startsWith(filterString))
        .map((person, index) => (
          <Person
            key={index}
            name={person.name}
            number={person.number}
            onDelete = {() => onDelete(index+1, person.name)}
          />
        ))}
    </div>
  );
};

const Notification = ({ message, sent }) => {
  if (message === null) {
    return null
  }
  if (sent === "pos"){
    return (
    <div className='success'>
      {message}
    </div>
  )
  }
  else{
    return (
    <div className='error'>
      {message}
    </div>
  )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifSentiment, setNotifSentiment] = useState("");

  const hook = () => {
    phoneService.getAll().then((personsData) => {
      setPersons(personsData);
    });
  };
  useEffect(hook, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    var newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };
    if (persons.filter((person) => person.name === newName).length) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        console.log("Modify contact")
        handleModifyPerson(newName, newNumber)
      }
      else{
        console.log("Do not modify any contact")
      }
    } else if (persons.filter((person) => person.number === newNumber).length) {
      alert(`${newNumber} is already added to phonebook`);
    } else if (!newName && !newNumber) {
      alert(`Name and Number are required fields`);
    } else if (!newName) {
      alert(`Name is a required field`);
    } else if (!newNumber) {
      alert(`Number is a required field`);
    } else {
      phoneService.addPerson(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNotifMessage(`Added ${newPerson.name}`)
        setNotifSentiment("pos")
      });
    }
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?` )) {
    setPersons(persons.filter((person) => person.id != id))
      phoneService
    .deletePerson(id)
    .then(response => console.log(response))
    .catch(() => console.log("This person has already been deleted"))

    setNotifMessage(`${name} has been deleted`)
    setNotifSentiment("pos")
    }
    else{
      console.log("DO NOT DELETE THIS PERSON")
    }
  };

  const handleModifyPerson = (name,newNumber) =>{
    const person = persons.find((person) => person.name === name);
    const changedPerson = { ...person, number: newNumber };
    const updatedPersons = persons.map(person => {
     if (person.name === newName) {
       return changedPerson
     }
     return person;
   });
   
    phoneService
    .updatePerson(changedPerson.id, changedPerson)
    .then(() => {
      setNotifMessage(`Updated number of ${name}`)
      setNotifSentiment("pos")
      setPersons(updatedPersons)
    })
    .catch(() => {
      setNotifMessage(`Information of ${name} has already been removed from the server`)
      setNotifSentiment("neg")
      setPersons(persons.filter(p => p.id !== changedPerson.id));
    })
  }

  const handleAddPersonOnChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumberOnChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterOnChange = (event) => {
    setFilterString(event.target.value.toLowerCase());
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} sent={notifSentiment}/>
      <Filter onChangeFunc={handleFilterOnChange} filterString={filterString} />
      <Form
        onSubmitFunc={handleAddPerson}
        handleAddPersonOnChange={handleAddPersonOnChange}
        handleAddNumberOnChange={handleAddNumberOnChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Display persons={persons} filterString={filterString} onDelete={handleDeletePerson}/>
    </div>
  );
};

export default App;
