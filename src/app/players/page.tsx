"use client";
import { useEffect, useState } from "react";
import { Player, Team, League } from "@/api/types";
import { getPlayers } from "@/api/players";
import { getTeams } from "@/api/teams";
import { getLeagues } from "@/api/leagues";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

export default function PlayersPage() {
	const searchParams = useSearchParams();
	const initialLeague = searchParams.get("league") || "all";
	const initialTeam = searchParams.get("team") || "all";
	const [players, setPlayers] = useState<Player[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [leagues, setLeagues] = useState<League[]>([]);
	const [selectedLeague, setSelectedLeague] = useState<string>(initialLeague);
	const [selectedTeam, setSelectedTeam] = useState<string>(initialTeam);

	useEffect(() => {
		getPlayers().then(setPlayers);
		getTeams().then(setTeams);
		getLeagues().then(setLeagues);
	}, []);

	const teamMap = Object.fromEntries(teams.map((t) => [t.id, t.name]));
	const leagueMap = Object.fromEntries(leagues.map((l) => [l.id, l.name]));

	const filteredPlayers = players.filter((player) => {
		if (
			selectedTeam !== "all" &&
			!(player.teamIds || []).includes(selectedTeam)
		)
			return false;
		if (
			selectedLeague !== "all" &&
			!teams.some(
				(t) =>
					t.leagueId === selectedLeague && (player.teamIds || []).includes(t.id)
			)
		)
			return false;
		return true;
	});

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Players</h2>
			<div className='flex gap-4 mb-4'>
				<Select value={selectedLeague} onValueChange={setSelectedLeague}>
					<SelectTrigger className='w-48'>
						<SelectValue placeholder='Filter by League' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Leagues</SelectItem>
						{leagues.map((l) => (
							<SelectItem key={l.id} value={l.id}>
								{l.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={selectedTeam} onValueChange={setSelectedTeam}>
					<SelectTrigger className='w-48'>
						<SelectValue placeholder='Filter by Team' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Teams</SelectItem>
						{teams.map((t) => (
							<SelectItem key={t.id} value={t.id}>
								{t.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Teams</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPlayers.map((player) => (
						<TableRow key={player.id}>
							<TableCell className='font-semibold'>{player.name}</TableCell>
							<TableCell>
								{Array.isArray(player.teamIds) && player.teamIds.length > 0
									? player.teamIds.map((tid) => teamMap[tid] || tid).join(", ")
									: "No team"}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
