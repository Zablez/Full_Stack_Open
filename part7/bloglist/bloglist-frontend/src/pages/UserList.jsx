
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../reducers/slice/userListReducer';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const UserList = () => {
	const users = useSelector(state => state.userList)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserList())
	}, [dispatch])

	const style = {
		width: '45px'
	}

	return (
		<>
			<h2>Users</h2>
			<Table borderless>
				<thead>
					<tr>
						<th>
							#
						</th>
						<th>
							BLogs Created
						</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 && users.map((user) => (
						<tr key={user.id}>
							<td style={style}>
								<Link to={`${user.id}`}>
									{user.username}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default UserList;