import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import firebase from "firebase/app";
import firebaseui from "firebaseui";

function LoginEmail() {
	return (
		<Card className="login-modal">
			<h2>
				Login to your SkillGraph account
			</h2>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
				</Form.Group>
				<Button variant="warning" className="text-white" type="submit">
					Submit
				</Button>
			</Form>
		</Card>
	)
}

function SignupEmail() {
	return (
		<Card className="signup-modal">
			<h2>
				Signup for a SkillGraph account
			</h2>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
				</Form.Group>
				<Button variant="warning" className="text-white" type="submit">
					Submit
				</Button>
			</Form>
		</Card>
	)
}

const firebaseApp = firebase.initializeApp({});
function firebaseLogin() {
	var ui = new firebaseui.auth.AuthUI(firebase.);
}


function Access() {
	const router = useRouter();

	if (router.query.page === 'login') {
		return (
			<LoginEmail />
		)
	} else if (router.query.page === 'signup') {
		return (
			<div>
				<SignupEmail />
			</div>
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