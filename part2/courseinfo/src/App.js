import React from 'react';
import Course from './Course'


const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course}/>
        )}
    </div>
  )

}
 
const App = () => {
  const courses = [
    {
    name: 'Half Stack application development',
    id:1,
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
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  },
  { 
    name: 'Node.js',
    id: 2,
    parts: [
    {
      name: 'Routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
  }
]
  
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>
    </div>
  )
}

export default App;