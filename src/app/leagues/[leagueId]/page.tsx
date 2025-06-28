"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLeague } from "@/api/leagues";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { League } from "@/api/types";

export default function LeagueDetailPage({
	params,
}: {
	params: Promise<{ leagueId: string }>;
}) {
	const [league, setLeague] = useState<League | null>(null);
	const [loading, setLoading] = useState(true);
	const [leagueId, setLeagueId] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		Promise.resolve(params).then((resolved) => {
			if (isMounted) setLeagueId(resolved.leagueId);
		});
		return () => {
			isMounted = false;
		};
	}, [params]);

	useEffect(() => {
		if (!leagueId) return;
		setLoading(true);
		getLeague(leagueId)
			.then((data) => setLeague(data))
			.finally(() => setLoading(false));
	}, [leagueId]);

	if (loading) return <div>Loading...</div>;
	if (!league) return <div>League not found.</div>;

	return (
		<div className='max-w-3xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h1 className='text-3xl font-bold mb-4 text-foreground'>{league.name}</h1>
			<p className='text-lg text-muted-foreground mb-6'>{league.description}</p>
			<div className='flex flex-wrap gap-4 mb-8'>
				<Button
					asChild
					className='bg-primary text-primary-foreground hover:bg-primary/90'
				>
					<Link href={`/leagues/${league.id}/teams`}>Teams</Link>
				</Button>
				<Button
					asChild
					className='bg-primary text-primary-foreground hover:bg-primary/90'
				>
					<Link href={`/leagues/${league.id}/players`}>Players</Link>
				</Button>
				<Button
					asChild
					className='bg-primary text-primary-foreground hover:bg-primary/90'
				>
					<Link href={`/leagues/${league.id}/schedule`}>Schedule</Link>
				</Button>
			</div>
			<div className='mb-8'>
				<h3 className='text-xl font-semibold mb-2'>League Details</h3>
				<Card>
					<CardContent className='py-6'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2'>
							<div>
								<span className='font-semibold'>Type:</span>{" "}
								{league.type || "-"}
							</div>
							<div>
								<span className='font-semibold'>Demographic:</span>{" "}
								{league.demographic || "-"}
							</div>
							<div>
								<span className='font-semibold'>Division:</span>{" "}
								{league.division || "-"}
							</div>
							<div>
								<span className='font-semibold'>Sport:</span>{" "}
								{league.sport || "-"}{" "}
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
								{league.startDate || "-"}
							</div>
							<div>
								<span className='font-semibold'>End Date:</span>{" "}
								{league.endDate || "-"}
							</div>
							<div>
								<span className='font-semibold'>Status:</span>{" "}
								{league.status || "-"}
							</div>
							<div>
								<span className='font-semibold'>Team Fee:</span>{" "}
								{league.teamFee || "-"}
							</div>
							<div>
								<span className='font-semibold'>Player Fee:</span>{" "}
								{league.playerFee || "-"}
							</div>
							<div>
								<span className='font-semibold'>Other Fee Info:</span>{" "}
								{league.otherFeeInfo || "-"}
							</div>
							<div>
								<span className='font-semibold'>More Info:</span>{" "}
								{league.moreInfo || "-"}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
