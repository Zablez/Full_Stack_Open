import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const AnecdoteView = (props) => {
  return (
    <>
      {props.anecdote}
      < div > has {props.vote} votes</div >
    </>
  )
}

const MostVoted = (props) => {
  return (
    <div>
      <div>{props.anecdote}</div>
      <div>has {props.vote} votes</div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.handleClick()}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votedArr, setVotedArr] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const maxVoted = Math.max(...votedArr)
  const indexofMax = votedArr.indexOf(maxVoted)

  const voteClick = () => {
    const newVotes = [...votedArr]
    newVotes[selected] += 1
    setVotedArr(newVotes)
  }

  return (
    <div>
      <Title title={'Anecdote of the day'} />

      <AnecdoteView anecdote={anecdotes[selected]} vote={votedArr[selected]}/>
      <br /><br />

      <Button handleClick={nextAnecdote} text={'Next Anecdote'} />
      <Button handleClick={voteClick} text={'vote'} />
      <br /><br />

      <Title title={'Anecdote with most vote'} />
      <MostVoted vote={maxVoted} anecdote={anecdotes[indexofMax]} />

    </div>
  )
}

export default App