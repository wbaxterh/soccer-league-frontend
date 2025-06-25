"use client";
import { useState } from "react";

export default function TeamEditPage() {
	const [form, setForm] = useState({ name: "", division: "", coach: "" });

	return (
		<div className='max-w-lg mx-auto'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Edit Team</h2>
			<form className='space-y-6 bg-league-light p-6 rounded shadow border border-league-mediumdark'>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Team Name
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.name}
						onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
						required
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Division
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.division}
						onChange={(e) =>
							setForm((f) => ({ ...f, division: e.target.value }))
						}
						required
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Coach
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.coach}
						onChange={(e) => setForm((f) => ({ ...f, coach: e.target.value }))}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
				>
					Save
				</button>
			</form>
		</div>
	);
}
