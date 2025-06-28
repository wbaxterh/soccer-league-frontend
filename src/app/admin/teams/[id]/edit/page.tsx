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

const formSchema = z.object({
	name: z.string().min(1, "Team name is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function TeamEditPage() {
	// In a real app, fetch initial data by id
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: "" },
	});

	const onSubmit = (values: FormValues) => {
		// In a real app, submit to API here
		// router.push("/admin/teams");
		// For now, just log
		console.log(values);
	};

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
