"use client";
import { useState } from "react";
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

const allGames = [
	{
		id: "1",
		division: "A",
		home: "Manchester United",
		away: "Liverpool",
		date: "2024-07-01",
		result: "",
	},
	{
		id: "2",
		division: "A",
		home: "Chelsea",
		away: "Manchester United",
		date: "2024-07-08",
		result: "",
	},
	{
		id: "3",
		division: "B",
		home: "Real Madrid",
		away: "Barcelona",
		date: "2024-07-10",
		result: "",
	},
];
const divisions = ["A", "B"];

export default function AdminSchedulePage() {
	const [division, setDivision] = useState("");
	const [games, setGames] = useState(allGames);

	const filteredGames = division
		? games.filter((g) => g.division === division)
		: games;

	const handleResultChange = (id: string, value: string) => {
		setGames((games) =>
			games.map((g) => (g.id === id ? { ...g, result: value } : g))
		);
	};

	return (
		<div className='max-w-4xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Game Schedule</h2>
			<div className='mb-4 flex items-center gap-4'>
				<span className='font-semibold text-foreground'>
					Filter by Division:
				</span>
				<Select value={division} onValueChange={setDivision}>
					<SelectTrigger className='w-40'>
						<SelectValue placeholder='All' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value=''>All</SelectItem>
						{divisions.map((d) => (
							<SelectItem key={d} value={d}>
								{d}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Home</TableHead>
						<TableHead>Away</TableHead>
						<TableHead>Division</TableHead>
						<TableHead>Result</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredGames.map((game) => (
						<TableRow key={game.id}>
							<TableCell>{game.date}</TableCell>
							<TableCell>{game.home}</TableCell>
							<TableCell>{game.away}</TableCell>
							<TableCell>{game.division}</TableCell>
							<TableCell>
								<Input
									className='w-24'
									value={game.result}
									onChange={(e) => handleResultChange(game.id, e.target.value)}
									placeholder='Result'
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
