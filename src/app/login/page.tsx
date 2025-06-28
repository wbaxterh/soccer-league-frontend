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
		<div className='max-w-sm mx-auto mt-16 bg-card p-8 rounded shadow border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-card-foreground text-center'>
				Admin Login
			</h2>
			<form className='space-y-6' onSubmit={handleSubmit}>
				<div>
					<label className='block mb-1 font-semibold text-foreground'>
						Username
					</label>
					<input
						className='w-full px-3 py-2 border border-border rounded bg-background text-foreground'
						value={form.username}
						onChange={(e) =>
							setForm((f) => ({ ...f, username: e.target.value }))
						}
						required
						autoFocus
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-foreground'>
						Password
					</label>
					<input
						type='password'
						className='w-full px-3 py-2 border border-border rounded bg-background text-foreground'
						value={form.password}
						onChange={(e) =>
							setForm((f) => ({ ...f, password: e.target.value }))
						}
						required
					/>
				</div>
				{error && (
					<div className='text-destructive font-semibold text-center'>
						{error}
					</div>
				)}
				<button
					type='submit'
					className='w-full py-2 bg-primary text-primary-foreground rounded font-bold border border-border hover:bg-primary/90 transition'
				>
					Login
				</button>
			</form>
		</div>
	);
}
