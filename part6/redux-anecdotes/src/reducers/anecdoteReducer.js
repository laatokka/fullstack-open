import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

export const anecdoteCreator = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
    
  }
}

export const voteCreator = (anecdote) => {
  return async dispatch => {
    const updateVote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updateVote
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case 'ADD':
      return [...state, action.data]
    case 'SORT':
      return [...state].sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer