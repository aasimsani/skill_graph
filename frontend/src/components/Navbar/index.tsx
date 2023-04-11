import { useRouter } from "next/router"
import Link from "next/link"
import React from "react";
import styles from "./Navbar.module.css"

function Navbar() {
	const router = useRouter();

	return (
		<div className={styles.navbar}>
			<div className={styles.logo}>SkillGraph</div>

			<div className={styles.access}>
				<Link href={{ pathname: '/access', query: { page: 'login' } }}>Login</Link>
				<Link href={{ pathname: '/access', query: { page: 'signup' } }}>Signup</Link>
			</div>
		</div>
	)
}

export default Navbar