import { useState } from 'react'


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, bad, neutral } = props;

  const sum = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  const positive = `${(good / sum) * 100} %`

  return (
    <>
      <br /><br />
      <h2>statistics</h2>
      {!sum && <div>No feedback given</div>}

      {sum > 0 &&
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={sum} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} />
            </tbody>
          </table>
        </>
      }
    </>
  )
}



const Button = (props) => {
  return (
    <button onClick={() => props.handleClick()}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => {
    setGood(good + 1);
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1);
  }

  const handleBadReview = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodReview} text={'good'} />
      <Button handleClick={handleNeutralReview} text={'neutral'} />
      <Button handleClick={handleBadReview} text={'bad'} />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App