import React, { useState } from "react";

const Person = ({ person }) => {
  return <li >{person.name} {person.number}</li>;
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

const Persons = ({contactsToShow}) => {
  return (
    <ul style={{listStyle:'none', padding:'0px'}}>
      {contactsToShow.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState('')

  const checkDuplicate = (props) => {
    console.log("checkDuplicate", props.name);
    const result = persons.find(({name}) => name  === props.name) 
    if (result) {
      alert(`${props.name} is already added to phonebook`);
    }
    return (result === undefined) ? false : true 
 
    
  };

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(`${showAll}`.toLowerCase()))


    const handleFilter = (event) => {
      setShowAll(event.target.value)
    }


  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (!checkDuplicate(nameObject)){
    setPersons(persons.concat(nameObject));
    }
    setNewName("");
    setNewNumber('');
    
    console.log("persons", persons);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleFilter={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} />
      
    </div>
  );
};

export default App;
