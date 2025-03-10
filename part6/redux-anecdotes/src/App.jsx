import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { removeNotification } from './reducers/slice/notificationReduver';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeNotification());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>

      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
