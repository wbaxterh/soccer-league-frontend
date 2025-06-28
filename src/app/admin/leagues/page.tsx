"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getLeagues } from "@/api/leagues";
import { League } from "@/api/types";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";

export default function AdminLeaguesPage() {
	const [leagues, setLeagues] = useState<League[]>([]);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	useEffect(() => {
		getLeagues().then(setLeagues);
	}, []);

	const handleDelete = (id: string) => {
		setLeagues((leagues) => leagues.filter((l) => l.id !== id));
		setDeleteId(null);
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-foreground'>Leagues</h2>
				<Button asChild>
					<Link
						href='/admin/leagues/new'
						className='px-4 py-2 bg-primary text-primary-foreground rounded font-semibold transition border border-border hover:bg-primary/90'
					>
						Add League
					</Link>
				</Button>
			</div>
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Demographic</TableHead>
							<TableHead>Division</TableHead>
							<TableHead>Sport</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>End Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Team Fee</TableHead>
							<TableHead>Player Fee</TableHead>
							<TableHead>Other Fee Info</TableHead>
							<TableHead>More Info</TableHead>
							<TableHead>Rules</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{leagues.map((league) => (
							<TableRow key={league.id}>
								<TableCell className='font-semibold'>{league.name}</TableCell>
								<TableCell>{league.type}</TableCell>
								<TableCell>{league.demographic}</TableCell>
								<TableCell>{league.division}</TableCell>
								<TableCell>{league.sport}</TableCell>
								<TableCell>{league.startDate}</TableCell>
								<TableCell>{league.endDate}</TableCell>
								<TableCell>{league.status}</TableCell>
								<TableCell>{league.teamFee}</TableCell>
								<TableCell>{league.playerFee}</TableCell>
								<TableCell>{league.otherFeeInfo}</TableCell>
								<TableCell>{league.moreInfo}</TableCell>
								<TableCell>
									{league.rulesUrl && (
										<a
											href={league.rulesUrl}
											className='text-blue-600 underline'
											target='_blank'
											rel='noopener noreferrer'
										>
											Rules
										</a>
									)}
								</TableCell>
								<TableCell className='flex gap-2'>
									<Button asChild size='sm' variant='default'>
										<Link
											href={`/admin/leagues/${league.id}/edit`}
											className='px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 font-semibold transition'
										>
											Edit
										</Link>
									</Button>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												size='sm'
												variant='destructive'
												onClick={() => setDeleteId(league.id)}
											>
												Delete
											</Button>
										</DialogTrigger>
										{deleteId === league.id && (
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Are you sure?</DialogTitle>
													<DialogDescription>
														This will permanently delete the league.
													</DialogDescription>
												</DialogHeader>
												<DialogFooter>
													<DialogClose asChild>
														<Button
															variant='outline'
															onClick={() => setDeleteId(null)}
														>
															Cancel
														</Button>
													</DialogClose>
													<Button
														variant='destructive'
														onClick={() => handleDelete(league.id)}
													>
														Delete
													</Button>
												</DialogFooter>
											</DialogContent>
										)}
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
