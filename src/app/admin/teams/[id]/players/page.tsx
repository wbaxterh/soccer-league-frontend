import Link from "next/link";

const players = [
	{ id: "1", name: "Marcus Rashford" },
	{ id: "2", name: "Bruno Fernandes" },
	{ id: "3", name: "Raphaël Varane" },
];

export default function TeamRosterPage() {
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Team Roster</h2>
			<table className='w-full bg-league-light rounded shadow border border-league-mediumdark'>
				<thead>
					<tr className='bg-league-mediumdark text-league-light'>
						<th className='py-2 px-4 text-left'>Player Name</th>
						<th className='py-2 px-4'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player) => (
						<tr key={player.id} className='border-t border-league-medium'>
							<td className='py-2 px-4 font-semibold'>{player.name}</td>
							<td className='py-2 px-4'>
								<Link
									href='#'
									className='px-3 py-1 bg-league-black text-league-light rounded hover:bg-league-dark font-semibold transition'
								>
									Edit
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
