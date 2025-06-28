"use client";
import { use, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPlayers } from "@/api/players";
import { getTeams } from "@/api/teams";
import { Player, Team } from "@/api/types";

export default function PlayersPage({
	params,
}: {
	params: Promise<{ leagueId: string }>;
}) {
	const { leagueId } = use(params);
	const [players, setPlayers] = useState<Player[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!leagueId) return;
		setLoading(true);
		Promise.all([getPlayers(undefined, leagueId), getTeams(leagueId)])
			.then(([playersData, teamsData]) => {
				setPlayers(playersData);
				setTeams(teamsData);
			})
			.finally(() => setLoading(false));
	}, [leagueId]);

	if (loading) return <div>Loading...</div>;

	const getTeamNames = (teamIds: string[]) =>
		teamIds
			.map((id) => teams.find((t) => t.id === id)?.name)
			.filter(Boolean)
			.join(", ");

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Players</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{players.map((player) => (
					<Card
						key={player.id}
						className='bg-card text-card-foreground border border-border'
					>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								{player.name}
							</CardTitle>
							{player.position && (
								<CardDescription className='text-muted-foreground'>
									{player.position}
								</CardDescription>
							)}
							{player.teamIds && player.teamIds.length > 0 && (
								<CardDescription className='text-muted-foreground'>
									Teams: {getTeamNames(player.teamIds)}
								</CardDescription>
							)}
						</CardHeader>
						<CardContent>
							<Button
								asChild
								className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
							>
								<Link href={`/leagues/${leagueId}/players/${player.id}`}>
									View Player
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
