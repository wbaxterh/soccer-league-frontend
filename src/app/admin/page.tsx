import Link from "next/link";

export default function AdminDashboardPage() {
	return (
		<div>
			<h1 className='text-3xl font-bold mb-8 text-foreground'>
				Admin Dashboard
			</h1>
			<div className='flex flex-col gap-6 max-w-md'>
				<Link
					href='/admin/leagues'
					className='px-6 py-4 bg-card text-card-foreground rounded shadow hover:bg-muted font-semibold transition text-lg border border-border'
				>
					Manage Leagues
				</Link>
				<Link
					href='/admin/teams'
					className='px-6 py-4 bg-card text-card-foreground rounded shadow hover:bg-muted font-semibold transition text-lg border border-border'
				>
					Manage Teams
				</Link>
				<Link
					href='/admin/players'
					className='px-6 py-4 bg-card text-card-foreground rounded shadow hover:bg-muted font-semibold transition text-lg border border-border'
				>
					Manage Players
				</Link>
				<Link
					href='/admin/schedule'
					className='px-6 py-4 bg-card text-card-foreground rounded shadow hover:bg-muted font-semibold transition text-lg border border-border'
				>
					Manage Games
				</Link>
			</div>
		</div>
	);
}
