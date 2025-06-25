import Link from "next/link";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen flex bg-league-light text-league-black'>
			<aside className='w-64 bg-league-dark text-league-light flex flex-col py-8 px-4 space-y-8'>
				<div className='text-2xl font-bold mb-8'>Admin</div>
				<nav className='flex flex-col gap-4'>
					<Link
						href='/admin/teams'
						className='hover:text-league-medium font-semibold'
					>
						Teams
					</Link>
					<Link
						href='/admin/players'
						className='hover:text-league-medium font-semibold'
					>
						Players
					</Link>
					<Link
						href='/admin/schedule'
						className='hover:text-league-medium font-semibold'
					>
						Games
					</Link>
				</nav>
			</aside>
			<main className='flex-1 p-8'>{children}</main>
		</div>
	);
}
