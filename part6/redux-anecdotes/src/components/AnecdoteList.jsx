/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { initializeAnecdote, voteAncedots} from '../reducers/slice/anecdoteReducer';
import { useEffect } from 'react';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ quotes, filter }) => {
    if (filter) {
      const regex = new RegExp(filter, 'i');
      return quotes.filter((q) => q.content.match(regex));
    } else {
      return quotes;
    }
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAncedots(anecdote));
  };

  useEffect(() => {
    dispatch(initializeAnecdote());
  }, [dispatch]);

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
