
import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import app from '@realm/config';
import Navbar from '@/components/Navbar';

function CompleteResetPassword() {

	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const [success, setSuccess] = React.useState<boolean>(false);
	const router = useRouter();

	const handleForm = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const token: string | string[] | undefined = router.query.token;
		const tokenId: string | string[] | undefined = router.query.tokenId;
		if (!token || !tokenId) {
			setError(true);
			setErrorMessage('Invalid or expired reset link!');
		}
		if (password.length < 6) {
			setError(true);
			setErrorMessage('Password must be at least 6 characters');
		}
		if (password !== confirmPassword) {
			setError(true);
			setErrorMessage('Passwords do not match');
		}

		try {
			if (typeof token === 'string' && typeof tokenId === 'string' && error === false) {
				await app.emailPasswordAuth.resetPassword({ password, token, tokenId })
			}
		} catch (error) {
			setError(true);
			if (error?.message.search("invalid") !== -1) {
				setErrorMessage('Invalid or expired reset link!');
			} else {
				setErrorMessage(error?.message);
			}
		}

	}
	return (
		<div>
			<Navbar />
			<Card className="login-modal">
				<h2>
					Enter new password
				</h2>
				<h4>
				</h4>
				{error &&
					<Alert variant="danger">
						{errorMessage}. Please try again.
					</Alert>
				}
				{success &&
					<Alert>
						Password reset successful!
					</Alert>
				}
				<Form onSubmit={handleForm}>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Enter new password</Form.Label>
						<Form.Control onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="New password" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Confirm new password</Form.Label>
						<Form.Control onChange={(e) => setConfirmPassword(e.target.value)} required type="password" placeholder="Confirm password" />
					</Form.Group>
					<Button variant="warning" className="text-white" type="submit">
						Submit
					</Button>
				</Form>
			</Card>
		</div>
	)
}

export default CompleteResetPassword;