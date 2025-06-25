"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [form, setForm] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Hardcoded admin credentials
		if (form.username === "admin" && form.password === "admin123") {
			router.push("/admin");
		} else {
			setError("Invalid credentials");
		}
	};

	return (
		<div className='max-w-sm mx-auto mt-16 bg-league-light p-8 rounded shadow border border-league-mediumdark'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark text-center'>
				Admin Login
			</h2>
			<form className='space-y-6' onSubmit={handleSubmit}>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Username
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.username}
						onChange={(e) =>
							setForm((f) => ({ ...f, username: e.target.value }))
						}
						required
						autoFocus
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Password
					</label>
					<input
						type='password'
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.password}
						onChange={(e) =>
							setForm((f) => ({ ...f, password: e.target.value }))
						}
						required
					/>
				</div>
				{error && (
					<div className='text-red-600 font-semibold text-center'>{error}</div>
				)}
				<button
					type='submit'
					className='w-full py-2 bg-white text-black rounded font-bold border border-league-mediumdark hover:bg-league-light transition'
				>
					Login
				</button>
			</form>
		</div>
	);
}
