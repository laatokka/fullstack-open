import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ part }) => {
  return (
    <div>
      {part.map((p) =>
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      )}
    </div>
  )
}

const Total = ({ exercises }) => {
  let sum = 0
  exercises.forEach((ex) => {
    sum += ex.exercises
  })

  return (
    <p><b>Number of exercises {sum}</b></p>
  )
}

const Course = (props) => {
  console.log(props)
  return (
    <div>
      <Header name={props.course.name} />
      <Content part={props.course.parts} />
      <Total exercises={props.course.parts} />
    </div>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Adding a rogue component',
        exercises: 77,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))