/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { notFound } from "next/navigation";

const leagues = [
	{ id: "1", name: "Premier League" },
	{ id: "2", name: "La Liga" },
	{ id: "3", name: "Bundesliga" },
];

export default function LeagueDetailPage(props: any) {
	const { params } = props;
	const league = leagues.find((l) => l.id === params.leagueId);
	if (!league) return notFound();

	return (
		<div>
			<h2 className='text-2xl font-bold mb-4 text-league-dark'>
				{league.name}
			</h2>
			<div className='flex flex-col gap-4'>
				<Link
					href={`/leagues/${league.id}/teams`}
					className='text-league-black hover:text-league-light bg-league-mediumdark px-4 py-2 rounded font-semibold transition w-max'
				>
					View Teams
				</Link>
				<Link
					href={`/leagues/${league.id}/players`}
					className='text-league-black hover:text-league-light bg-league-mediumdark px-4 py-2 rounded font-semibold transition w-max'
				>
					View Players
				</Link>
				<Link
					href={`/leagues/${league.id}/schedule`}
					className='text-league-black hover:text-league-light bg-league-mediumdark px-4 py-2 rounded font-semibold transition w-max'
				>
					View Schedule
				</Link>
			</div>
		</div>
	);
}
