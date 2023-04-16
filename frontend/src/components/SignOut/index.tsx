import { useRouter, NextRouter } from 'next/router'
import app from '@realm/config'
import { Button } from 'react-bootstrap';

async function logoutUser(router: NextRouter) {
	const user: Realm.User | null = app.currentUser
	console.log(user);
	if (user) {
		await user.logOut();
		router.push('/')
	}
}
function SignOut() {
	const router = useRouter();
	return (
		<div>
			<Button onClick={(e) => { logoutUser(router) }}>Sign out</Button>
		</div >
	)
}

export default SignOut;