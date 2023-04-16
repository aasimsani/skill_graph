
import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import app from '@realm/config';

function CompleteResetPassword() {

	const [password, setPassword] = React.useState<string>('');
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
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
		if (typeof token === 'string' && typeof tokenId === 'string') {
			await app.emailPasswordAuth.resetPassword({ password, token, tokenId })
		}
		console.log('form submitted');
		try {
		} catch (error) {
			setError(true);
			setErrorMessage(error?.message);
		}

	}
	return (
		<Card className="login-modal">
			<h2>
				Enter new password
			</h2>
			<h4>
			</h4>
			{error &&
				<div className="alert alert-danger" role="alert">
					{errorMessage}. Please try again.
				</div>
			}
			<Form onSubmit={handleForm}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Enter new password</Form.Label>
					<Form.Control onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter email" />
				</Form.Group>
				<Button variant="warning" className="text-white" type="submit">
					Submit
				</Button>
			</Form>
		</Card>
	)
}

export default CompleteResetPassword;