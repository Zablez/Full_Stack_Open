import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	const { isError, message } = notification

	return <>
		{
			message && <div className={`notification ${isError ? 'error' : ''}`}>{message}
			</div>
		}
	</>
}

export default Notification
