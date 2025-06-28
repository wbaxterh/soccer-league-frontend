import api from "./axios";
import { League } from "./types";

export interface StandingsOptions {
	pointsFormula: Record<string, number>;
	tiebreakers: string[];
}

export const getLeagues = async (): Promise<League[]> => {
	const res = await api.get("/leagues");
	return res.data;
};

export const getLeague = async (id: string): Promise<League> => {
	const res = await api.get(`/leagues/${id}`);
	return res.data;
};

export const createLeague = async (data: Partial<League>): Promise<League> => {
	const res = await api.post("/leagues", data);
	return res.data;
};

export const updateLeague = async (
	id: string,
	data: Partial<League>
): Promise<League> => {
	const res = await api.put(`/leagues/${id}`, data);
	return res.data;
};

export const deleteLeague = async (id: string): Promise<void> => {
	await api.delete(`/leagues/${id}`);
};

export interface LeagueStandings {
	teamId: string;
	points: number;
	[key: string]: string | number;
}

export const getLeagueStandings = async (
	id: string
): Promise<LeagueStandings[]> => {
	const res = await api.get(`/leagues/${id}/standings`);
	return res.data;
};

export const updateLeagueStandingsOptions = async (
	id: string,
	data: StandingsOptions
): Promise<StandingsOptions> => {
	const res = await api.put(`/leagues/${id}/standings-options`, data);
	return res.data;
};
