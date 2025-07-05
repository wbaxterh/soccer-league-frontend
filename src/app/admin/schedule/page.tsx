"use client";
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { getTeams } from "@/api/teams";
import { getGames, createGame } from "@/api/games";
import { Team, Game } from "@/api/types";

const allGames: {
	id: string;
	division: string;
	home: string;
	away: string;
	date: string;
	result: string;
	location: string;
}[] = [
	{
		id: "1",
		division: "A",
		home: "Manchester United",
		away: "Liverpool",
		date: "2024-07-01",
		result: "",
		location: "Old Trafford",
	},
	{
		id: "2",
		division: "A",
		home: "Chelsea",
		away: "Manchester United",
		date: "2024-07-08",
		result: "",
		location: "Stamford Bridge",
	},
	{
		id: "3",
		division: "B",
		home: "Real Madrid",
		away: "Barcelona",
		date: "2024-07-10",
		result: "",
		location: "Bernabeu",
	},
];
const divisions = ["A", "B"];

export default function AdminSchedulePage() {
	const [games, setGames] = useState<Game[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [homeTeam, setHomeTeam] = useState("");
	const [awayTeam, setAwayTeam] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		getTeams().then(setTeams);
		getGames().then(setGames);
	}, []);

	const teamMap = Object.fromEntries(teams.map((t) => [t.id, t.name]));

	const handleAddGame = async () => {
		if (!homeTeam || !awayTeam || !date) return;
		await createGame({ home: homeTeam, away: awayTeam, date });
		getGames().then(setGames);
		setHomeTeam("");
		setAwayTeam("");
		setDate("");
	};

	return (
		<div className='max-w-4xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Game Schedule</h2>
			<div className='mb-8 flex flex-wrap gap-4 items-end'>
				<div>
					<div className='font-semibold mb-1'>Home Team</div>
					<Select value={homeTeam} onValueChange={setHomeTeam}>
						<SelectTrigger className='w-48'>
							<SelectValue placeholder='Select Home Team' />
						</SelectTrigger>
						<SelectContent>
							{teams.map((t) => (
								<SelectItem key={t.id} value={t.id}>
									{t.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<div className='font-semibold mb-1'>Away Team</div>
					<Select value={awayTeam} onValueChange={setAwayTeam}>
						<SelectTrigger className='w-48'>
							<SelectValue placeholder='Select Away Team' />
						</SelectTrigger>
						<SelectContent>
							{teams
								.filter((t) => t.id !== homeTeam)
								.map((t) => (
									<SelectItem key={t.id} value={t.id}>
										{t.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<div className='font-semibold mb-1'>Date</div>
					<Input
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className='w-40'
					/>
				</div>
				<button
					type='button'
					className='bg-primary text-primary-foreground px-4 py-2 rounded font-semibold'
					onClick={handleAddGame}
					disabled={!homeTeam || !awayTeam || !date}
				>
					Add Game
				</button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Home</TableHead>
						<TableHead>Away</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{games.map((game) => (
						<TableRow key={game.id}>
							<TableCell>{game.date}</TableCell>
							<TableCell>{teamMap[game.home] || game.home}</TableCell>
							<TableCell>{teamMap[game.away] || game.away}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
