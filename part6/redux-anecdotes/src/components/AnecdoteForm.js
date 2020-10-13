import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import React from 'react'

const AnecdoteForm = (props) => {

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.anecdoteCreator(content)

    props.setNotification('You added: ' + content, 5)

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

export default connect(
  null,
  { anecdoteCreator, setNotification }
)(AnecdoteForm)