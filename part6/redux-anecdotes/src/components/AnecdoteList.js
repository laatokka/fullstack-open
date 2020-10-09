import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

import { voteCreator } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  let lastVote = ''

  const filter = state.filter

  const vote = (id) => {
    const voteAnecdote = state.anecdotes.find(anecdote => anecdote.id === id)
    voteAnecdote.votes += 1

    lastVote = voteAnecdote.content

    dispatch(voteCreator(voteAnecdote))

    dispatch({
      type: 'SORT'
    })

    dispatch(showNotification('You voted for ' + String(lastVote)))

    setTimeout(() => {
      dispatch(hideNotification(null))
    }, 5000);
  }

  const filteredAnecdotes = state.anecdotes.filter(anecdote => String(anecdote.content).toLowerCase().includes(filter))

  console.log(state.anecdotes)
  if (filter === '') {
    return (
      <div>
        {state.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {filteredAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
               {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
  export default AnecdoteList

