"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTeams } from "@/api/teams";
import { Team } from "@/api/types";

export default function TeamsPage({
	params,
}: {
	params: Promise<{ leagueId: string }>;
}) {
	const { leagueId } = use(params);
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!leagueId) return;
		setLoading(true);
		getTeams(leagueId)
			.then((data) => setTeams(data))
			.finally(() => setLoading(false));
	}, [leagueId]);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Teams</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{teams.map((team) => (
					<Card
						key={team.id}
						className='bg-card text-card-foreground border border-border'
					>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								{team.name}
							</CardTitle>
							{team.description && (
								<CardDescription className='text-muted-foreground'>
									{team.description}
								</CardDescription>
							)}
						</CardHeader>
						<CardContent>
							<Button
								asChild
								className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
							>
								<Link href={`/leagues/${leagueId}/teams/${team.id}`}>
									View Team
								</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
