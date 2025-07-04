"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { getTeams } from "@/api/teams";
import { Team, Player } from "@/api/types";
import { getPlayer, updatePlayer } from "@/api/players";
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
import { TeamMultiSelect } from "@/components/ui/TeamMultiSelect";

const formSchema = z.object({
	name: z.string().min(1, "Name is required."),
	teamIds: z.array(z.string()).min(1, "Select at least one team."),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPlayerPage() {
	const params = useParams();
	const playerId = params?.id as string;
	const [player, setPlayer] = useState<Player | null>(null);
	const [teams, setTeams] = useState<Team[]>([]);
	const router = useRouter();
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: "", teamIds: [] },
	});

	useEffect(() => {
		if (!playerId) return;
		getPlayer(playerId).then(setPlayer);
		getTeams().then(setTeams);
	}, [playerId]);

	useEffect(() => {
		if (player) {
			form.reset({ name: player.name, teamIds: player.teamIds });
		}
	}, [player, form]);

	const onSubmit = async (values: FormValues) => {
		await updatePlayer(playerId, values);
		router.push("/admin/players");
	};

	return (
		<div className='max-w-xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Edit Player</h2>
			{player ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter player name'
											{...field}
											autoFocus
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='teamIds'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Teams</FormLabel>
									<FormControl>
										<TeamMultiSelect
											teams={teams}
											selected={field.value}
											onChange={field.onChange}
											label={undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
						>
							Save Changes
						</Button>
					</form>
				</Form>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}
