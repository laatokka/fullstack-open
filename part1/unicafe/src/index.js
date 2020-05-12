import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ value, text }) => {
  return (
    <div>
      {text} : {value}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <h2>Statistics</h2>
      <div>
        <Statistics value={good} text="good" />
        <Statistics value={neutral} text="neutral" />
        <Statistics value={bad} text="bad" />
      </div>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)