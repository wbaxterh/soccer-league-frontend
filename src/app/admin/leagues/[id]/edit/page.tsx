"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import leaguesData from "@/data/leagues.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EditLeaguePage(props: any) {
	const [leagueId, setLeagueId] = useState<string | null>(null);
	const [form, setForm] = useState<any>(null);
	const router = useRouter();

	useEffect(() => {
		Promise.resolve(props.params).then((params) => {
			setLeagueId(params?.id || "1");
		});
	}, [props.params]);

	useEffect(() => {
		if (!leagueId) return;
		const league = (leaguesData as any[]).find((l) => l.id === leagueId);
		if (league) setForm(league);
	}, [leagueId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm((f: any) => ({ ...f, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, submit to API here
		router.push("/admin/leagues");
	};

	if (!form) return <div className='text-league-black'>Loading...</div>;
	return (
		<div className='max-w-lg mx-auto'>
			<div className='mb-6'>
				<Link
					href='../standings-options'
					className='inline-block px-4 py-2 border border-league-mediumdark bg-league-dark text-league-light rounded font-semibold hover:bg-league-black transition'
				>
					Edit Standings Options
				</Link>
			</div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Edit League</h2>
			<form
				className='space-y-6 bg-league-light p-6 rounded shadow border border-league-mediumdark'
				onSubmit={handleSubmit}
			>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Name
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='name'
						value={form.name}
						onChange={handleChange}
						required
						autoFocus
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Type
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='type'
						value={form.type}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Demographic
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='demographic'
						value={form.demographic}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Division
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='division'
						value={form.division}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Sport
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='sport'
						value={form.sport}
						onChange={handleChange}
						required
						placeholder='e.g. Indoor Soccer, Outdoor Soccer'
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Rules URL
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='rulesUrl'
						value={form.rulesUrl}
						onChange={handleChange}
						placeholder='https://example.com/rules'
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Start Date
					</label>
					<input
						type='text'
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='startDate'
						value={form.startDate}
						onChange={handleChange}
						placeholder='YYYY-MM-DD'
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						End Date
					</label>
					<input
						type='text'
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='endDate'
						value={form.endDate}
						onChange={handleChange}
						placeholder='YYYY-MM-DD'
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Status
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='status'
						value={form.status}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Team Fee
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='teamFee'
						value={form.teamFee}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Player Fee
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='playerFee'
						value={form.playerFee}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						Other Fee Info
					</label>
					<input
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='otherFeeInfo'
						value={form.otherFeeInfo}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label className='block mb-1 font-semibold text-league-black'>
						More Info
					</label>
					<textarea
						className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
						name='moreInfo'
						value={form.moreInfo}
						onChange={handleChange}
						rows={3}
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
				>
					Save Changes
				</button>
			</form>
		</div>
	);
}
