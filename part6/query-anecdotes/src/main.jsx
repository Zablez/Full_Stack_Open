import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationContexProvider from './contex/notificationContex'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<NotificationContexProvider>
			<App />
		</NotificationContexProvider>
	</QueryClientProvider>
);
