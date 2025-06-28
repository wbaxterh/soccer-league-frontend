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

const outcomes = [
	{ key: "W", label: "Wins" },
	{ key: "L", label: "Losses" },
	{ key: "T", label: "Ties" },
	{ key: "OTW", label: "Overtime Wins" },
	{ key: "OTL", label: "Overtime Losses" },
	{ key: "RTW", label: "Regular Time Wins" },
	{ key: "RTL", label: "Regular Time Losses" },
	{ key: "F", label: "Forfeits" },
	{ key: "D", label: "Defaults" },
	{ key: "BP", label: "Bonus Points" },
];

const formSchema = z.object({
	W: z.coerce.number(),
	L: z.coerce.number(),
	T: z.coerce.number(),
	OTW: z.coerce.number(),
	OTL: z.coerce.number(),
	RTW: z.coerce.number(),
	RTL: z.coerce.number(),
	F: z.coerce.number(),
	D: z.coerce.number(),
	BP: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultFormula: FormValues = {
	W: 3,
	L: 0,
	T: 1,
	OTW: 0,
	OTL: 0,
	RTW: 0,
	RTL: 0,
	F: 0,
	D: 0,
	BP: 0,
};

export default function StandingsOptionsPage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultFormula,
	});
	// values: FormValues
	const onSubmit = () => {
		// Save logic here (API or context)
		alert("Standings options saved! (Not yet persisted)");
	};

	return (
		<div className='max-w-xl mx-auto bg-card p-8 rounded shadow text-card-foreground border border-border'>
			<h2 className='text-2xl font-bold mb-6 text-foreground'>
				Standings Options
			</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div>
						<h3 className='text-lg font-semibold mb-2 text-foreground'>
							How Should Points Be Calculated?
						</h3>
						<div className='grid grid-cols-2 gap-4'>
							{outcomes.map((o) => (
								<FormField
									key={o.key}
									control={form.control}
									name={o.key as keyof FormValues}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{o.label}</FormLabel>
											<FormControl>
												<Input type='number' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-2 text-foreground'>
							How Should The Rankings Be Sorted?
						</h3>
						<div className='text-foreground'>Tiebreakers UI coming soon.</div>
					</div>
					<Button
						type='submit'
						className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
					>
						Save Options
					</Button>
				</form>
			</Form>
		</div>
	);
}
