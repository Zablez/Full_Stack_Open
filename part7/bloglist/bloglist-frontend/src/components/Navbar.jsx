import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, Nav, Navbar, NavbarText, NavItem } from "reactstrap";

const Menu = () => {
	const user = useSelector(state => state.user)

	const dispatch = useDispatch();

	const handleLogout = async () => {
		window.localStorage.clear();
		dispatch(removeUser(null));
	};

	return (
		<>
			<h2>Blogs</h2>
			<Navbar color="light" className="mb-4">
				<Nav className="d-flex flex-row me-auto" navbar>
					<NavItem>
						<NavLink><Link className="text-black fw-bold" to="/">Blogs</Link></NavLink>
					</NavItem>
					<NavItem>
						<NavLink className={'m-4'}><Link className="text-black fw-bold" to="/users">Users</Link></NavLink>
					</NavItem>
				</Nav>
				<div className="mx-2">
					{`${user.name} logged in`}
				</div>
				<Button outline onClick={handleLogout}>logout</Button>
			</Navbar>
		</>
	)
}

export default Menu;