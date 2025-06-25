/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
const matches = [
	{ id: "1", home: "Manchester United", away: "Liverpool", date: "2024-07-01" },
	{ id: "2", home: "Chelsea", away: "Manchester United", date: "2024-07-08" },
];

export default function SchedulePage(props: any) {
	// const { params } = props; // Not used, but included for consistency
	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Schedule</h2>
			<ul className='space-y-4'>
				{matches.map((match) => (
					<li
						key={match.id}
						className='px-4 py-3 bg-league-light text-league-black rounded shadow border border-league-mediumdark font-semibold'
					>
						<div className='font-semibold'>
							{match.home} vs {match.away}
						</div>
						<div className='text-league-mediumdark'>{match.date}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
