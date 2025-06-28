"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLeagues } from "@/api/leagues";
import { League } from "@/api/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LeaguesPage() {
	const [leagues, setLeagues] = useState<League[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getLeagues()
			.then((data) => setLeagues(data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h1 className='text-3xl font-bold mb-8 text-foreground'>Leagues</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{leagues.map((league) => (
					<Card
						key={league.id}
						className='bg-card text-card-foreground border border-border'
					>
						<CardHeader>
							<CardTitle className='text-xl font-semibold'>
								{league.name}
							</CardTitle>
							<CardDescription className='text-muted-foreground'>
								{league.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button
								asChild
								className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
							>
								<Link href={`/leagues/${league.id}`}>View League</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
