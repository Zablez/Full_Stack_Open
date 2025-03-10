import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/slice/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const content = e.target.quote.value;
    e.target.quote.value='';
    dispatch(createAnecdote(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input id='quote' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
