"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
	getTeam,
	addPlayerToTeam,
	removePlayerFromTeam,
	updateTeam,
} from "@/api/teams";
import { getPlayers, createPlayer, updatePlayer } from "@/api/players";
import { Team, Player } from "@/api/types";
import { PlayerMultiSelect } from "@/components/ui/PlayerMultiSelect";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
	name: z.string().min(1, "Team name is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function TeamEditPage() {
	const router = useRouter();
	const params = useParams();
	const teamId = params?.id as string;
	const [team, setTeam] = useState<Team | null>(null);
	const [players, setPlayers] = useState<Player[]>([]);
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
	const [newPlayers, setNewPlayers] = useState<
		{ id: string; name: string; position?: string }[]
	>([]);
	const [newPlayerName, setNewPlayerName] = useState("");
	const [newPlayerPosition, setNewPlayerPosition] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: "" },
	});

	const allPlayers: Player[] = [
		...players,
		...newPlayers.map((np) => ({ ...np, teamIds: [] })),
	];

	useEffect(() => {
		if (!teamId) return;
		getTeam(teamId).then((t) => {
			setTeam(t);
			form.setValue("name", t.name);
		});
		getPlayers().then((ps) => {
			setPlayers(ps);
			setSelectedPlayerIds(
				ps
					.filter((p) =>
						(Array.isArray(p.teamIds) ? p.teamIds : []).includes(teamId)
					)
					.map((p) => p.id)
			);
		});
		// eslint-disable-next-line
	}, [teamId]);

	const onSubmit = async (values: FormValues) => {
		setError(null);
		setLoading(true);
		try {
			// 1. Update the team name
			await updateTeam(teamId, { name: values.name });
			// 2. Create new players and add them to the team
			const createdPlayerIds: string[] = [];
			for (const np of newPlayers) {
				const { createPlayer } = await import("@/api/players");
				const player = await createPlayer({
					name: np.name,
					position: np.position,
					teamIds: [teamId],
				});
				createdPlayerIds.push(player.id);
			}
			// 3. Add/remove players as needed
			const currentPlayerIds = players
				.filter((p) =>
					(Array.isArray(p.teamIds) ? p.teamIds : []).includes(teamId)
				)
				.map((p) => p.id);
			// Add newly selected players
			for (const pid of selectedPlayerIds) {
				if (createdPlayerIds.includes(pid)) continue;
				const player = players.find((p) => p.id === pid);
				if (
					player &&
					Array.isArray(player.teamIds) &&
					!player.teamIds.includes(teamId)
				) {
					const { addPlayerToTeam } = await import("@/api/teams");
					await addPlayerToTeam(pid, teamId);
				}
			}
			// Remove unselected players
			for (const pid of currentPlayerIds) {
				if (!selectedPlayerIds.includes(pid)) {
					const { removePlayerFromTeam } = await import("@/api/teams");
					await removePlayerFromTeam(pid, teamId);
				}
			}
			router.push(`/admin/teams?leagueId=${team?.leagueId || ""}`);
		} catch (err) {
			setError("Failed to update team. " + err);
		} finally {
			setLoading(false);
		}
	};

	if (!team) return <div>Loading...</div>;

	return (
		<div className='max-w-xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Edit Team</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter team name' {...field} autoFocus />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Player selection */}
					<div className='space-y-2'>
						<PlayerMultiSelect
							players={allPlayers}
							selected={selectedPlayerIds}
							onChange={setSelectedPlayerIds}
							label='Add/Remove Players'
							onRemove={(id: string) =>
								setSelectedPlayerIds(
									selectedPlayerIds.filter((pid) => pid !== id)
								)
							}
						/>
					</div>
					{/* New player creation */}
					<div className='mt-4'>
						<div className='font-medium text-sm mb-1'>Create New Players</div>
						<div className='flex gap-2 mb-2'>
							<Input
								placeholder='Player name'
								value={newPlayerName}
								onChange={(e) => setNewPlayerName(e.target.value)}
								className='w-1/2'
							/>
							<Input
								placeholder='Position (optional)'
								value={newPlayerPosition}
								onChange={(e) => setNewPlayerPosition(e.target.value)}
								className='w-1/3'
							/>
							<Button
								type='button'
								onClick={() => {
									if (newPlayerName.trim()) {
										const tempId = `new-${Date.now()}-${Math.random()
											.toString(36)
											.slice(2, 8)}`;
										setNewPlayers([
											...newPlayers,
											{
												id: tempId,
												name: newPlayerName.trim(),
												position: newPlayerPosition.trim() || undefined,
											},
										]);
										setSelectedPlayerIds([...selectedPlayerIds, tempId]);
										setNewPlayerName("");
										setNewPlayerPosition("");
									}
								}}
								variant='secondary'
							>
								Add
							</Button>
						</div>
						{newPlayers.length > 0 && (
							<div className='flex flex-wrap gap-2'>
								{newPlayers.map((p, i) => (
									<Badge key={p.id} className='flex items-center gap-1'>
										{p.name}
										{p.position ? ` (${p.position})` : ""}
										<Button
											type='button'
											size='icon'
											variant='ghost'
											className='ml-1 p-0.5'
											onClick={() => {
												setNewPlayers(newPlayers.filter((_, idx) => idx !== i));
												setSelectedPlayerIds(
													selectedPlayerIds.filter((id) => id !== p.id)
												);
											}}
										>
											×
										</Button>
									</Badge>
								))}
							</div>
						)}
					</div>
					{error && <div className='text-red-600 font-semibold'>{error}</div>}
					<Button
						type='submit'
						className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
						disabled={loading}
					>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
