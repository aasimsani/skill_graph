import Realm from "realm-web"

export function checkLoggedIn(app: Realm.App) {
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
