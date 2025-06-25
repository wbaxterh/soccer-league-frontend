import Link from "next/link";

export default function AdminDashboardPage() {
	return (
		<div>
			<h1 className='text-3xl font-bold mb-8 text-league-dark'>
				Admin Dashboard
			</h1>
			<div className='flex flex-col gap-6 max-w-md'>
				<Link
					href='/admin/teams'
					className='px-6 py-4 bg-league-mediumdark text-league-light rounded shadow hover:bg-league-dark font-semibold transition text-lg'
				>
					Manage Teams
				</Link>
				<Link
					href='/admin/players'
					className='px-6 py-4 bg-league-mediumdark text-league-light rounded shadow hover:bg-league-dark font-semibold transition text-lg'
				>
					Manage Players
				</Link>
				<Link
					href='/admin/schedule'
					className='px-6 py-4 bg-league-mediumdark text-league-light rounded shadow hover:bg-league-dark font-semibold transition text-lg'
				>
					Manage Games
				</Link>
			</div>
		</div>
	);
}
