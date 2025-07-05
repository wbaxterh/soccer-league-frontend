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
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

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
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{leagues.map((league) => (
					<Card
						key={league.id}
						className='bg-card text-card-foreground border border-border'
					>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								{league.name}
							</CardTitle>
							<CardDescription className='text-muted-foreground'>
								{league.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='mb-4 space-y-1 text-sm'>
								<div>
									<span className='font-semibold'>Type:</span>{" "}
									{league.type || "-"}
								</div>
								<div>
									<span className='font-semibold'>Demographic:</span>{" "}
									{league.demographic || "-"}
								</div>
								<div>
									<span className='font-semibold'>Division:</span>{" "}
									{league.division || "-"}
								</div>
								<div>
									<span className='font-semibold'>Sport:</span>{" "}
									{league.sport || "-"}
								</div>
								<div>
									<span className='font-semibold'>Start Date:</span>{" "}
									{league.startDate || "-"}
								</div>
								<div>
									<span className='font-semibold'>End Date:</span>{" "}
									{league.endDate || "-"}
								</div>
								<div>
									<span className='font-semibold'>Status:</span>{" "}
									{league.status || "-"}
								</div>
								<div>
									<span className='font-semibold'>Team Fee:</span>{" "}
									{league.teamFee || "-"}
								</div>
								<div>
									<span className='font-semibold'>Player Fee:</span>{" "}
									{league.playerFee || "-"}
								</div>
								<div>
									<span className='font-semibold'>Other Fee Info:</span>{" "}
									{league.otherFeeInfo || "-"}
								</div>
								<div>
									<span className='font-semibold'>More Info:</span>{" "}
									{league.moreInfo || "-"}
								</div>
								<div>
									<span className='font-semibold'>Rules:</span>{" "}
									{league.rulesUrl ? (
										<a
											href={league.rulesUrl}
											className='text-blue-600 underline'
											target='_blank'
											rel='noopener noreferrer'
										>
											Rules
										</a>
									) : (
										"-"
									)}
								</div>
							</div>
							<div className='flex gap-2'>
								<Button
									asChild
									className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90'
								>
									<Link href={`/admin/leagues/${league.id}/edit`}>Edit</Link>
								</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											size='sm'
											className='flex-1'
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
													Deleting this league will remove all league, team, and
													player data associated with it. This action cannot be
													undone.
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
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
