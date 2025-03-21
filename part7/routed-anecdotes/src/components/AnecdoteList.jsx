import { Link } from "react-router-dom";

import Notification from './Notification'

const AnecdoteList = ({ notification, anecdotes }) => {
    return (
        <div>
            <Notification notification={notification} />
            <br />
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote => <li key={anecdote.id} >
                    <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>)}
            </ul>
        </div>
    )
}

export default AnecdoteList;