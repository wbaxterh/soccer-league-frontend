"use client";
import { Player } from "@/api/types";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface PlayerMultiSelectProps {
	players: Player[];
	selected: string[];
	onChange: (selected: string[]) => void;
	label?: string;
	onRemove?: (playerId: string) => void;
}

export function PlayerMultiSelect({
	players,
	selected,
	onChange,
	label,
	onRemove,
}: PlayerMultiSelectProps) {
	const [search, setSearch] = useState("");
	const filteredPlayers = players.filter(
		(p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			(p.position?.toLowerCase().includes(search.toLowerCase()) ?? false)
	);
	return (
		<div>
			{label && <div className='mb-1 font-medium text-sm'>{label}</div>}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						className='w-full min-h-9 flex flex-wrap gap-1 justify-start items-start py-2 px-3 text-left h-auto min-h-[44px]'
						style={{
							minHeight: 44,
							height: "auto",
							alignItems: "flex-start",
							whiteSpace: "normal",
						}}
					>
						{selected.length === 0 ? (
							<span className='text-muted-foreground'>Select players</span>
						) : (
							<div className='flex flex-wrap gap-1 w-full'>
								{players
									.filter((p) => selected.includes(p.id))
									.map((p) => (
										<Badge
											key={p.id}
											className='flex items-center gap-1 px-2 py-1 bg-white text-black rounded-md'
										>
											{p.name}{" "}
											{p.position ? (
												<span className='text-xs text-muted-foreground ml-1'>
													({p.position})
												</span>
											) : null}
										</Badge>
									))}
							</div>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-64 max-h-72 overflow-y-auto'>
					<div className='p-2 pb-0'>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder='Search players...'
							className='w-full px-2 py-1 rounded border border-input bg-background text-foreground text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-ring'
							autoFocus
						/>
					</div>
					{filteredPlayers.length === 0 ? (
						<div className='px-3 py-2 text-muted-foreground text-sm'>
							No players found
						</div>
					) : (
						filteredPlayers.map((player) => (
							<DropdownMenuCheckboxItem
								key={player.id}
								checked={selected.includes(player.id)}
								onCheckedChange={(checked) => {
									if (checked) {
										onChange([...selected, player.id]);
									} else {
										onChange(selected.filter((id) => id !== player.id));
									}
								}}
							>
								{player.name}{" "}
								{player.position ? (
									<span className='text-xs text-muted-foreground ml-2'>
										({player.position})
									</span>
								) : null}
							</DropdownMenuCheckboxItem>
						))
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
