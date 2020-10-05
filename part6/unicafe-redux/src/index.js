import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const sumValues = () => {
    const feedbackValues = store.getState()
    const total = Object.values(feedbackValues).reduce((a, b) => a + b, 0)
    return total
  }

  const averageFeedback = () => {
    const feedbackValues = store.getState()
    const total = Object.values(feedbackValues).reduce((a, b) => a + b, 0)
    const average = (store.getState().good - store.getState().bad) / total

    return average 
      ? average 
      : 0
  }

  const positivePercentage = () => {
    const feedbackValues = store.getState()
    const total = Object.values(feedbackValues).reduce((a, b) => a + b, 0)
    const positivePercentage = 100 * store.getState().good / total

    return positivePercentage
     ? positivePercentage + '%'
     : 0 + "%"
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick ={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {sumValues()}</div>
      <div>average {averageFeedback()}</div>
      <div>positive {positivePercentage()}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
