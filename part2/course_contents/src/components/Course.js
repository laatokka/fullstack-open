import React from 'react'

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

const Total = ({ ex }) => {
    const total = Object.values(ex).reduce((acc, { exercises }) => acc + exercises, 0)

    return (
        <p><b>Number of exercises {total}</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content part={course.parts} />
            <Total ex={course.parts} />
        </div>
    )

}

export default Course