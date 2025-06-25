/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const players = [
	{ id: "1", name: "Marcus Rashford" },
	{ id: "2", name: "Bruno Fernandes" },
	{ id: "3", name: "Raphaël Varane" },
];

export default function TeamPlayersPage(props: any) {
	// const { params } = props; // Not used, but included for consistency
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
