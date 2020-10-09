
export const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

export const anecdoteCreator = (content) => {
  return {
    type: 'ADD',
    data: content
  }
}

export const voteCreator = (anecdote) => {
  return {
    type: 'VOTE',
    data: {
      content: anecdote
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
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