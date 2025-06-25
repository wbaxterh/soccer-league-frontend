"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLeaguePage() {
	const [form, setForm] = useState({ name: "", sport: "" });
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, submit to API here
		router.push("/admin/leagues");
	};

	return (
		<div className='max-w-lg mx-auto'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Add League</h2>
			<form
				className='space-y-6 bg-league-light p-6 rounded shadow border border-league-mediumdark'
				onSubmit={handleSubmit}
			>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Name
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.name}
						onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
						required
						autoFocus
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Sport
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.sport}
						onChange={(e) => setForm((f) => ({ ...f, sport: e.target.value }))}
						required
						placeholder='e.g. Indoor Soccer, Outdoor Soccer'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
				>
					Add League
				</button>
			</form>
		</div>
	);
}
