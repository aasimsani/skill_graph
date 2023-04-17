import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import app from '@realm/config';
import Navbar from '@/components/Navbar';

function ResetPassword() {


	const [email, setEmail] = React.useState<string>('');
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [success, setSuccess] = React.useState<boolean>(false);

	const handleForm = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			await app.emailPasswordAuth.sendResetPasswordEmail({ email })
			setSuccess(true);
		} catch (error) {
			setError(true);
			if (error?.message.search("not found") !== -1) {
				setErrorMessage('User not found. Please sign up!');
			} else {
				setErrorMessage(error?.message);
			}
		}

	}
	return (

		<div>
			<Navbar />
			<Card className="login-modal">
				{success &&
					<Alert>Sent a password reset email</Alert>
				}
				<h2>
					Reset Password
				</h2>
				{error &&
					<Alert variant='danger'>
						{errorMessage}. Please try again.
					</Alert>
				}
				<Form onSubmit={handleForm}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>New Password</Form.Label>
						<Form.Control onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
					</Form.Group>
					<Button variant="warning" className="text-white" type="submit">
						Submit
					</Button>
				</Form>
			</Card>

		</div>
	)
}

export default ResetPassword;