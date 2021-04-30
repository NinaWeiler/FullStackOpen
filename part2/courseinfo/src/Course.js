import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  
  const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
  
    return (
      <strong>total of {total} exercises</strong>
    ) 
  }
  
  
  const Part = ({part}) => {
    return (
      <li >
        {part.name} {part.exercises}
      </li>    
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        <ul style={{listStyle:'none', padding:'0px'}}>
          {course.map(part => 
            <Part key={part.name} part={part} />
          )}
        </ul>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }




  export default Course;