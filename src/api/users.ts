import api from "./axios";
import { User } from "./types";

export const getUsers = async (): Promise<User[]> => {
	const res = await api.get("/users");
	return res.data;
};

export const getUser = async (id: string): Promise<User> => {
	const res = await api.get(`/users/${id}`);
	return res.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
	const res = await api.post("/users", data);
	return res.data;
};

export const updateUser = async (
	id: string,
	data: Partial<User>
): Promise<User> => {
	const res = await api.put(`/users/${id}`, data);
	return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
	await api.delete(`/users/${id}`);
};
