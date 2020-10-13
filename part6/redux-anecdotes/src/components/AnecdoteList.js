import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

import { voteCreator } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  let lastVote = ''

  const filter = state.filter

  const vote = (id) => {
    const voteAnecdote = state.anecdotes.find(anecdote => anecdote.id === id)

    lastVote = voteAnecdote.content

    dispatch(voteCreator(voteAnecdote))

    dispatch({
      type: 'SORT'
    })

    dispatch(setNotification('You voted for ' + String(lastVote), 5))
  }

  const filteredAnecdotes = state.anecdotes.filter(anecdote => String(anecdote.content).toLowerCase().includes(filter))

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

