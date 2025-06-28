"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLeague, updateLeague } from "@/api/leagues";
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

const formSchema = z.object({
	name: z.string().min(1, "Name is required."),
	type: z.string().optional(),
	demographic: z.string().optional(),
	division: z.string().optional(),
	sport: z.string().min(1, "Sport is required."),
	rulesUrl: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	status: z.string().optional(),
	teamFee: z.string().optional(),
	playerFee: z.string().optional(),
	otherFeeInfo: z.string().optional(),
	moreInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditLeaguePage(props: {
	params: Promise<{ id: string }>;
}) {
	const [leagueId, setLeagueId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			type: "",
			demographic: "",
			division: "",
			sport: "",
			rulesUrl: "",
			startDate: "",
			endDate: "",
			status: "",
			teamFee: "",
			playerFee: "",
			otherFeeInfo: "",
			moreInfo: "",
		},
	});

	useEffect(() => {
		Promise.resolve(props.params).then((params) => {
			setLeagueId(params?.id || "1");
		});
	}, [props.params]);

	useEffect(() => {
		if (!leagueId) return;
		getLeague(leagueId).then((data) => {
			form.reset(data);
			setLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leagueId]);

	const onSubmit = async (values: FormValues) => {
		if (leagueId) {
			await updateLeague(leagueId, values);
			router.push("/admin/leagues");
		}
	};

	if (loading) return <div className='text-league-black'>Loading...</div>;
	return (
		<div className='max-w-lg mx-auto'>
			<div className='mb-6 flex flex-col gap-2'>
				<Link
					href={`../standings-options`}
					className='inline-block px-4 py-2 border border-league-mediumdark bg-league-dark text-league-light rounded font-semibold hover:bg-league-black transition'
				>
					Edit Standings Options
				</Link>
				{leagueId && (
					<Link
						href={`/admin/teams?leagueId=${leagueId}`}
						className='inline-block px-4 py-2 border border-league-mediumdark bg-league-black text-league-light rounded font-semibold hover:bg-league-dark transition'
					>
						Add Team to League
					</Link>
				)}
			</div>
			<h2 className='text-2xl font-bold mb-6 text-league-dark'>Edit League</h2>
			<Form {...form}>
				<form
					className='space-y-6 p-6 rounded border'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='League name' {...field} autoFocus />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='type'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Type</FormLabel>
								<FormControl>
									<Input placeholder='Type' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='demographic'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Demographic</FormLabel>
								<FormControl>
									<Input placeholder='Demographic' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='division'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Division</FormLabel>
								<FormControl>
									<Input placeholder='Division' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='sport'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sport</FormLabel>
								<FormControl>
									<Input
										placeholder='e.g. Indoor Soccer, Outdoor Soccer'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='rulesUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rules URL</FormLabel>
								<FormControl>
									<Input placeholder='https://example.com/rules' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='startDate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Date</FormLabel>
								<FormControl>
									<Input placeholder='YYYY-MM-DD' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='endDate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>End Date</FormLabel>
								<FormControl>
									<Input placeholder='YYYY-MM-DD' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Input placeholder='Status' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='teamFee'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team Fee</FormLabel>
								<FormControl>
									<Input placeholder='Team Fee' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='playerFee'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Player Fee</FormLabel>
								<FormControl>
									<Input placeholder='Player Fee' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='otherFeeInfo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Other Fee Info</FormLabel>
								<FormControl>
									<Input placeholder='Other Fee Info' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='moreInfo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>More Info</FormLabel>
								<FormControl>
									<textarea
										className='w-full px-3 py-2 border border-league-mediumdark rounded bg-league-light text-league-black'
										name='moreInfo'
										value={field.value}
										onChange={field.onChange}
										rows={3}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full py-2 bg-league-black text-league-light rounded font-bold hover:bg-league-dark transition'
					>
						Save Changes
					</Button>
				</form>
			</Form>
		</div>
	);
}
