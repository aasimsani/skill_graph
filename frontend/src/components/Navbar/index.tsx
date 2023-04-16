import { useRouter } from "next/router"
import Link from "next/link"
import React from "react";
import styles from "./Navbar.module.css"
import app from "@realm/config"
import SignOut from "@/components/SignOut";

type Link = {
	pathname: string,
	query?: {
		page: string
	}
}

type LinksList = {
	text: string,
	href: Link | string
}


function Navbar() {
	const router = useRouter();
	const user: Realm.User | null = app.currentUser

	if (user) {
		if (user.isLoggedIn) {
			return (
				<div className={styles.navbar}>
					<div className={styles.logo}>SkillGraph</div>
					<div className={styles.access}>
						<Link href="/graphIndex">Your Graphs</Link>
						<Link href="/createGraph">Create Graph</Link>
						<SignOut />
					</div>
				</div>
			)
		} else {
			return (
				<div className={styles.navbar}>
					<div className={styles.logo}>SkillGraph</div>
					<div className={styles.access}>
						<Link href={{ pathname: "/access", query: { page: "signup" } }}>Sign up</Link>
						<Link href={{ pathname: "/access", query: { page: "login" } }}>Log in</Link>
					</div>
				</div>
			)
		}

	} else {

		return (
			<div className={styles.navbar}>
				<div className={styles.logo}>SkillGraph</div>
				<div className={styles.access}>
					<Link href={{ pathname: "/access", query: { page: "signup" } }}>Sign up</Link>
					<Link href={{ pathname: "/access", query: { page: "login" } }}>Log in</Link>
				</div>
			</div>
		)

	}

}

export default Navbar