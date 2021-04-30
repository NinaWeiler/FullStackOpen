import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

/*
const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}
*/

const Part = ({part}) => {
  console.log(part)
  return (
    <li>
      {part.name} {part.exercises}
    </li>    
  )
}

const Content = ({course}) => {
  console.log('content', course)
  return (
    <div>
      <ul>
        {course.map(part => 
          <Part key={part.name} part={part} />
        )}
      </ul>
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <Header course={course}/>
      <Content course={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App;