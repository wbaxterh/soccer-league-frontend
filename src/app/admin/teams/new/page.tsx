"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTeam } from "@/api/teams";
import { getLeagues } from "@/api/leagues";
import { Team } from "@/api/types";
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

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			leagueId: leagueIdParam || "",
			name: "",
		},
	});

	useEffect(() => {
		getLeagues().then(setLeagues);
	}, []);

	const onSubmit = async (values: FormValues) => {
		setError(null);
		setLoading(true);
		try {
			await createTeam({ name: values.name, leagueId: values.leagueId });
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
