const players = [
	{ id: "1", name: "Cristiano Ronaldo" },
	{ id: "2", name: "Lionel Messi" },
	{ id: "3", name: "Kevin De Bruyne" },
];

export default function PlayersPage() {
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Players</h2>
			<ul className='space-y-4'>
				{players.map((player) => (
					<li
						key={player.id}
						className='px-4 py-3 bg-league-light text-league-black rounded shadow border border-league-mediumdark font-semibold'
					>
						{player.name}
					</li>
				))}
			</ul>
		</div>
	);
}
