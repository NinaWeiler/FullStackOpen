import React, { useState, useEffect } from "react";
import personService from './services/persons';
import {Filter, PersonForm, Persons, Notification} from './components/components';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState('');
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState(null);
  

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      console.log('initialpersons', initialPersons)
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
      console.log('personObject',personObject)

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("");
        setNewNumber('');
        setMessageStyle("success");
        setMessage(`Added ${newName} to the phonebook`);
        setTimeout(() => {setMessage(null)}, 3000);
      })
      .catch(error => {
        setMessageStyle("error");
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {setMessage(null)}, 3000);
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
    console.log("checkDuplicate", props);
    console.log('duplicate persons', persons)
    const updatedPerson = persons.find(p => p.name.toLowerCase()  === props.name.toLowerCase()) 

    if (updatedPerson) {
      if(window.confirm(`${props.name} is already added to phonebook, replace the old number with a new one?`)) {
        const id = updatedPerson.id
        console.log('id', id)

        const changedPerson = {...updatedPerson, number: props.number}

        personService
        .update(id, changedPerson)
        .then(returnedPerson => {setPersons(persons.map(p => p.id !== id ? p : returnedPerson ))
          setNewName("");
          setNewNumber('');
          setMessageStyle("success")
          setMessage(`Changed ${changedPerson.name}'s number to ${changedPerson.number}`)
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(error => {
          setMessageStyle("error");
          setMessage(`${error.response.data.error}`);
          setTimeout(() => {setMessage(null)}, 3000);
        })
      } 
    } else {
        setNewName("");
        setNewNumber('');
    }
    return (updatedPerson === undefined) ? false : true 
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
        setMessageStyle("success")
        setMessage(`Removed ${person[0].name} from the phonebook`)
        setTimeout(() => {setMessage(null)}, 3000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log('error removing', error);
        setMessageStyle("error");
        setMessage(`Information of ${person[0].name} has already been removed from the server`);
        setTimeout(() => {setMessage(null)}, 3000);
        setPersons(persons.filter(p => p.id !== id));
        
      })
    };
  
  } 
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageStyle={messageStyle}/>
      <Filter showAll={showAll} handleFilter={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} handleRemove={handleRemove} />
      
    </div>
  );
};

export default App;
