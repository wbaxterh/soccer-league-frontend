"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
	const pathname = usePathname();
	return (
		<nav className='flex flex-col gap-4'>
			<Link
				href='/admin/leagues'
				className={`hover:text-league-medium font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/leagues") ? "bg-white text-black" : ""
				}`}
			>
				Leagues
			</Link>
			<Link
				href='/admin/teams'
				className={`hover:text-league-medium font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/teams") ? "bg-white text-black" : ""
				}`}
			>
				Teams
			</Link>
			<Link
				href='/admin/players'
				className={`hover:text-league-medium font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/players") ? "bg-white text-black" : ""
				}`}
			>
				Players
			</Link>
			<Link
				href='/admin/schedule'
				className={`hover:text-league-medium font-semibold rounded px-2 py-1 ${
					pathname.startsWith("/admin/schedule") ? "bg-white text-black" : ""
				}`}
			>
				Games
			</Link>
		</nav>
	);
}
