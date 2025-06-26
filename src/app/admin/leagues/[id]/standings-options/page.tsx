"use client";
import { useState } from "react";

const defaultFormula = {
	W: 3,
	L: 0,
	T: 1,
	OTW: 0,
	OTL: 0,
	RTW: 0,
	RTL: 0,
	F: 0,
	D: 0,
	BP: 0,
};

const outcomes = [
	{ key: "W", label: "Wins" },
	{ key: "L", label: "Losses" },
	{ key: "T", label: "Ties" },
	{ key: "OTW", label: "Overtime Wins" },
	{ key: "OTL", label: "Overtime Losses" },
	{ key: "RTW", label: "Regular Time Wins" },
	{ key: "RTL", label: "Regular Time Losses" },
	{ key: "F", label: "Forfeits" },
	{ key: "D", label: "Defaults" },
	{ key: "BP", label: "Bonus Points" },
];

export default function StandingsOptionsPage() {
	const [formula, setFormula] = useState(defaultFormula);

	const handleChange = (key: string, value: string) => {
		setFormula((f) => ({ ...f, [key]: Number(value) }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Save logic here (API or context)
		alert("Standings options saved! (Not yet persisted)");
	};

	return (
		<div className='max-w-xl mx-auto'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>
				Standings Options
			</h2>
			<form
				className='space-y-8 bg-league-light p-6 rounded shadow border border-league-mediumdark'
				onSubmit={handleSubmit}
			>
				<div>
					<h3 className='text-lg font-semibold mb-2 text-league-black'>
						How Should Points Be Calculated?
					</h3>
					<div className='grid grid-cols-2 gap-4'>
						{outcomes.map((o) => (
							<div key={o.key}>
								<label className='block mb-1 font-medium text-league-black'>
									{o.label}
								</label>
								<input
									type='number'
									className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
									value={formula[o.key as keyof typeof formula]}
									onChange={(e) => handleChange(o.key, e.target.value)}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<h3 className='text-lg font-semibold mb-2 text-league-black'>
						How Should The Rankings Be Sorted?
					</h3>
					<div className='text-league-black'>Tiebreakers UI coming soon.</div>
				</div>
				<button
					type='submit'
					className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
				>
					Save Standings Options
				</button>
			</form>
		</div>
	);
}
