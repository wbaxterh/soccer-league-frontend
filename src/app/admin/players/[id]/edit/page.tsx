"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getTeams } from "@/api/teams";
import { Team, Player } from "@/api/types";
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
import { updatePlayer } from "@/api/players";

const formSchema = z.object({
	name: z.string().min(1, "Name is required."),
	teamIds: z.array(z.string()).min(1, "Select at least one team."),
});

type FormValues = z.infer<typeof formSchema>;

// In a real app, fetch player data by id
const playerData: Player = { name: "Player Name", id: "1", teamIds: ["1"] };

export default function EditPlayerPage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: playerData,
	});
	const router = useRouter();
	const [teams, setTeams] = useState<Team[]>([]);

	useEffect(() => {
		getTeams().then(setTeams);
	}, []);

	const onSubmit = async (values: FormValues) => {
		await updatePlayer(playerData.id, values);
		router.push("/admin/players");
	};

	return (
		<div className='max-w-xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Edit Player</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter player name' {...field} autoFocus />
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
									<select
										multiple
										value={field.value}
										onChange={(e) => {
											const options = Array.from(
												e.target.selectedOptions,
												(option) => option.value
											);
											field.onChange(options);
										}}
										className='w-full min-h-[3rem] border rounded px-2 py-1 bg-background text-foreground'
									>
										{teams.map((team) => (
											<option key={team.id} value={team.id}>
												{team.name}
											</option>
										))}
									</select>
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
		</div>
	);
}
