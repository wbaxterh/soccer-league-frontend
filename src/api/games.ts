import api from "./axios";
import { Game } from "./types";

export const getGames = async (
	leagueId?: string,
	teamId?: string
): Promise<Game[]> => {
	const res = await api.get("/games", { params: { leagueId, teamId } });
	return res.data;
};

export const getGame = async (id: string): Promise<Game> => {
	const res = await api.get(`/games/${id}`);
	return res.data;
};

export const createGame = async (data: Partial<Game>): Promise<Game> => {
	const res = await api.post("/games", data);
	return res.data;
};

export const updateGame = async (
	id: string,
	data: Partial<Game>
): Promise<Game> => {
	const res = await api.put(`/games/${id}`, data);
	return res.data;
};

export const deleteGame = async (id: string): Promise<void> => {
	await api.delete(`/games/${id}`);
};
