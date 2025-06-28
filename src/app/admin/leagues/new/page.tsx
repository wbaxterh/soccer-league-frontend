"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import { createLeague } from "@/api/leagues";

const formSchema = z.object({
	name: z.string().min(1, "Name is required."),
	sport: z.string().min(1, "Sport is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddLeaguePage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: "", sport: "" },
	});
	const router = useRouter();
	const onSubmit = async (values: FormValues) => {
		await createLeague(values);
		router.push("/admin/leagues");
	};

	return (
		<div className='max-w-xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>Add League</h2>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter league name' {...field} autoFocus />
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
					<Button
						type='submit'
						className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
					>
						Add League
					</Button>
				</form>
			</Form>
		</div>
	);
}
