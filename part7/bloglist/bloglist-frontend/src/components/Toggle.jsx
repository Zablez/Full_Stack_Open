import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div className='mb-5'>
			<div style={hideWhenVisible}>
				<Button outline onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			{visible && (
				<div style={showWhenVisible}>
					{props.children}
					<Button outline className='d-flex' onClick={toggleVisibility}>cancel</Button>
				</div>
			)}
		</div>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}
