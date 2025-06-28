import api from "./axios";
import { Player } from "./types";

export const getPlayers = async (
	teamId?: string,
	leagueId?: string
): Promise<Player[]> => {
	const res = await api.get("/players", { params: { teamId, leagueId } });
	return res.data;
};

export const getPlayer = async (id: string): Promise<Player> => {
	const res = await api.get(`/players/${id}`);
	return res.data;
};

export const createPlayer = async (data: Partial<Player>): Promise<Player> => {
	const res = await api.post("/players", data);
	return res.data;
};

export const updatePlayer = async (
	id: string,
	data: Partial<Player>
): Promise<Player> => {
	const res = await api.put(`/players/${id}`, data);
	return res.data;
};

export const deletePlayer = async (id: string): Promise<void> => {
	await api.delete(`/players/${id}`);
};
