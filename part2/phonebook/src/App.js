import React, { useState } from "react";

const Person = ({ person }) => {
  return <li >{person.name} {person.number}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true)

  const checkDuplicate = (props) => {
    console.log("checkDuplicate", props.name);
    const result = persons.find(({name}) => name  === props.name) 
    if (result) {
      alert(`${props.name} is already added to phonebook`);
    }
    return (result === undefined) ? false : true 
 
    
  };

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
      <p>filter shown with</p>
      <h2>Add new contact</h2>
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
      <h2>Numbers</h2>
      <ul style={{listStyle:'none', padding:'0px'}}>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
