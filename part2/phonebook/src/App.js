import React, { useState, useEffect } from "react";
import personService from './services/persons';

const Button = (props) => {

  return <button onClick={props.onClick}>{props.text}</button>;
};

const Person = ({ person, handleRemove }) => {
  console.log('personobject', person)
  console.log(person.id)
  return <li >{person.name} {person.number} <Button onClick={() => {handleRemove(person.id)}} text="delete"/></li>;
};

const Filter = ({showAll, handleFilter}) => {
  return <p>filter shown with <input value={showAll} onChange={handleFilter}/></p>

}

const PersonForm = ({addName, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({contactsToShow, handleRemove}) => {
  return (
    <ul style={{listStyle:'none', padding:'0px'}}>
      {contactsToShow.map(person => 
          <Person key={person.name} person={person} handleRemove={handleRemove}/>
        )}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log('fetchdata', error)
    })
  }, [])

  console.log('render', persons.length, 'persons')

    

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (!checkDuplicate(personObject)){
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("");
        setNewNumber('');
      })
      .catch(error => {
        console.log('addName', error)
      })
    }

    
    console.log("persons", persons);
  };

  
  

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  const checkDuplicate = (props) => {
    console.log("checkDuplicate", props.name);
    const result = persons.find(({name}) => name  === props.name) 
    if (result) {
      alert(`${props.name} is already added to phonebook`);
    }
    return (result === undefined) ? false : true 

  };

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(`${showAll}`.toLowerCase()))

  const handleRemove = (id) => {
    console.log('handleREmove', id)
    const person = persons.filter(p => p.id === id)
    console.log('persons', persons)
    console.log('person', person[0].name)
    
    if(window.confirm(`Delete ${person[0].name}?`)) {
      personService
      .remove(id)
      .then(() => {

        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log('error deleting', error)
      })
    };
  
  } 
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleFilter={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} handleRemove={handleRemove} />
      
    </div>
  );
};

export default App;
