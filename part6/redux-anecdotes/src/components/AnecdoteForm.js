import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import React from 'react'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''

    dispatch(anecdoteCreator(content))
  }

  return (
    <div>
      <form onSubmit={newAnecdote}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default AnecdoteForm

