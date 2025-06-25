"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [theme, setTheme] = useState("dark");

	// On mount, check localStorage for theme
	useEffect(() => {
		const stored =
			typeof window !== "undefined" ? localStorage.getItem("theme") : null;
		if (stored) setTheme(stored);
	}, []);

	// Update html class on theme change
	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(theme);
			localStorage.setItem("theme", theme);
		}
	}, [theme]);

	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<nav className='bg-league-dark border-b border-league-medium shadow-sm'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>
				<div className='text-xl font-bold tracking-tight text-league-light pr-4'>
					<Link href='/'>⚽ Soccer League</Link>
				</div>
				{/* Hamburger for mobile */}
				<button
					className='md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white'
					onClick={() => setMenuOpen((open) => !open)}
					aria-label='Toggle menu'
				>
					<span className='block w-6 h-0.5 bg-white mb-1'></span>
					<span className='block w-6 h-0.5 bg-white mb-1'></span>
					<span className='block w-6 h-0.5 bg-white'></span>
				</button>
				{/* Desktop nav */}
				<div className='hidden md:flex flex-1 items-center'>
					<div className='flex space-x-6'>
						<Link
							href='/schedule'
							className='text-league-light hover:text-league-medium'
						>
							Schedule
						</Link>
						<Link
							href='/leagues'
							className='text-league-light hover:text-league-medium'
						>
							Leagues
						</Link>
						<Link
							href='/tournaments'
							className='text-league-light hover:text-league-medium'
						>
							Tournaments
						</Link>
						<Link
							href='/classes'
							className='text-league-light hover:text-league-medium'
						>
							Classes
						</Link>
					</div>
					<div className='flex-1'></div>
					<div className='flex items-center space-x-3'>
						<button
							onClick={toggleTheme}
							className='px-2 py-1 rounded border border-league-mediumdark bg-league-light text-league-black hover:bg-league-medium font-semibold transition mr-2'
							aria-label='Toggle light/dark mode'
						>
							{theme === "dark" ? "🌞 Light" : "🌙 Dark"}
						</button>
						<Link
							href='/signup'
							className='px-4 py-1 border border-white bg-black text-white rounded shadow hover:bg-league-dark font-semibold transition'
						>
							Sign Up
						</Link>
						<Link
							href='/login'
							className='px-4 py-1 bg-white text-black rounded shadow hover:bg-league-light border border-league-mediumdark font-semibold transition'
						>
							Login
						</Link>
					</div>
				</div>
				{/* Mobile menu dropdown */}
				{menuOpen && (
					<div className='fixed top-0 left-0 right-0 z-50 bg-league-dark border-b border-league-medium flex flex-col items-start md:hidden px-4 py-4 space-y-4 min-h-screen'>
						<Link
							href='/schedule'
							className='text-league-light hover:text-league-medium w-full'
							onClick={() => setMenuOpen(false)}
						>
							Schedule
						</Link>
						<Link
							href='/leagues'
							className='text-league-light hover:text-league-medium w-full'
							onClick={() => setMenuOpen(false)}
						>
							Leagues
						</Link>
						<Link
							href='/tournaments'
							className='text-league-light hover:text-league-medium w-full'
							onClick={() => setMenuOpen(false)}
						>
							Tournaments
						</Link>
						<Link
							href='/classes'
							className='text-league-light hover:text-league-medium w-full'
							onClick={() => setMenuOpen(false)}
						>
							Classes
						</Link>
						<button
							onClick={toggleTheme}
							className='px-2 py-1 rounded border border-league-mediumdark bg-league-light text-league-black hover:bg-league-medium font-semibold transition w-full text-center'
							aria-label='Toggle light/dark mode'
						>
							{theme === "dark" ? "🌞 Light" : "🌙 Dark"}
						</button>
						<Link
							href='/signup'
							className='px-4 py-1 border border-white bg-black text-white rounded shadow hover:bg-league-dark font-semibold transition w-full text-center'
							onClick={() => setMenuOpen(false)}
						>
							Sign Up
						</Link>
						<Link
							href='/login'
							className='px-4 py-1 bg-white text-black rounded shadow hover:bg-league-light border border-league-mediumdark font-semibold transition w-full text-center'
							onClick={() => setMenuOpen(false)}
						>
							Login
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
