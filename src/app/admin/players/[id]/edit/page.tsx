"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import teams from "@/data/teams.json";

// In a real app, fetch player data by id
const playerData = { name: "Player Name", team: "Team Name" };

export default function EditPlayerPage() {
	const [form, setForm] = useState(playerData);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, submit to API here
		router.push("/admin/players");
	};

	return (
		<div className='max-w-lg mx-auto'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Edit Player</h2>
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
						Team
					</label>
					<select
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						value={form.team}
						onChange={(e) => setForm((f) => ({ ...f, team: e.target.value }))}
						required
					>
						<option value='' disabled>
							Select a team
						</option>
						{teams.map((team) => (
							<option key={team.id} value={team.name}>
								{team.name}
							</option>
						))}
					</select>
				</div>
				<button
					type='submit'
					className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
				>
					Save Changes
				</button>
			</form>
		</div>
	);
}
