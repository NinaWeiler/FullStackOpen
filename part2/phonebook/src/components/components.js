import React from 'react';
import '../index.css'

export const Notification = ({message, messageStyle}) => {
    if (message === null) {
        return null
    }
    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
}

const Button = (props) => {

    return <button onClick={props.onClick}>{props.text}</button>;
  };
  
  const Person = ({ person, handleRemove }) => {
    console.log('Person', person)
    console.log(person.id)
    return <li >{person.name} {person.number} <Button onClick={() => {handleRemove(person.id)}} text="delete"/></li>;
  };
  
 export const Filter = ({showAll, handleFilter}) => {
    return <p>filter shown with <input value={showAll} onChange={handleFilter}/></p>
  
  }
  
 export const PersonForm = ({addName, newName, handleNewName, newNumber, handleNewNumber}) => {
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
  
 export const Persons = ({contactsToShow, handleRemove}) => {
    return (
      <ul style={{listStyle:'none', padding:'0px'}}>
        {contactsToShow.map(person => 
            <Person key={person.name} person={person} handleRemove={handleRemove}/>
          )}
        </ul>
    )
  }