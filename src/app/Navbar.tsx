"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className='bg-card border-b border-border shadow-sm'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>
				<div className='text-xl font-bold tracking-tight text-card-foreground pr-4'>
					<Link href='/'>⚽ Soccer League</Link>
				</div>
				{/* Hamburger for mobile */}
				<div className='md:hidden ml-2'>
					<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
						<DropdownMenuTrigger asChild>
							<Button
								size='icon'
								variant='ghost'
								aria-label='Toggle menu'
								className='text-card-foreground'
							>
								<svg
									width='28'
									height='28'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<line x1='4' y1='6' x2='20' y2='6' />
									<line x1='4' y1='12' x2='20' y2='12' />
									<line x1='4' y1='18' x2='20' y2='18' />
								</svg>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-48 mt-2'>
							<DropdownMenuItem asChild>
								<Link href='/schedule' onClick={() => setMenuOpen(false)}>
									Schedule
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href='/leagues' onClick={() => setMenuOpen(false)}>
									Leagues
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href='/tournaments' onClick={() => setMenuOpen(false)}>
									Tournaments
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href='/classes' onClick={() => setMenuOpen(false)}>
									Classes
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<ModeToggle />
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href='/signup' onClick={() => setMenuOpen(false)}>
									<Button variant='secondary' className='w-full text-left'>
										Sign Up
									</Button>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href='/login' onClick={() => setMenuOpen(false)}>
									<Button variant='default' className='w-full text-left'>
										Login
									</Button>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{/* Desktop nav */}
				<div className='hidden md:flex flex-1 items-center'>
					<div className='flex space-x-6'>
						<Button asChild variant='ghost' className='text-card-foreground'>
							<Link href='/schedule'>Schedule</Link>
						</Button>
						<Button asChild variant='ghost' className='text-card-foreground'>
							<Link href='/leagues'>Leagues</Link>
						</Button>
						<Button asChild variant='ghost' className='text-card-foreground'>
							<Link href='/tournaments'>Tournaments</Link>
						</Button>
						<Button asChild variant='ghost' className='text-card-foreground'>
							<Link href='/classes'>Classes</Link>
						</Button>
					</div>
					<div className='flex-1'></div>
					<div className='flex items-center space-x-3'>
						<ModeToggle />
						<Button asChild variant='secondary'>
							<Link href='/signup'>Sign Up</Link>
						</Button>
						<Button asChild variant='default'>
							<Link href='/login'>Login</Link>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
