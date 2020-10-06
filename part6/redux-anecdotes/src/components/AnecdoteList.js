import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

import { voteCreator } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    const voteAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    voteAnecdote.votes += 1

    dispatch(voteCreator(voteAnecdote))

    dispatch({
      type: 'SORT'
    })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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

export default AnecdoteList

