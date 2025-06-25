"use client";
import { useState } from "react";
import Link from "next/link";
import leaguesData from "@/data/leagues.json";

export default function AdminLeaguesPage() {
	const [leagues, setLeagues] = useState(leaguesData);

	const handleDelete = (id: string) => {
		setLeagues((leagues) => leagues.filter((l) => l.id !== id));
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-league-dark'>Leagues</h2>
				<Link
					href='/admin/leagues/new'
					className='px-4 py-2 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
				>
					Add League
				</Link>
			</div>
			<table className='w-full bg-league-light rounded shadow border border-league-mediumdark'>
				<thead>
					<tr className='bg-league-mediumdark text-league-light'>
						<th className='py-2 px-4 text-left'>Name</th>
						<th className='py-2 px-4 text-left'>Sport</th>
						<th className='py-2 px-4'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{leagues.map((league) => (
						<tr key={league.id} className='border-t border-league-medium'>
							<td className='py-2 px-4 font-semibold'>{league.name}</td>
							<td className='py-2 px-4'>{league.sport}</td>
							<td className='py-2 px-4 flex gap-2'>
								<Link
									href={`/admin/leagues/${league.id}/edit`}
									className='px-3 py-1 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									Edit
								</Link>
								<button
									onClick={() => handleDelete(league.id)}
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
