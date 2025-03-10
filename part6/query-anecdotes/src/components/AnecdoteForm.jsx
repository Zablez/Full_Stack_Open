import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ancedotesServices from '../services/ancedotes.js';
import { useNotificationDispatch } from '../contex/notificationContex.jsx';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const showNotification = (message) => {
		dispatch({ type: 'SHOW', message })
		setTimeout(() => {
			dispatch({ type: 'CLEAR' })
		}, 5000)
	}

	const newMutation = useMutation({
		mutationFn: ancedotesServices.createAncedotes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
		},
		onError: () => {
			showNotification('too short anecdote, must have length 5 or more')
		}
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		newMutation.mutate({ content });

		showNotification(`ancedote ${content} created`)
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
