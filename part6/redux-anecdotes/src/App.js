import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App