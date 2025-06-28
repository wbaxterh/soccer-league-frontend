"use client";
import { use, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getGames } from "@/api/games";
import { getTeams } from "@/api/teams";
import { Game, Team } from "@/api/types";

export default function SchedulePage({
	params,
}: {
	params: Promise<{ leagueId: string }>;
}) {
	const { leagueId } = use(params);
	const [matches, setMatches] = useState<Game[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!leagueId) return;
		setLoading(true);
		Promise.all([getGames(leagueId), getTeams(leagueId)])
			.then(([gamesData, teamsData]) => {
				setMatches(gamesData);
				setTeams(teamsData);
			})
			.finally(() => setLoading(false));
	}, [leagueId]);

	if (loading) return <div>Loading...</div>;

	const getTeamName = (id: string) =>
		teams.find((t) => t.id === id)?.name || id;

	return (
		<div className='max-w-4xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Schedule</h2>
			<div className='grid gap-4'>
				{matches.map((match) => (
					<Card key={match.id}>
						<CardContent className='py-4 font-semibold text-foreground text-lg'>
							<div>
								{getTeamName(match.home)} vs {getTeamName(match.away)}
							</div>
							{match.date && (
								<div className='text-muted-foreground text-base font-normal'>
									{match.date}
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
