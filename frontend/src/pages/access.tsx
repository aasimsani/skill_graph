import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import React from "react";
import app from "@realm/config"
import * as Realm from "realm-web";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface LoginSignupProps {
	handleForm: (e: React.SyntheticEvent) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	headerText: string;
	error: boolean;
	errorMessage?: string;
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


function LoginSignupForm({ handleForm, setEmail, setPassword, headerText, error, errorMessage }: LoginSignupProps) {
	return (
		<div>
			<Navbar />
			<Card className="login-modal">
				<h2>
					{headerText}
				</h2>
				{error &&
					<Alert className="danger" role="alert">
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
					<Button variant="warning" className="text-white" type="submit">
						Submit
					</Button>
				</Form>
				<div className="text-lg">
					Forgot your password? <Link href="/resetPassword">Reset it here</Link>
				</div>
			</Card>
		</div>
	)
}


function LoginEmail() {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [loginError, setLoginError] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')
	const router = useRouter();

	if (checkLoggedIn()) {
		router.push('/graphIndex')
	} else {
		const handleForm = async (event: React.SyntheticEvent) => {
			event.preventDefault()
			const credentials = Realm.Credentials.emailPassword(email, password)
			try {
				const user: Realm.User = await app.logIn(credentials)
				if (user.isLoggedIn) {
					router.push('/graphIndex')
				}
			} catch (error) {
				setLoginError(true)
				if (error?.message.search("invalid username") !== -1) {
					setErrorMessage("Invalid username")
				}

			}

		}
		return (
			<div>

				<LoginSignupForm handleForm={handleForm} setEmail={setEmail} setPassword={setPassword} headerText="Login to your SkillGraph account" error={loginError} errorMessage={errorMessage} />

			</div>
		)

	}

	return (<div></div>)
}

function SignupEmail() {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const router = useRouter()
	const [sigupError, setSignupError] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('')

	const handleForm = async (event: React.SyntheticEvent) => {
		event.preventDefault()
		if (password.length < 6) {
			setSignupError(true);
			setErrorMessage('Password must be at least 6 characters');
			return;
		}

		try {
			await app.emailPasswordAuth.registerUser({ email: email, password: password })
		} catch (error) {
			setSignupError(true)
			if (error?.message.search("name already in use") !== -1) {
				setErrorMessage("Email already in use")
			}
		}

		// Insert redirect post successful signup


	}

	return (
		<LoginSignupForm handleForm={handleForm} setEmail={setEmail} setPassword={setPassword} headerText="Signup for a SkillGraph account" error={sigupError} errorMessage={errorMessage} />
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