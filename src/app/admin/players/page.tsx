"use client";
import { useState } from "react";
import Link from "next/link";

const initialPlayers = [
	{ id: "1", name: "Cristiano Ronaldo", team: "Manchester United" },
	{ id: "2", name: "Lionel Messi", team: "Barcelona" },
	{ id: "3", name: "Kevin De Bruyne", team: "Manchester City" },
];

export default function AdminPlayersPage() {
	const [players, setPlayers] = useState(initialPlayers);

	const handleDelete = (id: string) => {
		setPlayers((players) => players.filter((p) => p.id !== id));
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-league-dark'>Players</h2>
				<Link
					href='/admin/players/new'
					className='px-4 py-2 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
				>
					Add Player
				</Link>
			</div>
			<table className='w-full bg-league-light rounded shadow border border-league-mediumdark'>
				<thead>
					<tr className='bg-league-mediumdark text-league-light'>
						<th className='py-2 px-4 text-left'>Name</th>
						<th className='py-2 px-4 text-left'>Team</th>
						<th className='py-2 px-4'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<tr key={player.id} className='border-t border-league-medium'>
							<td className='py-2 px-4 font-semibold'>{player.name}</td>
							<td className='py-2 px-4'>{player.team}</td>
							<td className='py-2 px-4 flex gap-2'>
								<Link
									href={`/admin/players/${player.id}/edit`}
									className='px-3 py-1 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									Edit
								</Link>
								<button
									onClick={() => handleDelete(player.id)}
									className='px-3 py-1 bg-league-mediumdark text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
