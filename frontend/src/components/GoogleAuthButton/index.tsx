import { useRouter } from 'next/router'
import * as Realm from "realm-web";
import app from '@realm/config'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


interface GoogleLoginSignupButtonProps {
	setError: (error: boolean) => void;
	setErrorMessage: (message: string) => void;
}

function GoogleButton({ setError, setErrorMessage }: GoogleLoginSignupButtonProps) {
	const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
	const router = useRouter();

	async function googleLogin(googleData: any) {
		console.log(googleData)
		const credentials: Realm.Credentials = Realm.Credentials.google({ idToken: googleData.credential })
		try {
			const user: Realm.User = await app.logIn(credentials)
			if (user.isLoggedIn) {
				router.push('/graphIndex')
			}
		} catch (error) {
			setError(true)
			if (error?.message.search("invalid username") !== -1) {
				setErrorMessage("Invalid username")
			} else {
				setErrorMessage("Something went wrong with your Google Login")
			}

		}
	}
	return (
		<GoogleOAuthProvider clientId={googleClientID}>
			<div>
				<GoogleLogin onSuccess={googleLogin} onError={() => console.log("Login failed")} />
			</div>
		</GoogleOAuthProvider>
	)
}

export default GoogleButton;