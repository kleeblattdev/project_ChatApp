import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;
	const userRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(false);
	const nav = useNavigate();

	const signUp = async () => {
		try {
			const res = await fetch(url + "signup", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					user: userRef.current.value,
					password: passwordRef.current.value,
				}),
			});
			if (!res.ok) {
				setError(true);
			} else {
				await res.json();
				window.alert("Successfully signed up!");
				userRef.current.value = "";
				passwordRef.current.value = "";
			}
		} catch (e) {
			console.log(e);
		}
	};

	const singIn = async () => {
		try {
			const res = await fetch(url + "/signin", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					user: userRef.current.value,
					password: passwordRef.current.value,
				}),
			});
			if (!res.ok) {
				setError(true);
			} else {
				nav("chatroom");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<main>
			<section>
				<label htmlFor="user">
					username:
					<input
						type="text"
						name="user"
						id="user"
						placeholder="username"
						ref={userRef}
					/>
				</label>
				<label htmlFor="password">
					password:
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						ref={passwordRef}
					/>
				</label>
				<button type="submit" onClick={signUp}>
					Sign Up
				</button>
				<button type="submit" onClick={singIn}>
					Sign In
				</button>
				{error && <p>Something went wrong</p>}
			</section>
		</main>
	);
};

export default Home;
