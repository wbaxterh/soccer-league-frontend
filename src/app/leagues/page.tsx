import Link from "next/link";

const leagues = [
	{ id: "1", name: "Premier League" },
	{ id: "2", name: "La Liga" },
	{ id: "3", name: "Bundesliga" },
];

export default function LeaguesPage() {
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Leagues</h2>
			<ul className='space-y-4'>
				{leagues.map((league) => (
					<li key={league.id}>
						<Link
							href={`/leagues/${league.id}`}
							className='block px-4 py-3 bg-league-light text-league-black rounded shadow hover:bg-league-medium border border-league-mediumdark font-semibold transition'
						>
							{league.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
