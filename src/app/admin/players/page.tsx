"use client";
import { useState } from "react";
import Link from "next/link";
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
import { Player } from "@/api/types";

const initialPlayers: Player[] = [
	{ id: "1", name: "Cristiano Ronaldo", teamIds: ["1"] },
	{ id: "2", name: "Lionel Messi", teamIds: ["2"] },
	{ id: "3", name: "Kevin De Bruyne", teamIds: ["3"] },
];

export default function AdminPlayersPage() {
	const [players, setPlayers] = useState<Player[]>(initialPlayers);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	const handleDelete = (id: string) => {
		setPlayers((players) => players.filter((p) => p.id !== id));
		setDeleteId(null);
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-foreground'>Players</h2>
				<Button asChild>
					<Link
						href='/admin/players/new'
						className='px-4 py-2 bg-primary text-primary-foreground rounded font-semibold transition border border-border hover:bg-primary/90'
					>
						Add Player
					</Link>
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Teams</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{players.map((player) => (
						<TableRow key={player.id}>
							<TableCell className='font-semibold'>{player.name}</TableCell>
							<TableCell>{player.teamIds.join(", ")}</TableCell>
							<TableCell className='flex gap-2'>
								<Button asChild size='sm' variant='default'>
									<Link href={`/admin/players/${player.id}/edit`}>Edit</Link>
								</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											size='sm'
											variant='destructive'
											onClick={() => setDeleteId(player.id)}
										>
											Delete
										</Button>
									</DialogTrigger>
									{deleteId === player.id && (
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Are you sure?</DialogTitle>
												<DialogDescription>
													This will permanently delete the player.
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
													onClick={() => handleDelete(player.id)}
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
	);
}
