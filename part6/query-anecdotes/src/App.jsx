import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import * as ancedotesServices from './services/ancedotes.js';
import { useNotificationDispatch } from './contex/notificationContex.jsx';

const App = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const showNotification = (message) => {
		dispatch({ type: 'SHOW', message })
		setTimeout(() => {
			dispatch({ type: 'CLEAR' })
		}, 5000)
	}

	const newUpdateMutation = useMutation({
		mutationFn: ancedotesServices.voteAncedotes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
		},
	});

	const handleVote = (anecdote) => {
		const { votes } = anecdote;

		newUpdateMutation.mutate({ ...anecdote, votes: votes + 1 });

		const message = `anecdote '${anecdote.content}' voted`
		showNotification(message)
	};

	const anecdotes = useQuery({
		queryKey: ['anecdotes'],
		queryFn: ancedotesServices.getAncedotes,
		retry: false,
	});

	return (
		<>
			{anecdotes.isError && (
				<div>anecdote service not available due to problems in server</div>
			)}

			{anecdotes.isSuccess && (
				<div>
					<h3>Anecdote app</h3>

					<Notification />
					<AnecdoteForm />

					{anecdotes.data &&
						anecdotes.data.map((anecdote) => (
							<div key={anecdote.id}>
								<div>{anecdote.content}</div>
								<div>
									has {anecdote.votes}
									<button onClick={() => handleVote(anecdote)}>vote</button>
								</div>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default App;
