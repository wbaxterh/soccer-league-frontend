import api from "./axios";
import { Team } from "./types";
import { updatePlayer, getPlayer } from "./players";

export const getTeams = async (leagueId?: string): Promise<Team[]> => {
	const res = await api.get("/teams", { params: leagueId ? { leagueId } : {} });
	return res.data;
};

export const getTeam = async (id: string): Promise<Team> => {
	const res = await api.get(`/teams/${id}`);
	return res.data;
};

export const createTeam = async (data: Partial<Team>): Promise<Team> => {
	const res = await api.post("/teams", data);
	return res.data;
};

export const updateTeam = async (
	id: string,
	data: Partial<Team>
): Promise<Team> => {
	const res = await api.put(`/teams/${id}`, data);
	return res.data;
};

export const deleteTeam = async (id: string): Promise<void> => {
	await api.delete(`/teams/${id}`);
};

export const addPlayerToTeam = async (playerId: string, teamId: string) => {
	const player = await getPlayer(playerId);
	if (!player.teamIds.includes(teamId)) {
		const newTeamIds = [...player.teamIds, teamId];
		return updatePlayer(playerId, { teamIds: newTeamIds });
	}
	return player;
};

export const removePlayerFromTeam = async (
	playerId: string,
	teamId: string
) => {
	const player = await getPlayer(playerId);
	if (player.teamIds.includes(teamId)) {
		const newTeamIds = player.teamIds.filter((id) => id !== teamId);
		return updatePlayer(playerId, { teamIds: newTeamIds });
	}
	return player;
};
