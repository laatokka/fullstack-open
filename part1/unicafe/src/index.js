import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback yet...
      </div>
    )
  }
  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + bad + neutral} />
      <Statistic text="average" value={(good - bad) / (good + bad + neutral)} />
      <Statistic text="positive" value={100 * good / (good + bad + neutral) + '%'} />
    </table>
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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)