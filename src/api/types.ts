export interface Team {
	id: string;
	name: string;
	leagueId?: string;
	description?: string;
}

export interface Player {
	id: string;
	name: string;
	position?: string;
	teamIds: string[];
}

export interface League {
	id: string;
	name: string;
	type?: string;
	demographic?: string;
	division?: string;
	sport?: string;
	rulesUrl?: string;
	startDate?: string;
	endDate?: string;
	status?: string;
	teamFee?: string;
	playerFee?: string;
	otherFeeInfo?: string;
	moreInfo?: string;
	standingsOptions?: {
		pointsFormula: Record<string, number>;
		tiebreakers: string[];
	};
	description?: string;
}

export interface Game {
	id: string;
	leagueId: string;
	home: string; // teamId
	away: string; // teamId
	date?: string;
}

export interface User {
	id: string;
	name: string;
	email?: string;
}
