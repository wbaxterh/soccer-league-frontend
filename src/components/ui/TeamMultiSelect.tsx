"use client";
import { Team } from "@/api/types";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

interface TeamMultiSelectProps {
	teams: Team[];
	selected: string[];
	onChange: (selected: string[]) => void;
	label?: string;
}

export function TeamMultiSelect({
	teams,
	selected,
	onChange,
	label,
}: TeamMultiSelectProps) {
	const [search, setSearch] = useState("");
	const filteredTeams = teams.filter((t) =>
		t.name.toLowerCase().includes(search.toLowerCase())
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
							<span className='text-muted-foreground'>Select teams</span>
						) : (
							<div className='flex flex-wrap gap-1 w-full'>
								{teams
									.filter((t) => selected.includes(t.id))
									.map((t) => (
										<Badge
											key={t.id}
											className='flex items-center gap-1 px-2 py-1 bg-white text-black rounded-md'
										>
											{t.name}
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
							placeholder='Search teams...'
							className='w-full px-2 py-1 rounded border border-input bg-background text-foreground text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-ring'
							autoFocus
						/>
					</div>
					{filteredTeams.length === 0 ? (
						<div className='px-3 py-2 text-muted-foreground text-sm'>
							No teams found
						</div>
					) : (
						filteredTeams.map((team) => (
							<DropdownMenuCheckboxItem
								key={team.id}
								checked={selected.includes(team.id)}
								onCheckedChange={(checked) => {
									if (checked) {
										onChange([...selected, team.id]);
									} else {
										onChange(selected.filter((id) => id !== team.id));
									}
								}}
							>
								{team.name}
							</DropdownMenuCheckboxItem>
						))
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
