import Link from "next/link";

const teams = [
	{ id: "1", name: "Manchester United" },
	{ id: "2", name: "Liverpool" },
	{ id: "3", name: "Chelsea" },
];

export default function AdminTeamsPage() {
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Teams</h2>
			<table className='w-full bg-league-light rounded shadow border border-league-mediumdark'>
				<thead>
					<tr className='bg-league-mediumdark text-league-light'>
						<th className='py-2 px-4 text-left'>Team Name</th>
						<th className='py-2 px-4'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => (
						<tr key={team.id} className='border-t border-league-medium'>
							<td className='py-2 px-4 font-semibold'>{team.name}</td>
							<td className='py-2 px-4 flex gap-2'>
								<Link
									href={`/admin/teams/${team.id}/edit`}
									className='px-3 py-1 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									Edit
								</Link>
								<Link
									href={`/admin/teams/${team.id}/players`}
									className='px-3 py-1 bg-league-mediumdark text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									View Roster
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
