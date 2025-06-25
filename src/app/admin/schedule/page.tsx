"use client";
import { useState } from "react";

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
		<div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>
				Game Schedule
			</h2>
			<div className='mb-4 flex items-center gap-4'>
				<label className='font-semibold text-league-black'>
					Filter by Division:
				</label>
				<select
					className='px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
					value={division}
					onChange={(e) => setDivision(e.target.value)}
				>
					<option value=''>All</option>
					{divisions.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</div>
			<table className='w-full bg-league-light rounded shadow border border-league-mediumdark'>
				<thead>
					<tr className='bg-league-mediumdark text-league-light'>
						<th className='py-2 px-4 text-left'>Date</th>
						<th className='py-2 px-4 text-left'>Home</th>
						<th className='py-2 px-4 text-left'>Away</th>
						<th className='py-2 px-4 text-left'>Division</th>
						<th className='py-2 px-4 text-left'>Result</th>
					</tr>
				</thead>
				<tbody>
					{filteredGames.map((game) => (
						<tr key={game.id} className='border-t border-league-medium'>
							<td className='py-2 px-4'>{game.date}</td>
							<td className='py-2 px-4'>{game.home}</td>
							<td className='py-2 px-4'>{game.away}</td>
							<td className='py-2 px-4'>{game.division}</td>
							<td className='py-2 px-4'>
								<input
									className='px-2 py-1 border border-league-mediumdark rounded bg-league-light text-league-black w-24'
									value={game.result}
									onChange={(e) => handleResultChange(game.id, e.target.value)}
									placeholder='Result'
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
