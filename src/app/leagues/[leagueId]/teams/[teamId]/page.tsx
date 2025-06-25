/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { notFound } from "next/navigation";

const teams = [
	{ id: "1", name: "Manchester United" },
	{ id: "2", name: "Liverpool" },
	{ id: "3", name: "Chelsea" },
];

export default function TeamDetailPage(props: any) {
	const { params } = props;
	const team = teams.find((t) => t.id === params.teamId);
	if (!team) return notFound();

	return (
		<div>
			<h2 className='text-2xl font-bold mb-4 text-league-dark'>{team.name}</h2>
			<div className='flex flex-col gap-4'>
				<Link
					href={`/leagues/${params.leagueId}/teams/${team.id}/players`}
					className='text-league-black hover:text-league-light bg-league-mediumdark px-4 py-2 rounded font-semibold transition w-max'
				>
					View Players
				</Link>
				<Link
					href={`/leagues/${params.leagueId}/teams/${team.id}/schedule`}
					className='text-league-black hover:text-league-light bg-league-mediumdark px-4 py-2 rounded font-semibold transition w-max'
				>
					View Schedule
				</Link>
			</div>
		</div>
	);
}
