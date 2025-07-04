"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTeam } from "@/api/teams";
import { getLeagues } from "@/api/leagues";
import { Team, Player } from "@/api/types";
import { getPlayers } from "@/api/players";
import { PlayerMultiSelect } from "@/components/ui/PlayerMultiSelect";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
	leagueId: z.string().min(1, "A league is required."),
	name: z.string().min(1, "Team name is required."),
});

type FormValues = z.infer<typeof formSchema>;

function NewTeamPageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const leagueIdParam = searchParams.get("leagueId");
	const [leagues, setLeagues] = useState<Team[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [players, setPlayers] = useState<Player[]>([]);
	const [newPlayers, setNewPlayers] = useState<
		{ id: string; name: string; position?: string }[]
	>([]);
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
	const [newPlayerName, setNewPlayerName] = useState("");
	const [newPlayerPosition, setNewPlayerPosition] = useState("");

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			leagueId: leagueIdParam || "",
			name: "",
		},
	});

	useEffect(() => {
		getLeagues().then(setLeagues);
		getPlayers().then(setPlayers);
	}, []);

	const allPlayers: Player[] = [
		...players,
		...newPlayers.map((np) => ({ ...np, teamIds: [] })),
	];

	const onSubmit = async (values: FormValues) => {
		setError(null);
		setLoading(true);
		try {
			// 1. Create the team
			const team = await createTeam({
				name: values.name,
				leagueId: values.leagueId,
			});
			// 2. Create new players and collect their IDs
			const createdPlayerIds: string[] = [];
			for (const np of newPlayers) {
				const { createPlayer } = await import("@/api/players");
				const player = await createPlayer({
					name: np.name,
					position: np.position,
					teamIds: [team.id],
				});
				createdPlayerIds.push(player.id);
			}
			// 3. Add selected existing players to the team
			for (const playerId of selectedPlayerIds) {
				// If this is a new player, skip (already added above)
				if (createdPlayerIds.includes(playerId)) continue;
				const player = players.find((p) => p.id === playerId);
				if (player && !player.teamIds.includes(team.id)) {
					const { addPlayerToTeam } = await import("@/api/teams");
					await addPlayerToTeam(playerId, team.id);
				}
			}
			router.push(`/admin/teams?leagueId=${values.leagueId}`);
		} catch (err) {
			setError("Failed to create team. " + err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Add Team</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 p-6 rounded border'
				>
					<FormField
						control={form.control}
						name='leagueId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>League</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={!!leagueIdParam}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select a league' />
										</SelectTrigger>
										<SelectContent>
											{leagues.map((l) => (
												<SelectItem key={l.id} value={l.id}>
													{l.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
							label='Add Existing Players'
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
										// Generate a temporary id for new player
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
					<Button type='submit' className='w-full' disabled={loading}>
						{loading ? "Saving..." : "Add Team"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default function NewTeamPage() {
	return (
		<Suspense>
			<NewTeamPageInner />
		</Suspense>
	);
}
