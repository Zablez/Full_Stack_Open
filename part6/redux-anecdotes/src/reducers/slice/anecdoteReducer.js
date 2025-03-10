import { createSlice } from "@reduxjs/toolkit"
import * as ancedotesService from '../../services/anecdotes'
import { setNewNotification } from "./notificationReduver"


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addNew(state, action) {
      state.push(action.payload)
    },
    voteById(state, action) {
      const id = action.payload
      const toChange = state.find(q => q.id === id)
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };
      return state.map(n => n.id !== id ? n : changed).sort((a, b) => b.votes - a.votes)
    },
    setAncedotes(state, action) {
      return action.payload
    },
  }
})

export const { addNew, voteById, setAncedotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await ancedotesService.getAll()
    dispatch(setAncedotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await ancedotesService.createNew(content)
    dispatch(addNew(newAnecdote))
  }
}

export const voteAncedots = (object) => {
  return async dispatch => {
    const { id } = object

    await ancedotesService.update(object)
    dispatch(voteById(id))
    dispatch(setNewNotification(`You voted for ${object.content}`,3000))
  }
}

export default anecdoteSlice.reducer