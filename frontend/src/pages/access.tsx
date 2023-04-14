import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import app from "@realm/config"
import * as Realm from "realm-web";
import { type } from "os";
import Cookies from 'universal-cookie'

interface LoginSignupProps {
	handleForm: (e: React.SyntheticEvent) => void;
	setEmail: (email: string) => void;
	headerText: string;
	error: boolean;
	errorMessage?: string;
}

interface User {
	user: Realm.User;
}

function setCookie(user: Realm.User) {

	const cookies = new Cookies()
	cookies.set('user', user, { path: '/' })

}

function checkLoggedIn() {
	const user: Realm.User | null = app.currentUser

	if (user) {
		if (user.isLoggedIn) {
			return true
		} else {
			return false
		}
	}
	return false
}

function Logout() {
	const cookies = new Cookies()
	const user: Realm.User = cookies.get('user')

	return (
		<Button variant="warning" className="text-white" onClick={() => { user.logOut(); cookies.remove('user') }}>
			Logout
		</Button>
	)
}

function LoginSignupForm({ handleForm, setEmail, headerText, error, errorMessage }: LoginSignupProps) {
	return (
		<Card className="login-modal">
			<h2>
				{headerText}
			</h2>
			{error &&
				<div className="alert alert-danger" role="alert">
					{errorMessage}. Please try again.
				</div>
			}
			<Form onSubmit={handleForm}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We will never share your email with anyone else! We only need it so you can access your Skill graphs.
					</Form.Text>
				</Form.Group>
				<Button variant="warning" className="text-white" type="submit">
					Submit
				</Button>
			</Form>

		</Card>
	)
}

function LoginEmail() {
	const [email, setEmail] = React.useState('')
	const [loginError, setLoginError] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')

	if (checkLoggedIn()) {
		// Insert redirect
	} else {
		const handleForm = async (event: React.SyntheticEvent) => {
			event.preventDefault()
			const credentials = Realm.Credentials.emailPassword(email, email)
			try {
				const user: Realm.User = await app.logIn(credentials)
			} catch (error) {
				setLoginError(true)
				if (error?.message.search("invalid username") !== -1) {
					setErrorMessage("Invalid username")
				}

			}

		}
		return (
			<div>

				<LoginSignupForm handleForm={handleForm} setEmail={setEmail} headerText="Login to your SkillGraph account" error={loginError} errorMessage={errorMessage} />
				<Logout />

			</div>
		)

	}

	return (<div></div>)
}

function SignupEmail() {
	const [email, setEmail] = React.useState('')
	const router = useRouter()
	const [sigupError, setSignupError] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')

	const handleForm = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		try {
			await app.emailPasswordAuth.registerUser({ email: email, password: email })
		} catch (error) {
			setSignupError(true)
			if (error?.message.search("name already in use") !== -1) {
				setErrorMessage("Email already in use")
			}
			console.log(error)
		}

		const credentials = Realm.Credentials.emailPassword(email, email)
		const user: Realm.User = await app.logIn(credentials)
		// Insert redirect post successful signup


	}

	return (
		<LoginSignupForm handleForm={handleForm} setEmail={setEmail} headerText="Signup for a SkillGraph account" error={sigupError} errorMessage={errorMessage} />
	)
}



function Access() {
	const router = useRouter();

	if (router.query.page === 'login') {
		return (
			<LoginEmail />
		)
	} else if (router.query.page === 'signup') {
		return (
			<SignupEmail />
			// <FirebaseSignup />
		)
	} else {
		return (
			<div>
				404
			</div>
		)
	}

}

export default Access;