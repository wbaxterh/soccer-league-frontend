"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getTeams } from "@/api/teams";
import { Team } from "@/api/types";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";

function AdminTeamsPageInner() {
	const searchParams = useSearchParams();
	const leagueId = searchParams.get("leagueId");
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getTeams(leagueId || undefined)
			.then((data) => setTeams(data))
			.finally(() => setLoading(false));
	}, [leagueId]);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-league-dark'>Teams</h2>
				<Button asChild>
					<Link
						href={
							leagueId
								? `/admin/teams/new?leagueId=${leagueId}`
								: "/admin/teams/new"
						}
					>
						Add Team
					</Link>
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Team Name</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{teams.map((team) => (
						<TableRow key={team.id}>
							<TableCell className='font-semibold'>{team.name}</TableCell>
							<TableCell className='flex gap-2'>
								<Button asChild size='sm' variant='default'>
									<Link href={`/admin/teams/${team.id}/edit`}>Edit</Link>
								</Button>
								<Button asChild size='sm' variant='secondary'>
									<Link href={`/admin/teams/${team.id}/players`}>
										View Roster
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default function AdminTeamsPage() {
	return (
		<Suspense>
			<AdminTeamsPageInner />
		</Suspense>
	);
}
