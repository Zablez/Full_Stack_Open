import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW":
			return action.message
		case "CLEAR":
			return null
		default:
			return ''
	}
}

const NotificationContex = createContext()

export const useNotificationValue = () => {
	const notificationDispatch = useContext(NotificationContex)
	return notificationDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationDispatch = useContext(NotificationContex)
	return notificationDispatch[1]
}

export const NotificationContexProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null)

	return (
		<NotificationContex.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContex.Provider>
	)
}

export default NotificationContexProvider;
