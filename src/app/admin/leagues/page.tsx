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
			<div className='overflow-x-auto'>
				<table className='w-full bg-league-light rounded shadow border border-league-mediumdark text-sm'>
					<thead>
						<tr className='bg-league-mediumdark text-league-light'>
							<th className='py-2 px-4 text-left'>Name</th>
							<th className='py-2 px-4 text-left'>Type</th>
							<th className='py-2 px-4 text-left'>Demographic</th>
							<th className='py-2 px-4 text-left'>Division</th>
							<th className='py-2 px-4 text-left'>Sport</th>
							<th className='py-2 px-4 text-left'>Start Date</th>
							<th className='py-2 px-4 text-left'>End Date</th>
							<th className='py-2 px-4 text-left'>Status</th>
							<th className='py-2 px-4 text-left'>Team Fee</th>
							<th className='py-2 px-4 text-left'>Player Fee</th>
							<th className='py-2 px-4 text-left'>Other Fee Info</th>
							<th className='py-2 px-4 text-left'>More Info</th>
							<th className='py-2 px-4 text-left'>Rules</th>
							<th className='py-2 px-4'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{leagues.map((league) => (
							<tr key={league.id} className='border-t border-league-medium'>
								<td className='py-2 px-4 font-semibold'>{league.name}</td>
								<td className='py-2 px-4'>{league.type}</td>
								<td className='py-2 px-4'>{league.demographic}</td>
								<td className='py-2 px-4'>{league.division}</td>
								<td className='py-2 px-4'>{league.sport}</td>
								<td className='py-2 px-4'>{league.startDate}</td>
								<td className='py-2 px-4'>{league.endDate}</td>
								<td className='py-2 px-4'>{league.status}</td>
								<td className='py-2 px-4'>{league.teamFee}</td>
								<td className='py-2 px-4'>{league.playerFee}</td>
								<td className='py-2 px-4'>{league.otherFeeInfo}</td>
								<td className='py-2 px-4'>{league.moreInfo}</td>
								<td className='py-2 px-4'>
									{league.rulesUrl && (
										<a
											href={league.rulesUrl}
											className='text-blue-600 underline'
											target='_blank'
											rel='noopener noreferrer'
										>
											Rules
										</a>
									)}
								</td>
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
		</div>
	);
}
