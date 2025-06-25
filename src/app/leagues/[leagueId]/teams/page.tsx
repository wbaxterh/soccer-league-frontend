/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import Link from "next/link";

const teams = [
	{ id: "1", name: "Manchester United" },
	{ id: "2", name: "Liverpool" },
	{ id: "3", name: "Chelsea" },
];

export default function TeamsPage(props: any) {
	const { params } = props;
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Teams</h2>
			<ul className='space-y-4'>
				{teams.map((team) => (
					<li key={team.id}>
						<Link
							href={`/leagues/${params.leagueId}/teams/${team.id}`}
							className='block px-4 py-3 bg-league-light text-league-black rounded shadow hover:bg-league-medium border border-league-mediumdark font-semibold transition'
						>
							{team.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
