import Link from "next/link";

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center gap-8'>
			<h1 className='text-4xl font-bold text-center text-foreground'>
				Welcome to Soccer League Manager
			</h1>
			<p className='text-lg text-muted-foreground text-center max-w-xl'>
				Manage your soccer leagues, teams, players, and schedules with ease.
				Explore public league info or log in as an admin to manage your
				organization.
			</p>
			<Link
				href='/leagues'
				className='px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90 transition font-semibold border border-border'
			>
				View Leagues
			</Link>
		</div>
	);
}
