import React, { useState } from "react";

const Person = ({ person }) => {
  console.log("person", person);
  return <li >{person.name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const checkDuplicate = (event) => {
    console.log("checkDuplicate", event.target);
    console.log("name", event.target.value);
    alert(`${newName} is already added to phonebook`);
  };

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    console.log("persons", persons);
  };

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
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
