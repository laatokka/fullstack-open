import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import React from 'react'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''

    const postAnecdote = await anecdoteService.createNew(content)

    dispatch(anecdoteCreator(postAnecdote))

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

