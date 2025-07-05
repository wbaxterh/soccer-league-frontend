"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
	const pathname = usePathname();
	return (
		<nav className='flex flex-row md:flex-col gap-x-4 md:gap-x-0 md:gap-y-4 w-full'>
			<Link
				href='/admin/leagues'
				className={`hover:text-muted-foreground font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/leagues")
						? "bg-card text-card-foreground"
						: ""
				}`}
			>
				Leagues
			</Link>
			<Link
				href='/admin/teams'
				className={`hover:text-muted-foreground font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/teams")
						? "bg-card text-card-foreground"
						: ""
				}`}
			>
				Teams
			</Link>
			<Link
				href='/admin/players'
				className={`hover:text-muted-foreground font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/players")
						? "bg-card text-card-foreground"
						: ""
				}`}
			>
				Players
			</Link>
			<Link
				href='/admin/schedule'
				className={`hover:text-muted-foreground font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/schedule")
						? "bg-card text-card-foreground"
						: ""
				}`}
			>
				Games
			</Link>
		</nav>
	);
}
