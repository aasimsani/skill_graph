import { useRouter } from 'next/router'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleButton from '@components/GoogleAuthButton';
import { checkLoggedIn } from '@utils/authUtils';
import app from '@realm/config'
import { Card, Alert, Button, Form } from 'react-bootstrap';
import Navbar from '@components/Navbar';
import React from 'react'
import * as Realm from 'realm-web';
import Link from 'next/link';


function Signup() {
	const router = useRouter();
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');

	if (checkLoggedIn(app)) {
		router.push('/graphIndex')
	}

	const handleForm = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (password.length < 6) {
			setError(true);
			setErrorMessage('Password must be at least 6 characters');
			return;
		}

		if (password !== confirmPassword) {
			setError(true);
			setErrorMessage('Passwords do not match');
			return;
		}

		try {
			await app.emailPasswordAuth.registerUser({ email: email, password: password })
		} catch (error) {
			setError(true)
			if (error?.message.search("name already in use") !== -1) {
				setErrorMessage("Email already in use")
			}
		}
		const credentials: Realm.Credentials = Realm.Credentials.emailPassword(email, password)
		const user: Realm.User = await app.logIn(credentials)
		if (user.isLoggedIn) {
			router.push('/graphIndex')
		}

	}


	return (
		<div>
			<Navbar />
			<Card>
				<Card.Header as="h2">
					Signup for a Skill Graph account! </Card.Header>
				<Card.Body>
					{error &&
						<Alert variant="danger" role="alert">
							{errorMessage}. Please try again.
						</Alert>
					}
					<Form onSubmit={handleForm}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
							<Form.Text className="text-muted">
								We will never share your email with anyone else! We only need it so you can access your Skill graphs.
							</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
						</Form.Group>
						<Button variant="warning" className="text-white" type="submit">
							Submit
						</Button>
						<div className="text-lg">
							Forgot your password? <Link href="/resetPassword">Reset it here</Link>
						</div>
					</Form>
					<GoogleButton setError={setError} setErrorMessage={setErrorMessage} />
				</Card.Body>
			</Card>
		</div>
	)
}


export default Signup;