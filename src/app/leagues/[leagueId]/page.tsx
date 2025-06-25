/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { notFound } from "next/navigation";
import leagues from "@/data/leagues.json";

export default function LeagueDetailPage(props: any) {
	const { params } = props;
	const league = leagues.find((l) => l.id === params.leagueId);
	if (!league) return notFound();

	return (
		<div>
			<h2 className='text-2xl font-bold mb-4 text-league-dark'>
				{league.name}
			</h2>
			<div className='mb-8'>
				<h3 className='text-xl font-semibold mb-2'>League Details</h3>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2'>
					<div>
						<span className='font-semibold'>Type:</span> {league.type}
					</div>
					<div>
						<span className='font-semibold'>Demographic:</span>{" "}
						{league.demographic}
					</div>
					<div>
						<span className='font-semibold'>Division:</span> {league.division}
					</div>
					<div>
						<span className='font-semibold'>Sport:</span> {league.sport}{" "}
						{league.rulesUrl && (
							<a
								href={league.rulesUrl}
								className='text-blue-600 underline ml-2'
								target='_blank'
								rel='noopener noreferrer'
							>
								(Rules & Regulations)
							</a>
						)}
					</div>
					<div>
						<span className='font-semibold'>Start Date:</span>{" "}
						{league.startDate}
					</div>
					<div>
						<span className='font-semibold'>End Date:</span> {league.endDate}
					</div>
					<div>
						<span className='font-semibold'>Status:</span> {league.status}
					</div>
					<div>
						<span className='font-semibold'>Team Fee:</span> {league.teamFee}
					</div>
					<div>
						<span className='font-semibold'>Player Fee:</span>{" "}
						{league.playerFee}
					</div>
					<div>
						<span className='font-semibold'>Other Fee Info:</span>{" "}
						{league.otherFeeInfo}
					</div>
					<div>
						<span className='font-semibold'>More Info:</span> {league.moreInfo}
					</div>
				</div>
			</div>
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
