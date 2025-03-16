const Anecdote = ({ anecdote }) => {
    return (
        <>
            <h1>{anecdote.content}</h1>
            <div>has {anecdote.votes} votes</div>
            <div>fir more info see <a href={anecdote.info}>
                {anecdote.info}
            </a> votes</div>
        </>
    )
}

export default Anecdote