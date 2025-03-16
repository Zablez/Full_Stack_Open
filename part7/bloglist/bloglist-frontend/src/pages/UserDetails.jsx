import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchUserList } from "../reducers/slice/userListReducer";
import { ListGroup, ListGroupItem } from 'reactstrap'

const UserDetails = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserList())
	}, [dispatch])


	const users = useSelector(state => state.userList)

	const id = useParams().id

	const user = users.find(n => n.id === id)
	return (
		<>{user &&
			<>
				<h3 className="fw-bold mb-5">{user.username}</h3>

				<h6>Added blogs</h6>

				<ListGroup>
					{user.blogs.map(b => (
						<ListGroupItem key={b.id}>{b.title}</ListGroupItem>
					))}
				</ListGroup>
			</>
		}
		</>
	)
}

export default UserDetails